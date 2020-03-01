import React, { FunctionComponent, PointerEvent } from "react";

const MAX_DEG_OFFSET = 100;

export const Perspective: FunctionComponent<{}> = ({ children }) => {
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

    // + Caculate ratio for X/Y
    const calculateRatio = (
      isPositive: boolean,
      size: number,
      pointer: number
    ): number =>
      isPositive
        ? // start with "zero" as the centre and move back so the left side is "one".
          size / (pointer - size)
        : // start with "zero" as the centre and move forward so the right side is "one".
          (size / (size - pointer)) * -1;
    const xRatio = calculateRatio(isXPositive, halfWidth, pointerX);
    const yRatio = calculateRatio(isYPositive, halfHeight, pointerY);

    // Calculate degree offset for X/Y
    const calculateDegrees = (ratio: number): number => MAX_DEG_OFFSET / ratio;
    const xDegrees = calculateDegrees(xRatio);
    const yDegrees = calculateDegrees(yRatio);

    console.log({ xDegrees, yDegrees });
  };

  return <div onPointerMove={handlePointerMove}>{children}</div>;
};
