import React, { useState, useContext, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import AppContext from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const bounce = keyframes`
  0% { transform: translateY(-10px); opacity: 0; }
  30% { transform: translateY(0px); }
  60% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
`;

const VideoBackground = styled.video`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const StyledDiv = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 32px;
  position: relative;
  z-index: 1;
  h1,
  h2 {
    text-align: center;
  }
  & > div {
    text-align: center;
  }
`;

const AnimatedHeading = styled.h1`
  display: flex;
  gap: 3px;
  font-size: 3rem;
  justify-content: center;

  span {
    display: inline-block;
    animation: ${bounce} 5s ease-in-out forwards;
    animation-delay: calc(var(--i) * 0.1s);
    opacity: 0;
  }
`;

const Modal = styled.div`
  height: 30%;
  width: 80%;

  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  input {
    padding: 16px;
    font-size: 1rem;
    background-color: black;
    border: 2px solid white;
    color: white;
  }

  input::placeholder {
    color: white;
    opacity: 0.4;
    font-size: 0.7rem;
  }

  button {
    display: block;
    background-color: black;
    color: white;
    border: 1px solid white;
    width: 100%;
    height: 15%;
  }

  button:active {
    background-color: white;
    color: black;
  }
`;

const Welcome = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const reference = useRef();
  const [_, dispatcher] = useContext(AppContext);

  const handleEvent = () => {
    if (!input) return;

    dispatcher({ type: "setName", payload: input });
    navigate("/home");
  };

  useEffect(() => {
    reference.current?.focus();
  }, []);

  const text = "GeoQuest";

  return (
    <>
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline
        src="https://res.cloudinary.com/dc38axkmf/video/upload/ac_none,q_auto:best,vc_auto/v1748726279/My_most_beautiful_drone_shot_Cinematic_FPV_on_an_empty_beach_online-video-cutter.com_txjen9.mp4
"
        type="video/mp4"
      />
      <StyledDiv>
        <div>
          <AnimatedHeading>
            {[...text].map((char, i) => (
              <span key={i} style={{ "--i": i }}>
                {char}
              </span>
            ))}
          </AnimatedHeading>
          <h2>Mark your journey. Remember every place.</h2>
        </div>
        <Modal>
          <h3>Enter your Name</h3>

          <input
            type="text"
            placeholder="right here"
            ref={reference}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEvent()}
          />
          <button onClick={handleEvent}>Enter</button>
        </Modal>
      </StyledDiv>
    </>
  );
};

export default Welcome;
