import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playgrounds from "./routes/Playgrounds";
import { PrivateRoute } from "./components/PrivateRoute";
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
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
