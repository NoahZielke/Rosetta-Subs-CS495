import axios, { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";

const ArrowRight: React.FC<any> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    className='bi bi-arrow-right'
    viewBox='0 0 16 16'
    {...props}>
    <path
      fillRule='evenodd'
      d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
    />
  </svg>
);
const TranscriptionJob: React.FC<{
  files: File[];

  handleUploadComplete: () => void;
}> = ({ files, handleUploadComplete }) => {
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);

  const handleTranscribeRequest = async () => {
    setUploading(true);

    for (let file of files) {
      console.log(file);
      const formData = new FormData();

      if (user && user.email) {
        formData.append("email_address", user?.email);
      }
      formData.append("filename", file.name);
      formData.append("file", file);

      axios({
        method: "POST",
        headers: {
          Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
        },
        data: formData,
        url: "https://subgen.lselkins.com/jobs/",
      })
        .then(async (resp: AxiosResponse<any>) => {
          console.log(resp);
          setUploading(false);
          handleUploadComplete();
        })
        .catch((err: Error) => {
          console.error(err);
          setUploading(false);
        });
    }
  };

  if (!user) {
    return (
      <Button
        variant='outline-primary'
        size='sm'
        style={{ marginLeft: "1rem" }}
        disabled>
        Sign in!
        <ArrowRight style={{ marginLeft: ".5rem" }} />
      </Button>
    );
  }
  if (files.length === 0) {
    return (
      <Button
        variant='outline-primary'
        size='sm'
        style={{ marginLeft: "1rem" }}
        disabled>
        Select at least 1 file!
        <ArrowRight style={{ marginLeft: ".5rem" }} />
      </Button>
    );
  }
  return (
    <>
      <Button
        variant='outline-primary'
        size='sm'
        style={{
          marginLeft: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => handleTranscribeRequest()}
        disabled={uploading}>
        {uploading
          ? "Transcribing"
          : `Transcribe ${files.length}
        ${files.length === 1 ? " video" : " videos"}`}
        {uploading ? (
          <Spinner
            animation='border'
            role='status'
            style={{ height: 20, width: 20, marginLeft: 8 }}></Spinner>
        ) : (
          <ArrowRight style={{ marginLeft: ".5rem" }} />
        )}
      </Button>
    </>
  );
};

export default TranscriptionJob;
