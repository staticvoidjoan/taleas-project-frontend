import React from "react";
import Text from "../../components/text/text";
import "./privacy.css";

const Privacy = (props) => {
  return (
    <>
      <div className="terms-container">
        {/* ----------------------------------------- terms-of-service"---------------------------------------- */}

        <div className="terms-of-service">
          <Text
            label={"Terms of Service"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s20"}
            color={"black"}
          />
          {/* ----------------------------------------- Acceptance of Terms ---------------------------------------- */}
          <div>
            <Text
              label={"1. Acceptance of Terms"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              Welcome to CareerCrush App. By accessing or using the Platform,
              you agree to comply with and be bound by these Terms of Service .
              If you do not agree to these Terms, please do not use the
              Platform. These Terms constitute a legally binding agreement
              between you and CareerCrush App.
            </p>
          </div>

          {/* ----------------------------------------- Description of the Platform ---------------------------------------- */}

          <div>
            <Text
              label={"2. Description of the Platform"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              The Platform is an online marketplace that connects companies
              ("Employers") and workers ("Users"). Employers can post job
              listings, and Users can view these listings, express interest
              through "likes," and communicate with Employers through private
              chat. These Terms govern your use of the Platform as both an
              Employer and a User.
            </p>
          </div>

          {/* ----------------------------------------- Registration and User Accounts ---------------------------------------- */}

          <div>
            <Text
              label={"3. Registration and User Accounts"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              To use certain features of the Platform, you must register and
              create an account. You agree to provide accurate, current, and
              complete information during the registration process and to update
              such information to keep it accurate, current, and complete.
            </p>
          </div>

          {/* ----------------------------------------- User Content ---------------------------------------- */}

          <div>
            <Text
              label={"4. User Content"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              You are solely responsible for any content you post on the
              Platform, including job listings, profile information, messages,
              and "likes." You agree not to post any content that violates
              applicable laws or our Content Guidelines, which may be provided
              separately.
            </p>
          </div>

          {/* ----------------------------------------- Likes and Interactions ---------------------------------------- */}

          <div>
            <Text
              label={"5. Likes and Interactions"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              Users may "like" job listings posted by Employers. Employers can
              see who has liked their job listings and may choose to interact
              with Users through the Platform. Mutual interactions do not
              guarantee employment.
            </p>
          </div>
        </div>

        {/* ----------------------------------------- terms-of-privacy"---------------------------------------- */}

        <div className="terms-of-privacy">
          <Text
            label={"Terms of Privacy"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s20"}
            color={"black"}
          />

          {/* ----------------------------------------- Information We Collect---------------------------------------- */}

          <div>
            <Text
              label={"1. Information We Collect"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              We collect information you provide when you register for an
              account, post content, interact with other users, or contact
              customer support. This may include personal information such as
              your name, email address, and profile information.
            </p>
          </div>

          {/* ----------------------------------------- Sharing Your Information ---------------------------------------- */}

          <div>
            <Text
              label={"2. Sharing Your Information"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              We may share your information with other users when you interact
              with them on the Platform. We may also share your information with
              third-party service providers who assist us in providing the
              Platform's features.
            </p>
          </div>
          <div>
            <Text
              label={"3. Security"}
              weight={"bold"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"black"}
            />
            <p>
              We take reasonable measures to protect your information but cannot
              guarantee its absolute security. You are responsible for keeping
              your login credentials confidential.
            </p>
          </div>
        </div>
        <Text
          label={
            "By using the Platform, you acknowledge that you have read, understood,and agreed to these Terms of Service and Privacy Policy."
          }
          weight={"bold"}
          lineheight={"lnormal"}
          size={"s14"}
          color={"purple"}
        />
      </div>
    </>
  );
};
export default Privacy;
