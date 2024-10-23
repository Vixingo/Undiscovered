import React, { createContext, useState } from "react";


export const ProfileContext = createContext();


const ProfileProvider = ({ children }) => {
  const [profileState, setProfileState] = useState({
    name: ''
  });

  return (
    <ProfileContext.Provider value={{ profileState, setProfileState }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
