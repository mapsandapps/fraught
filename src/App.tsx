import { useState } from "react";
import "./App.css";
import { DEFAULT_HOBBY, getEvent } from "./helpers";
import Event from "./components/Event";
import Home from "./components/Home";
import Meters from "./components/Meters";
import PreEvent from "./components/PreEvent";
import Start from "./components/Start";

import { Choice, Event as EventType, EventHistory, EventHistoryLog, GameState } from "./types";

function App() {
  const [hobby, setHobby] = useState<string>(DEFAULT_HOBBY);
  const [gameState, setGameState] = useState<GameState>(GameState.start);
  const [eventHistoryLog, setEventHistoryLog] = useState<EventHistoryLog>([]);
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
      <h1>Fraught</h1>
      {gameState === GameState.start && <Start onExit={exitStart} />}
      {gameState === GameState.preEvent && <PreEvent hobby={hobby} nextEvent={nextEvent} onExit={exitPreEvent} />}
      {gameState === GameState.event && <Event hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.home && <Home hobby={hobby} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState !== GameState.start && <Meters eventHistoryLog={eventHistoryLog} />}
    </>
  );
}

export default App;
