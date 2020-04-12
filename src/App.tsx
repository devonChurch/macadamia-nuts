import React from "react";
import { Background } from "./Background";
import { PositionProvider } from "./Position";
import { Perspective } from "./Perspective";
import { Board } from "./Board";

function App() {
  return (
    <PositionProvider>
      <Background>
        <Perspective>
          <Board />
        </Perspective>
      </Background>
    </PositionProvider>
  );
}

export default App;
