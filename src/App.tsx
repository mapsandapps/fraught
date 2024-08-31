import { useState } from "react";
import "./App.css";
import { DEFAULT_HOBBY, INIT_BELONGING, INIT_EXCLUSION, getEvent } from "./helpers";
import Event from "./components/Event";
import Home from "./components/Home";
import PreEvent from "./components/PreEvent";
import Start from "./components/Start";

import { Choice, Event as EventType, EventHistory, EventHistoryLog, GameState } from "./types";

function App() {
  const INIT_EVENT: EventHistory = {
    choice: Choice.event,
    finalBelonging: INIT_BELONGING,
    finalExclusion: INIT_EXCLUSION
  }

  const [hobby, setHobby] = useState<string>(DEFAULT_HOBBY);
  const [gameState, setGameState] = useState<GameState>(GameState.start);
  const [eventHistoryLog, setEventHistoryLog] = useState<EventHistoryLog>([INIT_EVENT]);
  const [nextEvent, setNextEvent] = useState<EventType>(getEvent())

  const exitStart = (hobby: string) => {
    setHobby(hobby);
    setGameState(GameState.event);
  };

  const exitEvent = (eventHistory: EventHistory) => {
    setEventHistoryLog([...eventHistoryLog, eventHistory]);
    setGameState(GameState.preEvent);
    setNextEvent(getEvent())
  };

  const exitPreEvent = (choice: Choice) => {
    setGameState(GameState[choice]);
  };

  return (
    <>
      <div className="debug">
        <pre>
          debug: <br />
          {gameState}
        </pre>
      </div>
      {gameState === GameState.start && <Start onExit={exitStart} />}
      {gameState === GameState.preEvent && <PreEvent hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitPreEvent} />}
      {gameState === GameState.event && <Event hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.home && <Home hobby={hobby} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
    </>
  );
}

export default App;
