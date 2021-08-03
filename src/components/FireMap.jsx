/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ReactMapboxGl, { GeoJSONLayer, ScaleControl } from "react-mapbox-gl";
import { useState, useEffect } from "react";
import { useTransition } from "react-spring";
import { breakpointActive } from "../utils";
import { HelpCircle } from "react-feather";

import Legend from "./Legend";
import InfoCard from "./InfoCard";
import FireList from "./FireList";
import PageOverview from "./PageOverview";

import fireOriginJSON from "../assets/fire-origins.json";
import firePerimeterJSON from "../assets/fire-perimeters.json";
import perchSensorJSON from "../assets/sensor-locations.json";
import theme from "../theme";
  
const fireMapCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(400px, 600px) minmax(50px, 1fr) minmax(
      300px,
      600px
    );
  grid-template-rows: 100px 1fr 1fr;
  grid-template-areas:
    "fire-nav top page-overview"
    "fire-info mid page-overview"
    " fire-info bottom legend";

  ${theme.breakpoint.small} {
    grid-template-columns: 1fr;
    grid-template-rows: 40vh 60vh;
    grid-template-areas:
      "fire-nav"
      "fire-info";
  }
`;

const gridAreaCss = css`
  width: 100%;
  height: 100%;
`;

const fireNavWrapperCss = css`
  grid-area: fire-nav;
  align-self: flex-end;
  justify-self: flex-start;
  margin-left: 20px;
  padding-bottom: 13px;

  ${theme.breakpoint.small} {
    margin-top: 20px;
    align-self: flex-start;
  }
`;

const pageOverviewWrapperCss = css`
  position: relative;
  grid-area: page-overview;
  margin-right: 25px;
  align-self: flex-start;
  justify-self: flex-end;

  ${theme.breakpoint.small} {
    position: absolute;
    grid-area: initial;
    top: 0;
    right: 0;
    margin-right: 0px;
  }
`;

const helpButtonCss = css`
  position: absolute;
  top: 35px;
  right: 35px;
`;

const fireLegendWrapperCss = css`
  display: block;
  grid-area: legend;
  z-index: 1;
  align-self: flex-end;
  justify-self: flex-end;
  margin: 20px;
  margin-bottom: 50px;
  pointer-events: none;

  ${theme.breakpoint.small} {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: auto;
    height: auto;
  }
`;

const fireInfoWrapperCss = css`
  ${gridAreaCss};
  grid-area: fire-info;
  margin-left: 25px;

  ${theme.breakpoint.small} {
    margin-left: 0px;
  }
`;

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
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [fireListOpen, setFireListOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("visitedMapPage")) return;
    setOverviewOpen(true);
    localStorage.setItem("visitedMapPage", true);
  }, []);

  const fireCardTransition = useTransition(fireInfo, null, {
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

  const pageOverviewTransition = useTransition(overviewOpen, null, {
    from: {
      transform: "translateY(-110%)",
    },
    enter: {
      transform: "translateY(0%)",
    },
    leave: {
      transform: "translateY(-110%)",
    },
  });

  function handleFireListToggle() {
    setFireListOpen((b) => !b);
    if (fireInfo) setFireInfo(null);
  }

  function handleNav(fireData) {
    setFireListOpen(false);
    let coords = [...fireData.geometry.coordinates];
    if (breakpointActive(theme.breakpoint.small)) {
      // center fire near top of screen
      coords[1] -= 0.03;
    } else {
      // center fire near right of screen
      coords[0] -= 0.04;
    }

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

  function handleFireRegionClick(e) {
    let coord = [e.lngLat.lng, e.lngLat.lat];
    let selectedFire = firePerimeterJSON.features.find(
      (fire) => 
      console.log(fire.geometry.coordinates)
    );
    console.log(selectedFire)
    setFireListOpen(false);
    setFireInfo(selectedFire.properties);
  }

  return (
    <main className="FireMap" css={fireMapCss}>
      
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
          fillOnClick={handleFireRegionClick}
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
            zIndex: 5,
          }}
        />
      </Map>

      <section css={fireNavWrapperCss}>
        <FireList
          onFireSelected={handleNav}
          isOpen={fireListOpen}
          onToggle={handleFireListToggle}
        />
      </section>
      <section css={pageOverviewWrapperCss}>
        <button
          className="wrapper"
          css={helpButtonCss}
          onClick={() => setOverviewOpen(true)}
        >
          <HelpCircle size={30} />
        </button>

        {pageOverviewTransition.map(
          ({ item, props }) =>
            item && (
              <PageOverview
                key="PageOverview"
                style={props}
                onHide={() => setOverviewOpen(false)}
              />
            )
        )}
      </section>
      <section css={fireLegendWrapperCss}>
        <Legend />
      </section>
      <section css={fireInfoWrapperCss}>
        {fireCardTransition.map(
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
    </main>
  );
}
