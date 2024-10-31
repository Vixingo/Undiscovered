import React from "react";
import "./Section5.css";
import img5 from "../../../../assets/infopage_images/Coach_sec5.png";
import { useNavigate } from "react-router-dom";

const Section5 = () => {
  const navigate = useNavigate();
  return (
    <div className="main_section_div" style={{ background: "#F9FAFB" }}>
      <div className="submain_div_of_sections">
        <div className="sec2_seconddiv">
          <div className="img_of_sec2">
            <div className="relative">
              <img src="./img/Group 2147226669 (1) 1.png" alt="" className=" max-w-[354px]" />
              <img src="./img/3aa 1.png" alt="" className="absolute -top-16 -left-40" />
              <img src="./img/3aaa 1.png" alt="" className=" absolute -bottom-16 -right-48" />
            </div>
          </div>
          <div className="text_of_sec2">
            <h2>Detailed Scouting Reports</h2>
            <p>
              Access in-depth player evaluations crafted by former college
              coaches. These reports provide you with a comprehensive
              understanding of each player's strengths, weaknesses, and
              potential, helping you make informed recruiting decisions.
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
