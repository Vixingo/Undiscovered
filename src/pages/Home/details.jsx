import React from "react";
import "./details.css";
import Slider from "react-slick";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import img1 from "../../assets/images/Frame_1686556513.png";
// import img2 from "../../assets/images/Frame_1686556514.png";
import img2 from "../../assets/images/Frame_1686556514.jpg";
// import img3 from "/images/coach.jpg";
// import img4 from "../../assets/images/player.jpg";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute top-[-10%] right-[1%]  bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
            onClick={onClick}
            style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.10)" }}
        >
            <IoIosArrowRoundForward size={24} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute top-[-10%] right-[5%] left-auto bg-[#F8FAFC] text-black hover:text-black rounded-full h-[30px] w-[30px] flex items-center justify-center`}
            style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.10)" }}
            onClick={onClick}
        >
            <IoIosArrowRoundBack size={24} />
        </div>
    );
}
export default function details() {
    const naviagte = useNavigate();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="">
            <div className=" bg-white pt-12">
                {/* <div className="w-[100%] md:w-[50%] flex justify-center items-center">
                    <img
                        src={img1}
                        width="80%"
                        height="80%"
                        style={{
                            objectFit: "contain",
                        }}
                    />
                </div> */}
                <div>
                    <h1 className="text-[24px] text-[#000] md:text-[30px] font-normal max-w-[475px] mx-auto text-center">
                        World of basketball recruitment Undiscovered Recruit
                        help you!
                    </h1>
                    <p
                        className="py-6 px-2 text-[16px] md:text-[20px] text-[#0E0E0E] max-w-[910px] text-center mx-auto mr-0 md:mr-10 leading-[30px] font-normal"
                        style={{ letterSpacing: 0 }}
                    >
                        In the competitive world of basketball recruitment,
                        Undiscovered Recruits simplifies the process. Coaches
                        can discover new talent, while players connect with
                        coaches, showcase their skills, and discover their
                        future with our innovative video upload and direct
                        messaging features.
                    </p>
                </div>
                <div className="imageBox flex flex-col-reverse   text-center md:text-start	md:flex-row	justify-between max-w-[930px] mx-auto pb-12 px-4 ">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={"/img/activepng.png"}
                            className="iconimages"
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                color: "#0E0E0E",
                                marginBottom: "14px",
                                marginTop: "25px",
                            }}
                        >
                            500+
                        </Typography>
                        <Typography sx={{ color: "#0E0E0E" }}>
                            Coaches Active
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/img/player.png"} className="iconimages" />
                        <Typography
                            variant="h2"
                            sx={{
                                color: "#0E0E0E",
                                marginBottom: "14px",
                                marginTop: "25px",
                            }}
                        >
                            10,000+
                        </Typography>
                        <Typography sx={{ color: "#0E0E0E" }}>
                            Players Signed Up{" "}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/img/group.png"} className="iconimages" />
                        <Typography
                            variant="h2"
                            sx={{
                                color: "#0E0E0E",
                                marginBottom: "14px",
                                marginTop: "25px",
                            }}
                        >
                            25,000+
                        </Typography>
                        <Typography sx={{ color: "#0E0E0E" }}>
                            Player-Coach Connections Made{" "}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/img/videos.png"} className="iconimages" />
                        <Typography
                            variant="h2"
                            sx={{
                                color: "#0E0E0E",
                                marginBottom: "14px",
                                marginTop: "25px",
                            }}
                        >
                            1000+
                        </Typography>
                        <Typography sx={{ color: "#0E0E0E" }}>
                            Videos Uploaded{" "}
                        </Typography>
                    </Box>
                </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-10 px-3 bg-white rounded-[15px] py-12 ">
                {/* <h1 className="text-[25px] text-[#000] md:text-[30px]  font-[400] text-center mb-[40px] ">
                    CONNECT WITH COLLEGE COACHES ANYTIME, ANYWHERE
                </h1> */}

                <div
                    className="flex flex-col	md:flex-row	 gap-[12px]"
                    style={{ alignItems: "center" }}
                >
                    <div className="w-[100%] md:w-[50%] flex justify-center items-center mb-4">
                        <img
                            src={img2}
                            style={{
                                width: "100%",
                                aspectRatio: "3/2",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div className="w-[100%] md:w-[50%] slider-phone">
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: "700",
                                    color: "#0E0E0E",
                                    mb: "20px",
                                }}
                            >
                                MOBILE APP LAUNCHING SOON!
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "30px",
                                    width: "200px",
                                    py: "7px",
                                    mb: "55px",
                                }}
                            >
                                Sign Up for Updates
                            </Button>
                        </Box>
                        <Slider {...settings}>
                            <div>
                                <h1 className="text-[24px] text-[#000] md:text-[30px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                                    Get Notified with Your Athlete Profile
                                </h1>
                                <p
                                    className="pt-2 text-base text-[#0E0E0E] mr-0 md:mr-10 font-normal max-w-[620px]"
                                    style={{
                                        lineHeight: "30px",
                                        letterSpacing: 0,
                                    }}
                                >
                                    Stay in the loop with real-time
                                    notifications about your athlete profile.
                                    Receive updates on views, likes, and
                                    messages from interested coaches. Ensure you
                                    never miss an opportunity to connect with
                                    top recruiters and showcase your talent to
                                    the right audience. Keep your profile active
                                    and stand out in the competitive world of
                                    basketball recruitment!
                                </p>
                            </div>
                            <div>
                                <h1 className="text-[24px] text-[#000] md:text-[32px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                                    Get Notified with Your Athlete Profile
                                </h1>
                                <p
                                    className="pt-5 text-base text-[#000] mr-0 md:mr-10 "
                                    style={{
                                        lineHeight: "26px",
                                        letterSpacing: 0,
                                    }}
                                >
                                    Stay in the loop with real-time
                                    notifications about your athlete profile.
                                    Receive updates on views, likes, and
                                    messages from interested coaches. Ensure you
                                    never miss an opportunity to connect with
                                    top recruiters and showcase your talent to
                                    the right audience. Keep your profile active
                                    and stand out in the competitive world of
                                    basketball recruitment!
                                </p>
                            </div>
                            <div>
                                <h1 className="text-[24px] text-[#000] md:text-[32px] font-[500] md:font-[700] mt-5 md:mt-0 mr-0 md:mr-10">
                                    Get Notified with Your Athlete Profile
                                </h1>
                                <p
                                    className="pt-5 text-base text-[#000] mr-0 md:mr-10 "
                                    style={{
                                        lineHeight: "26px",
                                        letterSpacing: 0,
                                    }}
                                >
                                    Stay in the loop with real-time
                                    notifications about your athlete profile.
                                    Receive updates on views, likes, and
                                    messages from interested coaches. Ensure you
                                    never miss an opportunity to connect with
                                    top recruiters and showcase your talent to
                                    the right audience. Keep your profile active
                                    and stand out in the competitive world of
                                    basketball recruitment!
                                </p>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-10 px-3 bg-white rounded-[15px] py-12 ">
                <h1 className="text-[25px] font-normal text-[#000] md:text-[30px] max-w-[650px] mx-auto text-center  ">
                    Discover the future of basketball recruitment with
                    Undiscovered Recruits!
                </h1>
                <p
                    className="text-[20px] text-[#0E0E0E] max-w-[1040px] pt-5 pb-[60px] mx-auto leading-[30px] text-center "
                    style={{ letterSpacing: 0 }}
                >
                    Our cutting-edge app connects coaches and aspiring players
                    nationwide, making the recruitment process seamless and
                    exciting. Our advanced search filters for players and
                    coaches streamline the recruitment process, helping athletes
                    play at the next level and coaches find the perfect match
                    for their teams.
                </p>

                <div
                    className="flex flex-col	md:flex-row	 gap-[32px]  main_details_section"
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        className="w-[100%] md:w-[50%] max-w-[500px] text-center home_page_player_section rounded-xl shadow-xl h-[100%]"
                        style={{
                            backgroundImage: `url(/img/coach.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="image_div_of_home_page_details"></div>
                        <div className="text_div_of_home_page_details">
                            <h2 className="pt-4 mb-4m text-[25px] font-bold text-[#fff]">
                                For Coaches
                            </h2>
                            <p
                                className="text-[13px] text-[#fff] ptag_home max-w-[425px]"
                                style={{ lineHeight: "18px", letterSpacing: 0 }}
                            >
                                Discover the future of basketball recruitment
                                with Undiscovered Recruits! Our cutting-edge app
                                connects coaches and aspiring players
                                nationwide, making the recruitment process
                                seamless and exciting. Our advanced search
                                filters for players and coaches streamline the
                                recruitment process, helping athletes play at
                                the next level and coaches find the perfect
                                match for their teams.
                            </p>
                            <button
                                onClick={() => naviagte("/Playerinfo")}
                                className="flex mx-auto mt-3 items-center gap-2 text-sm leading-6 bg-primaryColor py-2 px-6 text-[#fff] border border-primaryColor rounded-[30px] w-fit"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>
                    <div
                        className="w-[100%] md:w-[50%] max-w-[500px] text-center home_page_player_section rounded-xl shadow-xl h-[100%]"
                        style={{
                            backgroundImage: `url(/img/player.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            // backgroundPosition: "100% 100%",
                        }}
                    >
                        <div className="image_div_of_home_page_details"></div>
                        <div className="text_div_of_home_page_details">
                            <h2 className="pt-4 mb-4 text-[25px] font-bold text-[#fff]">
                                For Players
                            </h2>
                            <p
                                className="text-[13px] text-[#fff] ptag_home max-w-[425px]"
                                style={{ lineHeight: "18px", letterSpacing: 0 }}
                            >
                                Our cutting-edge app connects coaches and
                                aspiring players nationwide, making the
                                recruitment process seamless and exciting. Our
                                advanced search filters, evaluation tools, and
                                video capabilities empower athletes to showcase
                                their skills, gaining maximum exposure and
                                connecting directly with thousands of coaches.
                            </p>
                            <button
                                onClick={() => naviagte("/Playerinfo")}
                                className="flex mx-auto mt-3 items-center gap-2 text-sm leading-6 bg-primaryColor py-2 px-6 text-[#fff] border border-primaryColor rounded-[30px] w-fit"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
