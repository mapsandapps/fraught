import { Choice, EventHistory, EventHistoryLog, Stat } from "../types";
import { HOME_BELONGING, HOME_EXCLUSION, clampStat } from "../helpers";

interface HomeProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  onExit: (eventHistory: EventHistory) => void;
}

export default function Home(props: HomeProps) {
  const { eventHistoryLog, hobby, onExit } = props;

  const prevBelonging = eventHistoryLog[eventHistoryLog.length - 1].finalBelonging;
  const prevExclusion = eventHistoryLog[eventHistoryLog.length - 1].finalExclusion;

  // FIXME: these should actually be clamped, not the finalStat
  const deltaBelonging = HOME_BELONGING;
  const deltaExclusion = HOME_EXCLUSION;

  const finalBelonging = clampStat(prevBelonging + deltaBelonging, Stat.belonging);
  const finalExclusion = clampStat(prevExclusion + deltaExclusion, Stat.exclusion);

  const eventHistory = {
    choice: Choice.home,
    finalBelonging,
    finalExclusion,
  };

  return (
    <div className="card">
      <p>You spend a cozy night at home.</p>
      <p>
        Your belonging increases by {deltaBelonging}, but your exclusion also increases by {deltaExclusion}. You miss your {hobby.toLowerCase()} friends.
      </p>
      <button onClick={() => onExit(eventHistory)}>Continue</button>
    </div>
  );
}
