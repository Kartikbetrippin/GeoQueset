// Spinner.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $fullscreen }) => ($fullscreen ? "100vh" : "auto")};
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: ${({ size }) => size || "40px"};
  height: ${({ size }) => size || "40px"};
  animation: ${spin} 1s linear infinite;
`;

const Spinner = ({ size, fullScreen = false }) => {
  return (
    <SpinnerWrapper $fullscreen={fullScreen}>
      <Loader size={size} />
    </SpinnerWrapper>
  );
};

export default Spinner;
