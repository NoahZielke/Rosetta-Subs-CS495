import { ToolMenu } from "../components/ToolMenu";
import { AuthNavbar } from "../components/AuthNavbar";

const AppHome = () => {
  return (
    <div>
      {/* Remove navbar with sign-in/authentication until sign-in is persistent site-wide */}
      <AuthNavbar /> 

      <ToolMenu />
    </div>
  );
};

export default AppHome;
