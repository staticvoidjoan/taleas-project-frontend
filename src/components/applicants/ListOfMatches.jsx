import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Text from "../text/text";
import unicorn from "../../assets/images/Unicorn.png";
import chatIcon from "../../assets/icons/chat.svg";
import "./listOfMatches.css"; // Make sure to include the appropriate CSS file
import { getDocs, query, collection, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";
import { set } from "date-fns";

function ListOfMatches({ employer }) {
  const creatorId = employer._id;
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
  loadAcceptedApplicants();
  if(acceptedApplicants.length > 0){
  setIsDataLoaded(true);
  }
}, []);

const loadAcceptedApplicants = async () => {
  try {
    const response = await axios.get(
      `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/creatorNoPagination/${creatorId}`
    );

    if (
      response.data &&
      response.data.posts &&
      Array.isArray(response.data.posts)
    ) {
      const uniqueKeys = new Set();

      const allAcceptedApplicants = response.data.posts.reduce(
        (accumulator, post) => {
          if (post.recLikes && Array.isArray(post.recLikes)) {
            post.recLikes.forEach((applicant) => {
              const key = applicant._id;

              if (!uniqueKeys.has(key)) {
                uniqueKeys.add(key);
                accumulator.push(applicant);
              }
            });
          }
          return accumulator;
        },
        []
      );

      // Check if there are no accepted applicants
      if (allAcceptedApplicants.length === 0) {
        setIsDataLoaded(true); // Indicate that data is loaded (no matches found)
        return;
      }

      const lastMessages = await Promise.all(
        allAcceptedApplicants.map((applicant) =>
          getLastMessage(`${applicant._id}_${creatorId}`, applicant._id)
        )
      );

      const all = allAcceptedApplicants.map((applicant, index) => ({
        ...applicant,
        lastMessage: lastMessages[index],
      }));

      // Sort the accepted applicants based on the timestamp of the lastMessage (most recent first)
      all.sort((a, b) => {
        if (a.lastMessage && b.lastMessage) {
          return b.lastMessage.timestamp - a.lastMessage.timestamp;
        }
        return 0;
      });

      setMessageCount(all.length);
      setAcceptedApplicants(all);
      setIsDataLoaded(true); // Set data as loaded
    } else {
      console.log("Data structure is not as expected.");
    }
  } catch (error) {
    setIsDataLoaded(true); // Set data as loaded
  }
};


  const getLastMessage = async (chatId, applicantId) => {
    const q = query(
      collection(db, "chats"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        let text = doc.data().text;

        // Check if the message is too long
        if (text.length > 10) {
          text = `${text.slice(0, 10)}...`; // Truncate long message
        }

        // Update unread message tracking
        if (!unreadMessages[applicantId]) {
          setUnreadMessages((prevState) => ({
            ...prevState,
            [applicantId]: true,
          }));
        }

        return {
          uid: doc.data().uid,
          name: doc.data().name,
          text: text,
          timestamp: doc.data().timestamp, // Include timestamp for sorting
        };
      }
    } catch (error) {
      console.error('Error fetching last message:', error);
    }
    return null;
  };

  const chat = (applicantId) => {
    const chatId = `${applicantId}_${creatorId}`;
    const link = `/chat/${chatId}`;
    navigate(link);
  };

  return (
    <div>
      <Text label={`Messages (${messageCount})`} size={"s16"} weight={"medium"} color={"black"} />
      {!isDataLoaded ? (
        <Loader />
      ) : (
        acceptedApplicants.map((acceptedApplicant) => (
          <div
            className="chat-container"
            key={acceptedApplicant._id}
            onClick={() => chat(acceptedApplicant._id)}
          >
            <div className="subdiv">
              <div
                className={`company-photo`}
                style={{
                  backgroundImage: `url(${acceptedApplicant.profilePhoto || unicorn})`,
                }}
              ></div>
              <div className={`info`}>
                <Text
                  label={acceptedApplicant.name}
                  size={"s16"}
                  weight={"medium"}
                  color={"black"}
                />
                {/* Include the last message logic here */}
                {acceptedApplicant.lastMessage && (
                  <Text
                    label={
                      acceptedApplicant.lastMessage.name !== acceptedApplicant.name
                        ? "You: " + acceptedApplicant.lastMessage.text
                        : acceptedApplicant.lastMessage.text
                    }
                    size={"s14"}
                    weight={"light"}
                    color={"gray"}
                  />
                )}
              </div>
            </div>
            
              <div className="newMessage" onClick={() => chat(acceptedApplicant._id)}>
              <img src={chatIcon} alt="Chat Icon" />
              {acceptedApplicant.lastMessage && (acceptedApplicant.lastMessage.uid === acceptedApplicant._id) ? (
                  <div className="redCircle"></div>
                ) : null}
                
              </div>
            </div>
        ))
      )}
    </div>
  );
}

export default ListOfMatches;