import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone, DropzoneState } from "react-dropzone";
import { resolve } from "url";
import { getMetadata, getThumbnails } from "video-metadata-thumbnails";


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
      <div className="row px-5 justify-content-center" style={{padding: "70px 0", alignItems: "center", justifyContent: "center",}}>
        <div className="col-12 row main-module px-4">
          <div className='col-4' style={{boxShadow: "0px 0px 5px #888888", clipPath: "inset(0px -5px 0px 0px)"}}>
            <div
              {...getRootProps()}
              className=' d-flex flex-column justify-content-center align-items-center p-4'>
              <input {...getInputProps()} />
              {isDragActive ? (
                <CloudUploadSVG width='128' height='128' />
              ) : (
                <CloudUploadSVG width='128' height='128' />
              )}

              <input {...getInputProps()} />

              <button type='button' className='btn btn-primary'>
                Transcribe File
              </button>
            </div>
          </div>
          <div className='col-8'>
                <ol className='py-4' style={{fontSize:"larger", listStyle:"inside", textAlign:"left"}}>
                  <li>Simply upload your video file, and press "Start"</li>
                  <li>Select such and such options if you want such and such features</li>
                  <li>Some of these instructions will change as get further along in the project</li>
                </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileList: React.FC<{ files: File[] }> = ({ files }) => {
  const [fileStates, setFileStates] = useState();

  async function generateThumbnail(file: File) {
    const metadata = await getMetadata(file);
    const thumbnails = await getThumbnails(file, {
      quality: 0.6,
      start: 0,
      end: 0,
    });
    console.log("Metadata: ", metadata);
    console.log("Thumbnails: ", thumbnails);

    return thumbnails[0];
  }

  files.forEach(async (file) => {
    console.log(file);
    const thumbnail = await generateThumbnail(file);
  });

  return (
    <>
      {files.map((file) => (
        <div className='row' key={file.name}>
          {file.name} - {file.size} bytes
        </div>
      ))}
      <div> files will de displayed here</div>
    </>
  );
};
export const FileUpload: React.FC = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <section>
      <UploadDropzone setFiles={(files) => setFiles(files)} />
      <div className='pt-4'>
        {files.length ? (
          <>
            <h4>Processing Files</h4>
            <FileList files={files} />
          </>
        ) : (
          //<h4>Upload a File to Begin</h4>
          <h4></h4> 
        )}
      </div>
    </section>
  );
};
