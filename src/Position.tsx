import React, { FunctionComponent } from "react";
import LoadControl from "eggs-benedict";

export interface PositionData {
  viewportWidth: number;
  viewportHeight: number;
  pointerX: number;
  pointerY: number;
}

const getWindowWidth = () => window.innerWidth;
const getWindowHeight = () => window.outerHeight;

const DEFAULT_POSITION = {
  viewportWidth: getWindowWidth(),
  viewportHeight: getWindowHeight(),
  pointerX: 0,
  pointerY: 0,
};

const PositionContext = React.createContext(DEFAULT_POSITION);

export const usePositionContext = () => React.useContext(PositionContext);

export const PositionProvider: FunctionComponent<{}> = ({ children }) => {
  const [position, setPosition] = React.useState<PositionData>(
    DEFAULT_POSITION
  );

  React.useEffect(() => {
    const calculatePosition = (event: MouseEvent) =>
      setPosition({
        viewportWidth: getWindowWidth(),
        viewportHeight: getWindowHeight(),
        pointerX: event.clientX,
        pointerY: event.clientY,
      });

    const [
      moveLoadControl,
      cleanUpMoveLoadControl,
    ] = LoadControl(calculatePosition, { throttleDelay: 250 });

    window.addEventListener("pointermove", moveLoadControl);

    return cleanUpMoveLoadControl;
  }, []);

  return (
    <PositionContext.Provider value={position}>
      {children}
    </PositionContext.Provider>
  );
};
