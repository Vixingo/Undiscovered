import React from "react";
import "./Section7.css";
import img7 from "../../../../assets/infopage_images/Coach_sec7.png";
import { useNavigate } from "react-router-dom";

const Section7 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div" style={{ background: "#F9FAFB" }}>
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img7} alt="" />
            </div>
          </div>
          <div className="text_of_sec2">
            <h2>Exclusive Player News</h2>
            <p>
              Stay updated with the latest articles about players in your
              recruiting pool. Our platform curates relevant content, ensuring
              you’re always informed about the athletes you’re considering.
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

export default Section7;
