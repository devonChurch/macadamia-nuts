import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { usePositionContext, PositionData } from "./Position";

interface Percentage {
  x: number;
  y: number;
}

const styleFullPageFixed = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const Foreground = styled.div<{ percentage: Percentage }>`
  ${styleFullPageFixed}
  background: ${({ percentage }) =>
    `radial-gradient(circle at ${percentage.x}% ${percentage.y}%, white, #008DBC)`};
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 10;
`;

const Background = styled.div`
  ${styleFullPageFixed}
  background: #00bfff;
  z-index: -1;
`;

const calculatePercentageOffset = ({
  viewportWidth,
  viewportHeight,
  pointerX,
  pointerY,
}: PositionData) => ({
  x: (pointerX / viewportWidth) * 100,
  y: (pointerY / viewportHeight) * 100,
});

export const Shell: FunctionComponent<{}> = ({ children }) => {
  const positionData = usePositionContext();
  const percentage = calculatePercentageOffset(positionData);

  return (
    <>
      <Foreground percentage={percentage} />
      {children}
      <Background />
    </>
  );
};
