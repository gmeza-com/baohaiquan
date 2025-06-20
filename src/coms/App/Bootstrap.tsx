import { useState, Suspense } from "react";
import LoadingScreen from "@/coms/common/LoadingScreen";
import { AppContext } from "@/lib/ctx";
import { UserProps, UserRoleProps } from "@/type/User";

const guestRole = { id: 1, name: "Guest" };

const Bootstrap = ({ children }: { children: React.ReactNode }) => {
  const [loading, setloading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({ id: 0 });
  const [userRole, setUserRole] = useState<UserRoleProps>(guestRole);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppContext.Provider
        value={{
          user,
          setUser,
          userRole,
          setUserRole,
        }}
      >
        {loading ? <LoadingScreen /> : children}
      </AppContext.Provider>
    </Suspense>
  );
};

export default Bootstrap;
