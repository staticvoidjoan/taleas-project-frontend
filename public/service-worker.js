const cacheName = 'my-cache-v1';

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheName) => {
          return Promise.all(
              cacheName.map((name) => {
                  if (name !== cacheName) {
                      return caches.delete(name); 
                  }
              })
          );
      })
  );
});

const IDBConfig = {
    name: 'my_awesome_idb',
    version: 1,
    stores: [
        {
            name: 'api_requests',
            keyPath: 'url'
        },
        {
            name: 'api_responses',
            keyPath: 'url'
        }
    ]
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(cacheName),
            createIndexedDB(IDBConfig)
        ])
        .then(([cache, db]) => {
            return cache.addAll([
                'index.html',
                'styles.css',
                'app.js'
            ]);
        })
    );
    self.skipWaiting()
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.url.includes('/prod')) {
        event.respondWith(getCachedOrNetworkApiResponse(request));
    } else {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request);
            })
        );
    }
});

const createIndexedDB = ({ name, version, stores }) => {
    const request = self.indexedDB.open(name, version);

    return new Promise((resolve, reject) => {
        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            stores.map(({ name, keyPath }) => {
                if (!db.objectStoreNames.contains(name)) {
                    db.createObjectStore(name, { keyPath });
                }
            });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const cacheApiRequest = async (request) => {
    const headers = [...request.headers.entries()].reduce((obj, [key, value]) => Object.assign(obj, { [`${key}`]: value }), {});
    const body = await request.text();
    const serialized = {
        headers,
        body,
        url: request.url,
        method: request.method,
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer
    };

    const requestStore = await openStore(IDBConfig.stores[0], 'readwrite');
    requestStore.add(serialized);
};

const cacheApiResponse = async (response) => {
    try {
        const store = await openStore(IDBConfig.stores[1], 'readwrite');
        store.add(response);
    } catch (error) {
        console.log('IDB error', error);
    }
};

const getStoreFactory = (dbName, version) => ({ name }, mode = 'readonly') => {
    return new Promise((resolve, reject) => {
        const request = self.indexedDB.open(dbName, version);

        request.onsuccess = (e) => {
            const db = request.result;
            const transaction = db.transaction(name, mode);
            const store = transaction.objectStore(name);

            return resolve(store);
        };

        request.onerror = (e) => reject(request.error);
    });
};

const openStore = getStoreFactory(IDBConfig.name, IDBConfig.version);

const networkThenCache = async (request) => {
    const { method, url } = request;
    const requestClone = request.clone();

    try {
        const response = await fetch(request);
        const json = await response.clone().json();

        if (method === 'GET') {
            cacheApiResponse({ url, json });
        }

        return response;
    } catch (e) {
        return method === 'POST' ? cacheApiRequest(requestClone) : new Response(JSON.stringify({ message: 'no response' }));
    }
};

const getCachedApiResponse = (request) => {
    return new Promise((resolve, reject) => {
        openStore(IDBConfig.stores[1])
            .then((store) => {
                const cachedRequest = store.get(request.url);

                cachedRequest.onsuccess = (e) => {
                    return cachedRequest.result === undefined ? resolve(null) : resolve(new Response(JSON.stringify(cachedRequest.result.json)));
                };

                cachedRequest.onerror = (e) => {
                    console.log('Cached response error', e, cachedRequest.error);
                    return reject(cachedRequest.error);
                };
            });
    });
};

const getCachedOrNetworkApiResponse = async (request) => await getCachedApiResponse(request) || networkThenCache(request);
