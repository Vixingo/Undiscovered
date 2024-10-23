import React from "react";
import "./Footer.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FB from "../../assets/images/svgs/Fwhite.svg";
import insta from "../../assets/images/svgs/Iwhite.svg";
import x from "../../assets/images/svgs/Xwhite.svg";

const Footer2 = () => {
  return (
    <div className="Footer_main_divv">
      <div className="Footer_sec_divv">
        <div className="Main_span_footer_divv">
          <span className="Links_main_spnn">Links</span>
          <div>
            <ul className="navlinks_two">
              <div className="LInks_section_divv">
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    Terms & Condition{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    Privacy Policy
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="Main_span_footer_divv">
          <span className="Links_main_spnn">Contact Us</span>
          <div>
            <ul className="navlinks_two">
              <div className="LInks_section_divv">
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    +1 (717) 352-9097
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => toggle("")}
                    className={({ isActive }) => (isActive ? "active" : "")}>
                    info@yippi.com
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="Main_span_footer_divv">
          <span className="Links_main_spnn">Social Media</span>
          <div className="All_icons_mainn_sec">
            <button className="All_icons_mainn_btnn">
              <img className="All_icon_imgg" src={FB} alt="" />
            </button>
            <button className="All_icons_mainn_btnn">
              <img className="All_icon_imgg" src={insta} alt="" />
            </button>
            <button className="All_icons_mainn_btnn">
              <img className="All_icon_imgg" src={x} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="UnderLine_main_link"></div>
      <div className="Copyright_mainn mt-3">© 2024 . All Right Reserved</div>
    </div>
  );
};

export default Footer2;
