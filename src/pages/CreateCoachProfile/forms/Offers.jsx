import React, { useReducer } from 'react';
import './forms.css';
import Reducer from '../../../components/reducer/profileReducer';
import { useProfileContext } from '../../../components/context/createProfileContext';

const CoachInformationForm = () => {
  const { state, dispatch } = useProfileContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        additionalInformation: {
          ...state.coach.additionalInformation,
          [name]: value,
        },
      },
    });
  };
  const { additionalInformation } = state.coach;

  return (
    <div className="coachInformationForm">
      <h2 style={{ fontSize: '22px' }}>Additional information</h2>
      <div className="form-data">
        <div className="coachFields">
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Recruitment Calendar</label>
            <input
              type="date"
              name="recruitmentCalendar"
              placeholder="Select Recruitment Calendar"
              value={additionalInformation.recruitmentCalendar}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Tryouts</label>
            <input
              type="date"
              name="tryouts"
              placeholder="Select Tryouts"
              value={additionalInformation.tryouts}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Official Visits</label>
            <input
              type="date"
              name="officialVisits"
              placeholder="Write  Official Visits"
              value={additionalInformation.officialVisits}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Signin Day</label>
            <input
              type="date"
              name="signingDay"
              placeholder="Write  Signin Day"
              value={additionalInformation.signingDay}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Program Highlights</label>
            <input
              type="text"
              name="programHighlights"
              placeholder="Write Program Highlights"
              value={additionalInformation.programHighlights}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Contact Preferences</label>
            <input
              type="text"
              name="contactPreferences"
              placeholder="Write Contact Preferences"
              value={additionalInformation.contactPreferences}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachInformationForm;
