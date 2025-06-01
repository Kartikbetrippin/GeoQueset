import React from "react";
import styled from "styled-components";
import AddButton from "./AddButton";
import { useContext } from "react";
import MapContext from "../Contexts/MapContext";
import { useState } from "react";
import Modal from "./Modal";
import ShowCity from "./ShowCity";
import AppContext from "../Contexts/AppContext";

const StyledDiv = styled.div`
  background-color: black;
  color: white;
  position: absolute;
  width: 100%;
  height: ${({ $active }) => ($active ? "64px" : "400px")};
  z-index: 10;
  transition: all 1s ease;
  bottom: 0px;
`;
const Puller = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  position: relative;

  button {
    color: white;
    background-color: black;
    width: 32px;
    height: 32px;
    position: absolute;
    top: -16px;
    border-radius: 16px;
  }
`;

const Editor = () => {
  const [state, mapDispatcher] = useContext(MapContext);
  const [appState, dispatcher] = useContext(AppContext);
  const [modal, setModal] = useState(false);

  return (
    <StyledDiv $active={state.active}>
      {state.active && (
        <Puller>
          <button onClick={() => mapDispatcher({ type: "deactive" })}>≡</button>
        </Puller>
      )}
      <AddButton setModal={setModal} />
      {modal && <Modal setModal={setModal} />}
      <div style={{ overflowY: "scroll", height: "100%", width: "100%" }}>
        {appState.locationVisited.map((val, index) => {
          return <ShowCity object={val} key={index} />;
        })}
      </div>
    </StyledDiv>
  );
};

export default Editor;
