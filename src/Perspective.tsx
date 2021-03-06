import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Svg as Board } from "./Icon";
import { usePositionContext, PositionData } from "./Position";
import { useIconContext, IconColor } from "./Icon";

interface DegreesState {
  x: number;
  y: number;
}

interface DepthState {
  z: number;
  x: number;
  y: number;
}

interface Perspective {
  clientX: number;
  clientY: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

const MAX_DEGREES_OFFSET = 25;
const MAX_DEPTH_OFFSET = 10;
const TRANSFORM_MS_SPEED = 500;

const Center = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Wrapper = styled.div<{
  degrees: DegreesState;
  depth: DepthState;
  colors: IconColor;
}>`
  perspective: 80rem;

  ${Board} {
    fill: ${({ colors }) => colors.light};
    transition-duration: ${TRANSFORM_MS_SPEED}ms;
    transition-property: transform filter;
    transform: ${({ degrees: { x, y } }) => {
      // Note: To manipulate the horizontal perspective we need to target the
      // opposite axis i.e to change X we target Y (and vice versa).
      return `rotateY(${x}deg) rotateX(${y}deg);`;
    }};
    filter: ${({ depth: { z, x, y }, colors }) => {
      // Build up each depth layer with a consistent offset incrementer that
      // moves each layer away to simulate a solid Z axis extrude.
      return new Array(z)
        .fill(0)
        .reduce(
          (acc, _, index) =>
            `${acc} drop-shadow(${x * (index + 1)}px ${y * (index + 1)}px 0px ${
              colors.dark
            })`,
          ""
        )
        .trimStart();
    }};
  }
`;

const calculatePerspective = ({
  viewportWidth,
  viewportHeight,
  pointerX,
  pointerY,
}: PositionData) => {
  // Get positive/negative "3D" references for X/Y axis offset:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // + Find quadrant where X/Y pointer resides in board.
  const halfWidth = viewportWidth / 2;
  const halfHeight = viewportHeight / 2;
  const isXPositive = pointerX >= halfWidth;
  const isYPositive = pointerY >= halfHeight;

  const xRatio = isXPositive
    ? // Start with "zero" as the centre and move back so the left side is "one".
      // Push the left side towards the user.
      halfWidth / (halfWidth - pointerX)
    : // Start with "zero" as the centre and move forward so the right side is "one".
      // Push the right side towards the user.
      (halfWidth / (pointerX - halfWidth)) * -1;

  const yRatio = isYPositive
    ? // Start with "zero" as the centre and move up so the top side is "one".
      // Push the top side towards the user.
      (halfHeight / (halfHeight - pointerY)) * -1
    : // Start with "zero" as the centre and move forward so the right side is "one".
      // Push the top side towards the user.
      halfHeight / (pointerY - halfHeight);

  // Calculate degree offset for X/Y.
  const calculateDegrees = (ratio: number): number =>
    MAX_DEGREES_OFFSET / ratio;
  const xDegrees = calculateDegrees(xRatio);
  const yDegrees = calculateDegrees(yRatio);

  // Calculate depth offset for X/Y.
  const calculateDepth = (isPositive: boolean, ratio: number): number =>
    (MAX_DEPTH_OFFSET / Math.abs(ratio) / MAX_DEPTH_OFFSET) *
    (isPositive ? 1 : -1);
  const xDepth = calculateDepth(isXPositive, xRatio);
  const yDepth = calculateDepth(isYPositive, yRatio);

  const degrees = {
    x: xDegrees,
    y: yDegrees,
  };

  const depth = {
    z: MAX_DEPTH_OFFSET,
    x: xDepth,
    y: yDepth,
  };

  return { degrees, depth };
};

export const Perspective: FunctionComponent<{}> = ({ children }) => {
  const positionData = usePositionContext();
  const { degrees, depth } = calculatePerspective(positionData);
  const { iconColors } = useIconContext();

  return (
    <Center>
      <Wrapper degrees={degrees} depth={depth} colors={iconColors}>
        {children}
      </Wrapper>
    </Center>
  );
};
