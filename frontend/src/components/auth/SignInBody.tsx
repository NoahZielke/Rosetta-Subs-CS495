import React, { useState } from "react";
import { AlertProps, FormControl, InputGroup } from "react-bootstrap";

export const SignInBody: React.FC<{
  setBody: () => void;
}> = ({ setBody }) => {
  const [alert, _] = useState<React.ReactElement<AlertProps> | null>(null);

  const handleSignInRequest = () => {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: "30px",
      }}>
      {alert}
      <InputGroup>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "30px",
          }}>
          <FormControl
            placeholder='Email'
            onChange={(e) => {
              // setEmail(e.target.value);
              // validateEmail(e);
              // submitButtonState(e);
            }}
          />
          <FormControl
            className='mt-2'
            placeholder='Password'
            onChange={(e) => {
              // setEmail(e.target.value);
              // validateEmail(e);
              // submitButtonState(e);
            }}
          />
        </div>
      </InputGroup>
      <p
        className='text-center pt-3 text-primary btn-link mb-0'
        style={{ cursor: "pointer" }}
        onClick={() => setBody()}>
        {/* {emailError} */}New user? Register
      </p>
    </div>
  );
};
