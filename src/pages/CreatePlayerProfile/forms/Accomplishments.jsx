import React, { useContext, useEffect, useState } from "react";
import { ProfileCreateContext, useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";

const AthleticAccomplishmentsForm = ({data}) => {
    const { state,dispatch } = useProfileContext()
    const { accomplishments } = state;
    const [localAccomplishments, setLocalAccomplishments] = useState(accomplishments);

    const handleInputChange = (index, event) => {
        const updatedAccomplishments = [...localAccomplishments];
        updatedAccomplishments[index] = event.target.value;
     data.athleticaccomplishments=updatedAccomplishments
        setLocalAccomplishments(updatedAccomplishments);
    };

    const addAccomplishmentField = () => {
        setLocalAccomplishments([...localAccomplishments, ""]);
    };

 
    useEffect(() => {
        dispatch({ type: 'UPDATE_ACCOMPLISHMENTS', payload: localAccomplishments });
    }, [localAccomplishments, dispatch]);

    return (
        <div className="athleticAccomplishmentsForm">
            <h2 style={{ fontSize: "22px" }}>Athletic Accomplishments</h2>
            <div className="form-data">
                {localAccomplishments.map((accomplishment, index) => (
                    <div className="formFields" key={index}>
                        <label style={{ fontSize: "16px" }}>Accomplishment</label>
                        <input
                            type="text"
                            placeholder="Describe accomplishment"
                            value={accomplishment}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                    </div>
                ))}
                <button type="button" className="addMoreButton" onClick={addAccomplishmentField}>
                    + Add New
                </button>
            </div>
        </div>
    );
};

export default AthleticAccomplishmentsForm;
