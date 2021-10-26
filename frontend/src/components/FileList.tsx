import React, { useRef, useState } from "react";
import { Card, Col, Container, InputGroup, Row } from "react-bootstrap";

const CardOverlay: React.FC<{
  file: File;
  duration: number | null;
  selected: boolean;
}> = ({ file, duration, selected }) => {
  return (
    <>
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          marginTop: ".25rem",
          paddingLeft: ".5rem",
          bottom: "1.75rem",
          // textAlign: "center",
          width: 360,
          color: "white",
          background: "rgba(0,0,0,0.3)",
        }}>
        {file.name}
      </div>

      <div
        style={{
          width: "100%",
          position: "absolute",
          paddingLeft: ".5rem",
          paddingBottom: ".5rem",
          bottom: 0,
          color: "white",
          display: "flex",
          alignItems: "baseline",
          background: "rgba(0,0,0,0.3)",
        }}>
        <>
          {duration?.toFixed(0)}
          <div style={{ fontSize: 14 }}>s </div>
          <div style={{ paddingLeft: 5, paddingRight: 5 }}>|</div>
          {(file.size / 1000000).toFixed(2)}
        </>
        <div style={{ fontSize: 14 }}>MB</div>
      </div>

      <input
        type='checkbox'
        checked={selected}
        style={{
          zIndex: 3,
          right: ".5rem",
          bottom: ".75rem",
          position: "absolute",
          width: 25,
          height: 25,
        }}
      />
    </>
  );
};

interface CardProps {
  file: File;
  setSelected: (boolean: any) => void;
  selected: boolean;
}
const FileCard: React.FC<CardProps> = ({ file, setSelected, selected }) => {
  const fileURL = URL.createObjectURL(file);
  const video = useRef(null);

  const [duration, setDuration] = useState<number | null>(null);

  document?.querySelector("#input")?.addEventListener("change", function () {
    const vid = document.createElement("video");
    vid.src = fileURL;
    // wait for duration to change from NaN to the actual duration
    vid.ondurationchange = function () {
      alert(vid.duration);
    };
  });

  return (
    <Card
      style={{ marginBottom: 20, width: 360, cursor: "pointer" }}
      onClick={() => setSelected(!selected)}>
      <Card.Body
        className='p-0'
        style={{
          display: "flex",
          position: "relative",
          width: 360,
          height: "100%",
        }}>
        <CardOverlay file={file} duration={duration} selected={selected} />
        <video
          width='360'
          ref={video}
          onLoadedData={() => {
            const vid = document.createElement("video");
            vid.src = fileURL;
            vid.ondurationchange = () => {
              setDuration(vid.duration);
            };
          }}>
          <source src={fileURL} type='video/mp4' />
        </video>
        {/* <Container
          style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button variant='primary'>Start Transcription</Button>
        </Container> */}
      </Card.Body>
    </Card>
  );
};

export const FileList: React.FC<{
  files: File[];
  setSelected: any;
  selected: any;
}> = ({ files, setSelected, selected }) => {
  return (
    <Container style={{ display: "flex", justifyContent: "çenter" }}>
      <InputGroup>
        <Row>
          {files.map((file, index) => {
            if (!(index in selected)) {
              const newSelected = {
                [index]: true,
                ...selected,
              };
              setSelected(newSelected);
            }
            return (
              <Col key={file.name}>
                <FileCard
                  file={file}
                  setSelected={(val: boolean) =>
                    setSelected({
                      ...selected,
                      [index]: val,
                    })
                  }
                  selected={selected[index]}
                />
              </Col>
            );
          })}
        </Row>
      </InputGroup>
    </Container>
  );
};
