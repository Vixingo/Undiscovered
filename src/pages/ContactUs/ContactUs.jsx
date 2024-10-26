import "./ContactUs.css";
import banner from "../../assets/images/contact-banner.png";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import FB from "../../assets/images/svgs/facebook.svg";
import insta from "../../assets/images/svgs/insta.svg";
import x from "../../assets/images/svgs/x.svg";
import linkdin from "../../assets/images/svgs/linkdin.svg";
import { Box, Typography } from "@mui/material";
// import email from "../../assets/images/emailpng.png";
// import call from "../../assets/images/call.png";
// import location from "../../assets/images/location.png";
const ContactUs = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        mobilenumber: "",
        message: "",
    });

    // const contactNow = async (e) => {
    //   e.preventDefault();
    //   try {
    //     let respose = await axios.post(`${BASE_URL}/contactUs`, state);
    //     setState({
    //       name: "",
    //       email: "",
    //       mobilenumber: "",
    //       message: "",
    //     });

    //     console.log("🚀 ~ contactNow ~ respose:", respose);
    //   } catch (error) {
    //     console.log("🚀 ~ contactNow ~ error:", error);
    //   }
    // };

    const initialValues = {
        name: "",
        email: "",
        mobilenumber: "",
        message: "",
    };

    const PhoneInputField = ({ name }) => {
        const { setFieldValue, setFieldTouched, values, errors, touched } =
            useFormikContext();

        return (
            <div>
                <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    value={values[name]}
                    onChange={(value) => setFieldValue(name, value)}
                    onBlur={() => setFieldTouched(name, true)} // Ensure validation on blur
                    placeholder="Phone number"
                />
                {errors[name] && touched[name] ? (
                    <div className="error">{errors[name]}</div>
                ) : null}
            </div>
        );
    };

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("please enter your name"),
        email: Yup.string()
            .email("please enter your valid email address")
            .required("please enter your email address"),
        mobilenumber: Yup.string()
            .min(10, "Please enter valid mobile number")
            .required("Please enter your mobile number"),
        message: Yup.string().required("please enter your message"),
    });

    // Function to handle form submission
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${BASE_URL}/contactUs`, values);
            resetForm();
            console.log("🚀 ~ onSubmit ~ response:", response);
            toastr.success("Message sent successfully!");
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error);
            toastr.error("Failed to send message");
        }
        setSubmitting(false);
    };

    return (
        <div className="px-6 lg:px-0">
            {/* top area */}
            <div className="space-y-1 text-[#FFF] text-center bg-primaryColor py-7 rounded-tr-[16px] rounded-tl-[16px] mt-[30px]  ">
                <p className="text-[25px] leading-6 font-normal ">Contact Us</p>
                <h1 className="text-[35px] font-bold leading-9 my-4 text-white">
                    {" "}
                    Get in Touch{" "}
                </h1>
            </div>
            <div className="bg-white rounded-br-2xl rounded-bl-2xl ">
                <div className="flex flex-col text-center lg:text-start lg:flex-row justify-evenly gap-3 items-center lg:items-start mx-auto py-14 px-2 ">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                        }}
                    >
                        <img src={"/img/emailpng.png"} />
                        <Typography
                            sx={{
                                color: "#333",
                                paddingTop: "30px",
                                fontSize: "20px",
                                fontWeight: "400",
                            }}
                        >
                            Email us{" "}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                color: "#333",
                                fontSize: "25px",
                                fontWeight: "500",
                                lineHeight: "24px",
                                py: "10px",
                            }}
                        >
                            contact@undiscoverrecruits.com{" "}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/img/call.png"} />
                        <Typography
                            sx={{
                                color: "#333",
                                paddingTop: "30px",
                                fontSize: "20px",
                                fontWeight: "400",
                            }}
                        >
                            Call Us
                        </Typography>

                        <Typography
                            sx={{
                                color: "#333",
                                fontSize: "25px",
                                fontWeight: "500",
                                py: "10px",
                                lineHeight: "24px",
                            }}
                        >
                            +1 (803) 773-8903
                        </Typography>
                        <Typography
                            sx={{
                                color: "#333",

                                fontSize: "20px",
                                fontWeight: "400",
                            }}
                        >
                            Mon–Sut 8am - 8pm{" "}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={"/img/location.png"} />
                        <Typography
                            sx={{
                                color: "#333",
                                paddingTop: "30px",
                                fontSize: "20px",
                                fontWeight: "400",
                            }}
                        >
                            Location
                        </Typography>

                        <Typography
                            sx={{
                                color: "#333",
                                fontSize: "25px",
                                fontWeight: "500",
                                lineHeight: "24px",
                                py: "10px",
                            }}
                        >
                            Rochester, NY, USA
                        </Typography>
                    </Box>
                </div>
            </div>
            {/* address area */}

            {/* contact form area */}
            <div className=" mt-[30px] lg:mt-[30px] flex items-start md:items-stretch gap-8 flex-col md:flex-row">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Box
                            sx={{
                                backgroundColor: {
                                    xs: "transparent",
                                    md: "#fff",
                                },
                                padding: { xs: "0", md: "34px 35px" },
                            }}
                            className="from_main_div flex items-start lg:items-center gap-[30px] flex-col lg:flex-row  rounded-xl"
                        >
                            <div className="contact--form  flex-1 flex flex-col gap-6 lg:gap-[40px] w-full lg:w-auto">
                                <div className="single--input">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Write Name"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="error"
                                    />
                                </div>

                                <div className="single--input">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Write Email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="error"
                                    />
                                </div>

                                {/* <div className="single--input">
                                    <label htmlFor="mobilenumber">
                                        Mobile number
                                    </label>
                                    <PhoneInputField name="mobilenumber" />
                                </div> */}

                                <div className="single--input">
                                    <label htmlFor="message">Message</label>
                                    <Field
                                        as="textarea"
                                        name="message"
                                        placeholder="Write message"
                                    />
                                    <ErrorMessage
                                        name="message"
                                        component="div"
                                        className="error"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="py-2.5 px-[55px] bg-primaryColor text-[20px] leading-6 font-medium w-full lg:w-fit mr-auto rounded-[12px] text-[#fff]"
                                >
                                    Submit
                                </button>
                            </div>
                        </Box>
                    )}
                </Formik>
                {/* banner area */}
                <Box className={"form_iamge_div"}>
                    <img src="/img/banner.png" alt="" width={"100%"} />
                </Box>
            </div>
            <Toaster />
        </div>
    );
};

export default ContactUs;
