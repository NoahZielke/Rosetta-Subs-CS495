import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";

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

  const submitForm = () => {
    setAlert(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("email_address", email);
    formData.append("filename", file.name);
    formData.append("file", file);

    console.log("submit", file);
    console.log("email", email);
    axios({
      method: "POST",
      headers: {
        Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
      },
      data: formData,
      url: "https://66.228.52.5:8000/jobs/",
      // onUploadProgress: (ev: ProgressEvent) => {
      //   const progress = (ev.loaded / ev.total) * 100;
      //   updateUploadProgress(Math.round(progress));
      // },
    })
      .then((resp: AxiosResponse<any>) => {
        console.log(resp);
        setAlert(<Alert variant='success'>Job Complete!</Alert>);
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={submitForm} disabled={uploading}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
