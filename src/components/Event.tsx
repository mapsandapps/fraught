import { DEFAULT_TEXT_ANIMATION_DELAY, INIT_BELONGING, INIT_EXCLUSION, countEventsAttended, getDeltaStat, getStatChangeText } from "../helpers";
import { Choice, Event as EventType, EventHistory, EventHistoryLog, Stat, GameState, Hobby } from "../types";
import Meters from "./Meters";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";
import Month from "./Month";

interface EventProps {
  hobby: Hobby;
  eventHistoryLog: EventHistoryLog;
  nextEvent: EventType
  onExit: (eventHistory: EventHistory) => void;
}

export default function Event(props: EventProps) {
  const { eventHistoryLog, hobby, nextEvent, onExit } = props;

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

  const eventHistory = {
    choice: Choice.event,
    finalBelonging,
    finalExclusion,
  };

  const numberOfEventsAttended = countEventsAttended(eventHistoryLog) + 1

  const texts = [
    `You attended your ${numberOfEventsAttended}${suffixes.get(pluralRule.select(numberOfEventsAttended))} ${hobby.name} event.`
  ]

  nextEvent.map(expectation => {
    // texts.push(expectation.text)
    let timing = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

    expectation.occurrences.map(occurrence => {
      timing += DEFAULT_TEXT_ANIMATION_DELAY
      occurrence.timing = timing
      texts.push(occurrence.text)
      texts.push(getStatChangeText(occurrence))
      timing += DEFAULT_TEXT_ANIMATION_DELAY
    })
  })

  return (
    <>
      <div className="card">
        <Month gameState={GameState.event} monthNumber={eventHistoryLog.length} />
        <AnimatedTextWithButtons texts={texts}>
          <button onClick={() => onExit(eventHistory)}>Continue</button>
        </AnimatedTextWithButtons>
      </div>
      <Meters event={nextEvent} eventHistoryLog={eventHistoryLog} />
    </>
  );
}
