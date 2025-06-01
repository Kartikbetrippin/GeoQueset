import { useEffect, useRef } from "react";
import styled from "styled-components";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext } from "react";
import MapContext from "../Contexts/MapContext";
import { useState } from "react";

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [mapState, mapDispatcher] = useContext(MapContext);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapDispatcher({
            type: "setCoords",
            payload: { long: longitude, lat: latitude },
          });
          setFetched(() => true);
        },
        (error) => {
          console.error("Could not Fetch location", error);
          mapDispatcher({ type: "reset" });
        }
      );
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [mapState.long, mapState.lat],
      zoom: mapState.zoom,
      pitch: 60,
      bearing: -20,
      attributionControl: false,
    });

    mapDispatcher({ type: "ref", payload: mapRef });
  }, [fetched]);

  useEffect(() => {
    function handleMoveEnd() {
      const position = mapRef.current.getCenter();
      mapDispatcher({
        type: "setCoords",
        payload: { long: position.lng, lat: position.lat },
      });
    }
    function handleZoom() {
      const zoom = mapRef.current.getZoom();
      mapDispatcher({ type: "setZoom", payload: zoom });
    }
    function handleMoveStart() {
      if (mapState.active) return;
      mapDispatcher({ type: "active" });
    }
    mapRef.current.on("moveend", handleMoveEnd);
    mapRef.current.on("zoomend", handleZoom);
    mapRef.current.on("movestart", handleMoveStart);
  }, [mapState]);

  return (
    <MapWrapper $isActive={mapState.isMapActive}>
      <MapContainer ref={mapContainer} />
    </MapWrapper>
  );
};

export default Map;
