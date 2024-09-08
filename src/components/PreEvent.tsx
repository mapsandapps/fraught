import { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY, getMonth } from "../helpers";
import { Choice, Event, EventHistoryLog, GameState } from "../types";
import Meters from "./Meters";
import Month from "./Month";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";

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
    nextEvent.length > 1 ? `A number of thoughts go through your head about the upcoming event in ${getMonth(eventHistoryLog.length)}:` : `You contemplate the upcoming event in ${getMonth(eventHistoryLog.length)}:`
  ]

  nextEvent.map((expectation) => {
    texts.push(expectation.text)
  })

  texts.push(`Do you choose to go to the ${hobby} event, or would you
  rather stay home?`)

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <div className="card">
      <Month gameState={GameState.preEvent} monthNumber={eventHistoryLog.length} />
      <AnimatedTextWithButtons
        texts={texts}
        hasInnerList
        extraDelay={1}
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
