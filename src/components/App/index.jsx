import "./styles.css";
import { useMachine } from "@xstate/react";
import { createMachine } from "./machines";

export default function App(props) {
  const [machineState, sendToMachine] = useMachine(createMachine(props));
  function fetchData(e) {
    sendToMachine({ type: "TRIGGER" });
  }
  return (
    <div className="App">
      <div>This is an example of xstate with React</div>
      <div>This example builds an xhrMachine</div>
      <div>Results length: {machineState.context.resultsCount}</div>
      <div>{machineState.context.phase}</div>
      <button onClick={fetchData}>Fetch</button>
      <div>{machineState.context.msg}</div>
    </div>
  );
}
