import React, { SVGProps, useRef, useState } from "react";
import { Col, Container, InputGroup, Row } from "react-bootstrap";

const VideoInfo: React.FC<{
  video: File;
  duration: number | null;
  selected: boolean;
}> = ({ video, duration, selected }) => {
  const CheckCircleFill: React.FC<SVGProps<any>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#017BFE"
      className="bi bi-check-circle-fill"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  );

  const EmptyCircle: React.FC<SVGProps<any>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#017BFE"
      className="bi bi-circle"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    </svg>
  );
  return (
    <Container>
      <Row>
        <p className="lead mb-0"> {video.name}</p>
      </Row>
      <Row style={{ zIndex: 10 }}>
        {duration?.toFixed(0)} s | {(video.size / 1000000).toFixed(2)} MB
        {selected ? (
          <CheckCircleFill
            style={{ zIndex: 100, position: "absolute", right: 30, bottom: 35 }}
          />
        ) : (
          <EmptyCircle
            style={{ zIndex: 100, position: "absolute", right: 30, bottom: 35 }}
          />
        )}
      </Row>
    </Container>
    // <div
    //   style={{
    //     position: "absolute",
    //     bottom: 0,
    //     left: 0,
    //     width: "100%",
    //     height: "20px",
    //     background: "rgba(0,0,0,0.3)",
    //   }}
    // >
    //   <p
    //     style={{
    //       cursor: "pointer",
    //       position: "absolute",
    //       marginTop: ".25rem",
    //       paddingLeft: ".5rem",
    //       bottom: "1.75rem",
    //       // textAlign: "center",
    //       width: "100%",
    //       color: "white",
    //     }}
    //   >
    //     {file.name}
    //     <>
    //       {duration?.toFixed(0)}
    //       <p style={{ fontSize: 14 }}>s </p>
    //       <p style={{ paddingLeft: 5, paddingRight: 5 }}>|</p>
    //       {(file.size / 1000000).toFixed(2)} MB
    //     </>
    //     <p style={{ fontSize: 14 }}>MB</p>
    //   </p>

    //   {/* <div
    //     style={{
    //       width: "100%",
    //       position: "absolute",
    //       paddingLeft: ".5rem",
    //       paddingBottom: ".5rem",
    //       bottom: 0,
    //       color: "white",
    //       display: "flex",
    //       alignItems: "baseline",
    //       background: "rgba(0,0,0,0.3)",
    //     }}
    //   >

    //   </div> */}

    //   <input
    //     type="checkbox"
    //     checked={selected}
    //     style={{
    //       zIndex: 3,
    //       right: ".5rem",
    //       bottom: ".75rem",
    //       position: "absolute",
    //       width: 25,
    //       height: 25,
    //     }}
    //   />
    // </div>
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
    <Container
      style={{ marginBottom: 20, width: "100%", cursor: "pointer" }}
      onClick={() => setSelected(!selected)}
      className="border pb-0 p-1"
    >
      {/* <CardOverlay file={file} duration={duration} selected={selected} /> */}
      <Container>
        <Row>
          <video
            // width="100%"
            // height="auto"
            style={{ width: "100%", height: "auto" }}
            ref={video}
            onLoadedData={() => {
              const vid = document.createElement("video");
              vid.src = fileURL;
              vid.ondurationchange = () => {
                setDuration(vid.duration);
              };
            }}
          >
            <source src={fileURL} type="video/mp4" />
          </video>
        </Row>
        <Row>
          <VideoInfo video={file} duration={duration} selected={selected} />
        </Row>
        {/* <Container
          style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button variant='primary'>Start Transcription</Button>
        </Container> */}
      </Container>
    </Container>
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
              <Col xs={12} sm={6} md={4} lg={3} key={file.name}>
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
