import React from "react";
import "./sec2.css";
import img2 from "../../../../assets/infopage_images/Coach_sec2.png";
import { useNavigate } from "react-router-dom";

const Section2 = () => {
  const navigate = useNavigate();
  return (
    <div className="sec2_main_div bg-white mx-auto max-w-[95%] rounded-2xl mb-5 pb-5">
      <div className="sec2_sub_main_div">
        <div className="sec2_firstdiv">
          <h2>Streamline Your Recruiting and Connect with Top Talent</h2>
          <p>
            As a coach, your time is valuable, and finding the right players is
            critical to your program's success. The Coaches+ Membership from
            Undiscovered Hoops is designed to give you all the tools you need to
            discover, evaluate, and connect with top basketball talent across
            the country.
          </p>
        </div>
        <div className="sec2_seconddiv">
          <div className="text_of_sec2 ">
            <h2>Comprehensive Player Search</h2>
            <p>
              Gain access to our extensive player database, where you can search
              for athletes who meet your specific needs. Whether you’re looking
              for the next big scorer or a defensive specialist, our platform
              makes it easy to find the right fit.
            </p>
            <button className="sec2_btn " onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
          <div className="img_of_sec2 flex justify-center">
            <div className="image_box_sec2">
              <img src="./img/Group21312.png" alt="" className=" max-w-[354px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
