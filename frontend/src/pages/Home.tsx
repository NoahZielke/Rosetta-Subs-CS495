import React from "react";
import { FileUpload } from "../components/FileUpload";
import Layout from "../Layout";

const Home = () => {
  return (
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
  );
};

export default Home;
