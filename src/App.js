import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CloseButton = ({ closeToast }) => (
   <button className="btn btn-primary btn-outline" onClick={closeToast}>
      Ok
   </button>
);

function App() {
   return (
      <div>
         <RouterProvider router={router} />
         <ToastContainer
            position="top-center"
            autoClose={15000}
            theme="dark"
            closeButton={CloseButton}
         />
      </div>
   );
}

export default App;
