import { AuthNavbar } from "../components/AuthNavbar";
import { TranscribeFileUpload } from "../components/TranscribeFileUpload";

const AppTranscribe = () => {
  return (
    <div style={{ marginBottom: 50 }}>
      <AuthNavbar />

      <TranscribeFileUpload />
    </div>
  );
};

export default AppTranscribe;
