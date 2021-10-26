import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileList } from "./FileList";
import TranscriptionJob from "./TranscriptionJob";
const CloudUploadSVG: React.FC<{ width?: string; height?: string }> = ({
  width,
  height,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width ? width : "16"}
    height={height ? height : "16"}
    fill='currentColor'
    className='bi bi-cloud-arrow-up-fill text-primary'
    viewBox='0 0 16 16'>
    <path d='M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z' />
  </svg>
);

interface UploadDropzoneProps {
  setFiles: (file: File[]) => void;
}
const UploadDropzone: React.FC<UploadDropzoneProps> = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      // Get Thumbnails:
      // Do something with the files
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["audio/*", "video/*"],
  });

  return (
    <div>
      <div
        className='row px-5 justify-content-center'
        style={{
          paddingTop: "70px",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {/* <div className='col-12 row main-module px-4'> */}
        {/* <div
            className='col-4'
            style={{
              boxShadow: "0px 0px 5px #888888",
              clipPath: "inset(0px -5px 0px 0px)",
            }}> */}
        <div
          {...getRootProps()}
          className=' d-flex flex-column justify-content-center align-items-center p-4'>
          <h4>Upload a Video or Audio File to Begin</h4>
          <input {...getInputProps()} />
          {isDragActive ? (
            <CloudUploadSVG width='256' height='256' />
          ) : (
            <CloudUploadSVG width='256' height='256' />
          )}

          <input {...getInputProps()} />

          <button type='button' className='btn btn-primary'>
            Transcribe File
          </button>
        </div>
      </div>
      <p
        className='text-center pt-3 text-primary btn-link mb-0'
        style={{ cursor: "pointer" }}>
        For additional instructions click here.
      </p>
      {/* </div>
      </div> */}
    </div>
  );
};

const Check = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='40'
    height='40'
    fill='currentColor'
    className='bi bi-check2 text-success ml-2'
    viewBox='0 0 16 16'>
    <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
  </svg>
);
export const FileUpload: React.FC = (props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [complete, setComplete] = useState(false);
  const [selected, setSelected] = useState({});
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const handleUploadFinished = () => {
    setFiles([]);
    setComplete(true);
  };
  useEffect(() => {
    const getSelectedFiles = () => {
      const selectedFiles = [];
      for (let [key, isSelected] of Object.entries(selected)) {
        if (isSelected) selectedFiles.push(files[parseInt(key)]);
      }
      setFilesToUpload(selectedFiles);
    };
    getSelectedFiles();
  }, [files, selected]);

  if (complete) {
    return (
      <>
        <UploadDropzone
          setFiles={(file) => {
            setComplete(false);
            setFiles(file);
          }}
        />
        <div className='p-4'>
          <div style={{ display: "flex", alignItems: "center", height: 80 }}>
            <h4 style={{ marginBottom: 0 }}>Upload Success</h4>
            <Check />
          </div>
          <h5 style={{ marginBottom: 0 }}>
            You will receive an email when your transcription has completed.
          </h5>
        </div>
      </>
    );
  }
  if (files.length) {
    return (
      <>
        <UploadDropzone setFiles={(file) => setFiles(file)} />
        <div className='p-4'>
          <div style={{ display: "flex", alignItems: "center", height: 80 }}>
            <h4 style={{ marginBottom: 0 }}>Select Files to Proceed</h4>
            <TranscriptionJob
              files={filesToUpload}
              handleUploadComplete={() => handleUploadFinished()}
            />
          </div>
          <FileList
            files={files}
            setSelected={(newState: any) => setSelected(newState)}
            selected={selected}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <UploadDropzone setFiles={(files) => setFiles(files)} />
      <div className='m-4'></div>
    </>
  );
};
