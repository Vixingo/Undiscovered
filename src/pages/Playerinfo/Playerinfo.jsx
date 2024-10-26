import React, { useEffect, useState } from "react";
import "./Playerinfo.css";
import { useNavigate } from "react-router-dom";
import Playerpage from "../PlayerPage/PlayerPage";
import Coachpage from "../Coachpage/Coachpage";
import { Typography } from "@mui/material";

const Playerinfo = () => {
    const navigate = useNavigate();
    const [switchsection, setswithchsetion] = useState(0);
    return (
        <div className="main_player_info_div">
            <div className="main_heding_div_of_PI">
                <p>
                    10% off your purchase with code "GetDiscovered" Limited time
                    available!
                </p>
                <div className="Switch_btn_div_main">
                    <div className="Switch_btn_div_sub">
                        <div
                            className="player_btn"
                            style={{
                                borderBottom:
                                    switchsection === 0
                                        ? "1px solid #fff"
                                        : null,
                            }}
                        >
                            <button onClick={() => setswithchsetion(0)}>
                                Player
                            </button>
                        </div>

                        <div
                            className="player_btn"
                            style={{
                                borderBottom:
                                    switchsection === 1
                                        ? "2px solid #fff"
                                        : null,
                            }}
                        >
                            <button onClick={() => setswithchsetion(1)}>
                                Coach
                            </button>
                        </div>
                    </div>
                    <div className="signup_btn_div">
                        <button onClick={() => navigate("/sign-up")}>
                            Sign Up Today
                        </button>
                    </div>
                </div>
                <div className="testing_div">
                    {switchsection === 0 ? <Playerpage /> : <Coachpage />}
                </div>
            </div>
        </div>
    );
};

export default Playerinfo;
