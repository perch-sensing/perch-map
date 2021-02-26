/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { X as XIcon } from "react-feather";
import { a } from "react-spring";

const infoCardCss = (theme) => css`
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 8;
  margin-top: 10px;
  box-shadow: ${theme.shadow.card};

  ${theme.breakpoint.small} {
    margin-top: 0;
    height: 100vh;
  }
`;

const closeIconCss = css`
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const ctaButtonCss = (theme) => css`
  margin-top: 20px;
  display: none;

  ${theme.breakpoint.small} {
    display: block;
  }
`;

const findingsTitleCss = (theme) => css`
  font-size: 27px;
  color: ${theme.color.flame};
  padding-top: 10px;
`;

const contentCss = css`
  padding: 50px;
  padding-top: 70px;
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const titleTextCss = (theme) => css`
  color: ${theme.color.flame};
  font-size: 40px;
  font-weight: 600;
`;

const metricList = (theme) => css`
  padding-left: 20px;
  li {
    margin: 7px 0;
    padding-left: 7px;
    font-size: 16px;
  }

  b {
    color: ${theme.color.flame};
  }
`;

export default function PageOverview({ onHide, style }) {
  return (
    <a.article css={infoCardCss} style={style}>
      <nav>
        <XIcon onClick={onHide} css={closeIconCss} />
      </nav>
      <div css={contentCss}>
        <h2 css={titleTextCss}>Perch Sensing Fire Map</h2>
        <p>
          Many of the deadliest fires in California history could have been
          quickly reported by a Perch Sensor. Visit the origins of 7
          historically destructive wildfires and see the range of sensor
          deployment locations within a mile of the fire. Click on the red
          origin dot of each fire to evaluate the financial and human cost of
          the disaster.
        </p>
        <h3 css={findingsTitleCss}>Key Metrics</h3>
        <ul css={metricList}>
          <li>
            <b>140 m</b> detection radius for a single Perch Sensor.
          </li>
          <li>
            <b>3 fires</b> would have been immediately detected by a Perch
            Sensor.
          </li>
          <li>
            <b>33 sensors</b> are within a mile of the fire origin, on average.
          </li>
          <li>
            <b>170 m</b> from the fire origin to the nearest possible sensor, on
            average.
          </li>
        </ul>
        <button className="cta" css={ctaButtonCss} onClick={onHide}>
          Explore Map
        </button>
      </div>
    </a.article>
  );
}
