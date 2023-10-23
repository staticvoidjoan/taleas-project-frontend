import React, { useState, useEffect } from "react";
import unicorn from "../../assets/images/Unicorn.png";
import SignOut from "../../service/authentication/user/userSignOut";
import Text from "../../components/text/text";
import "./employerProfile.css";
import ImageUploader from "../../components/Convert/convertImage";
import axios from "axios";
import emailpic from "../../assets/icons/email.svg";
import locationico from "../../assets/icons/location.svg";
import Animate from "../../animateTransition/Animate";
import CenterNavbar from "../../components/centerNavbar/centerNavbar";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader.jsx"
const EmployerProfile = ({ employerData, employeeCheck }) => {
  const [loading, setLoading] = useState(false);
  const [oldPhoto, setOldPhoto] = useState("");
  const [newPhoto, setNewPhoto] = useState({
    profilePhoto: "",
  });

  useEffect(() => {
    console.log(employerData.profilePhoto);

    console.log("newPhoto:", newPhoto);
    if (newPhoto.profilePhoto) {
      // Automatically submit the form when a new image is selected
      console.log("Submitting form...");
      editEmployer();
    }
  }, [newPhoto]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected file as a data URL (base64)
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setNewPhoto({
          ...newPhoto,
          profilePhoto: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const checkEmployer = async (employer) => {
    try {
      setLoading(true);
      console.log(employer.data.employer.profilePhoto);
      const imageUrl = employer.data.employer.profilePhoto.replace(
        /^"(.*)"$/,
        "$1"
      );
      console.log("Trying to check image content");

      const response = await axios.post(
        "https://oet3gzct9a.execute-api.eu-west-2.amazonaws.com/prod/analyse-image",
        { imageUrl: imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            // Other custom headers, if needed
          },
        }
      );
      console.log("Image content checked successfully");
      console.log(response.data);
      if (response.data === "Bad") {
        Swal.fire({
          title: "Attention",
          text: "That picture is against our community guidelines!",
          confirmButtonText: "Ok",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await keepOldPhoto(); // Wait for the async function to complete
          }
        });
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }finally {
      setLoading(false); // Set loading to false after the operation is completed
    }
  };

  const keepOldPhoto = async () => {
    try {
      setLoading(true); // Set loading to true while the operation is in progress
      console.log("Trying to set old photo");
      console.log("OldPhoto", oldPhoto);
      const employer = await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/update-profile/${employerData._id}`,
        {
          profilePhoto: oldPhoto,
          address: employerData.address,
          industry: employerData.industry,
          description: "Hey how are you i am keeping the old photo",
        }
      );
      console.log("After trying to set old photo", employer);
      checkEmployer(employer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the operation is completed
    }
  };

  const editEmployer = async (e) => {
    setOldPhoto(employerData.profilePhoto);
    let theAdd = employerData.address;
    if (theAdd) {
      try {
        setLoading(true);
        console.log();
        const employer = await axios.put(
          `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/update-profile/${employerData._id}`,
          {
            profilePhoto: newPhoto.profilePhoto,
            address: theAdd,
            industry: employerData.industry,
            description: "Hejjjjjjjjjjjjjjjjy",
          }
        );
        checkEmployer(employer);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false); // Set loading to false after the operation is completed
      }
    }
  };

  const cardStyle = {
    backgroundImage: `url(${employerData.profilePhoto || unicorn})`,
    position: "relative",
  };

  if(loading){
    return <Loader/>
  }

  return (
    <>
      <Animate>
        <div className="profile-container">
          <div className="photo-container-employer-profile">
            <div className="profile-profile-pic" style={cardStyle}>
              <form className="change-photo-form">
                <input
                  type="file"
                  accept="image/*"
                  className="custom-file-input"
                  onChange={handleImageChange}
                />
              </form>
            </div>
          </div>
          <div className="employer-profile-info">
            <Text
              label={employerData.companyName}
              size={"s18"}
              color={"#333"}
              weight={"bold"}
            />
            <Text
              label={employerData.industry}
              size={"s16"}
              weight={"regular"}
              color={"black"}
            />
            <div className="job-title-info">
              <div className="info-bubble">
                <img
                  alt="email"
                  src={emailpic}
                  style={{ marginLeft: "8px", marginRight: "8px" }}
                />

                <Text
                  label={employerData.email}
                  size={"s14"}
                  color={"black"}
                  style={{ marginRight: "8px" }}
                />
              </div>
            </div>
            <div className="job-title-info">
              <div className="info-bubble">
                <img src={locationico} className="location-icon" />
                <div style={{ marginRight: "10px" }}>
                  <Text
                    label={employerData.address}
                    weight={"regular"}
                    color={"lightgray"}
                    size={"s14"}
                  />
                </div>
              </div>
            </div>
          </div>
          <SignOut />
        </div>
      </Animate>
     
    </>
  );
};

export default EmployerProfile;
