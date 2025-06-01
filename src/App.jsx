import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WelcomeGuard from "./pages/WelcomeGuard";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./index.css";
import { useReducer } from "react";
import AppContext from "./Contexts/AppContext";
import { useEffect } from "react";
import Welcome from "./pages/Welcome";
import { ToastContainer } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "setName": {
      return { ...state, name: action.payload };
    }

    case "addLocation": {
      const exists = state.locationVisited.some(
        (loc) => loc.city.toLowerCase() === action.payload.city.toLowerCase()
      );

      if (exists) return state;

      return {
        ...state,
        locationVisited: [...state.locationVisited, action.payload],
      };
    }

    case "removeLocation": {
      return {
        ...state,
        locationVisited: state.locationVisited.filter(
          (loc) => loc.city.toLowerCase() !== action.payload.toLowerCase()
        ),
      };
    }

    case "reset": {
      return {
        name: "",
        locationVisited: [],
      };
    }

    default:
      return state;
  }
}

const initialState = JSON.parse(localStorage.getItem("appState")) || {
  name: "",
  locationVisited: [],
};

const App = () => {
  const [appState, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={[appState, dispatcher]}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/welcome" />} />
          <Route
            path="/welcome"
            element={
              <WelcomeGuard>
                <Welcome />
              </WelcomeGuard>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </AppContext.Provider>
  );
};

export default App;
