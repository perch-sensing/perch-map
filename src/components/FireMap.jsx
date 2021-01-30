import ReactMapboxGl, { GeoJSONLayer, ScaleControl } from "react-mapbox-gl";
import { useState } from "react";
import { useTransition } from "react-spring";

import Legend from "../components/Legend";
import InfoCard from "../components/InfoCard";
import FireList from "./FireList";

import fireOriginJSON from "../assets/fire-origins.json";
import firePerimeterJSON from "../assets/fire-perimeters.json";
import perchSensorJSON from "../assets/sensor-locations.json";
import theme from "../theme";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoid2FpZGhvZmVyaiIsImEiOiJja2tldHZqMXMwM2NpMm9ycGg3ZzFxbWkyIn0.1i5itnOPAufAOuwd5BTq4g",
});

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
};

export default function FireMap() {
  const [location, setLocation] = useState([-121.610052, 39.763315]);
  const [zoom, setZoom] = useState([11]);
  const [fireInfo, setFireInfo] = useState(null);
  const [fireListOpen, setFireListOpen] = useState(true);

  const cardTransition = useTransition(fireInfo, null, {
    from: {
      transform: "translateY(100%)",
    },
    enter: {
      transform: "translateY(0%)",
    },
    leave: {
      transform: "translateY(100%)",
    },
  });

  function handleFireListToggle() {
    setFireListOpen((b) => !b);
    if (fireInfo) setFireInfo(null);
  }

  function handleNav(fireData) {
    setFireListOpen(false);
    let coords = [...fireData.geometry.coordinates];
    coords[0] -= 0.05;
    setLocation(coords);
    setZoom([12]);
    setFireInfo(fireData.properties);
  }

  function handleFireControlChange(increment) {
    if (!fireInfo) return;
    const fires = fireOriginJSON.features;
    const currentFireIndex = fires.findIndex(
      (f) => f.properties.NAME === fireInfo.NAME
    );
    let nextIndex = (currentFireIndex + increment) % fires.length;
    if (nextIndex < 0) nextIndex += fires.length;
    handleNav({ ...fires[nextIndex] });
  }

  function handleFireClick(e) {
    const dst = (p1, p2) =>
      Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    let coord = [e.lngLat.lng, e.lngLat.lat];
    let selectedFire = fireOriginJSON.features.find(
      (fire) => dst(fire.geometry.coordinates, coord) < 0.1
    );
    setFireListOpen(false);
    setFireInfo(selectedFire.properties);
  }

  return (
    <section className="FireMap">
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/light-v10"
        containerStyle={mapStyles}
        center={location}
        zoom={zoom}
      >
        <GeoJSONLayer
          data={firePerimeterJSON}
          fillLayout={{ visibility: "visible" }}
          fillPaint={{
            "fill-color": theme.color.problem,
            "fill-opacity": 0.4,
          }}
        />

        <GeoJSONLayer
          data={firePerimeterJSON}
          lineLayout={{ visibility: "visible" }}
          linePaint={{
            "line-color": theme.color.problem,
            "line-width": 2,
          }}
        />

        <GeoJSONLayer
          data={perchSensorJSON}
          circlePaint={{
            "circle-color": theme.color.leadBlue,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              3,
              15,
              7,
            ],
          }}
          circleLayout={{ visibility: "visible" }}
        />

        <GeoJSONLayer
          data={fireOriginJSON}
          circlePaint={{
            "circle-color": "red",
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              5,
              15,
              19,
            ],
          }}
          circleLayout={{ visibility: "visible" }}
        />

        <GeoJSONLayer
          data={fireOriginJSON}
          circlePaint={{
            "circle-stroke-color": "white",
            "circle-stroke-width": 2,
            "circle-color": "transparent",
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              2,
              15,
              18,
            ],
          }}
          circleOnClick={handleFireClick}
          circleLayout={{ visibility: "visible" }}
        />
        <ScaleControl
          measurement="mi"
          style={{
            background: "transparent",
            bottom: "20px",
            border: "none",
            boxShadow: "none",
          }}
        />
      </Map>
      <Legend />
      <FireList
        onFireSelected={handleNav}
        isOpen={fireListOpen}
        onToggle={handleFireListToggle}
      />

      {cardTransition.map(
        ({ item, props }) =>
          item && (
            <InfoCard
              key="InfoCard"
              style={props}
              onHide={() => setFireInfo(null)}
              fireInfo={fireInfo}
              onFireChange={handleFireControlChange}
            />
          )
      )}
    </section>
  );
}
