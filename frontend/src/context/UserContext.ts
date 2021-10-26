import React from "react";

export interface UserInterface {
  email: string;
}
export interface UserContextInterface {
  user: UserInterface | undefined;
  setUser:
    | React.Dispatch<React.SetStateAction<UserInterface | undefined>>
    | (() => void);
}
export const UserContext = React.createContext<UserContextInterface>({
  user: undefined,
  setUser: () => {},
});
