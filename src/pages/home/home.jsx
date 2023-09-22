import React,{useState,useEffect} from "react";
import Text from "../../components/text/text";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import SignOut from "../../service/authentication/user/userSignOut"
import awsExports from "../../aws-exports"
import "./home.css";
const Index = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  Amplify.configure(awsExports);
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  function gotToSignUp() {
    navigate("/signup");
  }

  return (
    <div className="home-container">
      <div className="home-bio">
        <Text
          label={"Swipe your way to your dream career"}
          weight={"medium"}
          size={"s20"}
          color={"white"}
        />
        <div className="homt-btn-container">
          <button className="myButton">
            <Text label={"I'm an employer"} weight={"medium"} size={"s14"} />
          </button>
          <button className="myButton" onClick={gotToSignUp}>
            <Text label={"I'm a talent"} weight={"medium"} size={"s14"} />
          </button>
        </div>
        <div className="home-sub">
          <div>
            <Text
              label={`Already registered?`}
              weight={"medium"}
              size={"s16"}
              color={"white"}
            />
          </div>
          {
            <Link to={"signin"} className="home-link">
              <Text label={`Log In Now`} weight={"regular"} size={"s14"} />
            </Link>
          }
        </div>
         {authenticated ? 
           <SignOut/> : null}

         
      </div>
    </div>
  );
};

export default Index;
