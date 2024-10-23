import React from "react";
import "./Section7.css";
import img7 from "../../../../assets/infopage_images/Player_Sec7.png";
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
            <h2>Seize the Moment – Join Now!</h2>
            <p>
              Since our launch in Spring 2024, athletes using Undiscovered Hoops
              have been receiving scholarship offers at a rate 20 times higher
              than the national average. Don’t miss out on the chance to elevate
              your basketball career. Get started today and take control of your
              future.
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
