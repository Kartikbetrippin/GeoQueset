import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../Contexts/AppContext";

const StyledDiv = styled.button`
  background: rgba(0, 0, 0, 0);
  img {
    height: 30px;
  }
`;

const FlushBtn = () => {
  const navigate = useNavigate();
  const [_, dispatcher] = useContext(AppContext);

  function handleEvent() {
    dispatcher({ type: "reset" });
    navigate("/welcome");
  }

  return (
    <StyledDiv onClick={() => handleEvent()}>
      {" "}
      <img
        src="https://img.icons8.com/?size=100&id=24338&format=png&color=FFFFFF"
        alt=""
      />
    </StyledDiv>
  );
};

export default FlushBtn;
