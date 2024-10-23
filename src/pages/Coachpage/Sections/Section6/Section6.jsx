import React from "react";
import "./Section6.css";
import img6 from "../../../../assets/infopage_images/Coach_sec6.png";
import { useNavigate } from "react-router-dom";

const Section6 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>Instant Direct Contact</h2>
            <p>
              Reach out to players directly through our platform. Whether you’re
              expressing interest or arranging a campus visit, instant
              communication helps you build relationships with prospects quickly
              and efficiently.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img6} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
