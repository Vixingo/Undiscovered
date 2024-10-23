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
        recruitmentPreference: {
          ...state.coach.recruitmentPreference,
          [name]: value,
        },
      },
    });
  };
  const { recruitmentPreference } = state.coach;

  return (
    <div className="coachInformationForm">
      <h2 style={{ fontSize: '22px' }}>Recruitment Preference</h2>
      <div className="form-data">
        <div className="coachFields">
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Positions Recruiting For</label>
            <input
              type="text"
              name="positionsRecruitingFor"
              placeholder="Write Positions Recruiting For"
              value={recruitmentPreference.positionsRecruitingFor}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Player Characteristics</label>
            <input
              type="text"
              name="playerCharacteristics"
              placeholder="Write Player Characteristics"
              value={recruitmentPreference.playerCharacteristics}
              onChange={handleInputChange}
            />
          </div>

          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Academic Requirements</label>
            <input
              type="text"
              name="academicRequirements"
              placeholder="Write Academic Requirements"
              value={recruitmentPreference.academicRequirements}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachInformationForm;
