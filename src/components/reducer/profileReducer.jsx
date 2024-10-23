// export default function Reducer(state, action) {
//     switch (action.type) {
//         case 'ADD_PERSONAL_INFORMATION_Name':
//             return {
//                 ...state,
//                 personalInformation: { ...state.personalInformation, name: action.payload }
//             };
//         case 'UPDATE_PERSONAL_INFORMATION':
//             return {
//                 ...state,
//                 personalInformation: {
//                     ...state.personalInformation,
//                     [action.payload.fieldName]: action.payload.value
//                 }
//             };
//         case 'UPDATE_CONTACT_INFORMATION':
//             return {
//                 ...state,
//                 contactDetail: {
//                     ...state.contactDetail,
//                     [action.payload.fieldName]: action.payload.value
//                 }
//             };
//         case 'UPDATE_ACADEMICS':
//             return {
//                 ...state,
//                 academics: {
//                     ...state.academics,
//                     [action.payload.fieldName]: action.payload.value
//                 }
//             };
//         case 'UPDATE_ABOUT_ME':
//             return {
//                 ...state,
//                 aboutme: action.payload
//             };
//         case 'UPDATE_ACCOMPLISHMENTS':
//             return {
//                 ...state,
//                 accomplishments: action.payload
//             };
//         case 'UPDATE_COACH_INFORMATION':
//             return {
//                 ...state,
//                 coachinformation: action.payload
//             };
//         case 'UPDATE_Offers':
//             return {
//                 ...state,
//                 offers:
//                 {
//                     ...state.offers,
//                     [action.payload.fieldName]: action.payload.value
//                 }

//             }
//         case 'ADD_MEDIA_FILES':
//             return {
//                 ...state,
//                 mediaFiles: [...state.mediaFiles, ...action.payload]
//             };
//         case 'REMOVE_MEDIA_FILE':
//             return {
//                 ...state,
//                 mediaFiles: state.mediaFiles.filter((_, index) => index !== action.payload)
//             };

//         default:
//             return state;
//     }
// }

export default function Reducer(state, action) {
  switch (action.type) {
    case 'ADD_PERSONAL_INFORMATION_Name':
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          name: action.payload,
        },
      };
    case 'UPDATE_PERSONAL_INFORMATION':
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          [action.payload.fieldName]: action.payload.value,
        },
      };
    case 'UPDATE_CONTACT_INFORMATION':
      return {
        ...state,
        contactDetail: {
          ...state.contactDetail,
          [action.payload.fieldName]: action.payload.value,
        },
      };
    case 'UPDATE_ACADEMICS':
      return {
        ...state,
        academics: {
          ...state.academics,
          [action.payload.fieldName]: action.payload.value,
        },
      };
    case 'UPDATE_ABOUT_ME':
      return {
        ...state,
        aboutme: action.payload,
      };
    case 'UPDATE_ACCOMPLISHMENTS':
      return {
        ...state,
        accomplishments: action.payload,
      };
    case 'UPDATE_COACH_INFORMATION':
      return {
        ...state,
        coachinformation: action.payload,
      };
    case 'UPDATE_OFFERS':
      console.log('UPDATE OFFER');
      console.log(action.payload);
      return {
        ...state,
        offers: action.payload,
      };
    case 'ADD_OFFER':
      return {
        ...state,
        offers: [...state.offers, action.payload],
      };
    case 'UPDATE_OFFER':
      const updatedOffers = state.offers.map((offer, index) =>
        index === action.payload.index
          ? { ...offer, ...action.payload.offer }
          : offer
      );
      return {
        ...state,
        offers: updatedOffers,
      };
    case 'ADD_MEDIA_FILES':
      return {
        ...state,
        mediaFiles: [...state.mediaFiles, ...action.payload],
      };
    case 'REMOVE_MEDIA_FILE':
      return {
        ...state,
        mediaFiles: state.mediaFiles.filter(
          (_, index) => index !== action.payload
        ),
      };
    case 'ADD_UPLOAD_VIDEO_FILES':
      return {
        ...state,
        uploadVideos: action.payload,
      };
    case 'REMOVE_UPLOAD_VIDEO_FILE':
      return {
        ...state,
        uploadVideos: state.uploadVideos.filter(
          (_, index) => index !== action.payload
        ),
      };
    case 'ADD_LINK_VIDEO_FILES':
      return {
        ...state,
        videoLinks: action.payload,
      };
    case 'REMOVE_UPLOAD_VIDEO_FILE':
      return {
        ...state,
        videoLinks: state.videoLinks.filter(
          (_, index) => index !== action.payload
        ),
      };
    case 'UPDATE_COACH':
      return {
        ...state,
        coach: {
          ...state.coach,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
