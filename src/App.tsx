import { useEffect, useState } from "react";
import "./App.css";
import Event from "./components/Event";
import Home from "./components/Home";
import Interstitial from "./components/Interstitial";
import PreEvent from "./components/PreEvent";
import Start from "./components/Start";
import Win from "./components/Win";
import { HOBBY_OPTIONS } from "./bank";
import { INIT_BELONGING, INIT_EXCLUSION, checkForWinOrLoss, getEvent, getFirstEvent } from "./helpers";
import { Choice, Event as EventType, EventHistory, EventHistoryLog, GameState, Hobby, WinLossCondition } from "./types";
import { sample } from "lodash";

function App() {
  const INIT_EVENT: EventHistory = {
    choice: Choice.init,
    finalBelonging: INIT_BELONGING,
    finalExclusion: INIT_EXCLUSION
  }

  const [hobby, setHobby] = useState<Hobby>(sample(HOBBY_OPTIONS) as Hobby)
  const [gameState, setGameState] = useState<GameState>(GameState.start)
  const [eventHistoryLog, setEventHistoryLog] = useState<EventHistoryLog>([INIT_EVENT])
  const [nextEvent, setNextEvent] = useState<EventType>(getFirstEvent())
  const [winLossCondition, setWinLossCondition] = useState<WinLossCondition | null>(null)

  useEffect(() => {
    // when the page transitions, scroll to the top
    window.scrollTo(0, 0)
  }, [gameState])

  const exitStart = (hobby: Hobby) => {
    setHobby({ ...hobby, name: hobby.name.toLowerCase() });
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
      setNextEvent(getEvent())
      setGameState(GameState.interstitial)
    }
  };

  const exitInterstitial = ()  => {
    setGameState(GameState.preEvent)
  }

  const exitPreEvent = (choice: Choice) => {
    if (choice === Choice.init) {
      console.warn('Unexpected input to function')
      return
    }
    setGameState(GameState[choice]);
  };

  return (
    <>
      {gameState === GameState.start && <Start defaultHobby={hobby} onExit={exitStart} />}
      {gameState === GameState.interstitial && <Interstitial eventHistoryLog={eventHistoryLog} onExit={exitInterstitial} />}
      {gameState === GameState.preEvent && <PreEvent hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitPreEvent} />}
      {gameState === GameState.event && <Event hobby={hobby} nextEvent={nextEvent} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.home && <Home hobby={hobby} eventHistoryLog={eventHistoryLog} onExit={exitEvent} />}
      {gameState === GameState.win && <Win hobby={hobby} winLossCondition={winLossCondition!} eventHistoryLog={eventHistoryLog} />}
      <svg viewBox="0 0 24 24" aria-hidden="true" height="0">
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#808080', strokeWidth: 1 }}></path>
        </pattern>
      </svg>
    </>
  );
}

export default App;
