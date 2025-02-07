import React, { ReactNode, createContext, useContext, useState } from "react";
import useYearForContext from "../hooks/useYearForContext";

interface YearContextType {
  editedYear: string;
  setEditedYear: React.Dispatch<React.SetStateAction<string>>;
}

interface YearContextProviderProps {
  children: ReactNode; // Deklaracja children jako ReactNode
}

const YearContext = createContext<YearContextType | undefined>(undefined);

const YearContextProvider: React.FC<YearContextProviderProps> = ({
  children,
}) => {
  const [editedYear, setEditedYear] = useState<string>("2024");

  return (
    <YearContext.Provider value={{ editedYear, setEditedYear }}>
      {children}
    </YearContext.Provider>
  );
};

const useYear = () => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error("useYear must be used within a YearContextProvider");
  }
  return context;
};

const YearSelector: React.FC = () => {
  const { editedYear, setEditedYear } = useYear();

  const years = useYearForContext();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedYear(e.target.value);
  };

  //console.log("editedYear",typeof(editedYear))
  return (
    <select value={editedYear} onChange={handleYearChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export { YearContextProvider, useYear, YearSelector };
