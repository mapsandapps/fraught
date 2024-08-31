import { Choice, Direction, Event, EventHistory, EventHistoryLog, Stat } from "../types";
import { DEFAULT_TEXT_ANIMATION_DELAY, HOME_BELONGING, HOME_EXCLUSION, clampStat } from "../helpers";
import Meters from "./Meters";

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
      <Meters event={event} eventHistoryLog={eventHistoryLog} />
      <button onClick={() => onExit(eventHistory)}>Continue</button>
    </div>
  );
}
