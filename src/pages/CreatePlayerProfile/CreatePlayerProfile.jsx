import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import AboutMeForm from "./forms/About";
import AcademicsForm from "./forms/Academics";
import AthleticAccomplishmentsForm from "./forms/Accomplishments";
import CoachInformationForm from "./forms/CoachInformation";
import ContactInformationForm from "./forms/ContackInformation";
import OffersForm from "./forms/Offers";
import PersonalInformationForm from "./forms/PesonalInformation";
import UploadMediaForm from "./forms/UploadMedia";
import "./progressBar.css";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import {
  ProfileCreateContext,
  ProfileProvider,
  useProfileContext,
} from "../../components/context/createProfileContext";
function CreateProfile({ data }) {
  const { state, dispatch, videoFields, setVideoFields } = useProfileContext();
  console.log("🚀 ~ CreateProfile ~ videoFields:", videoFields);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [accomplishments, setAccomplishments] = useState([""]);
  const [currentUser, setCurrentUser] = useState();
  const [currentStep, setCurrentStep] = useState(0);

  const [socialLinks, setsocialLinks] = useState({
    twitter: {
      name: "twitter",
      link: "",
    },
    tiktok: {
      name: "tiktok",
      link: "",
    },
    facebook: {
      name: "facebook",
      link: "",
    },
    instagram: {
      name: "instagram",
      link: "",
    },
  });

  const [mediaFiles, setMediaFiles] = useState([]);

  const navigate = useNavigate();

  const step1Content = <PersonalInformationForm data={data} />;
  const step2Content = (
    <ContactInformationForm data={data} setsocialLinks={setsocialLinks} />
  );
  const step3Content = <AcademicsForm data={data} />;
  const step4Content = <AboutMeForm data={data} />;
  const step5Content = (
    <AthleticAccomplishmentsForm
      accomplishments={accomplishments}
      setAccomplishments={setAccomplishments}
      data={data}
    />
  );
  const step6Content = <CoachInformationForm data={data} />;
  const step7Content = <OffersForm data={data} />;

  const step8Content = (
    <UploadMediaForm mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
  );

  function step1Validator() {
    console.log("state ===>", state);

    return true;
  }

  function step2Validator() {
    // Add validation logic for step 2 if needed
    // const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/;

    // if (data?.phoneNumber?.trim().length === 0) {
    //   toastr.error("Please enter phone number");
    //   return false;
    // } else if (!phoneRegex.test(data?.phoneNumber)) {
    //   toastr.error("Please enter a valid phone number");
    //   return false
    // }
    return true; // Return true for now assuming validation passes
  }

  function step3Validator() {
    // if (data?.academics?.gpa?.length == 0) {
    //   toastr.error("Please enter gpa")
    //   return false
    // } else if (data?.academics?.satScore?.length == 0) {
    //   toastr.error("Please enter satScore")
    //   return false;
    // } else if (data?.academics?.actScore?.length == 0) {
    //   toastr.error("Please enter actscore")
    //   return false
    // } else if (data?.academics?.ncaaId?.length == 0) {
    //   toastr.error("Please enter nnccaId")
    //   return false
    // }

    return true;
  }

  function step4Validator() {
    // if (data?.about?.length == 0) {
    //   toastr.error("Please write about yourself")
    //   return false
    // }

    return true;
  }
  useEffect(() => {}, [state]);

  function step5Validator() {
    // let pass = false;
    // data?.athleticaccomplishments?.map((val, i) => {
    //   if (val?.length == 0) {
    //     toastr.error("Please provide your athletic acomplishment")
    //     pass = false;
    //     return false
    //   } else {
    //     pass = true;
    //   }
    // })
    // if (pass == false) {
    //   return false
    // }

    return true;
  }

  function step6Validator() {
    return true;
  }

  function step7Validator() {
    // const offerDate = new Date(data.offers[0].date);
    // const offerYear = offerDate.getFullYear();
    // const currentYear = new Date().getFullYear();

    // if (data?.offers[0]?.status?.length == 0) {
    //   toastr.error("Please enter status")
    //   return false
    // } else if (data?.offers[0]?.date?.length == 0) {
    //   toastr.error("Please enter date")
    //   return false
    // } else if (data?.offers[0]?.university?.length == 0) {
    //   toastr.error("Please enter university")
    //   return false
    // } else if (data?.offers[0]?.type?.length == 0) {
    //   toastr.error("Please select type")
    //   return false
    // } else if (data?.offers[0]?.logo?.length == 0) {
    //   toastr.error("Please select logo")
    //   return false
    // } else if (offerYear > currentYear) {
    //   toastr.error("Please enter a valid date (not in the future)");
    //   return false;
    // }

    return true;
  }

  function step8Validator() {
    if (mediaFiles?.length == 0) {
      toastr.error("Please select images");
      return false;
    }

    return true;
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("user")]);

  const onFormSubmit = async (e) => {
    if (state?.personalInformation?.name?.length == 0) {
      toastr.error("Please enter name");
      return false;
    } else if (state?.personalInformation?.universityName?.length == 0) {
      toastr.error("Please enter school");
      return false;
    } else if (state?.personalInformation?.jerseyNumber?.length == 0) {
      toastr.error("Please enter jersey number");
      return false;
    } else if (state?.personalInformation?.height?.length == 0) {
      toastr.error("Please enter height");
      return false;
    } else if (state?.personalInformation?.weight?.length == 0) {
      toastr.error("Please enter weight");
      return false;
    } else if (state?.personalInformation?.playerClass?.length == 0) {
      toastr.error("Please enter class");
      return false;
    } else if (state?.personalInformation?.location?.length == 0) {
      toastr.error("Please enter location");
      return false;
    } else if (state?.personalInformation?.position?.length == 0) {
      toastr.error("Please enter position");
      return false;
    } else if (state?.personalInformation?.picture?.length == 0) {
      toastr.error("Please select profile picture");
      return false;
    }
    const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/;

    if (state?.contactDetail?.phoneNumber?.trim().length === 0) {
      toastr.error("Please enter phone number");
      return false;
    } else if (!phoneRegex.test(state?.contactDetail?.phoneNumber)) {
      toastr.error("Please enter a valid phone number");
      return false;
    }

    if (state?.academics?.gpa?.length == 0) {
      toastr.error("Please enter gpa");
      return false;
    } else if (state?.academics?.satScore?.length == 0) {
      toastr.error("Please enter satScore");
      return false;
    } else if (state?.academics?.actScore?.length == 0) {
      toastr.error("Please enter actscore");
      return false;
    }

    if (state?.about?.length == 0) {
      toastr.error("Please write about yourself");
      return false;
    }
    let pass = false;
    state?.accomplishments?.map((val, i) => {
      if (val?.length == 0) {
        toastr.error("Please provide your athletic acomplishment");
        pass = false;
        return false;
      } else {
        pass = true;
      }
    });
    if (pass == false) {
      return false;
    }

    const offerDate = new Date(state.offers.date);
    const offerYear = offerDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const isValidEmail = (email) => {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (state?.coachinformation?.email) {
      if (isValidEmail(state.coachinformation.email)) {
      } else {
        toastr.error("Invalid email format");
        return false;
      }
    }

    const isValidBirthPlace = (birthPlace) => {
      // Regular expression for city, state format validation
      const birthPlaceRegex = /^[a-zA-Z\s]+,\s*[a-zA-Z]{2}$/;
      return birthPlaceRegex.test(birthPlace);
    };

    if (state?.offers?.status?.length == 0) {
      toastr.error("Please enter status");
      return false;
    } else if (state?.offers?.date?.length == 0) {
      toastr.error("Please enter date");
      return false;
    } else if (state?.offers?.university?.length == 0) {
      toastr.error("Please enter university");
      return false;
    } else if (state?.offers?.logo?.length == 0) {
      toastr.error("Please select logo");
      return false;
    } else if (offerYear > currentYear) {
      toastr.error("Please enter a valid date (not in the future)");
      return false;
    }

    let accomp = JSON.parse(localStorage.getItem("accomplishments"));
    let coach = JSON.parse(localStorage.getItem("coaches"));
    let data = {
      ...state,
      socialLinks: [
        { social_type: "facebook", link: socialLinks.facebook.link },
        { social_type: "instagram", link: socialLinks.instagram.link },
        { social_type: "tiktok", link: socialLinks.tiktok.link },
        { social_type: "twitter", link: socialLinks.twitter.link },
      ],
      athleticaccomplishments: accomp,
      coach: coach,
    };
    let formdata = new FormData();
    let contactdetails = [];
    let contactDetail = state?.contactDetail;
    for (let key in contactDetail) {
      if (contactDetail[key].length > 0) {
        contactdetails.push({
          social_type: key,
          link: contactDetail[key],
        });
      }
    }

    formdata.append("id", currentUser._id);
    formdata.append("about", state.aboutme);
    formdata.append("academics", JSON.stringify(state.academics));
    formdata.append("athleticaccomplishments", state.accomplishments);
    formdata.append("birthPlace", state?.personalInformation?.birthPlace);
    formdata.append("coach", JSON.stringify(state.coachinformation));
    formdata.append("height", state.personalInformation.height);
    formdata.append("jerseyNumber", state.personalInformation.jerseyNumber);
    formdata.append("location", state.personalInformation.location);
    formdata.append("picture", state.personalInformation.picture);
    formdata.append("name", state.personalInformation.name);
    formdata.append("offers", JSON.stringify(state.offers));
    formdata.append("phoneNumber", state.contactDetail.phoneNumber);
    formdata.append("playerClass", state.personalInformation.playerClass);
    formdata.append("position", state.personalInformation.position);
    formdata.append("socialLinks", JSON.stringify(contactdetails));
    formdata.append("videos", state?.uploadVideos?.at(-1)?.file);

    const formattedVideoLinks = videoFields?.map((link) => ({
      description: link?.description || "",
      embedLink: link?.embedLink || "",
      title: link?.title || "",
    }));

    const jsonVideoLinks = JSON.stringify(formattedVideoLinks);
    formdata.append("embed_links", jsonVideoLinks);
    formdata.append("starRating", "1");
    formdata.append("universityName", state.personalInformation.universityName);
    formdata.append("logo", state?.offers?.logo);

    state.mediaFiles.forEach((file, index) => {
      formdata.append(`images`, file.file);
    });

    formdata.append("weight", state.personalInformation.weight);

    state?.offers?.map((val, i) => {
      formdata.append("logo", val.logo);
    });

    let headers = {
      headers: {
        authorization: `Bearer ${currentUser?.token}`,
      },
    };

    try {
      setLoading(true);
      let response = await axios.post(
        `${BASE_URL}/create-profile`,

        formdata,
        headers
      );
      console.log("🚀 ~ onFormSubmit ~ response:", response);

      if (response.status === 200) {
        toastr.success("Profile created successfully");
        navigate("/");
        localStorage.setItem("createporfile", JSON.stringify(response));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ onFormSubmit ~ error:", error);
      if (error?.response?.data?.error) {
        toastr.error("testing error");
      } else {
        toastr.error("Server error, please try again");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-80">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin  fill-[#FF3333]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="progressContainer">
          <StepProgressBar
            startingStep={0}
            currentStep={currentStep}
            loading={loading}
            onSubmit={onFormSubmit}
            steps={[
              {
                label: "Personal Information",
                name: "step1",
                content: <PersonalInformationForm data={data} />,
                onClick: () => handleStepChange(0),
              },
              {
                label: "Contact Details",
                name: "step2",
                content: <ContactInformationForm data={data} />,
                onClick: () => handleStepChange(1),
              },
              {
                label: "Academics",
                name: "step3",
                content: <AcademicsForm data={data} />,
                onClick: () => handleStepChange(2),
              },
              {
                label: "About Me",
                name: "step4",
                content: <AboutMeForm data={data} />,
                onClick: () => handleStepChange(3),
              },
              {
                label: "Athletic Accomplishments",
                name: "step5",
                content: <AthleticAccomplishmentsForm data={data} />,
                onClick: () => handleStepChange(4),
              },
              {
                label: "Coach Information",
                name: "step6",
                content: <CoachInformationForm data={data} />,
                onClick: () => handleStepChange(5),
              },
              {
                label: "Offers",
                name: "step7",
                content: <OffersForm data={data} />,
                onClick: () => handleStepChange(6),
              },
              {
                label: "Upload Media",
                name: "step8",
                content: <UploadMediaForm data={data} />,
                onClick: () => handleStepChange(7),
              },
            ]}
            progressStyles={{
              stepBar: {
                display: "flex",
                flexDirection: "column",
              },
              step: {
                flex: 1,
                textAlign: "left",
                marginBottom: "20px",
                marginRight: "20px",
                cursor: "pointer",
              },
              stepButton: {
                marginTop: "10px",
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default React.memo(CreateProfile);
