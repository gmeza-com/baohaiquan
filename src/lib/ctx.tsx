import { createContext, Dispatch, SetStateAction } from "react";
import { UserProps, UserRoleProps } from "@/type/User";

type AppProps = {
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
  userRole: UserRoleProps;
  setUserRole?: Dispatch<SetStateAction<UserRoleProps>>;
};

export const AppContext = createContext<AppProps>({
  user: { id: 0 },
  setUser: (arg: SetStateAction<UserProps>) => {},
  userRole: { id: 1, name: "Guest" },
});
