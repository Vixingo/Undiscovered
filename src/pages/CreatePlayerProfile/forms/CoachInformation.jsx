import React from "react";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./forms.css";

const CoachInformationForm = ({ data }) => {
    const { state, dispatch } = useProfileContext();
    const { coachinformation } = state;

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Only allow numeric input for phone number
        if (name === "phoneNumber" && !/^\d*$/.test(value)) {
            return;
        }

        const updatedCoach = { ...coachinformation, [name]: value };
        data.coach = updatedCoach;
        dispatch({ type: 'UPDATE_COACH_INFORMATION', payload: updatedCoach });
    };

    const handlePhoneChange = (value) => {
        const updatedCoach = { ...coachinformation, phoneNumber: value };
        data.coach = updatedCoach;
        dispatch({ type: 'UPDATE_COACH_INFORMATION', payload: updatedCoach });
    };

    return (
        <div className="coachInformationForm">
            <h2 style={{ fontSize: "22px" }}>Coach Information</h2>
            <div className="form-data">
                <div className="coachFields">
                    {/* <div className="formFields">
                        <label style={{ fontSize: "16px" }}>Coach Role</label>
                        <input
                            type="text"
                            name="role"
                            placeholder="Write coach role"
                            value={coachinformation.role || ""}
                            onChange={handleInputChange}
                        />
                    </div> */}
                    <div className="formFields">
                        <label style={{ fontSize: "16px" }}>Coach Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Write coach name"
                            value={coachinformation.name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="formFields">
                        <label style={{ fontSize: "16px" }}>Coach Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Write coach email"
                            value={coachinformation.email || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="formFields">
                        <label style={{ fontSize: "16px" }}>Coach Phone Number</label>
                        <PhoneInput
                            country={"us"}
                            value={coachinformation.phoneNumber || ""}
                            onChange={handlePhoneChange}
                            inputProps={{
                                name: "phoneNumber",
                                required: true,
                                placeholder: "Write coach phone number"
                            }}
                        />
                    </div>
                    <div className="formFields my-5">
                        <label style={{ fontSize: "16px" }}>Coach Type</label>
                        <select
                            name="type"
                            value={coachinformation.type || ""}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Coach Type</option>
                            <option value="College Coach">College Coach</option>
                            <option value="HS Coach">HS Coach</option>
                            <option value="Club/AAU">Club/AAU</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachInformationForm;
