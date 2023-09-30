import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Text from "../text/text";

function ListOfApplicants () {
    //MATCHES
    const postId = useParams().id
    const [acceptedApplicants, setAcceptedApplicants] = useState([])
    const [creatorId, setCreatorId] = useState("")
    const navigate = useNavigate()
    useEffect(() =>{
        loadAcceptedApplicants()
    }, [])

    const loadAcceptedApplicants = async () => {

        const response = await axios.get(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/${postId}`);
        setAcceptedApplicants(response.data.post.recLikes);
        setCreatorId(response.data.post.creatorId._id); 
    }

    const chat = (applicantId) => {
        const chatId = applicantId + "_" + creatorId
        const link = "/chat/" + chatId
        navigate(link)
    }
    return (
        <div>
        {
            acceptedApplicants.map((acceptedApplicant) => (
                <div className="applicants-container">
                <div className="applicants-desc">
                 
                  <div className="applicant-info">
                    <Text label={acceptedApplicant.name} size={"s16"} weight={"medium"} color={"black"}/>
                  </div>
                </div>
                <div className="applicant-buttons">
                  <div className="chat" onClick={() => {
                    chat(acceptedApplicant._id)
                  }}>Chat</div>
                </div>
              </div>
            ))
        }
        </div>
    )
}
export default ListOfApplicants