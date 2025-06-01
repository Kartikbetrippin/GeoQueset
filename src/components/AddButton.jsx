import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import MapContext from "../Contexts/MapContext";

const StyledDiv = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background-color: black;
  color: white;
  border: 2px solid white;
  padding: 8px;
  border-radius: 8px;
`;

const AddButton = ({ setModal }) => {
  const [state, mapDispatcher] = useContext(MapContext);
  function handleClick() {
    setModal((s) => !s);
    mapDispatcher({ type: "active" });

    // state.ref.current.flyTo({
    //   center: [28, 11],
    //   zoom: 10,
    //   speed: 1.2,
    //   curve: 1.42,
    //   essential: true,
    // });
  }
  return <StyledDiv onClick={handleClick}>Add a place</StyledDiv>;
};

export default AddButton;
