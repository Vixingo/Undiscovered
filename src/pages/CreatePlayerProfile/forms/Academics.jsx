import React from "react";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";

const AcademicsForm = () => {
  const { state, dispatch } = useProfileContext();
  const { academics } = state;

  const handleChange = (fieldName, value) => {
    console.log(value);
    dispatch({ type: "UPDATE_ACADEMICS", payload: { fieldName, value } });
  };

  const renderGpaOptions = (start, end, step) => {
    const options = [];
    for (let i = start; i <= end; i += step) {
      options.push(
        <option key={i} value={i.toFixed(1)}>
          {i.toFixed(1)}
        </option>
      );
    }
    return options;
  };

  const renderOptions = () => {
    const options = [];
    for (let i = 400; i <= 1600; i += 1) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  const renderActScoreOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="academicsForm">
      <h2 style={{ fontSize: "22px" }}>Academics</h2>
      <div className="form-data">
        <div className="formFields">
          <label style={{ fontSize: "16px" }}>GPA</label>
          <select
            onChange={(e) => handleChange("gpa", e.target.value)}
            value={academics.gpa || ""}>
            <option value="">Select GPA</option>
            {renderGpaOptions(1.1, 4.9, 0.1)}
          </select>
        </div>
        <div className="formFields">
          <label style={{ fontSize: "16px" }}>SAT Score</label>
          <select
            onChange={(e) => handleChange("satScore", e.target.value)}
            value={academics.satScore || ""}>
            <option value="">Select SAT Score</option>
            {renderOptions()}
          </select>
        </div>
        <div className="formFields">
          <label style={{ fontSize: "16px" }}>ACT Score</label>
          <select
            onChange={(e) => handleChange("actScore", e.target.value)}
            value={academics.actScore || ""}>
            <option value="">Select ACT Score</option>
            {renderActScoreOptions(1, 36)}
          </select>
        </div>
        <div className="formFields">
          <label style={{ fontSize: "16px" }}>NCAA ID</label>
          <input
            type="text"
            maxLength={10} // Limit input to 10 characters
            pattern="[0-9]*" // Only allow numeric input
            onChange={(e) => {
              const input = e.target.value;
              // Validate if input is numeric and up to 10 digits
              if (/^\d{0,10}$/.test(input)) {
                handleChange("ncaaId", input); // Update state with valid input
              }
            }}
            value={academics.ncaaId || ""}
          />
          {/* <select
                        onChange={(e) => handleChange('ncaaId', e.target.value)}
                        value={academics.ncaaId || ""}
                    >
                        <option value="">NCCA ID</option>
                        {renderGpaOptions(1.1, 4.0, 0.1)}
                    </select> */}
        </div>
      </div>
    </div>
  );
};

export default AcademicsForm;
