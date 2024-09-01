import { Event, EventHistoryLog, Stat } from "../types";
import { DEFAULT_TEXT_ANIMATION_DELAY, MAX_BELONGING, MAX_EXCLUSION, getOccurrencesForEvent } from "../helpers";
import "./Meters.css";

interface MetersProps {
  event?: Event
  eventHistoryLog: EventHistoryLog;
}

export default function Meters(props: MetersProps) {
  const TEXT_Y = 6.4;
  const FONT_SIZE = '0.3em';
  const { event, eventHistoryLog } = props;

  const lastEvent = eventHistoryLog[eventHistoryLog.length - 1];

  const occurrences = event ? getOccurrencesForEvent(event) : []

  const belongingOccurrences = occurrences.filter(occurrence => {
    return occurrence.stat === Stat.belonging
  })

  const exclusionOccurrences = occurrences.filter(occurrence => {
    return occurrence.stat === Stat.exclusion
  })

  if (!lastEvent) return

  return (
    <div className="meters">
      <br />
      <svg viewBox={`0 0 ${MAX_BELONGING} 10`}>
        <rect className="container" width={MAX_BELONGING} />
        <rect className="filled belonging" width={lastEvent.finalBelonging} />
        <text x={2} y={TEXT_Y} fontSize={FONT_SIZE}>
          Belonging: {lastEvent.finalBelonging}%
        </text>
        {belongingOccurrences.map((occurrence, i) => {
          if (!occurrence.value || !occurrence.timing) return

          let prevBelonging = lastEvent.finalBelonging
          let belonging = lastEvent.finalBelonging

          belongingOccurrences.map((prevOccurrence, j) => {
            if (!prevOccurrence.value) return
            if (j <= i) {
              if (j < i) prevBelonging += prevOccurrence.value * prevOccurrence.direction
              belonging += prevOccurrence.value * prevOccurrence.direction
            }
          })

          const animationDelay = `${occurrence.timing}ms`

          return (
            <g key={`belonging-occurrence-${i}`}>
              <g className="plop-in" style={{ animationDelay }}>
                <rect className="container" width={MAX_BELONGING} />
                <rect className="filled belonging" width={belonging} />
                <text x={2} y={TEXT_Y} fontSize={FONT_SIZE}>
                  Belonging: {belonging}%
                </text>
              </g>
              <g className="fade-in-out-meter" style={{ animationDelay, animationDuration: `${DEFAULT_TEXT_ANIMATION_DELAY * 0.6}ms` }}>
                {occurrence.direction > 0 && (
                  <rect className="positive belonging" x={prevBelonging} width={occurrence.value} />
                )}
                {occurrence.direction < 0 && (
                  <rect className="negative belonging" x={prevBelonging - occurrence.value} width={occurrence.value} />
                )}
              </g>
            </g>
          )
        })}
      </svg>
      <br />
      <svg viewBox={`0 0 ${MAX_EXCLUSION} 10`}>
        <rect className="container" width={MAX_EXCLUSION} />
        <rect className="filled exclusion" width={lastEvent.finalExclusion}></rect>
        <text x={2} y={TEXT_Y} fontSize={FONT_SIZE}>
          Exclusion: {lastEvent.finalExclusion}%
        </text>
        {exclusionOccurrences.map((occurrence, i) => {
          if (!occurrence.value || !occurrence.timing) return

          let prevExclusion = lastEvent.finalExclusion
          let exclusion = lastEvent.finalExclusion

          exclusionOccurrences.map((prevOccurrence, j) => {
            if (!prevOccurrence.value) return
            if (j <= i) {
              if (j < i) prevExclusion += prevOccurrence.value * prevOccurrence.direction
              exclusion += prevOccurrence.value * prevOccurrence.direction
            }
          })

          const animationDelay = `${occurrence.timing}ms`

          return (
            <g key={`exclusion-occurrence-${i}`}>
              <g className="plop-in" style={{ animationDelay }}>
                <rect className="container" width={MAX_EXCLUSION} />
                <rect className="filled exclusion" width={exclusion}></rect>
                <text x={2} y={TEXT_Y} fontSize={FONT_SIZE}>
                  Exclusion: {exclusion}%
                </text>
              </g>
              <g className="fade-in-out-meter" style={{ animationDelay, animationDuration: `${DEFAULT_TEXT_ANIMATION_DELAY * 0.3}ms` }}>
                {occurrence.direction > 0 && (
                  <rect className="positive exclusion" x={prevExclusion} width={occurrence.value} />
                )}
                {occurrence.direction < 0 && (
                  //  fill="url(#diagonalHatch)"
                  <rect className="negative exclusion" x={prevExclusion - occurrence.value} width={occurrence.value} />
                )}
              </g>
            </g>
          )
        })}
      </svg>
      <br />
    </div>
  );
}
