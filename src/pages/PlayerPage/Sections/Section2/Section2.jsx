import React from "react";
import "./sec2.css";
import img2 from "../../../../assets/infopage_images/Player_Sec2.png";
import { useNavigate } from "react-router-dom";

const Section2 = () => {
  const navigate = useNavigate();
  return (
    <div className="sec2_main_div">
      <div className="sec2_sub_main_div">
        <div className="sec2_firstdiv">
          <h2>You Play the Game. We Propel Your Career.</h2>
          <p>
            At Undiscovered Hoops, we know that your passion lies on the court.
            Our platform is designed to ensure your hard work translates into
            real opportunities. Whether you're striving to attract top college
            scouts or looking to elevate your game, we provide unmatched
            visibility and competitive pricing to help you achieve your athletic
            ambitions.
          </p>
        </div>
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>Maximize Your Potential</h2>
            <p>
              In the competitive world of basketball recruiting, exposure is
              everything. With Undiscovered Hoops, you’ll rise above the
              competition. Our platform amplifies your presence, ensuring you
              receive the attention you deserve and the best opportunities to
              succeed.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
