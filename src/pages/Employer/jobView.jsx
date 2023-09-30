import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Text from "../../components/text/text";
import "./jobView.css";
import locationico from "../../assets/icons/location.svg";
import unicorn from "../../assets/images/Unicorn.png";
import axios from "axios";
import Applicants from "../../components/applicants/applicants";
import { format } from "date-fns";
import Swal from "sweetalert2";
import TrashCan from "../../assets/icons/TrashCan.svg";
import Animate from "../../animateTransition/Animate";
import CenterNavbar from "../../components/centerNavbar/centerNavbar"
const JobView = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [company, setCompany] = useState({});
  const [category, setCategory] = useState({});
  const [postDate, setPostDate] = useState("");
  const [likes, setLikes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      console.log("I AM LOADING");
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/${id}`
      );
      // console.log(response.data); // Log the entire response data
      setPost(response.data.post);
      setCompany(response.data.post.creatorId);
      setCategory(response.data.post.category);
      setLikes(response.data.post.likedBy);
      // console.log("THE LIKES", likes);
      const dateString = response.data.post.createdAt;
      const formatedDate = format(new Date(dateString), "MMMM d, yyyy");
      setPostDate(formatedDate);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/${id}`
      );
      Swal.fire("Deleted!", "Your job posting has been deleted.", "success");
      setTimeout(() => {
        navigate(`/`);
      }, 150);
    } catch (error) {
      console.log(error);
    }
  };

  const askBeforeDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost();
      }
    });
  };

  const cardStyle = {
    backgroundImage: `url(${company.profilePhoto ?? unicorn} )`,
    position: "relative",
  };
  return (
    <>
    <Animate>
      <div className="job-post-container">
        <div className="photo-container" >
          <div className="job-company-photo" style={cardStyle}>
            <div className="gradient-overlay"></div>
          </div>
        </div>
        <div className="job-info">
          <div className="job-title"   style={{ marginBottom: "30px" }}>
            <Text
              label={post.position ?? "Loading..."}
              weight={"bold"}
              color={"black"}
              size={"s18"}
              style={{ marginBottom: "8px" }}
            />
            <Text
              label={company.companyName}
              weight={"medium"}
              color={"black"}
              size={"s16"}
              style={{ marginBottom: "8px" }}
            />
            <Text
              label={company.industry}
              weight={"regular"}
              color={"black"}
              size={"s16"}
              style={{ marginBottom: "8px" }}
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
        <div style={{ marginBottom: "40px" }} className="applicant-column">
        <Text label={"Applicants"} weight={"bold"} size={"s16"} style={{marginBottom:"10px"}}/>
          {likes.map((like, index) => (
            <Applicants
              key={`${like._id}-${index}`}
              userid={like._id}
              name={like.name}
              lastname={like.lastname}
              postId={id}
            />
          ))}
        </div>
        <div className="delete-btn-container">
          <button className="delete-job-btn" onClick={askBeforeDelete}>
            <img src={TrashCan} alt="" />
            <Text size={"s16"} label={"Delete Job"} />
          </button>
        </div>
      </div>
      <div style={{ clear: "both", height: "60px" }}></div>
    </Animate>
    </>
  );
};

export default JobView;
