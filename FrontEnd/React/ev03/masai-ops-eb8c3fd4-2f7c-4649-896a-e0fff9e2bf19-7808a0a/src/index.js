import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppContextProvider from "./Context/AppContext.jsx"
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AppContextProvider>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter> 
   </AppContextProvider>
);
