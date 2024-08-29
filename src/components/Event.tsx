import { INIT_BELONGING, INIT_EXCLUSION, clampStat, getRandomInt } from "../helpers";
import { Choice, EventHistory, EventHistoryLog, Stat } from "../types";

interface EventProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  onExit: (eventHistory: EventHistory) => void;
}

export default function Event(props: EventProps) {
  const { eventHistoryLog, hobby, onExit } = props;

  const pluralRule = new Intl.PluralRules("en-US", { type: "ordinal" });

  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const prevBelonging = eventHistoryLog.length > 0 ? eventHistoryLog[eventHistoryLog.length - 1].finalBelonging : INIT_BELONGING;
  const prevExclusion = eventHistoryLog.length > 0 ? eventHistoryLog[eventHistoryLog.length - 1].finalExclusion : INIT_EXCLUSION;

  // FIXME: these should actually be clamped, not the finalStat
  const deltaBelonging = getRandomInt(-10, 10);
  const deltaExclusion = getRandomInt(-10, 10);

  const finalBelonging = clampStat(prevBelonging + deltaBelonging, Stat.belonging);
  const finalExclusion = clampStat(prevExclusion + deltaExclusion, Stat.exclusion);

  // TODO:
  const eventHistory = {
    choice: Choice.event,
    finalBelonging,
    finalExclusion,
  };

  return (
    <div className="card">
      <p>
        You attended your {eventHistoryLog.length + 1}
        {suffixes.get(pluralRule.select(eventHistoryLog.length + 1))} {hobby.toLowerCase()} event.
      </p>
      <p>Your belonging changed by {deltaBelonging}.</p>
      <p>Your exclusion changed by {deltaExclusion}.</p>
      <button onClick={() => onExit(eventHistory)}>Continue</button>
    </div>
  );
}
