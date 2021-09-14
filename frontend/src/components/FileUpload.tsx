import React, { ReactPropTypes } from "react";
import { useDropzone, DropzoneState } from "react-dropzone";

export const FileUpload: React.FC = (props) => {
  const { acceptedFiles, getRootProps, getInputProps }: DropzoneState =
    useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <section className='container-md border rounded'>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};
