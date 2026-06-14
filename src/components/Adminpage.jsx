import { Navigate } from "react-router-dom";

/** Legacy route — redirects to the main admin dashboard */
function Adminpage() {
  return <Navigate to="/admin-page" replace />;
}

export default Adminpage;
