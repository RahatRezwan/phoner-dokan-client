import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider/AuthProvider";
import HomeSpinner from "./components/HomeSpinner/HomeSpinner";

const CloseButton = ({ closeToast }) => (
   <button className="btn btn-primary btn-outline" onClick={closeToast}>
      Ok
   </button>
);

function App() {
   const { homeSpinner } = useContext(AuthContext);
   if (homeSpinner) {
      return <HomeSpinner />;
   }
   return (
      <div>
         <RouterProvider router={router} />
         <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            closeButton={CloseButton}
         />
      </div>
   );
}

export default App;
