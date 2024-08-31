import { Direction, Event, EventHistoryLog, Stat } from "../types";
import { DEFAULT_METER_ANIMATION_DELAY, MAX_BELONGING, MAX_EXCLUSION, getOccurrencesForEvent } from "../helpers";
import { useEffect, useState } from "react";

interface MetersProps {
  event: Event
  eventHistoryLog: EventHistoryLog;
}

export default function Meters(props: MetersProps) {
  const TEXT_Y = 5;
  const FONT_SIZE = '0.2em';
  const { event, eventHistoryLog } = props;

  const lastEvent = eventHistoryLog[eventHistoryLog.length - 1];

  const [belonging, setBelonging] = useState(lastEvent.finalBelonging)
  const [exclusion, setExclusion] = useState(lastEvent.finalExclusion)

  const [deltaBelonging, setDeltaBelonging] = useState(0);
  const [deltaExclusion, setDeltaExclusion] = useState(0);

  useEffect(() => {
    getOccurrencesForEvent(event).map(occurrence => {
      console.log(occurrence)
      if (!occurrence.timing) return
  
      setTimeout(() => {
        // animate meter based on occurrence.stuff
        if (!occurrence.value) return

        const delta = occurrence.value * occurrence.direction
  
        if (occurrence.stat === Stat.belonging) {
          setDeltaBelonging(delta)
          setBelonging(belonging + delta)
          console.log(delta)
        } else if (occurrence.stat === Stat.exclusion) {
          setDeltaExclusion(delta)
          setExclusion(exclusion + delta)
          console.log(delta)
        }

      }, occurrence.timing)
  
      setTimeout(() => {
        // remove the delta section of the meters
        console.log(belonging)
        console.log(exclusion)
        setDeltaBelonging(0)
        setDeltaExclusion(0)
      }, occurrence.timing + DEFAULT_METER_ANIMATION_DELAY)
    })
  }, [event])

  return (
    <div className="meters">
      {lastEvent && (
        <>
          <svg viewBox={`0 0 ${MAX_BELONGING} 10`} width="200">
            <rect width={MAX_BELONGING} height="10" fill="lightgray" />
            <rect width={belonging} height="10" fill="green"></rect>
            <text x={10} y={TEXT_Y} fontSize={FONT_SIZE}>
              Belonging: {belonging}%
            </text>
            {deltaBelonging > 0 && (
              <rect x={belonging} width={deltaBelonging} height="10" fill="darkgreen" />
            )}
            {deltaBelonging < 0 && (
              <rect x={belonging - deltaBelonging} width={deltaBelonging * -1} height="10" fill="darkred" />
            )}
            {deltaBelonging && (
              <text x={deltaBelonging > 0 ? belonging : belonging - deltaBelonging} y={TEXT_Y} fontSize={FONT_SIZE}>
                {deltaBelonging > 0 ? '+' : '-'}{deltaBelonging}
              </text>
            )}
          </svg>
          <br />
          <svg viewBox={`0 0 ${MAX_EXCLUSION} 10`} width="200">
            <rect width={MAX_EXCLUSION} height="10" fill="lightgray" />
            <rect width={exclusion} height="10" fill="red"></rect>
            <text x={10} y={TEXT_Y} fontSize={FONT_SIZE}>
              Exclusion: {exclusion}%
            </text>
            {deltaExclusion > 0 && (
              <rect x={exclusion} width={deltaExclusion} height="10" fill="darkgreen" />
            )}
            {deltaExclusion < 0 && (
              <rect x={exclusion - deltaExclusion} width={deltaExclusion * -1} height="10" fill="darkred" />
            )}
            {deltaExclusion && (
              <text x={deltaExclusion > 0 ? exclusion : exclusion - deltaExclusion} y={TEXT_Y} fontSize={FONT_SIZE}>
                {deltaExclusion > 0 ? '+' : '-'}{deltaExclusion}
              </text>
            )}
          </svg>
        </>
      )}
    </div>
  );
}
