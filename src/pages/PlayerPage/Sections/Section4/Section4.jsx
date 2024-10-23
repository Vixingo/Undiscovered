import React from "react";
import "./Section4.css";
import img4 from "../../../../assets/infopage_images/Player_Sec4.png";
import { useNavigate } from "react-router-dom";

const Section4 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div">
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="text_of_sec2">
            <h2>The Ultimate Recruiting Resource for Coaches</h2>
            <p>
              Our platform offers coaches and recruiters direct access to
              athletes’ contact information and official transcripts,
              streamlining the recruitment process. This efficient access means
              faster connections and better opportunities for you to make an
              impact.
            </p>
            <button className="sec2_btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
