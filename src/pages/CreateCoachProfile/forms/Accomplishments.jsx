import React, { useReducer } from 'react';
import './forms.css';

import { useProfileContext } from '../../../components/context/createProfileContext';

const ContactInformationForm = () => {
  const { state, dispatch } = useProfileContext();

  const handleInputChangeSub = (e, v) => {
    const { name, value } = e.target;

    let updated = (state.coach.teamAccomplishments[v] = value);

    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        ...updated,
      },
    });
  };

  const onAddRow = () => {
    let oldData = state.coach;
    let updated = oldData.teamAccomplishments.push('');

    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        ...oldData,
      },
    });
  };

  const { teamAccomplishments } = state.coach;

  return (
    <div className="contactInformationForm">
      <h2 style={{ fontSize: '22px' }}>Team Accomplishments</h2>
      <div className="form-data">
        <div className="coachFields">
          <label style={{ fontSize: '16px' }} className="pb-5">
            Bullets
          </label>
          {teamAccomplishments.map((team, i) => (
            <div className="flex gap-3 mt-5">
              <div className="formFields  w-full">
                <input
                  type="text"
                  name="Bullter"
                  placeholder="Write Bullet"
                  value={team}
                  onChange={(e) => handleInputChangeSub(e, i)}
                />
              </div>
              {teamAccomplishments.length - 1 === i ? (
                <button
                  onClick={onAddRow}
                  className=" _2pGos  w-[53px] h-[53px]"
                  style={{
                    minWidth: 53,
                    padding: 21,
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.16492 1V11.3202"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.33 6.16233H1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;
