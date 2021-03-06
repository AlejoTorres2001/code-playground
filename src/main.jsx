import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playgrounds from "./routes/Playgrounds";
import { PrivateRoute } from "./components/PrivateRoute";
import FullScreen from "./routes/FullScreen";

//service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("sw registered!");
    })
    .catch((err) => {
      console.log("sw not registered!");
    });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<App />} />
          <Route path="/" element={<App />} />
          <Route
            path="/playgrounds"
            element={
              <PrivateRoute>
                <Playgrounds />
              </PrivateRoute>
            }
          />
          <Route path="/fullscreen" element={<FullScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
