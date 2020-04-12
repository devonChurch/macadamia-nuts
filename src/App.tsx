import React from "react";
import { Shell } from "./Shell";
import { PositionProvider } from "./Position";
import { Perspective } from "./Perspective";
import { Board } from "./Board";

function App() {
  return (
    <PositionProvider>
      <Shell>
        <Perspective>
          <Board />
        </Perspective>
      </Shell>
    </PositionProvider>
  );
}

export default App;
