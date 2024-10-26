import React from "react";
import banner from "../../assets/images/about-banner.png";
import PropTypes from "prop-types";
import { BASE_URL } from "../../baseurl/baseurl";
import axios from "axios";
import { Box, Typography } from "@mui/material";
const SingleAbout = ({ title, desc, children }) => {
    return (
        <div className="text-center flex flex-col items-center">
            {/* icon */}
            <div className="bg-[#F0F4F9] p-4 rounded-[50%]">
                <div className=" w-8 h-8 lg:w-11 lg:h-11">{children}</div>
            </div>

            <h3 className="text-[#0E0E0E] text-[20px] font-normal leading-normal pt-6 pb-3 ">
                {" "}
                {title}{" "}
            </h3>

            <p className="text-[#0E0E0E] text-base leading-[26px] font-normal ">
                {" "}
                {desc}{" "}
            </p>
        </div>
    );
};

const About = () => {
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        heading: "",
        subHeading1: "",
        description1: "",
        subHeading2: "",
        description2: "",
        subHeading3: "",
        description3: "",
    });
    const getFormData = async () => {
        const response = await axios.get(`${BASE_URL}/about-us`);
        setLoading(false);
        setFormData(
            response.data.data || {
                heading: "",
                subHeading1: "",
                description1: "",
                subHeading2: "",
                description2: "",
                subHeading3: "",
                description3: "",
            }
        );
    };
    React.useEffect(() => {
        getFormData();
    }, []);

    return (
        <div>
            {/* top part */}
            <Box
                sx={{ marginX: { xs: 3, md: "auto" } }}
                className="text-center text-[#0E0E0E] space-y-1 pt-6 lg:pt-12 pb-3 max-w-[1210px] "
            >
                <div className="space-y-1 text-[#FFF] text-center bg-primaryColor pt-[33px] pb-[37px] rounded-tr-[16px] rounded-tl-[16px]   ">
                    <p className="text-[25px] leading-6 font-normal ">
                        Undiscovered Recruit
                    </p>
                    <h1 className="text-[35px] font-bold leading-9 mt-3 text-white">
                        {" "}
                        About Us
                    </h1>
                </div>
                <div className="bg-white rounded-br-2xl rounded-bl-2xl m-0">
                    <Typography
                        sx={{
                            fontSize: "18px",
                            padding: "35px",
                            lineHeight: "35px",
                            mb: "5px",
                        }}
                    >
                        Welcome to Undiscovered Recruits, the innovative
                        basketball recruitment and communication platform that
                        seamlessly connects coaches and players. Our team
                        comprises former college players and current and former
                        college coaches who bring a wealth of experience and
                        passion for the game. Our mission is to simplify the
                        recruitment process, empowering players to be discovered
                        by coaches while assisting coaches in finding new
                        talent. We are dedicated to making it easier for players
                        to get noticed by coaches and for coaches to find new
                        undiscovered talent."
                    </Typography>
                </div>

                <div className="py-[30px]">
                    <img src="/img/about.png" alt="" width={"100%"} />
                </div>
            </Box>
            <Box
                sx={{
                    color: "#fff",
                    backgroundColor: "#ED2023",
                    textAlign: "center",
                }}
            >
                <Typography className="pt-8 pb-4 font-medium" variant="h1">
                    Who We Are
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        lineHeight: "35px",
                        maxWidth: "1126px",
                        marginX: "auto",
                        pb: "33px",
                    }}
                >
                    We are a dedicated team of college basketball players and
                    coaches with firsthand experience in the challenges and
                    opportunities within the basketball industry. Our team
                    understands the complexities of the recruitment process and
                    is driven to create a solution that benefits everyone
                    involved. Our deep understanding and passion drive us to
                    create a platform that makes it easier for players to get
                    recruited and for coaches to find the right talent.
                </Typography>
            </Box>

            {/* what we offer  */}
            <Box
                sx={{ marginX: { xs: 3, md: "auto" } }}
                className=" py-[30px] max-w-[1210px] "
            >
                {/* top part */}
                {/* {loading ? (
                    <>
                        <div class="text-center">
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center space-y-3 ">
                        <h3 className="text-[#0E0E0E] text-[22px] font-bold leading-8  ">
                            {formData.subHeading3}
                        </h3>

                        <p className="text-base font-normal leading-8 text-[#000]">
                            {formData.description3}
                        </p>
                    </div>
                )} */}

                {/* grid area */}
                <Box
                    sx={{
                        background: "#fff",
                        px: "100px",
                        py: "60px",
                        borderRadius: "15px",
                    }}
                >
                    <Box sx={{ textAlign: "center" }}>
                        {" "}
                        <Typography
                            variant="h3"
                            sx={{ color: "#0E0E0E", pb: "20px" }}
                        >
                            What We Offer
                        </Typography>
                        <Typography
                            sx={{ fontSize: "16px", lineHeight: "30px" }}
                        >
                            Our platform is a cutting-edge social media and web
                            application designed specifically for the basketball
                            community. It provides a seamless experience for
                            both players and coaches, ensuring that everyone has
                            access to the tools they need to succeed. Key
                            features include:
                        </Typography>
                    </Box>

                    <div className="pt-7 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6  lg:gap-y-11  ">
                        <SingleAbout
                            title={"Swipe to Connect"}
                            desc={
                                "Easily swipe through video reels to find and connect with coaches or players."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="37"
                                height="34"
                                viewBox="0 0 37 34"
                                fill="none"
                                className="w-full h-full"
                            >
                                <path
                                    d="M27.872 31.9679V7.00195"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M35.3483 24.459L27.8724 31.9695L20.3965 24.459"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.66989 2.02734V26.9933"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M2.19434 9.53692L9.67026 2.02637L17.1462 9.53692"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>
                        <SingleAbout
                            title={"Video Upload"}
                            desc={
                                "Showcase your skills through video uploads that can be filtered by height, position, location, and more."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="38"
                                height="38"
                                viewBox="0 0 38 38"
                                fill="none"
                                className="w-full h-full"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.9997 1.58301C28.6172 1.58301 36.4163 9.38045 36.4163 18.9997C36.4163 28.6189 28.6172 36.4163 18.9997 36.4163C9.38045 36.4163 1.58301 28.6189 1.58301 18.9997C1.58301 9.38045 9.38045 1.58301 18.9997 1.58301Z"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.4997 18.9911C24.4997 17.504 16.8776 12.7467 16.013 13.6021C15.1484 14.4575 15.0652 23.4441 16.013 24.3801C16.9608 25.3194 24.4997 20.4782 24.4997 18.9911Z"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>

                        <SingleAbout
                            title={"Direct Messagning"}
                            desc={
                                "Communicate directly with coaches or players to explore opportunities."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="41"
                                height="40"
                                viewBox="0 0 41 40"
                                fill="none"
                                className="w-full h-full"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M33.4645 32.9617C27.8615 38.5653 19.5649 39.7759 12.7754 36.636C11.7731 36.2325 10.9514 35.9063 10.1702 35.9063C7.99422 35.9192 5.2858 38.0291 3.87815 36.6231C2.47051 35.2153 4.58197 32.5048 4.58197 30.3157C4.58197 29.5344 4.26875 28.7273 3.86525 27.723C0.723849 20.9346 1.93619 12.6353 7.53913 7.03354C14.6916 -0.121549 26.312 -0.121549 33.4645 7.03169C40.6298 14.1978 40.6169 25.8085 33.4645 32.9617Z"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M27.7229 20.7575H27.7394"
                                    stroke="#0E0E0E"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.3723 20.7575H20.3888"
                                    stroke="#0E0E0E"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13.0227 20.7575H13.0392"
                                    stroke="#0E0E0E"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>
                        <SingleAbout
                            title={"Advanced Search Filters"}
                            desc={
                                "Coaches can use detailed filters to find the perfect player."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="38"
                                height="39"
                                viewBox="0 0 38 39"
                                fill="none"
                            >
                                <circle
                                    cx="18.5718"
                                    cy="18.5718"
                                    r="16.479"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M30.0332 30.8887L36.4939 37.3326"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>
                        <SingleAbout
                            title={"Roster Management"}
                            desc={
                                "Efficiently manage team rosters and track player commitments."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M29.6763 23.4627C30.9133 23.4627 31.9515 24.4836 31.7624 25.7052C30.6528 32.8918 24.5005 38.2278 17.0803 38.2278C8.87083 38.2278 2.2168 31.5738 2.2168 23.3662C2.2168 16.6041 7.35399 10.3052 13.1377 8.88094C14.3805 8.5741 15.6542 9.44831 15.6542 10.7278C15.6542 19.3966 15.9456 21.639 17.5917 22.8587C19.2378 24.0783 21.1735 23.4627 29.6763 23.4627Z"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M37.7699 16.2442C37.8683 10.6747 31.0271 1.69719 22.6903 1.85157C22.0418 1.86315 21.5227 2.4035 21.4938 3.05C21.2834 7.62947 21.5671 13.5637 21.7253 16.2539C21.7736 17.0914 22.4317 17.7495 23.2673 17.7977C26.0327 17.956 32.1831 18.1721 36.6969 17.4889C37.3106 17.3963 37.7603 16.8637 37.7699 16.2442Z"
                                    stroke="#0E0E0E"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>

                        <SingleAbout
                            title={"Subscription Options"}
                            desc={
                                "Access enhanced features through our subscription plans."
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="38"
                                height="36"
                                viewBox="0 0 38 36"
                                fill="none"
                                className="w-full h-full"
                            >
                                <path
                                    d="M36.671 22.3924H29.2491C26.524 22.3907 24.3151 20.1836 24.3135 17.4584C24.3135 14.7333 26.524 12.5261 29.2491 12.5244H36.671"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M30.0889 17.3452H29.5175"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.2037 1.5H27.05C32.3633 1.5 36.6707 5.80744 36.6707 11.1207V24.2786C36.6707 29.5919 32.3633 33.8993 27.05 33.8993H11.2037C5.89044 33.8993 1.58301 29.5919 1.58301 24.2786V11.1207C1.58301 5.80744 5.89044 1.5 11.2037 1.5Z"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.89844 9.8198H19.7965"
                                    stroke="#130F26"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </SingleAbout>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default About;

SingleAbout.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    children: PropTypes.node,
};
