import FeaturedBox from "../../components/Home/FeaturedBox/FeaturedBox";
import LaunchEvent from "../../components/Home/LaunchEvent/LaunchEvent";
import player from "../../assets/images/player-cover.png";
import coach from "../../assets/images/coach-cover.png";
import VideoArea from "../../components/Home/VideoArea/VideoArea";
import PlayersArea from "../../components/Home/PlayersArea/PlayersArea";
import AllNewsArea from "../../components/Home/AllNewsArea/AllNewsArea";
import ClassPlayerArea from "../../components/Home/ClassPlayerArea/ClassPlayerArea";
import ReviewArea from "../../components/Home/ReviewArea/ReviewArea";
import Testimonials from "../../components/Home/Testimonials/Testimonial";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import React, { useState } from "react";
import { BASE_URL } from "../../baseurl/baseurl";
import Hero from "../../components/Home/hero";
import Brands from "./brands";
import PlayersList from "../PlayersList/PlayersList";
import Details from "./details";
import PopoUp from "../PopUp/PopUp";
const Home = () => {
    const [state, setState] = useState([]);
    console.log("🚀 ~ Home ~ state:", state);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    React.useEffect(() => {
        getHomeData();
    }, []);
    const getHomeData = async () => {
        setLoading(true);
        let response = await axios.get(`${BASE_URL}/getHomeData`);
        // console.log(response.data);
        setState({
            playersData: response?.data?.playersData,
            videosData: response?.data?.featuredVideosData,
            classPlayers: response?.data?.classPlayers,
            testimonial: response?.data?.testimonial,
        });
        setLoading(false);
    };
    // console.log(loading);
    const subscribeMail = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`${BASE_URL}/subscribeMail`, {
                email,
            });

            toastr.success("Subscribed successfully");
            setEmail("");
        } catch (error) {
            if (error?.response && error?.response?.data) {
                toastr.error(error?.response?.data?.error);
                setEmail("");
            } else {
                toastr.error("Server error please try again");
            }
        }
    };

    return (
        <div>
            <PopoUp />
            <Hero />
            <Brands />
            <div className="max-w-[1440px] mx-auto px-3 lg:px-[20px]">
                {/* <LaunchEvent /> */}

                {/* get notification */}
                {/* <form className="flex items-center mt-[40px] gap-4 flex-col lg:flex-row ">
        <div className=" w-full lg:w-[315px]">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full py-4 pl-6 rounded-[30px] bg-[#F8FAFC] focus:outline-none text-base placeholder:text-[#818181] text-[#000] "
            type="email"
            placeholder="Subscribe to get Notification"
            required
          />
        </div>
        <button
          onClick={subscribeMail}
          className=" px-6 py-3 lg:py-4 bg-primaryColor rounded-[30px] text-base font-medium text-[#fff] "
        >
          Subscribe
        </button>
      </form> */}

                {/* featured area */}

                <PlayersList isHome />
            </div>
            <Details />
            <div className="max-w-[1440px] mx-auto ">
                {/* how it works area */}
                <HowItWorks />

                {/* videos area */}
                <VideoArea
                    setState={setState}
                    videos={state?.videosData}
                    loading={loading}
                />
                {/* Players area */}
                <PlayersArea
                    setState={setState}
                    state={state}
                    players={state?.playersData}
                    loading={loading}
                />

                {/* All news area */}
                <AllNewsArea />

                {/* class of players area */}
                <ClassPlayerArea
                    allPlayers={state?.playersData}
                    classPlayers={state?.classPlayers}
                    loading={loading}
                />

                {/* review area */}
                {/* <ReviewArea reviews={state?.testimonial} loading={loading} /> */}
                <Testimonials reviews={state?.testimonial} loading={loading} />
            </div>
        </div>
    );
};

export default Home;
