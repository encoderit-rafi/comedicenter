"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext<any>(undefined);

function AppWrapper({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState<any>(null);
  const [planMemberData, setPlanMemberData] = useState<any>(null);
  const [emailData, setEmailData] = useState<any>(null);
  const [signupData, setSignupData] = useState<any>(null); // New state for signupData

  // Load from localStorage
  useEffect(() => {
    const storedProfileData = localStorage.getItem("profileData");
    const storedPlanMemberData = localStorage.getItem("planMemberData");
    const storedEmailData = localStorage.getItem("emailData");
    // const storedSignupData = localStorage.getItem("signupData");

    if (storedProfileData) {
      try {
        setProfileData(JSON.parse(storedProfileData));
      } catch (error) {
        console.error("Failed to parse profileData:", error);
        localStorage.removeItem("profileData");
      }
    }

    if (storedPlanMemberData) {
      try {
        setPlanMemberData(JSON.parse(storedPlanMemberData));
      } catch (error) {
        console.error("Failed to parse planMemberData:", error);
        localStorage.removeItem("planMemberData");
      }
    }

    if (storedEmailData) {
      try {
        setEmailData(JSON.parse(storedEmailData));
      } catch (error) {
        console.error("Failed to parse emailData:", error);
        localStorage.removeItem("emailData");
      }
    }

    // if (storedSignupData) {
    //   try {
    //     setSignupData(JSON.parse(storedSignupData));
    //   } catch (error) {
    //     console.error("Failed to parse signupData:", error);
    //     localStorage.removeItem("signupData");
    //   }
    // }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (emailData) {
      localStorage.setItem("emailData", JSON.stringify(emailData));
    }
    // if (signupData) {
    //   localStorage.setItem("signupData", JSON.stringify(signupData));
    // }
    if(profileData){
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
  }, [emailData,signupData,profileData]);

  return (
    <AppContext.Provider
      value={{
        profileData,
        setProfileData,
        planMemberData,
        setPlanMemberData,
        emailData,
        setEmailData,
        signupData,
        setSignupData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppWrapper;

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
