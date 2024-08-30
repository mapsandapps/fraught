import { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY, INIT_BELONGING, INIT_EXCLUSION, getDeltaStat, getStatChangeText } from "../helpers";
import { Choice, Event as EventType, EventHistory, EventHistoryLog, Stat } from "../types";

interface EventProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  nextEvent: EventType
  onExit: (eventHistory: EventHistory) => void;
}

export default function Event(props: EventProps) {
  const { eventHistoryLog, hobby, nextEvent, onExit } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const pluralRule = new Intl.PluralRules("en-US", { type: "ordinal" });

  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const prevBelonging = eventHistoryLog.length > 0 ? eventHistoryLog[eventHistoryLog.length - 1].finalBelonging : INIT_BELONGING;
  const prevExclusion = eventHistoryLog.length > 0 ? eventHistoryLog[eventHistoryLog.length - 1].finalExclusion : INIT_EXCLUSION;

  const deltaBelonging = getDeltaStat(nextEvent, Stat.belonging);
  const deltaExclusion = getDeltaStat(nextEvent, Stat.exclusion);

  const finalBelonging = prevBelonging + deltaBelonging
  const finalExclusion = prevExclusion + deltaExclusion

  // TODO: for each occurrence, check if it will be a win/loss condition

  // TODO:
  const eventHistory = {
    choice: Choice.event,
    finalBelonging,
    finalExclusion,
  };

  const texts = [
    `You attended your ${eventHistoryLog.length + 1}${suffixes.get(pluralRule.select(eventHistoryLog.length + 1))} ${hobby.toLowerCase()} event.`
  ]

  nextEvent.map(expectation => {
    // texts.push(expectation.text)

    expectation.occurrences.map(occurrence => {
      texts.push(occurrence.text)
      texts.push(getStatChangeText(occurrence))
    })
  })

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

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
            className="fade-in" 
            style={{ animationDelay }}
          >
            { text }
          </p>
        )
      })}
      {buttonsShown && (
        <button onClick={() => onExit(eventHistory)}>Continue</button>
      )}
    </div>
  );
}
