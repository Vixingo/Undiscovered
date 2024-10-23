import React, { useReducer } from 'react';
import './forms.css';

import { useProfileContext } from '../../../components/context/createProfileContext';

const ContactInformationForm = () => {
  const { state, dispatch } = useProfileContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        coachingExperience: {
          ...state.coach.coachingExperience,
          [name]: value,
        },
      },
    });
  };

  const handleInputChangeSub = (e, v) => {
    const { name, value } = e.target;

    let updated = (state.coach.coachingExperience.previousTeams[v][name] =
      value);

    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        ...updated,
      },
    });
  };

  const onAddRow = () => {
    let oldData = state.coach;
    let updated = oldData.coachingExperience.previousTeams.push({
      teamName: '',
      coachPosition: '',
      yearsCoached: 1,
    });

    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        ...oldData,
      },
    });
  };

  const { coachingExperience } = state.coach;

  return (
    <div className="contactInformationForm">
      <h2 style={{ fontSize: '22px' }}>Coaching experience</h2>
      <div className="form-data">
        <div className="coachFields">
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Years Of Experience</label>
            <input
              type="text"
              name="yearsOfExperience"
              placeholder="Write your Years Of Experience"
              value={coachingExperience.yearsOfExperience}
              onChange={handleInputChange}
            />
          </div>
          {coachingExperience.previousTeams.map((team, i) => (
            <div>
              <div className="formFields mt-5 w-full">
                <label style={{ fontSize: '16px' }}>Previous Team</label>
                <input
                  type="text"
                  name="teamName"
                  placeholder="Write your Team Name"
                  value={team.teamName}
                  onChange={(e) => handleInputChangeSub(e, i)}
                />
              </div>

              <div className="formFields mt-5">
                <input
                  type="text"
                  name="coachPosition"
                  placeholder="Write Coach Position"
                  value={team.coachPosition}
                  onChange={(e) => handleInputChangeSub(e, i)}
                />
              </div>
              <div className="formFields mt-5">
                <input
                  type="number"
                  name="yearsCoached"
                  placeholder="Write Years Coached"
                  value={team.yearsCoached}
                  onChange={(e) => handleInputChangeSub(e, i)}
                />
              </div>
            </div>
          ))}

          <button onClick={onAddRow} className="mt-5 _2pGos _hsN1w ">
            Add new
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;
