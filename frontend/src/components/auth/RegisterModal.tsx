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
        right: 16,
        top: 0,
        fontSize: 30,
        cursor: "pointer",
      }}
      onClick={onClick}>
      &#10006;
    </p>
  );
};

export const RegisterModal: React.FC<{
  handleClose: () => void;
  setBodyToSignIn: () => void;
}> = ({ handleClose, setBodyToSignIn }) => {
  // const [email, setEmail] = useState("");
  const [alert, setAlert] = useState<React.ReactElement<AlertProps> | null>(
    null
  );

  const [uploading, setUploading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const { user, setUser } = useContext(UserContext);

  const submitRegisterForm = () => {
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
    } else if (!username) {
      setAlert(<Alert variant='danger'>Please enter a valid username. </Alert>);
      setUploading(false);
      return;
    } else if (!confirmPassword || password !== confirmPassword) {
      setAlert(
        <Alert variant='danger'>Make sure your passwords match! </Alert>
      );
      setUploading(false);
      return;
    }

    var data = new FormData();
    data.append("email", email);
    data.append("username", username);
    data.append("password", password);
    console.log("email", email);

    axios({
      method: "POST",

      headers: {
        Authorization: "Basic bG9nYW46bG9nYW4=",
      },
      data: data,
      url: "https://subgen.lselkins.com/auth/register/",
    })
      .then(async (resp: AxiosResponse<any>) => {
        console.log(resp);
        setAlert(<Alert variant='success'>You have created an account!</Alert>);

        if (email) {
          const newUser = {
            ...user,
            email: email,
          };
          setUser(newUser);
        }
        await new Promise((r) => setTimeout(r, 2000));

        handleClose();
      })
      .catch((err: Error) => {
        console.error(err.message);
        setUploading(false);
        setAlert(<Alert variant='danger'>Please try again.</Alert>);
      });
  };

  return (
    <Modal show={true} onHide={() => handleClose()}>
      <Modal.Header>
        <CloseButton onClick={() => handleClose()} />
        <Modal.Title>Register</Modal.Title>
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
              marginLeft: 30,
            }}>
            {alert}
            <InputGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}>
                <FormControl
                  placeholder='Username'
                  onChange={(e) => {
                    setUsername(e.target.value.toString());
                    // validateEmail(e);
                    // submitButtonState(e);
                  }}
                  value={username ? username : ""}
                />
                <FormControl
                  className='mt-2'
                  placeholder='Email'
                  onChange={(e) => {
                    setEmail(e.target.value.toString());
                    // validateEmail(e);
                    // submitButtonState(e);
                  }}
                  value={email ? email : ""}
                />
                <FormControl
                  className='mt-2'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => {
                    setPassword(e.target.value.toString());
                    // validateEmail(e);
                  }}
                  value={password ? password : ""}
                />
                <FormControl
                  className='mt-2'
                  placeholder='Confirm Password'
                  type='password'
                  onChange={(e) => {
                    setConfirmPassword(e.target.value.toString());
                    // validateEmail(e);
                    // submitButtonState(e);
                  }}
                  value={confirmPassword ? confirmPassword : ""}
                />
              </div>
            </InputGroup>
            <p
              className='text-center pt-3 text-primary btn-link mb-0'
              style={{ cursor: "pointer" }}
              onClick={() => setBodyToSignIn()}>
              {/* {emailError} */}Already have an account? Sign in
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
          onClick={() => submitRegisterForm()}
          disabled={uploading}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
