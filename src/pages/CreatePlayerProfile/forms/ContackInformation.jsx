import React from "react";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./forms.css";

const ContactInformationForm = ({ data }) => {
    const { state, dispatch } = useProfileContext();

    const handleChange = (fieldName, value) => {
        data[fieldName] = value;
       
        dispatch({ type: 'UPDATE_CONTACT_INFORMATION', payload: { fieldName, value } });
    };

    const handlePhoneChange = (value) => {
        data.phoneNumber = value;
        dispatch({ type: 'UPDATE_CONTACT_INFORMATION', payload: { fieldName: 'phoneNumber', value } });
    };

    return (
        <div className="contactInformationForm">
            <h2 style={{ fontSize: "22px" }}>Contact Information</h2>
            <div className="form-data">
                <div className="formFields">
                    <label style={{ fontSize: "16px" }}>Phone Number</label>
                    <PhoneInput
                        country={"us"}
                        value={state.contactDetail.phoneNumber || ""}
                        onChange={handlePhoneChange}
                        inputProps={{
                            name: "phoneNumber",
                            required: true,
                            placeholder: "Write phone number"
                        }}
                    />
                </div>
                <div className="formFields">
                    <label style={{ fontSize: "16px" }}>Twitter</label>
                    <input
                        onChange={(e) => handleChange('twitter', e.target.value)}
                        value={state.contactDetail.twitter || ""}
                        type="text"
                        placeholder="Twitter link"
                    />
                </div>
                <div className="formFields">
                    <label style={{ fontSize: "16px" }}>TikTok</label>
                    <input
                        onChange={(e) => handleChange('tiktok', e.target.value)}
                        value={state.contactDetail.tiktok || ""}
                        type="text"
                        placeholder="TikTok link"
                    />
                </div>
                <div className="formFields">
                    <label style={{ fontSize: "16px" }}>Facebook</label>
                    <input
                        onChange={(e) => handleChange('facebook', e.target.value)}
                        value={state.contactDetail.facebook || ""}
                        type="text"
                        placeholder="Facebook link"
                    />
                </div>
                <div className="formFields">
                    <label style={{ fontSize: "16px" }}>Instagram</label>
                    <input
                        onChange={(e) => handleChange('instagram', e.target.value)}
                        value={state.contactDetail.instagram || ""}
                        type="text"
                        placeholder="Instagram link"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactInformationForm;
