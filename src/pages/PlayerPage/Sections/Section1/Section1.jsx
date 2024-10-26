import React from "react";
import "./Sec1.css";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
    const navigate = useNavigate();
    return (
        <div className="mian_sec1_player">
            <div className="sub_main_div_of_sec1_player">
                <h1>
                    Advance Your Basketball Future with <br />{" "}
                    <span>Undiscovered</span> Hoops
                </h1>
                <p>
                    Join Undiscovered Recruits today to showcase your skills,
                    connect with <br />
                    coaches, and unlock limitless opportunities.
                </p>
                <button
                    className="btn_sec1"
                    onClick={() => navigate("/sign-up")}
                >
                    Sign Up Today
                </button>
            </div>
        </div>
    );
};

export default Section1;
