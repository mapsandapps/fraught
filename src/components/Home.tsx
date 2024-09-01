import { Choice, Direction, Event, EventHistory, EventHistoryLog, Stat } from "../types";
import { DEFAULT_TEXT_ANIMATION_DELAY, HOME_BELONGING, HOME_EXCLUSION } from "../helpers";
import Meters from "./Meters";
import { useState } from "react";

interface HomeProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  onExit: (eventHistory: EventHistory) => void;
}

export default function Home(props: HomeProps) {
  const { eventHistoryLog, hobby, onExit } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const prevBelonging = eventHistoryLog[eventHistoryLog.length - 1].finalBelonging;
  const prevExclusion = eventHistoryLog[eventHistoryLog.length - 1].finalExclusion;

  const deltaBelonging = HOME_BELONGING;
  const deltaExclusion = HOME_EXCLUSION;

  const finalBelonging = prevBelonging + deltaBelonging;
  const finalExclusion = prevExclusion + deltaExclusion;

  const eventHistory = {
    choice: Choice.home,
    finalBelonging,
    finalExclusion,
  };

  const texts = [
    'You spend a cozy night at home.',
    `Your belonging increases by ${deltaBelonging},`,
    `but your exclusion also increases by ${deltaExclusion}.`,
    `You miss your ${hobby.toLowerCase()} friends.`
  ]

  const event: Event = [
    {
      text: '',
      occurrences: [
        {
          text: '',
          stat: Stat.belonging,
          direction: Direction.positive,
          value: deltaBelonging,
          timing: 1000
        },{
          text: '',
          stat: Stat.exclusion,
          direction: Direction.positive,
          value: deltaExclusion,
          timing: 2000
        }
      ]
    }
  ]

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

  // TODO: seems like these are still shown too early
  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <div className="card">
      {texts.map((text, i) => {
        const animationDelay = `${i * DEFAULT_TEXT_ANIMATION_DELAY}ms`

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
        <button onClick={() => onExit(eventHistory)}>Continue</button>
      )}
      <Meters event={event} eventHistoryLog={eventHistoryLog} />
    </div>
  );
}
