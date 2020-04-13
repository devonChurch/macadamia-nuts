import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { usePositionContext, PositionData } from "./Position";
import { useIconContext, IconColor } from "./Icon";

interface Percentage {
  x: number;
  y: number;
}

const TRANSFORM_MS_SPEED = 500;

const styleFullPageFixed = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const Foreground = styled.div<{ percentage: Percentage; colors: IconColor }>`
  ${styleFullPageFixed}
  background: ${({ percentage, colors }) =>
    `radial-gradient(circle at ${percentage.x}% ${percentage.y}%, white, ${colors.dark})`};
  mix-blend-mode: multiply;
  pointer-events: none;
  transition: background ${TRANSFORM_MS_SPEED}ms;
  z-index: 10;
`;

const Background = styled.div<{ colors: IconColor }>`
  ${styleFullPageFixed}
  background: ${({ colors }) => colors.medium};
  transition: background ${TRANSFORM_MS_SPEED}ms;
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
  const { iconColors } = useIconContext();

  return (
    <>
      <Foreground percentage={percentage} colors={iconColors} />
      {children}
      <Background colors={iconColors} />
    </>
  );
};
