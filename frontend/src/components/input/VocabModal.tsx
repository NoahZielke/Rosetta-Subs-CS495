import axios, { AxiosResponse } from "axios";
import { userInfo } from "os";
import React, { SVGProps, useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import teamLogo from "../../images/app-logo-75px.png";

const WordIcon: React.FC<any> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-file-earmark-word-fill"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.485 6.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 9.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z" />
  </svg>
);

export const VocabButton = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        style={{ marginLeft: "1rem" }}
        onClick={() => setModal(true)}
      >
        Vocbulary
        <WordIcon style={{ marginLeft: ".5rem", marginBottom: ".15rem" }} />
      </Button>
      {modal ? <VocabModal handleClose={() => setModal(false)} /> : undefined}
    </>
  );
};

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <p
      aria-label="Close"
      style={{
        width: 20,
        height: 20,
        position: "absolute",
        right: 24,
        top: 0,
        fontSize: 30,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      &#10006;
    </p>
  );
};

const AddButton: React.FC<{ addWord: () => void }> = ({ addWord }) => {
  const PlusIcon: React.FC<SVGProps<any>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-plus-lg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
      />
    </svg>
  );
  return (
    <Button
      variant="outline-primary"
      size="sm"
      style={{ marginTop: "1rem" }}
      onClick={() => addWord()}
    >
      Add Word
      <PlusIcon
        style={{
          marginLeft: ".25rem",
          marginBottom: ".15rem",
          strokeWidth: 500,
        }}
      />
    </Button>
  );
};

const ResetIcon: React.FC<SVGProps<any>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-counterclockwise"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill-rule="evenodd"
      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
  </svg>
);

export const VocabModal: React.FC<{
  handleClose: () => void;
}> = ({ handleClose }) => {
  const [alert, setAlert] = useState<React.ReactElement<AlertProps> | null>(
    null
  );

  const [words, setWords] = useState<string[] | null>(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserVocab() {
      const data = new FormData();
      if (user) {
        setAlert(<Alert variant="info"> Fetching...</Alert>);
        console.log("Fetching Vocab. user.email is", user?.email);
        data.append("email", user.email);

        axios({
          method: "POST",
          headers: {
            Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
          },
          data: data,
          url: "https://subgen.lselkins.com/display_vocab/",
        })
          .then(async (resp: AxiosResponse<any>) => {
            console.log("resp", resp);
            setWords(resp.data);
            setAlert(null);
          })
          .catch((err: Error) => {
            console.error("Fetching vocab failed");
            console.error(err);
            console.error(err.message);
            setAlert(<Alert variant="danger">Try again later.</Alert>);
          });
      }
    }

    getUserVocab();
  }, []);

  const submitForm = () => {
    if (user) {
      console.log("Creating Words");
      setUploading(true);
      setAlert(<Alert variant="info"> Saving...</Alert>);

      axios({
        method: "POST",
        headers: {
          Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
        },
        data: {
          email: user.email,
          words: words,
        },
        url: "https://subgen.lselkins.com/input_vocab/",
      })
        .then(async (resp: AxiosResponse<any>) => {
          console.log(resp);
          if (resp.data === null) setWords(null);
          else {
            setWords(Object.values(resp.data));
          }
          setWords(resp.data);
          setUploading(false);
          setAlert(
            <Alert variant="success">Your vocabulary has been saved.</Alert>
          );
        })
        .catch((err: Error) => {
          setUploading(false);
          console.error("Creating words failed");
          console.error(err);
          console.error(err.message);
          setAlert(<Alert variant="danger">Please try again.</Alert>);
        });
    }
  };

  const addWord = () => {
    const newWords: string[] = [];
    if (words) {
      words.forEach((word) => newWords.push(word));
      newWords.push(`Word ${words.length + 1}`);
    } else {
      newWords.push("Word 1");
    }
    setWords(newWords);
  };

  const deleteWords = () => {
    if (user) {
      axios({
        method: "POST",
        headers: {
          Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
        },
        data: {
          email: user.email,
        },
        url: "https://subgen.lselkins.com/delete_vocab/",
      })
        .then(async (resp: AxiosResponse<any>) => {
          console.log("Delete Response", resp);
          setWords(null);
          setAlert(
            <Alert variant="danger"> Your vocabulary has been deleted.</Alert>
          );
        })
        .catch((err: Error) => {
          console.error("Deleting vocab failed");
          console.error(err);
          console.error(err.message);
          setAlert(<Alert variant="danger">Please try again.</Alert>);
        });
    }
  };
  return (
    <Modal show={true} onHide={() => handleClose()}>
      <Modal.Header>
        <CloseButton onClick={() => handleClose()} />
        <Modal.Title>Video Vocabulary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={teamLogo}
            style={{ height: "75px", width: "75px", marginLeft: 15 }}
            alt="App logo"
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginLeft: "30px",
            }}
          >
            <InputGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginLeft: "30px",
                }}
              >
                <p className="lead" style={{ fontSize: 16 }}>
                  Adding vocabulary to words and acronyms enables improved
                  interpretation.
                </p>

                {words !== null
                  ? words.map((word, index) => (
                      <FormControl
                        className="mb-1"
                        value={word}
                        onChange={(event) => {
                          const newWords = [];
                          words.forEach((word) => newWords.push(word));
                          newWords[index] = event.target.value;
                          setWords(newWords);
                        }}
                        placeholder={`Vocab Word ${index + 1}`}
                      />
                    ))
                  : undefined}

                <AddButton addWord={() => addWord()} />
              </div>
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          style={{ position: "absolute", left: 16 }}
          onClick={() => deleteWords()}
        >
          {"Reset "}
          <ResetIcon />
        </Button>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => submitForm()}
          disabled={uploading}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
