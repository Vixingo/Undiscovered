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
import { useProfileContext } from "../../components/context/createProfileContext";

function CreateProfile({ data }) {
  const {
    state: { coach: coachData },
  } = useProfileContext();
  const navigate = useNavigate();
  const [accomplishments, setAccomplishments] = useState([""]);
  const [loading, setLoading] = useState(false);
  const localUser = localStorage.getItem("user");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState({
    personalInformation: {
      firstName: "",
      lastName: "",
      schoolCollege: "",
      position: "",
      teamName: "",
      conference: "",
    },
    contactDetail: {
      phone: "",
      email: "",
      twitterLink: "",
      instagramLink: "",
      linkedinLink: "",
    },
    coachingExperience: {
      yearsOfExperience: 10,
      previousTeams: [
        {
          teamName: "",
          coachPosition: "",
          yearsCoached: 3,
        },
      ],
    },
    recruitmentPreference: {
      positionsRecruitingFor: [],
      playerCharacteristics: [],
      academicRequirements: [],
    },
    teamAccomplishments: [],
    philosophyPlayingStyle: [],
    additionalInformation: {
      recruitmentCalendar: "",
      tryouts: "",
      officialVisits: "",
      signingDay: "",
      programHighlights: "",
      contactPreferences: "",
    },
  });

  const step2Content = <ContactInformationForm data={data} />;
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

  function step1Validator() {
    return true; // Return true for now assuming validation passes
  }

  function step2Validator() {
    return true; // Return true for now assuming validation passes
  }

  function step3Validator() {
    return true;
  }

  function step4Validator() {
    return true;
  }

  function step5Validator() {
    return true;
  }

  function step6Validator() {
    return true;
  }

  function step7Validator() {
    return true;
  }

  const onFormSubmit = async (e) => {
    try {
      setLoading(true);
      let response = await axios.post(`${BASE_URL}/coach-profile`, {
        ...coachData,
        auth: JSON.parse(localUser)._id,
      });
      console.log("🚀 ~ onFormSubmit ~ response:", response);

      if (response.status === 201) {
        toastr.success("Profile created successfully");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ onFormSubmit ~ error:", error);
      if (error?.response?.data?.error) {
        toastr.error(error.response.data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toastr.error("Server error, please try again");
      }
    }
  };
  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };
  return (
    <div className="progressContainer">
      <StepProgressBar
        startingStep={0}
        currentStep={currentStep} // Pass current step to StepProgressBar
        onStepChange={handleStepChange} // Handle step changes
        loading={loading}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: "About Information",
            name: "step1",
            validator: step1Validator,
            content: (
              <PersonalInformationForm
                state={state}
                setState={setState}
                data={data}
              />
            ),
          },
          {
            label: "Contact Details",
            name: "step2",
            content: step2Content,
            validator: step2Validator,
          },
          {
            label: "Coaching Experience",
            name: "step3",
            content: step3Content,
            validator: step3Validator,
          },
          {
            label: "Recruitment Preferences",
            name: "step4",
            content: step4Content,
            validator: step4Validator,
          },
          {
            label: "Team Accomplishments",
            name: "step5",
            content: step5Content,
            validator: step5Validator,
          },
          {
            label: "Philosophy & Playing Style",
            name: "step6",
            content: step6Content,
            validator: step6Validator,
          },
          {
            label: "Additional Information",
            name: "step7",
            content: step7Content,
            validator: step7Validator,
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
  );
}

export default React.memo(CreateProfile);
