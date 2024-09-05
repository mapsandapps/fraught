import { Choice, Direction, Event, EventHistory, EventHistoryLog, GameState, Stat } from "../types";
import { DEFAULT_TEXT_ANIMATION_DELAY, HOME_BELONGING, HOME_EXCLUSION, getMonth } from "../helpers";
import Meters from "./Meters";
import AnimatedTextWithButtons from "./AnimatedTextWithButtons";
import Month from "./Month";
import { getHomeText } from "../bank";

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

  const finalBelonging = prevBelonging - deltaBelonging;
  const finalExclusion = prevExclusion - deltaExclusion;

  const eventHistory = {
    choice: Choice.home,
    finalBelonging,
    finalExclusion,
  };

  const texts = [
    `You spend a cozy night at home, instead of attending the ${getMonth(eventHistoryLog.length)} event.`,
    `Your belonging decreases by ${deltaBelonging},`,
    `but your exclusion also decreases by ${deltaExclusion}.`,
    getHomeText(hobby)
  ]

  const event: Event = [
    {
      text: '',
      occurrences: [
        {
          text: '',
          stat: Stat.belonging,
          direction: Direction.negative,
          value: deltaBelonging,
          timing: DEFAULT_TEXT_ANIMATION_DELAY * 1
        },{
          text: '',
          stat: Stat.exclusion,
          direction: Direction.negative,
          value: deltaExclusion,
          timing: DEFAULT_TEXT_ANIMATION_DELAY * 2
        }
      ]
    }
  ]

  return (
    <div className="card">
      <Month gameState={GameState.home} monthNumber={eventHistoryLog.length} />
      <AnimatedTextWithButtons texts={texts}>
        <button onClick={() => onExit(eventHistory)}>Continue</button>
      </AnimatedTextWithButtons>
      <Meters event={event} eventHistoryLog={eventHistoryLog} />
    </div>
  );
}
