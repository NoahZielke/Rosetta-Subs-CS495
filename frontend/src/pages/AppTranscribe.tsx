import { TranscribeFileUpload } from "../components/TranscribeFileUpload";
import { AuthNavbar } from "../components/AuthNavbar";

const AppTranscribe = () => {
  return (
    <div style={{ marginBottom: 50 }}>
      <AuthNavbar />
      
      <TranscribeFileUpload />
    </div>
  );
};

export default AppTranscribe;
