import React, { useState } from "react";
import EmailModal from "./EmailModal";

const TranscriptionJob: React.FC<{ file: File }> = ({ file }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <EmailModal
        show={modal}
        handleClose={() => setModal(false)}
        file={file}
      />
      <button
        className='btn btn-success slide-in-up'
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
        onClick={() => setModal(true)}>
        Transcribe
      </button>
    </>
  );
};

export default TranscriptionJob;
