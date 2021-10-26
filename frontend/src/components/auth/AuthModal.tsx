import React, { useState } from "react";
import { RegisterModal } from "./RegisterModal";
import { SignInModal } from "./SignInModal";

const AuthModal: React.FC<{
  show: boolean;
  handleClose: () => void;
}> = ({ show, handleClose }) => {
  const [modal, setModal] = useState<"SignIn" | "Register">("SignIn");

  if (show === false) return <> </>;
  if (modal === "SignIn")
    return (
      <SignInModal
        handleClose={() => handleClose()}
        setBodyToRegister={() => setModal("Register")}
      />
    );

  return (
    <RegisterModal
      handleClose={() => handleClose()}
      setBodyToSignIn={() => setModal("SignIn")}
    />
  );
};

export default AuthModal;
