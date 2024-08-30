import { INIT_BELONGING, INIT_EXCLUSION, clampStat, getRandomInt } from "../helpers";
import { Choice, EventHistory, EventHistoryLog, Stat } from "../types";
import "../App.css"; // TODO: if this import is needed, create an Event.css file

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

  const texts = [
    `You attended your ${eventHistoryLog.length + 1}${suffixes.get(pluralRule.select(eventHistoryLog.length + 1))} ${hobby.toLowerCase()} event.`,
    `Your belonging changed by ${deltaBelonging}.`,
    `Your exclusion changed by ${deltaExclusion}.`
  ]

  return (
    <div className="card">
      {texts.map((text, i) => {
        return (
          // <p style={{ transitionDelay: `${i * 1000}ms`, transitionDuration: '300ms', transitionProperty: 'opacity' }}>{ text }</p>
          <p key={`text-${i}`} className="fade-in" style={{ animationDelay: `${i * 1000}ms` }}>{ text }</p>
        )
      })}
      <button onClick={() => onExit(eventHistory)}>Continue</button>
    </div>
  );
}
