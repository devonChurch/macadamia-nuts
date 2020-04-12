import React from "react";
import { Shell } from "./Shell";
import { PositionProvider } from "./Position";
import { IconProvider } from "./Icon";
import { Perspective } from "./Perspective";
import { Board } from "./Board";
import { Menu } from "./Menu";

function App() {
  return (
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
  );
}

export default App;
