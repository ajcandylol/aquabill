"use client";

import type { RateSettings } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SettingsContextType {
  rateSettings: RateSettings;
  setRateSettings: (settings: RateSettings) => void;
  isSettingsLoaded: boolean;
}

const defaultRateSettings: RateSettings = {
  ratePerUnit: 1.5, // Default rate per cubic meter or unit
  taxPercentage: 5, // Default tax percentage
  discountPercentage: 0, // Default discount percentage
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [rateSettings, setRateSettingsState] = useState<RateSettings>(defaultRateSettings);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  useEffect(() => {
    // Load settings from localStorage on initial mount (client-side only)
    const storedSettings = localStorage.getItem("aquaBillRateSettings");
    if (storedSettings) {
      try {
        setRateSettingsState(JSON.parse(storedSettings));
      } catch (error) {
        console.error("Failed to parse rate settings from localStorage", error);
        // Fallback to default if parsing fails
        localStorage.setItem("aquaBillRateSettings", JSON.stringify(defaultRateSettings));
      }
    } else {
      // Initialize localStorage with default settings if not present
       localStorage.setItem("aquaBillRateSettings", JSON.stringify(defaultRateSettings));
    }
    setIsSettingsLoaded(true);
  }, []);

  const setRateSettings = (settings: RateSettings) => {
    setRateSettingsState(settings);
    // Persist settings to localStorage (client-side only)
    localStorage.setItem("aquaBillRateSettings", JSON.stringify(settings));
  };
  
  const value = { rateSettings, setRateSettings, isSettingsLoaded };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
