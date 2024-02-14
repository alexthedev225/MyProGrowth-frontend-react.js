import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


Modal.setAppElement('#root'); // Assurez-vous de remplacer '#root' par le sélecteur correct de votre élément racine

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
