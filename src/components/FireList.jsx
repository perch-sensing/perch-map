/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSpring, a } from "react-spring";
import { ChevronDown } from "react-feather";
import { unixTimeToDate } from "../utils";

import fireOrigins from "../assets/fire-origins.json";

const fireNavCss = css`
  position: relative;
  z-index: 2;
  text-align: left;
  max-width: 300px;
  width: 100%;
  min-width: 250px;
`;

const firePillCss = (theme) => css`
  position: relative;
  background-color: ${theme.color.flame};
  padding: 12px 30px;
  width: 100%;
  color: white;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  z-index: 5;
`;

const fireListCss = (theme) => css`
  max-height: 80vh;
  width: 100%;
  list-style: circle;
  padding: 20px 0;
  padding-left: 45px;
  margin: 0;
  background-color: white;
  font-size: 20px;
  text-transform: uppercase;
  color: ${theme.color.leadBlue};
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const fireCss = css`
  padding: 10px;
  cursor: pointer;
  font-family: "Fira Sans", sans-serif;
  font-weight: 400;

  &::marker {
    color: red;
    font-size: 30px;
    white-space: -3px;
  }
`;

const fireDateCss = (theme) => css`
  color: ${theme.color.slate};
  font-family: "Nunito Sans", sans-serif;
  font-size: 15px;
  margin: 0;
`;

const fireNavInfo = fireOrigins.features.map((f) => ({
  name: f.properties.NAME,
  date: unixTimeToDate(f.properties.Date_Started, {
    timeZoneName: "short",
  })
    .split(",")[0]
    .replaceAll("/", "."),
}));

export default function FireList({ onFireSelected, isOpen, onToggle }) {
  const fireListWrapperCss = css`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    pointer-events: ${isOpen ? "all" : "none"};
    overflow: hidden;
  `;

  const chevronProps = useSpring({
    transform: `rotate(${isOpen ? 180 : 0}deg)`,
  });
  const firePillProps = useSpring({
    borderRadius: `${isOpen ? 0 : 30}px`,
    width: `${isOpen ? 300 : 150}px`,
  });
  const fireListProps = useSpring({
    transform: `translateY(${isOpen ? 0 : -100}%)`,
    opacity: isOpen ? 1 : 0,
  });

  function selectFire(name) {
    const fireData = fireOrigins.features.find(
      (f) => f.properties.NAME === name
    );

    onFireSelected(fireData);
  }

  return (
    <article css={fireNavCss}>
      <a.div
        className="fire-pill"
        style={firePillProps}
        css={firePillCss}
        onClick={onToggle}
      >
        <h2>Fires</h2>
        <a.div
          style={chevronProps}
          css={css`
            display: inherit;
          `}
        >
          <ChevronDown color="white" />
        </a.div>
      </a.div>
      <div css={fireListWrapperCss}>
        <a.ul css={fireListCss} style={fireListProps} key={Date.now()}>
          {fireNavInfo.map(({ name, date }) => (
            <li key={name} css={fireCss} onClick={() => selectFire(name)}>
              <h3>{name}</h3>
              <p css={fireDateCss}>{date}</p>
            </li>
          ))}
        </a.ul>
      </div>
    </article>
  );
}
