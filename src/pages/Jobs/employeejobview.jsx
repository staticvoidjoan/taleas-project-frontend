import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Text from "../../components/text/text";
import "./employeejobview.css";
import locationico from "../../assets/icons/location.svg";
import unicorn from "../../assets/images/Unicorn.png";
import axios from "axios";
import { format } from "date-fns";
const JobProfile = () => {
  const [post, setPost] = useState({});
  const [company, setCompany] = useState({});
  const [category, setCategory] = useState({});
  const [postDate, setPostDate] = useState("");
  const { id } = useParams();
  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    // This code will run whenever 'post' changes.
    console.log("Updated post state:", post);
  }, [post]);

  const loadPost = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/${id}`
      );

      console.log("API response data:", response.data);

      setPost(response.data.post);

      console.log("Updated post state:", post);
      if (response.data.post.creatorId) {
        setCompany(response.data.post.creatorId);
      }

      setCategory(response.data.post.category);
      const dateString = response.data.post.createdAt;
      const formattedDate = format(new Date(dateString), "MMMM d, yyyy");
      setPostDate(formattedDate);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${company.profilePhoto ?? unicorn} )`,
    position: "relative",
  };
  return (
    <div className="job-post-container">
      <div className="photo-container">
        <div className="company-photo" style={cardStyle}>
          <div className="gradient-overlay"></div>
        </div>
      </div>
      <div className="job-info">
        <div className="job-title">
          <Text
            label={post.position ?? "Loading..."}
            weight={"bold"}
            color={"black"}
            size={"s18"}
          />
          <Text
            label={company.companyName}
            weight={"medium"}
            color={"black"}
            size={"s16"}
          />
          <Text
            label={company.industry}
            weight={"regular"}
            color={"black"}
            size={"s16"}
          />
          <div className="job-title-info">
            <div className="info-bubble">
              <img src={locationico} className="location-icon" />
              <div style={{ marginRight: "10px" }}>
                <Text
                  label={company.address}
                  weight={"regular"}
                  color={"lightgray"}
                  size={"s14"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="job-describtion">
          <div style={{ marginBottom: "12px" }}>
            <Text
              label={"Job Description"}
              weight={"bold"}
              color={"black"}
              size={"s16"}
            />
          </div>
          <Text
            label={category.name}
            weight={"regular"}
            color={"black"}
            size={"s16"}
          />
          <Text
            label={post.description}
            weight={"regular"}
            color={"lightgray"}
            size={"s14"}
          />
          <div style={{ marginTop: "16px" }}>
            <Text
              label={`Posted on ${postDate}`}
              weight={"regular"}
              color={"lightgray"}
              size={"s14"}
            />
          </div>
        </div>
        <div className="job-requirements">
          <div style={{ marginBottom: "12px" }}>
            <Text label={"Requirements"} weight={"bold"} size={"s16"} />
          </div>
          <ul>
            {post.requirements &&
              post.requirements.map((requirement, index) => (
                <li
                  key={index}
                  style={{ marginLeft: "15px", marginBottom: "5px" }}
                >
                  <Text label={requirement} weight={"regular"} size={"s16"} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
