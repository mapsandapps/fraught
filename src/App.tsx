import { useState } from "react";
import "./App.css";
import { DEFAULT_HOBBY, INIT_BELONGING, INIT_EXCLUSION, checkForWinOrLoss, getEvent, getFirstEvent } from "./helpers";
import Event from "./components/Event";
import Home from "./components/Home";
import PreEvent from "./components/PreEvent";
import Start from "./components/Start";

import { Choice, Event as EventType, EventHistory, EventHistoryLog, GameState, WinLossCondition } from "./types";
import Win from "./components/Win";

function App() {
  const INIT_EVENT: EventHistory = {
    choice: Choice.init,
    finalBelonging: INIT_BELONGING,
    finalExclusion: INIT_EXCLUSION
  }

  const [hobby, setHobby] = useState<string>(DEFAULT_HOBBY);
  const [gameState, setGameState] = useState<GameState>(GameState.start);
  const [eventHistoryLog, setEventHistoryLog] = useState<EventHistoryLog>([INIT_EVENT]);
  const [nextEvent, setNextEvent] = useState<EventType>(getFirstEvent())
  const [winLossCondition, setWinLossCondition] = useState<WinLossCondition | null>(null)

  const exitStart = (hobby: string) => {
    setHobby(hobby);
    setGameState(GameState.event);
  };

  const exitEvent = (eventHistory: EventHistory) => {
    const log = [...eventHistoryLog, eventHistory]
    setEventHistoryLog(log)

    const winLoss = checkForWinOrLoss(log)

    setWinLossCondition(winLoss)
    if (winLoss) {
      setGameState(GameState.win)
    } else {
      setGameState(GameState.preEvent)
      setNextEvent(getEvent())
    }
  };

  const exitPreEvent = (choice: Choice) => {
    if (choice === Choice.init) {
      console.warn('Unexpected input to function')
      return
    }
    setGameState(GameState[choice]);
  };

  return (
    <>
      {gameState === GameState.start && <Start onExit={exitStart} />}
      {gameState === GameState.preEvent && <PreEvent hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitPreEvent} />}
      {gameState === GameState.event && <Event hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.home && <Home hobby={hobby} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.win && <Win hobby={hobby} winLossCondition={winLossCondition!} eventHistoryLog={eventHistoryLog} />}
      <svg viewBox="0 0 24 24">
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#808080', strokeWidth: 1 }}></path>
        </pattern>
      </svg>
    </>
  );
}

export default App;
