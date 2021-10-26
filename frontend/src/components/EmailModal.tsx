import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  FormControl,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import validator from "validator";

const EmailModal: React.FC<{
  show: boolean;
  handleClose: () => void;
  file: File;
}> = ({ show, handleClose, file }) => {
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState<React.ReactElement<AlertProps> | null>(
    null
  );
  const [buttonState, setButtonState] = useState(true);

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e: any) => {
    var email = e.target.value;

    if (validator.isEmail(email) || email === "") {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email");
    }
  };

  const submitButtonState = (e?: any) => {
    var email = e.target.value;

    if (validator.isEmail(email) && uploading === false) {
      setButtonState(false); //button is enabled
    } else {
      setButtonState(true); //button is disabled
    }
  };

  const submitForm = async () => {
    setAlert(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("email_address", email);
    formData.append("filename", file.name);
    formData.append("file", file);

    setAlert(
      <Alert
        variant='info'
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <text className='pr-3'> Transcribing... </text>{" "}
        <Spinner
          animation='border'
          role='status'
          style={{
            position: "absolute",
            right: 12,
          }}
        />{" "}
      </Alert>
    );
    axios({
      method: "POST",
      headers: {
        Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
      },
      data: formData,
      url: "https://subgen.lselkins.com/jobs/",
      // url: "https://thisdoesnotexist/",
      // onUploadProgress: (ev: ProgressEvent) => {
      //   const progress = (ev.loaded / ev.total) * 100;
      //   updateUploadProgress(Math.round(progress));
      // },
    })
      .then(async (resp: AxiosResponse<any>) => {
        console.log(resp);
        setAlert(<Alert variant='success'>Job Complete!</Alert>);

        await new Promise((r) => setTimeout(r, 2000));
        handleClose();
      })
      .catch((err: Error) => {
        console.error(err);
        setUploading(false);
        setAlert(<Alert variant='danger'>Please try again.</Alert>);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          We will email the transcription once it is completed.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert}
        <InputGroup>
          {" "}
          <FormControl
            placeholder='Email'
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e);
              submitButtonState(e);
            }}
          />
        </InputGroup>
        <p className='text-center pt-3' style={{ color: "rgb(214, 52, 52)" }}>
          {emailError}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button
          variant='primary'
          onClick={submitForm}
          disabled={uploading || buttonState}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
