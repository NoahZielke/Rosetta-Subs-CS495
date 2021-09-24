import React from "react";

const StartButton: React.FC = () => {
  return (
    <button
      className='btn btn-success slide-in-up'
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
      }}>
      Start Transcription
    </button>
  );
};

export default StartButton;
