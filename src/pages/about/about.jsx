import React from "react";
import Text from "../../components/text/text";
import "./about.css";
import { Link } from "react-router-dom";
import About1 from "../../assets/images/aboutus1.svg";
import About2 from "../../assets/images/about2.svg";
import About3 from "../../assets/images/about3.svg";

const About = (props) => {
  return (
    <>
      <div className="about-container">
        <div className="welcome-about">
          <Text
            label={"Welcome to Career"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"black"}
          />
          <Text
            label={"Crush"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"purple"}
          />
        </div>
        <div className="welcome-text">
          <Text
            label={
              "At CareerCrush, we've created a platform that connects companies and workers, simplifying the job searching and hiring process. Our mission is to make it easier for employers to find the right candidates and for job seekers to discover exciting employment opportunities."
            }
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s18"}
            color={"lightgray"}
          />
          <img src={About1} alt="" />
        </div>
        <div className="vision">
          <Text
            label={"Our Vision"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"purple"}
          />
        </div>
        <div className="vision-text">
          <Text
            label={
              "We believe that the world of work should be more transparent, efficient, and user-friendly. That's why we've built CareerCrush to provide a seamless experience for both companies and workers."
            }
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s18"}
            color={"lightgray"}
          />
          <img src={About2} alt="" />
        </div>
        <div className="ofer">
          <Text
            label={"What We Offer"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"purple"}
          />
        </div>
        <div className="offer-text">
          <Text
            label={
              "Our platform allows employers to post job listings, interact with potential candidates, and streamline the hiring process. You can see who's interested in your job postings and engage with them through our private chat feature."
            }
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s18"}
            color={"lightgray"}
          />
          <Text
            label={
              "Job seekers can explore a wide range of job listings, express their interest through likes and connect with employers directly via private chat. We're here to help you find the perfect job match."
            }
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s18"}
            color={"lightgray"}
          />
          <img src={About3} alt="" />
        </div>

        <div className="contact">
          <Text
            label={"ARE YOU READY FOR THE NEXT STEP ?"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"purple"}
          />{" "}
          <Text
            label={"Contact us to guide you."}
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s18"}
            color={"lightgray"}
          />
          <Link to={"/contact"}>
            <button className="btn-register">
              {" "}
              <Text
                label={"Contact us"}
                weight={"thin"}
                lineheight={"lnormal"}
                size={"s18"}
                color={"white"}
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default About;
