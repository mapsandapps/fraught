import { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";
import { Choice, Event, EventHistoryLog } from "../types";
import Meters from "./Meters";

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
    nextEvent.length > 1 ? 'A number of thoughts go through your head about the next upcoming event:' : 'You contemplate the next upcoming event:'
  ]

  nextEvent.map((expectation) => {
    texts.push(expectation.text)
  })

  texts.push(`Do you choose to go to the ${hobby.toLowerCase()} event, or would you
  rather stay home?`)

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <div className="card">
      {texts.map((text, i) => {
        const animationDelay = `${i * DEFAULT_TEXT_ANIMATION_DELAY}ms`

        if (i > 0 && i < texts.length - 1) {
          return (
            <li 
              key={`text-${i}`} 
              className="fade-in-text" 
              style={{ animationDelay }}
            >
              { text }
            </li>
          )
        }

        return (
          <p 
            key={`text-${i}`} 
            className="fade-in-text" 
            style={{ animationDelay }}
          >
            { text }
          </p>
        )
      })}
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
