import { EventHistoryLog } from "../types";
import { MAX_BELONGING, MAX_EXCLUSION } from "../helpers";

interface MetersProps {
  eventHistoryLog: EventHistoryLog;
}

export default function Meters(props: MetersProps) {
  const { eventHistoryLog } = props;

  const lastEvent = eventHistoryLog[eventHistoryLog.length - 1];

  return (
    <div className="meters">
      {lastEvent && (
        <>
          <svg viewBox={`0 0 ${MAX_BELONGING} 10`} width="200">
            <rect width={lastEvent.finalBelonging} height="10" fill="green"></rect>
            <rect x={lastEvent.finalBelonging} width={MAX_BELONGING - lastEvent.finalBelonging} height="10" fill="lightgray" />
            <text x={10} y={5} fontSize="0.2em">
              Belonging: {lastEvent.finalBelonging}%
            </text>
          </svg>
          <svg viewBox={`0 0 ${MAX_EXCLUSION} 10`} width="200">
            <rect width={lastEvent.finalExclusion} height="10" fill="red"></rect>
            <rect x={lastEvent.finalExclusion} width={MAX_EXCLUSION - lastEvent.finalExclusion} height="10" fill="lightgray" />
            <text x={10} y={5} fontSize="0.2em">
              Exclusion: {lastEvent.finalExclusion}%
            </text>
          </svg>
        </>
      )}
    </div>
  );
}
