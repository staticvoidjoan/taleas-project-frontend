import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Text from "../text/text";

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
        Array.isArray(response.data.posts) &&
        response.data.posts.length > 0 &&
        response.data.posts[0].recLikes &&
        Array.isArray(response.data.posts[0].recLikes)
      ) {
        setAcceptedApplicants(response.data.posts[0].recLikes);
        console.log(response.data.posts[0].recLikes);
      } else {
        console.log("Data structure is not as expected.");
      }
    } catch (error) {
      console.error("Error loading accepted applicants:", error);
    }
  };

  const chat = (applicantId) => {
    const chatId = applicantId + "_" + creatorId;
    const link = "/chat/" + chatId;
    navigate(link);
  };

  return (
    <div>
      {acceptedApplicants.map((acceptedApplicant) => (
        <div className="applicants-container" key={acceptedApplicant._id}>
          <div className="applicants-desc">
            <div className="applicant-info">
              <Text
                label={acceptedApplicant.name}
                size={"s16"}
                weight={"medium"}
                color={"black"}
              />
            </div>
          </div>
          <div className="applicant-buttons">
            <div
              className="chat"
              onClick={() => {
                chat(acceptedApplicant._id);
              }}
            >
              Chat
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListOfMatches;
