import React from "react";
import "./Section3.css";
import img3 from "../../../../assets/infopage_images/Coach_sec3.png";
import { useNavigate } from "react-router-dom";

const Section3 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div" style={{ background: "#F9FAFB" }}>
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="img_of_sec2">
            <div className="image_box_sec2">
              <img src={img3} alt="" className=" max-w-[354px]" />
            </div>
          </div>
          <div className="text_of_sec2">
            <h2>Advanced Search Filters</h2>
            <p>
              Refine your search with advanced filters that allow you to narrow
              down prospects by location, graduation class, position, and more.
              Save time and focus on the players who align perfectly with your
              program’s goals.
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

export default Section3;
