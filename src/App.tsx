import React from "react";
import { createGlobalStyle } from "styled-components";
import { Shell } from "./Shell";
import { PositionProvider } from "./Position";
import { IconProvider } from "./Icon";
import { Perspective } from "./Perspective";
import { Board } from "./Board";
import { Menu } from "./Menu";

const GlobalStyle = createGlobalStyle`
  * {
    /**
     * Stops the native browser chrome from hijacking touch and accidentally
     * refreshing the page when the user is dragging the 3D items around.
     */
    touch-action: none !important;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <IconProvider>
        <PositionProvider>
          <Shell>
            <Menu />
            <Perspective>
              <Board />
            </Perspective>
          </Shell>
        </PositionProvider>
      </IconProvider>
    </>
  );
}

export default App;
