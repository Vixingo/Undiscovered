// import React, { useEffect, useState } from "react";
// import { useProfileContext } from "../../../components/context/createProfileContext";
// import "./forms.css";
// import axios from "axios";
// import { BASE_URL } from "../../../baseurl/baseurl.js";
// import { options } from "toastr";

// const OffersForm = ({ data }) => {
//   const { state, dispatch } = useProfileContext();
//   const { offers } = state;

//   const [localOffers, setLocalOffers] = useState(offers);
//   const [universityName, setUniversityName] = useState();

//   const handleInputChange = (index, fieldName, value) => {
//     const updatedOffers = [...localOffers];
//     updatedOffers[index] = {
//       ...updatedOffers[index],
//       [fieldName]: value,
//     };
//     data.offers = updatedOffers;
//     setLocalOffers(updatedOffers);
//   };

//   const handleFileChange = (index, event) => {
//     const file = event.target.files[0];
//     handleInputChange(index, "logo", file);
//     //new
//     const updatedOffers = [...localOffers];
//     updatedOffers[index] = {
//       ...updatedOffers[index],
//       logo: file,
//       logoid: index,
//     };
//     console.log("UPDATE OFFER");
//     console.log(updatedOffers[index]);
//     data.offers = updatedOffers;
//     setLocalOffers(updatedOffers);
//   };

//   const addOfferField = () => {
//     setLocalOffers([
//       ...localOffers,
//       { status: "", date: "", university: "", logo: null },
//     ]);
//   };

//   const formatDateForInput = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0];
//   };

//   useEffect(() => {
//     dispatch({ type: "UPDATE_OFFERS", payload: localOffers });
//   }, [localOffers, dispatch]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const getschooldata = async (searchText) => {
//     try {
//       const response = await axios.post(
//         "https://africaexpress.aminsofttech.info/public/api/get-school",
//         { search: searchText }
//       );
//       console.log("🚀 ~ getschooldata ~ response:", response);
//       setUniversityName(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     if (searchTerm.length > 2 || searchTerm.length === 2) {
//       const delayDebounceFn = setTimeout(() => {
//         getschooldata(searchTerm);
//       });

//       return () => clearTimeout(delayDebounceFn);
//     }
//   }, [searchTerm]);

//   return (
//     <div className="offersForm">
//       <h2 style={{ fontSize: "22px" }}>Offers</h2>
//       {localOffers.map((offer, index) => (
//         <div className="form-data" key={index}>
//           <div className="formFields">
//             <label style={{ fontSize: "16px" }}>Status</label>
//             <select
//               onChange={(e) =>
//                 handleInputChange(index, "status", e.target.value)
//               }
//               value={offer.status || ""}>
//               <option value="">Select Status</option>
//               <option value="Offered">Offered</option>
//               <option value="Committed">Committed</option>
//               <option value="Interest">Interest</option>
//               <option value="Transferred">Transferred</option>
//             </select>
//           </div>
//           <div className="formFields">
//             <label style={{ fontSize: "16px" }}>Date</label>
//             <input
//               onChange={(e) => handleInputChange(index, "date", e.target.value)}
//               type="date"
//               placeholder="Offer date"
//               value={formatDateForInput(offer.date) || ""}
//             />
//           </div>
//           <div className="formFields">
//             <label style={{ fontSize: "16px" }}>University</label>

//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search universities"
//             />

//             {searchTerm?.length > 0 && (
//               <select
//                 onChange={(e) => {
//                   handleInputChange(index, "university", e.target.value);
//                 }}>
//                 {universityName?.map((item, index) => (
//                   <option value={item.name} key={index}>
//                     {item.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>
//         </div>
//       ))}
//       <button type="button" className="addMoreButton" onClick={addOfferField}>
//         + Add New
//       </button>
//     </div>
//   );
// };

// export default OffersForm;

import React, { useEffect, useState } from "react";
import { useProfileContext } from "../../../components/context/createProfileContext";
import "./forms.css";
import axios from "axios";
import { BASE_URL } from "../../../baseurl/baseurl.js";

const OffersForm = ({ data }) => {
  const { state, dispatch } = useProfileContext();
  const { offers } = state;

  const [localOffers, setLocalOffers] = useState(offers);

  // Update the search terms to be an array of strings
  const [searchTerms, setSearchTerms] = useState(offers.map(() => ""));

  const handleInputChange = (index, fieldName, value) => {
    const updatedOffers = [...localOffers];
    updatedOffers[index] = {
      ...updatedOffers[index],
      [fieldName]: value,
    };
    data.offers = updatedOffers;
    setLocalOffers(updatedOffers);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    handleInputChange(index, "logo", file);
  };

  const addOfferField = () => {
    setLocalOffers([
      ...localOffers,
      { status: "", date: "", university: "", logo: null },
    ]);
    setSearchTerms([...searchTerms, ""]);
  };

  const removeOfferField = (index) => {
    const updatedOffers = [...localOffers];
    updatedOffers.splice(index, 1);
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms.splice(index, 1);
    setLocalOffers(updatedOffers);
    setSearchTerms(updatedSearchTerms);
  };

  const getschooldata = async (index, searchText) => {
    if (!searchText) return;
    try {
      const response = await axios.post(
        "https://africaexpress.aminsofttech.info/public/api/get-school",
        {
          search: searchText,
        }
      );
      const newLocalOffers = [...localOffers];
      newLocalOffers[index].universityOptions = response.data.data;
      setLocalOffers(newLocalOffers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_OFFERS", payload: localOffers });
  }, [localOffers, dispatch]);

  return (
    <div className="offersForm">
      <h2 style={{ fontSize: "22px" }}>Offers</h2>
      {localOffers.map((offer, index) => (
        <div className="form-data" key={index}>
          {index !== 0 && (
            <button
              onClick={() => removeOfferField(index)}
              className="addMoreButton">
              Remove
            </button>
          )}
          <div className="formFields">
            <label>Status</label>
            <select
              onChange={(e) =>
                handleInputChange(index, "status", e.target.value)
              }
              value={offer.status || ""}>
              <option value="">Select Status</option>
              <option value="Offered">Offered</option>
              <option value="Committed">Committed</option>
              <option value="Interest">Interest</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
          <div className="formFields">
            <label>Date</label>
            <input
              type="date"
              onChange={(e) => handleInputChange(index, "date", e.target.value)}
              value={offer.date || ""}
            />
          </div>
          <div className="formFields">
            <label>University</label>
            <input
              type="text"
              value={searchTerms[index]}
              onChange={(e) => {
                const newSearchTerms = [...searchTerms];
                newSearchTerms[index] = e.target.value;
                setSearchTerms(newSearchTerms);
                getschooldata(index, e.target.value);
              }}
              placeholder="Search universities"
            />
            {searchTerms[index].length > 0 && (
              <select
                onChange={(e) =>
                  handleInputChange(index, "university", e.target.value)
                }>
                {offer.universityOptions?.map((item, idx) => (
                  <option value={item.name} key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      ))}
      <button type="button" className="addMoreButton" onClick={addOfferField}>
        + Add New
      </button>
    </div>
  );
};

export default OffersForm;
