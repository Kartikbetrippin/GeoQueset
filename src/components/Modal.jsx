import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import MapContext from "../Contexts/MapContext";
import Spinner from "../utility/Spinner";
import { toast } from "react-toastify";
import AppContext from "../Contexts/AppContext";

const StyledDiv = styled.div`
  position: fixed;
  z-index: 1000;

  width: 300px;
  height: 300px;
  background: rgba(225, 225, 225, 0.6);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(2px);
  p {
    color: red;
  }
  button {
    width: 60%;
    padding: 4px;
    background-color: black;
    color: white;
  }
`;

const BackCover = styled.div`
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 80px 0px;
`;
const InputCity = styled.input`
  height: 40px;
  width: 80%;
  text-align: center;

  color: black;
`;
const InputDescription = styled.input`
  height: 80px;
  width: 80%;
  text-align: center;

  color: black;
`;
const Tag = styled.input`
  height: 40px;
  width: 80%;
  text-align: center;

  color: black;
`;

const Modal = ({ setModal }) => {
  const [form, setForm] = useState({ city: "", description: "", tag: "" });
  const [mapState, mapDispatcher] = useContext(MapContext);
  const [appState, dispatcher] = useContext(AppContext);
  const [fetched, setFetched] = useState({ yet: false, data: null });
  function handleFormSubmittion() {
    setModal((s) => !s);
    dispatcher({
      type: "addLocation",
      payload: {
        ...form,

        lat: fetched.data[0].lat,
        long: fetched.data[0].lon,
      },
    });
    mapDispatcher({ type: "deactive" });
  }

  useEffect(() => {
    if (!form.city) return;

    const controller = new AbortController();

    async function getCoords() {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${form.city}&format=json`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (data.length > 0) {
          console.log(data);
          const { lat, lon } = data[0];
          setFetched({ yet: true, data: data });

          mapState.ref.current.flyTo({
            center: [lon, lat],
            zoom: 12,
          });
        } else {
          console.log("No results found");
          toast.error("City not found");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          toast.error("Refresh");
        }
      }
    }

    getCoords();

    return () => {
      controller.abort(), setFetched({ yet: false, data: null });
    };
  }, [form.city]);
  return (
    <BackCover onClick={() => setModal(false)}>
      <StyledDiv onClick={(e) => e.stopPropagation()}>
        <InputCity
          value={form.city}
          onChange={(e) =>
            setForm((ob) => {
              return { ...ob, city: e.target.value };
            })
          }
          placeholder="city"
        />
        <Tag
          value={form.tag}
          onChange={(e) =>
            setForm((ob) => {
              return { ...ob, tag: e.target.value };
            })
          }
          placeholder="tag"
        />
        <InputDescription
          value={form.description}
          onChange={(e) =>
            setForm((ob) => {
              return { ...ob, description: e.target.value };
            })
          }
          placeholder="Description"
        />
        {form.city ? (
          fetched.yet ? (
            <button onClick={handleFormSubmittion}> Add </button>
          ) : (
            <Spinner />
          )
        ) : (
          <p>enter a valid city name</p>
        )}
      </StyledDiv>
    </BackCover>
  );
};

export default Modal;
