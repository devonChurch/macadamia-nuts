import React, { useState, FunctionComponent, PointerEvent } from "react";
import styled from "styled-components";
import { useLoadControl } from "eggs-benedict/hooks";
import { Svg as Board } from "./Board";

interface DegreesState {
  x: number;
  y: number;
}

interface DepthState {
  layers: number;
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
const INITIAL_DEGREES_STATE = { x: 0, y: 0 };
const INITIAL_DEPTH_STATE = { layers: 0, x: 0, y: 0 };
//
const FACE_COLOR = "#55a0e2";
const DEPTH_COLOR = "#376d9c";

const Wrapper = styled.div<{ degrees: DegreesState; depth: DepthState }>`
  perspective: 80rem;

  ${Board} {
    fill: ${FACE_COLOR};
    transition-duration: ${TRANSFORM_MS_SPEED}ms;
    transition-property: transform filter;
    transform: ${({ degrees: { x, y } }) => {
      // Note: To manipulate the horizontal perspective we need to target the
      // opposite axis i.e to change X we target Y (and vice versa).
      return `rotateY(${x}deg) rotateX(${y}deg);`;
    }};
    filter: ${({ depth: { layers, x, y } }) => {
      // Build up each depth layer with a consistent offset incrementer that
      // moves each layer away to simulate a solid Z axis extrude.
      return new Array(layers)
        .fill(0)
        .reduce(
          (acc, _, index) =>
            `${acc} drop-shadow(${x * (index + 1)}px ${
              y * (index + 1)
            }px 0px ${DEPTH_COLOR})`,
          ""
        )
        .trimStart();
    }};
  }
`;

export const Perspective: FunctionComponent<{}> = ({ children }) => {
  const [degrees, setDegrees] = useState<DegreesState>(INITIAL_DEGREES_STATE);
  const [depth, setDepth] = useState<DepthState>(INITIAL_DEPTH_STATE);

  const calculatePerspective = ({
    clientX,
    clientY,
    top,
    left,
    width,
    height,
  }: Perspective) => {
    console.log("load control");

    // + Get X/Y pointer position in relation to board.
    const pointerX = clientX - left;
    const pointerY = clientY - top;

    // + Find quadrant where X/Y pointer resides in board.
    const halfWidth = width / 2;
    const halfHeight = height / 2;
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
        (halfWidth / (halfWidth - pointerY)) * -1
      : // Start with "zero" as the centre and move forward so the right side is "one".
        // Push the top side towards the user.
        halfWidth / (pointerY - halfWidth);

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

    setDegrees({ x: xDegrees, y: yDegrees });
    setDepth({
      layers: MAX_DEPTH_OFFSET,
      x: xDepth,
      y: yDepth,
    });
  };

  const setLoadControlPerspective = useLoadControl(calculatePerspective, {
    throttleDelay: 100,
  });

  const handlePointerMove = (event: PointerEvent) => {
    // Get positive/negative "3D" references for X/Y axis offset:
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // + Get X/Y pointer position in relation to window.
    const { clientX, clientY } = event;

    // + Get board offset from window.
    // + Get board width and height.
    const {
      top,
      left,
      width,
      height,
    } = event.currentTarget.getBoundingClientRect();

    setLoadControlPerspective({ clientX, clientY, top, left, width, height });
  };

  return (
    <Wrapper degrees={degrees} depth={depth} onPointerMove={handlePointerMove}>
      {children}
    </Wrapper>
  );
};
