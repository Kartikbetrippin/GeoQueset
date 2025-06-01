import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../Contexts/AppContext";

import NameHolder from "../utility/NameHolder";
import Map from "../services/Map";

import { useReducer } from "react";
import MapContext from "../Contexts/MapContext";
import Editor from "../components/Editor";

const StyledDiv = styled.div``;
const intialState = {
  lat: 28.7041,
  long: 77.1025,
  zoom: 15,
  markedLocations: [],
  active: false,
  ref: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCoords": {
      return {
        ...state,
        lat: action.payload.lat,
        long: action.payload.long,
      };
    }
    case "reset": {
      return intialState;
    }
    case "setZoom": {
      return { ...state, zoom: action.payload };
    }
    case "ref": {
      return { ...state, ref: action.payload };
    }
    case "active": {
      return { ...state, active: true };
    }
    case "deactive": {
      return { ...state, active: false };
    }
    default: {
      return state;
    }
  }
}
const Base = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Home = () => {
  const [appState, dispatcher] = useContext(AppContext);
  const [mapStatus, mapDispatcher] = useReducer(reducer, intialState);

  return (
    <MapContext.Provider value={[mapStatus, mapDispatcher]}>
      <Base>
        <StyledDiv>
          <NameHolder name={appState.name} />
        </StyledDiv>
        <Map />
        <Editor />
      </Base>
    </MapContext.Provider>
  );
};

export default Home;
