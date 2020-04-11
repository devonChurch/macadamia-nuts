import React from "react";
import { Perspective } from "./Perspective";
import { Board } from "./Board";

function App() {
  return (
    <div>
      <Perspective>
        <Board />
      </Perspective>
    </div>
  );
}

export default App;
