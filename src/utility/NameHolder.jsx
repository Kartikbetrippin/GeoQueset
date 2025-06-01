import React from "react";
import styled from "styled-components";
import FlushBtn from "./FlushBtn";

const StyledDiv = styled.div`
  color: white;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  border-radius: 0px 0px 16px 16px;
  padding: 16px;
  display: flex;
  height: fit-content;
  justify-content: space-between;
  border-bottom: 2px solid black;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
`;

const NameHolder = ({ name }) => {
  return (
    <StyledDiv>
      <p>
        Welcome,
        <br /> {` ${name}`}
      </p>
      <FlushBtn />
    </StyledDiv>
  );
};

export default NameHolder;
