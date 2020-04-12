import React, { FunctionComponent } from "react";
import styled from "styled-components";

export type IconKinds = "dice" | "bank" | "bug" | "smile" | "game";

export interface IconColor {
  light: string;
  medium: string;
  dark: string;
}

interface IconProps {
  kind: IconKinds;
  className?: string;
}

export const ICON_LIST: IconKinds[] = ["dice", "bank", "bug", "smile", "game"];

const ICON_DEFAULT = ICON_LIST[0];

const ICON_PATHS = {
  dice: (
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
  ),
  bank:
    // prettier-ignore
    <><rect height="7" width="3" x="4" y="10" /><rect height="7" width="3" x="10.5" y="10" /><rect height="3" width="20" x="2" y="19" /><rect height="7" width="3" x="17" y="10" /><polygon points="12,1 2,6 2,8 22,8 22,6" /></>,
  bug: (
    <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
  ),
  smile: (
    <path d="M11.99,2C6.47,2,2,6.48,2,12c0,5.52,4.47,10,9.99,10C17.52,22,22,17.52,22,12C22,6.48,17.52,2,11.99,2z M8.5,8 C9.33,8,10,8.67,10,9.5S9.33,11,8.5,11S7,10.33,7,9.5S7.67,8,8.5,8z M12,18c-2.28,0-4.22-1.66-5-4h10C16.22,16.34,14.28,18,12,18z M15.5,11c-0.83,0-1.5-0.67-1.5-1.5S14.67,8,15.5,8S17,8.67,17,9.5S16.33,11,15.5,11z" />
  ),
  game: (
    <path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z" />
  ),
};

export const ICON_COLORS = {
  dice: {
    light: "#C0EFFF",
    medium: "#00bfff",
    dark: "#008DBC",
  },
  bank: {
    light: "#BFFFEA",
    medium: "#00FFAA",
    dark: "#00A36C",
  },
  bug: {
    light: "#FFEBBF",
    medium: "#FFB000",
    dark: "#BD8100",
  },
  smile: {
    light: "#FFCADF",
    medium: "#FF0062",
    dark: "#AB0042",
  },
  game: {
    light: "#E1BFFF",
    medium: "#8800FF",
    dark: "#5900A7",
  },
};

export const getIconColor = (kind: IconKinds) => ICON_COLORS[kind];

export const Svg = styled.svg`
  max-height: 100vh;
  max-width: 100%;
`;

export const Icon: FunctionComponent<IconProps> = ({ kind, className }) => (
  <Svg viewBox="0 0 24 24" className={className}>
    {ICON_PATHS[kind]}
  </Svg>
);

const DEFAULT_CONTEXT = {
  activeIcon: ICON_DEFAULT,
  handleIconChange: undefined,
  iconColors: getIconColor(ICON_DEFAULT),
};

const IconContext = React.createContext<{
  activeIcon: IconKinds;
  handleIconChange?: any;
  iconColors: IconColor;
}>(DEFAULT_CONTEXT);

export const useIconContext = () => React.useContext(IconContext);

export const IconProvider: FunctionComponent<{}> = ({ children }) => {
  const [activeIcon, setActiveIcon] = React.useState(ICON_DEFAULT);

  return (
    <IconContext.Provider
      value={{
        activeIcon,
        handleIconChange: setActiveIcon,
        iconColors: getIconColor(activeIcon),
      }}
    >
      {children}
    </IconContext.Provider>
  );
};
