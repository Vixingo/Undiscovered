import React, { useContext } from "react";
import {
  ProfileCreateContext,
  useProfileContext,
} from "../../../components/context/createProfileContext";
import "./forms.css";

const AboutMeForm = () => {
  const { state, dispatch } = useProfileContext();
  const { aboutme } = state;

  const handleChange = (e) => {
    dispatch({ type: "UPDATE_ABOUT_ME", payload: e.target.value });
  };

  return (
    <div className="aboutMeForm">
      <h2 style={{ fontSize: "22px" }}>About Me</h2>
      <div className="form-data">
        <div className="formFields">
          <textarea
            onChange={handleChange}
            value={aboutme || ""}
            rows="10"
            placeholder="Write about yourself"></textarea>
        </div>
      </div>
    </div>
  );
};

export default AboutMeForm;
