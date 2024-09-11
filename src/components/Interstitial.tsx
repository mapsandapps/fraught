import { EventHistoryLog, GameState } from "../types";
import Month from "./Month";

interface InterstitialProps {
  eventHistoryLog: EventHistoryLog;
  onExit: () => void;
}

export default function Interstitial(props: InterstitialProps) {
  const { eventHistoryLog, onExit } = props;

  setTimeout(onExit, 2000)

  return (
    <div className="card">
      <Month gameState={GameState.interstitial} monthNumber={eventHistoryLog.length} />
    </div>
  );
}
