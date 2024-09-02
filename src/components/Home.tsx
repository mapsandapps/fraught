import { Choice, Direction, Event, EventHistory, EventHistoryLog, Stat } from "../types";
import { HOME_BELONGING, HOME_EXCLUSION } from "../helpers";
import Meters from "./Meters";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";

interface HomeProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  onExit: (eventHistory: EventHistory) => void;
}

export default function Home(props: HomeProps) {
  const { eventHistoryLog, hobby, onExit } = props;

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

  return (
    <div className="card">
      <AnimatedTextWithButtons texts={texts}>
        <button onClick={() => onExit(eventHistory)}>Continue</button>
      </AnimatedTextWithButtons>
      <Meters event={event} eventHistoryLog={eventHistoryLog} />
    </div>
  );
}
