import React from "react";
import "./Section5.css";
import img5 from "../../../../assets/infopage_images/Player_Sec5.png";
import { useNavigate } from "react-router-dom";

const Section5 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div" style={{ background: "#F9FAFB" }}>
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img5} alt="" />
            </div>
          </div>
          <div className="text_of_sec2">
            <h2>Rise Above the Rest</h2>
            <p>
              At Undiscovered Hoops, we ensure our athletes stand out from the
              crowd. With features designed to maximize your visibility, we put
              you at the forefront of recruiters' minds, keeping you in the
              spotlight.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
