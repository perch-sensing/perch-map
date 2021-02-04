/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const legendCss = (theme) => css`
  display: flex;
  padding: 10px 40px;
  background-color: white;
  min-width: max-content;
  box-shadow: ${theme.shadow.card};
`;

const legendListCss = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const mapElementWrapperCss = css`
  display: inline-block;
  width: 30px;
  text-align: center;
`;

const mapElementCss = css`
  margin: 10px 0;
`;

const labelCss = css`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  font-size: 15px;
  font-weight: 300px;
  margin-left: 10px;
`;

const iconCss = css`
  display: inline-block;
  vertical-align: middle;
`;

const fireOriginCss = css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  border: 2px solid white;
`;

const perchSensorCss = (theme) => css`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${theme.color.leadBlue};
`;
const burnAreaCss = (theme) => css`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: ${theme.color.problem};
  border: 2px solid ${theme.color.problem};
  opacity: 0.4;
  margin-bottom: 1px;
`;

const legendContents = {
  "Fire Origin": fireOriginCss,
  "Perch Sensor": perchSensorCss,
  "Burn Area": burnAreaCss,
};

/**
 * A marker in the Legend
 */
const MapElement = ({ mapIconCss, label }) => {
  return (
    <li css={mapElementCss}>
      <div css={mapElementWrapperCss}>
        <i css={[iconCss, mapIconCss]}></i>
      </div>
      <p css={labelCss}>{label}</p>
    </li>
  );
};

export default function Legend() {
  return (
    <aside css={legendCss}>
      <ul css={legendListCss}>
        {Object.entries(legendContents).map(([label, css]) => (
          <MapElement mapIconCss={css} label={label} key={label} />
        ))}
      </ul>
    </aside>
  );
}
