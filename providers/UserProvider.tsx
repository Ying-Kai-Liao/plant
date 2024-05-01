import React, { createContext, useContext, useState } from "react";

export type PlantData = {
  type: number;
  date: string;
  name: string;
  waterTime?: string;
  fertilizeTime?: string;
  waterReminder: boolean;
  fertilizeReminder: boolean;
};
// { type: 1, date: "2023/11/02", name: "欣欣", isWater: true, isFertilize: true },
//       { type: 4, date: "2023/11/03", name: "綠綠", isWater: false, isFertilize: true  },
//       { type: 3, date: "2023/11/04", name: "花花", isWater: true, isFertilize: false  },

export type UserContextType = {
  name: string;
  setName: (c: string) => void;
  point: number;
  setPoint: (c: number) => void;
  plants: PlantData[];
  setPlants: (c: PlantData[]) => void;
};

export const UserContext = createContext<UserContextType>({
  name: "PEI_067", // set a default value
  setName: () => {},
  point: 600,
  setPoint: () => {},
  plants: [
    {
      type: 1,
      date: "2023/11/02",
      name: "欣欣",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: true,
      fertilizeReminder: true,
    },
    {
      type: 4,
      date: "2023/11/03",
      name: "綠綠",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: false,
      fertilizeReminder: true,
    },
    {
      type: 3,
      date: "2023/11/04",
      name: "花花",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: true,
      fertilizeReminder: false,
    },
  ],
  setPlants: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("no context provided");
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("PEI_067");
  const [point, setPoint] = useState(600);
  const [plants, setPlants] = useState<PlantData[]>([
    {
      type: 1,
      date: "2023/11/02",
      name: "欣欣",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: true,
      fertilizeReminder: true,
    },
    {
      type: 4,
      date: "2023/11/03",
      name: "綠綠",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: false,
      fertilizeReminder: true,
    },
    {
      type: 3,
      date: "2023/11/04",
      name: "花花",
      waterTime: "",
      fertilizeTime: "",
      waterReminder: true,
      fertilizeReminder: false,
    },
  ]);
  return (
    <UserContext.Provider
      value={{ name, setName, point, setPoint, plants, setPlants }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
