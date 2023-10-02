import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Text from "../text/text";
import unicorn from "../../assets/images/Unicorn.png";
import chatIcon from "../../assets/icons/chat.svg";
import "./listOfMatches.css"; // Make sure to include the appropriate CSS file
import { getDocs, query, collection, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

function ListOfMatches({ employer }) {
  const creatorId = employer._id;
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    loadAcceptedApplicants();
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

        const lastMessages = await Promise.all(
          allAcceptedApplicants.map((applicant) =>
            getLastMessage(`${applicant._id}_${creatorId}`)
          )
        );

        const all = allAcceptedApplicants.map((applicant, index) => ({
          ...applicant,
          lastMessage: lastMessages[index],
        }));
        setAcceptedApplicants(all);
      } else {
        console.log("Data structure is not as expected.");
      }
    } catch (error) {
      console.error("Error loading accepted applicants:", error);
    }
  };

    // You should execute the query and retrieve the message from Firebase here.
    // Example: const querySnapshot = await getDocs(q);
    // Then, extract the message data from the querySnapshot and return it.
  const getLastMessage = async (chatId) => {
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
        const text = doc.data().text;

        // Check if the message is too long
        if (text.length > 10) { // Adjust the threshold as needed
          return {
            name: doc.data().name,
            text: `${text.slice(0, 10)}...`, // Truncate long message
          };
        } else {
          return {
            uid: doc.data().uid,
            name: doc.data().name,
            text: text,
          };
        }
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
      {acceptedApplicants.map((acceptedApplicant) => (
        <div
          className={`chatContainer`}
          key={acceptedApplicant._id}
          onClick={() => chat(acceptedApplicant._id)}
        >
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
          <div className={`ch`} onClick={() => chat(acceptedApplicant._id)}>
            <img src={chatIcon} alt="Chat Icon" />
          </div>
          {acceptedApplicant.lastMessage &&
            acceptedApplicant.lastMessage.uid !== acceptedApplicant._id || (
              <div className="newMessageCircle"></div>
            )}
        </div>
      ))}
    </div>
  );
}


export default ListOfMatches;
