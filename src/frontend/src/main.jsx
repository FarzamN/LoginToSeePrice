import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import "./css/style.css";
import "./css/satoshi.css";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          gutter={8}
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className:
              "text-[#000] dark:text-[#fff] bg-[#fffffff2] dark:bg-[#24303ff2] border border-[#3C50E0]",
          }}
        />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
