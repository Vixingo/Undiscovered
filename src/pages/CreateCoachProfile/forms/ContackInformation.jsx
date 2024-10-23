import React, { useReducer } from 'react';
import './forms.css';

import { useProfileContext } from '../../../components/context/createProfileContext';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const ContactInformationForm = () => {
  const { state, dispatch } = useProfileContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        contactDetail: {
          ...state.coach.contactDetail,
          [name]: value,
        },
      },
    });
  };

  const handlePhoneChange = (value) => {
    dispatch({
      type: 'UPDATE_COACH',

      payload: {
        contactDetail: {
          ...state.coach.contactDetail,
          phone: value,
        },
      },
    });
  };

  const { contactDetail } = state.coach;

  return (
    <div className="contactInformationForm">
      <h2 style={{ fontSize: '22px' }}>Contact details</h2>
      <div className="form-data">
        <div className="coachFields">
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Phone</label>

            <PhoneInput
              country={'us'}
              value={contactDetail.phoneNumber || ''}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phoneNumber',
                required: true,
                placeholder: 'Write phone number',
              }}
            />
          </div>
          <div className="formFields mt-5 w-full">
            <label style={{ fontSize: '16px' }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              value={contactDetail.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Twitter</label>
            <input
              type="text"
              name="twitter"
              placeholder="Write twitter link"
              value={contactDetail.twitter}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>Instagram</label>
            <input
              type="text"
              name="instagram"
              placeholder="Write Instagram"
              value={contactDetail.instagram}
              onChange={handleInputChange}
            />
          </div>
          <div className="formFields mt-5">
            <label style={{ fontSize: '16px' }}>LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              placeholder="Write Linkedin"
              value={contactDetail.linkedin}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;
