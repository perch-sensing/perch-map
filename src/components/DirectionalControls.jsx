/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { a } from "react-spring";
import theme from "../theme";

const defaultControlCss = css`
  display: flex;
`;

const buttonCss = css`
  padding: 9px;
  border-radius: 50%;
  margin: 10px;
  background-color: white;
  box-shadow: 0 0 15px #0000004d;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.97);
    outline: 0;
  }

  // TODO: This is bad for accessibility, get outline to hug button
  &:focus {
    outline: 0;
  }
`;

const iconProps = { color: theme.color.flame, size: 30 };

export default function DirectionalControls({ onClick, controlCss, style }) {
  return (
    <a.div
      className="DirectionalControls"
      css={[defaultControlCss, controlCss]}
      style={style}
    >
      <button className="previous" css={buttonCss} onClick={() => onClick(-1)}>
        <ChevronLeft {...iconProps} />
      </button>
      <button className="next" css={buttonCss} onClick={() => onClick(1)}>
        <ChevronRight {...iconProps} />
      </button>
    </a.div>
  );
}
