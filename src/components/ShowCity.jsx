import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import MapContext from "../Contexts/MapContext";
import maplibregl from "maplibre-gl";
import AppContext from "../Contexts/AppContext";

const StyledDiv = styled.div`
  width: 70%;
  border: 1px solid white;
  border-radius: 8px;
  padding: 16px 16px 16px 16px;
  margin-top: 24px;
  display: flex;
  align-items: center;

  div {
    flex: 3;
  }

  button {
    flex: 1;
    background-color: black;

    svg {
      width: 16px;
    }
  }

  span > button {
    flex: 1;

    svg {
      width: 16px;
    }
  }
`;

const ShowCity = ({ object: { city, tag, description, lat, long } }) => {
  const [state, mapDispatcher] = useContext(MapContext);
  const [_, dispatcher] = useContext(AppContext);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!state.ref?.current) return;

    markerRef.current = new maplibregl.Marker({ color: "red" })
      .setLngLat([long, lat])
      .addTo(state.ref.current);

    return () => {
      if (markerRef.current) markerRef.current.remove();
    };
  }, [lat, long, state.ref]);

  const flyToMarker = () => {
    state.ref.current?.flyTo({
      center: [long, lat],
      zoom: 12,
    });
  };

  const removeCity = () => {
    if (markerRef.current) {
      markerRef.current.remove();
    }

    dispatcher({ type: "removeLocation", payload: city });
  };

  return (
    <StyledDiv>
      <div>
        <h3>{city}</h3>
        <h4>{tag}</h4>
        <h5>{description}</h5>
      </div>
      <button onClick={flyToMarker}>📍</button>
      <span>
        <button onClick={removeCity}>❌</button>
      </span>
    </StyledDiv>
  );
};

export default ShowCity;
