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
        personalInformation: {
          ...state.coach.personalInformation,
          [name]: value,
        },
      },
    });
  };
  const { personalInformation } = state.coach;

  return (
    <div className="coachInformationForm">
      <h2 style={{ fontSize: '22px' }}>Personal information</h2>
      <div className="form-data">
        <div className="coachFields">
          <div className="flex gap-3">
            <div className="formFields mt-5 w-full">
              <label style={{ fontSize: '16px' }}>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Write coach first name"
                value={personalInformation.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="formFields mt-5 w-full">
              <label style={{ fontSize: '16px' }}>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Write coach last name"
                value={personalInformation.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>School/College</label>
            <input
              type="text"
              name="schoolCollege"
              placeholder="Write school/college name"
              value={personalInformation.schoolCollege}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Position</label>
            <select
              name="position"
              placeholder="Write position"
              value={personalInformation.position}
              onChange={(e) => handleInputChange({ ...e, name: 'position' })}
            >
              <option value="new">New </option>
              <option value="old">old </option>
            </select>
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Team Name</label>
            <input
              type="text"
              name="teamName"
              placeholder="Write team name"
              value={personalInformation.teamName}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Conference</label>
            <input
              type="text"
              name="conference"
              placeholder="Write conference"
              value={personalInformation.conference}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachInformationForm;
