import React, { createContext, useContext, useState } from 'react';

interface YearContextType {
  editedYear: string;
  setEditedYear: React.Dispatch<React.SetStateAction<string>>;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

const YearContextProvider: React.FC = ({ children }) => {
  const [editedYear, setEditedYear] = useState<string>('2024');

  return (
    <YearContext.Provider value={{ editedYear, setEditedYear }}>
      {children}
    </YearContext.Provider>
  );
};

const useYear = () => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error('useYear must be used within a YearContextProvider');
  }
  return context;
};

const YearSelector: React.FC = () => {
  const { editedYear, setEditedYear } = useYear();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedYear(e.target.value);
  };

  return (
    <select value={editedYear} onChange={handleYearChange}>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
      <option value="2022">2022</option>
    </select>
  );
};

export { YearContextProvider, useYear, YearSelector };