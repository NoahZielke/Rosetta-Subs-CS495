import React from "react";
import { FileUpload } from "./components/FileUpload";
import Layout from "./Layout";

function App() {
  return (
    <div className='App' style={{ margin: 0, padding: 0 }}>
      <Layout>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          React Docs
        </a>

        <FileUpload />
      </Layout>
    </div>
  );
}

export default App;
