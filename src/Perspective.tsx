import React, { useState, FunctionComponent, PointerEvent } from "react";
import styled from "styled-components";
import { Svg as Board } from "./Board";

interface DegreesState {
  x: number;
  y: number;
}

const MAX_DEG_OFFSET = 25;
const TRANSFORM_MS_SPEED = 500;
const INITIAL_STATE = { x: 0, y: 0 };

const Wrapper = styled.div<{ degrees: DegreesState }>`
  perspective: 80rem;

  ${Board} {
    transition: transform ${TRANSFORM_MS_SPEED}ms;
    transform: ${({ degrees: { x, y } }) => {
      // Note: To manipulate the horizontal perspective we need to target the
      // opposite axis i.e to change X we target Y (and vice versa).
      return `rotateY(${x}deg) rotateX(${y}deg);`;
    }};
  }
`;

export const Perspective: FunctionComponent<{}> = ({ children }) => {
  const [degrees, setDegrees] = useState<DegreesState>(INITIAL_STATE);
  const handlePointerMove = (event: PointerEvent) => {
    // Get positive/negative "3D" degrees for X/Y axis offset:
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // + Get X/Y pointer position in relation to window.
    const { clientX, clientY } = event;

    // + Get board offset from window.
    // + Get board width and height.
    const {
      top,
      left,
      width,
      height
    } = event.currentTarget.getBoundingClientRect();

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

    // Calculate degree offset for X/Y
    const calculateDegrees = (ratio: number): number => MAX_DEG_OFFSET / ratio;
    const xDegrees = calculateDegrees(xRatio);
    const yDegrees = calculateDegrees(yRatio);

    // console.log({ xDegrees, yDegrees });
    setDegrees({ x: xDegrees, y: yDegrees });
  };

  return (
    <Wrapper degrees={degrees} onPointerMove={handlePointerMove}>
      {children}
    </Wrapper>
  );
};
