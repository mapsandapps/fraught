import { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY, getMonth } from "../helpers";
import { AnimatedText, Choice, Event, EventHistoryLog, GameState, Hobby } from "../types";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";
import Meters from "./Meters";
import Month from "./Month";
import ProsAndCons from "./ProsAndCons";

interface PreEventProps {
  eventHistoryLog: EventHistoryLog;
  hobby: Hobby;
  nextEvent: Event;
  onExit: (choice: Choice) => void;
}

export default function PreEvent(props: PreEventProps) {
  const { eventHistoryLog, hobby, nextEvent, onExit } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const texts: AnimatedText[] = []

  texts.push({ text: `Do you choose to go to the ${hobby.name} event, or would you
  rather stay home?` })

  const extraDelay = nextEvent.length + 1

  const animationDuration = (texts.length + extraDelay) * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <div className="card">
      <Month gameState={GameState.preEvent} monthNumber={eventHistoryLog.length} />
      <p>You take a moment and contemplate what you know about { getMonth(eventHistoryLog.length) }'s event.</p>
      <ProsAndCons nextEvent={nextEvent} />
      <AnimatedTextWithButtons
        texts={texts}
        extraDelay={extraDelay}
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
