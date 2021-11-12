import axios, { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import teamLogo from "../../images/app-logo-75px.png";

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <p
      aria-label='Close'
      style={{
        width: 20,
        height: 20,
        position: "absolute",
        right: 24,
        top: 0,
        fontSize: 30,
        cursor: "pointer",
      }}
      onClick={onClick}>
      &#10006;
    </p>
  );
};

export const SignInModal: React.FC<{
  handleClose: () => void;
  setBodyToRegister: () => void;
}> = ({ handleClose, setBodyToRegister }) => {
  const [alert, setAlert] = useState<React.ReactElement<AlertProps> | null>(
    null
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const submitLoginForm = () => {
    setUploading(true);
    setAlert(null);
    if (!email) {
      setAlert(<Alert variant='danger'>Please enter a valid email. </Alert>);
      setUploading(false);
      return;
    } else if (!password) {
      setAlert(<Alert variant='danger'>Please enter a valid password. </Alert>);
      setUploading(false);
      return;
    }

    var data = new FormData();
    data.append("email", email);
    data.append("password", password);

    axios({
      method: "POST",

      headers: {
        Authorization: "Basic bG9nYW46bG9nYW4=",
      },
      data: data,
      url: "https://subgen.lselkins.com/auth/login/",
    })
      .then(async (resp: AxiosResponse<any>) => {
        console.log(resp);
        setAlert(<Alert variant='success'>Success</Alert>);

        if (email) {
          const newUser = {
            ...user,
            email: email,
          };
          setUser(newUser);
        }
        await new Promise((r) => setTimeout(r, 1000));

        handleClose();
      })
      .catch((err: Error) => {
        console.error(err.message);
        setUploading(false);
        setPassword("");
        setAlert(<Alert variant='danger'>Please try again.</Alert>);
      });
  };

  return (
    <Modal show={true} onHide={() => handleClose()}>
      <Modal.Header>
        <CloseButton onClick={() => handleClose()} />
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img
            src={teamLogo}
            style={{ height: "75px", width: "75px", marginLeft: 15 }}
            alt='App logo'
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginLeft: "30px",
            }}>
            <InputGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginLeft: "30px",
                }}>
                {alert}

                <FormControl
                  placeholder='Email'
                  onChange={(e) => {
                    setEmail(e.target.value.toString());
                    // validateEmail(e.target.value.toString());
                    // submitButtonState(e);
                  }}
                  value={email}
                />
                <FormControl
                  className='mt-2'
                  placeholder='Password'
                  onChange={(e) => {
                    setPassword(e.target.value.toString());
                    // validateEmail(e);
                  }}
                  type='password'
                  value={password}
                />
              </div>
            </InputGroup>
            <p
              className='text-center pt-3 text-primary btn-link mb-0'
              style={{ cursor: "pointer" }}
              onClick={() => setBodyToRegister()}>
              {/* {emailError} */}New user? Register
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClose()}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={() => submitLoginForm()}
          disabled={uploading}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
