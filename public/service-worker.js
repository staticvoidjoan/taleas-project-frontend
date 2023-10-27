var CACHE_VERSION = 2; // Increased version
var CURRENT_CACHES = {
  'offline-analytics': 'offline-analytics-v' + CACHE_VERSION
};

var IDB_DATABASE_NAME = 'offline-analytics'; // Name of the IndexedDB database
var IDB_STORE_NAME = 'put-requests'; // Name of the object store for PUT requests
var STOP_RETRYING_AFTER = 86400000; // One day, in milliseconds

// Function to open the IndexedDB database
// Function to open the IndexedDB database
function openIDBDatabase() {
  return new Promise(function(resolve, reject) {
    // Delete the existing database
    var deleteRequest = indexedDB.deleteDatabase(IDB_DATABASE_NAME);

    deleteRequest.onerror = function(error) {
      console.error('Failed to delete database:', error);
    };

    deleteRequest.onsuccess = function() {
      // Open the database
      var indexedDBOpenRequest = indexedDB.open(IDB_DATABASE_NAME, CACHE_VERSION);

      indexedDBOpenRequest.onerror = function(error) {
        reject(error);
      };

      indexedDBOpenRequest.onupgradeneeded = function(event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
          db.createObjectStore(IDB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };

      indexedDBOpenRequest.onsuccess = function(event) {
        resolve(event.target.result);
      };
    };
  });
}


// Function to save a PUT request in IndexedDB
function savePutRequest(request) {
  // Clone the request to ensure it's safe to read when adding to the Queue.
  var clonedRequest = request.clone();
  return clonedRequest.text().then(function(body) {
    openIDBDatabase().then(function(db) {
      var transaction = db.transaction([IDB_STORE_NAME], 'readwrite');
      var objectStore = transaction.objectStore(IDB_STORE_NAME);

      objectStore.add({
        method: 'PUT',
        url: request.url,
        body: body,
        headers: Array.from(clonedRequest.headers.entries()),
        timestamp: Date.now()
      });
    });
  });
}

// Function to replay PUT requests
function replayPutRequests() {
  openIDBDatabase().then(function(db) {
    var transaction = db.transaction([IDB_STORE_NAME], 'readwrite');
    var objectStore = transaction.objectStore(IDB_STORE_NAME);

    var cursorRequest = objectStore.openCursor();
    cursorRequest.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var storedRequest = cursor.value;
        if (storedRequest.method === 'PUT') {
          // Skip PUT requests for now
          cursor.delete();
        } else {
          var queueTime = Date.now() - storedRequest.timestamp;
          if (queueTime > STOP_RETRYING_AFTER) {
            cursor.delete();
            console.log('PUT request skipped: Request has been queued for %d milliseconds.', queueTime);
          } else {
            var requestUrl = storedRequest.url + '&qt=' + queueTime;
            console.log('Replaying', requestUrl);

            fetch(requestUrl).then(function(response) {
              if (response.status < 400) {
                cursor.delete();
                console.log('Replaying succeeded.');
              }
            }).catch(function(error) {
              console.error('Replaying failed:', error);
            });
          }
        }
        cursor.continue();
      }
    };
  });
}

self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-put-requests') {
    event.waitUntil(replayPutRequests());
  }
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.open(CURRENT_CACHES['offline-analytics']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);
          return response;
        }

        console.log('No response for %s found in cache. About to fetch from the network...', event.request.url);

        if (event.request.method === 'PUT') {
          console.log('Storing PUT request in IndexedDB to be replayed later.');
          savePutRequest(event.request);
        }

        return fetch(event.request.clone()).then(function(response) {
          console.log('Response for %s from the network is: %O', event.request.url, response);

          if (response.status < 400) {
            cache.put(event.request, response.clone());
          } else if (response.status >= 500) {
            checkForAnalyticsRequest(event.request.url);
          }

          return response;
        }).catch(function(error) {
          console.error('Fetch failed:', error);
        });
      });
    })
  );
});


// Function to save a PUT request in IndexedDB
function savePutRequest(request) {
  // Clone the request to ensure it's safe to read when adding to the Queue.
  var clonedRequest = request.clone();
  return clonedRequest.text().then(function(body) {
    openIDBDatabase().then(function(db) {
      var transaction = db.transaction([IDB_STORE_NAME], 'readwrite');
      var objectStore = transaction.objectStore(IDB_STORE_NAME);

      objectStore.add({
        method: 'PUT',
        url: request.url,
        body: body,
        headers: Array.from(clonedRequest.headers.entries()),
        timestamp: Date.now()
      });
    });
  });
}


function replayPutRequests() {
  openIDBDatabase().then(function(db) {
    var transaction = db.transaction([IDB_STORE_NAME], 'readwrite');
    var objectStore = transaction.objectStore(IDB_STORE_NAME);

    var cursorRequest = objectStore.openCursor();
    cursorRequest.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var storedRequest = cursor.value;
        if (storedRequest.method === 'PUT') {
          // Skip PUT requests for now
          cursor.delete();
        } else {
          var queueTime = Date.now() - storedRequest.timestamp;
          if (queueTime > STOP_RETRYING_AFTER) {
            cursor.delete();
            console.log('PUT request skipped: Request has been queued for %d milliseconds.', queueTime);
          } else {
            var requestUrl = storedRequest.url + '&qt=' + queueTime;
            console.log('Replaying', requestUrl);

            fetch(requestUrl).then(function(response) {
              if (response.status < 400) {
                cursor.delete();
                console.log('Replaying succeeded.');
              }
            }).catch(function(error) {
              console.error('Replaying failed:', error);
            });
          }
        }
        cursor.continue();
      }
    };
  });
}

function checkForAnalyticsRequest(requestUrl) {
  var url = new URL(requestUrl);

  if ((url.hostname === 'www.google-analytics.com' || url.hostname === 'ssl.google-analytics.com') && url.pathname === '/collect') {
    saveAnalyticsRequest(requestUrl);
  }
}

function saveAnalyticsRequest(requestUrl) {
  openIDBDatabase().then(function(db) {
    var transaction = db.transaction([IDB_STORE_NAME], 'readwrite');
    var objectStore = transaction.objectStore(IDB_STORE_NAME);

    objectStore.add({
      method: 'ANALYTICS',
      url: requestUrl,
      timestamp: Date.now()
    });
  });
}
