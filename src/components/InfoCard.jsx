/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { a } from "react-spring";
import { X as XIcon } from "react-feather";
import DirectionalControls from "./DirectionalControls";
import { unixTimeToDate } from "../utils";

const infoCardCss = (theme) => css`
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: 7;
  box-shadow: ${theme.shadow.card};
`;

const contentCss = css`
  padding: 50px;
  padding-top: 70px;
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const directionalControlCss = css`
  position: absolute;
  top: -75px;
  right: 0;
`;

const closeIconCss = css`
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const titleCss = (theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${theme.breakpoint.small} {
    flex-direction: column;
  }
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

const fireStatsCss = (theme) => css`
  display: grid;
  padding: 30px 0;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  list-style: none;

  ${theme.breakpoint.small} {
    grid-template-columns: 1fr;
  }
`;

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
            {fireInfo &&
              unixTimeToDate(fireInfo.Date_Started, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </p>
        </div>
        <p>{fireInfo?.description}</p>

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
