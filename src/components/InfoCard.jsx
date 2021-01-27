/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { a } from "react-spring";
import { X as XIcon } from "react-feather";
import DirectionalControls from "./DirectionalControls";

const infoCardCss = css`
  position: absolute;
  bottom: 0;
  left: 20px;
  background-color: white;
  max-width: 500px;
  width: 50%;
  min-width: 300px;
  height: 80%;
`;

const contentCss = css`
  padding: 50px;
  padding-top: 70px;
  background-color: white;
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
`;

const directionalControlCss = css`
  position: absolute;
  top: -75px;
  right: 0;
`;

const closeIconCss = css`
  position: fixed;
  top: 25px;
  left: 25px;
  cursor: pointer;
`;

const titleCss = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const titleTextCss = (theme) => css`
  color: ${theme.color.flame};
  font-size: 40px;
  font-weight: 600;
`;

const fireDateCss = (theme) => css`
  color: ${theme.color.slate};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 17px;
  font-family: ${theme.font.title};
`;

const fireStatsCss = css`
  display: grid;
  padding: 30px 0;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  list-style: none;
`;

function getFireDateString(unixTime) {
  const date = new Date(unixTime);
  date.setDate(date.getDate() + 1);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function numberWithCommas(num) {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StatBadge({ stat, value }) {
  const statCss = (theme) => css`
    font-size: 15px;
    color: ${theme.color.leadBlue};
    text-transform: uppercase;
  `;
  const valueCss = (theme) => css`
    color: ${theme.color.slate};
    margin-bottom: 0;
    margin-top: 5px;
    font-family: ${theme.font.title};
    font-size: 25px;
    font-weight: 300;
  `;
  return (
    <li>
      <h3 css={statCss}>{stat}</h3>
      <p css={valueCss}>{value}</p>
    </li>
  );
}

export default function InfoCard({ onHide, fireInfo, style, onFireChange }) {
  return (
    <a.article className="InfoCard" css={infoCardCss} style={style}>
      <DirectionalControls
        onClick={onFireChange}
        controlCss={directionalControlCss}
        style={style}
      />
      <XIcon onClick={onHide} css={closeIconCss} />
      <div className="content" css={contentCss}>
        <div className="title" css={titleCss}>
          <h2 css={titleTextCss}>{fireInfo?.NAME}</h2>
          <p css={fireDateCss}>
            {fireInfo && getFireDateString(fireInfo.Date_Started)}
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <ul css={fireStatsCss}>
          <StatBadge stat="Acres" value={numberWithCommas(fireInfo?.Acreage)} />
          <StatBadge
            stat="Structures Destroyed"
            value={numberWithCommas(fireInfo?.Structures_Destroyed)}
          />
          <StatBadge stat="Cost" value={fireInfo?.Total_Cost} />
          <StatBadge
            stat="Nearest Sensor"
            value={numberWithCommas(Math.round(fireInfo?.NEAR_DIST)) + " m"}
          />
          <StatBadge stat="Deaths" value={numberWithCommas(fireInfo?.Deaths)} />
          <StatBadge stat="Cause" value={fireInfo?.Cause} />
        </ul>
      </div>
    </a.article>
  );
}
