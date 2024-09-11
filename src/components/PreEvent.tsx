import { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";
import { Choice, Event, EventHistoryLog, GameState } from "../types";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";
import Meters from "./Meters";
import Month from "./Month";
import ProsAndCons from "./ProsAndCons";

interface PreEventProps {
  eventHistoryLog: EventHistoryLog;
  hobby: string;
  nextEvent: Event;
  onExit: (choice: Choice) => void;
}

export default function PreEvent(props: PreEventProps) {
  const { eventHistoryLog, hobby, nextEvent, onExit } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const texts = [
  ]

  texts.push(`Do you choose to go to the ${hobby} event, or would you
  rather stay home?`)

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <div className="card">
      <Month gameState={GameState.preEvent} monthNumber={eventHistoryLog.length} />
      <ProsAndCons nextEvent={nextEvent} />
      <AnimatedTextWithButtons
        texts={texts}
        hasInnerList
        extraDelay={nextEvent.length + 1}
      />
      {buttonsShown && (
        <>
          <button onClick={() => onExit(Choice.event)}>Go to the event</button>
          <button onClick={() => onExit(Choice.home)}>Stay home</button>
        </>
      )}
      <Meters eventHistoryLog={eventHistoryLog} />
    </div>
  );
}
