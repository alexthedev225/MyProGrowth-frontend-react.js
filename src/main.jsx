import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Assurez-vous de remplacer '#root' par le sélecteur correct de votre élément racine

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
