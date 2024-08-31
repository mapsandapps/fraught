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

  const occurrences = getOccurrencesForEvent(event)

  const belongingOccurrences = occurrences.filter(occurrence => {
    return occurrence.stat === Stat.belonging
  })

  console.log(occurrences)

  const exclusionOccurrences = occurrences.filter(occurrence => {
    return occurrence.stat === Stat.exclusion
  })

  if (!lastEvent) return

  return (
    <div className="meters">
    <svg viewBox={`0 0 ${MAX_BELONGING} 10`} width="200">
      <rect width={MAX_BELONGING} height="10" fill="lightgray" />
      <rect width={lastEvent.finalBelonging} height="10" fill="green"></rect>
      <text x={10} y={TEXT_Y} fontSize={FONT_SIZE}>
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
          <>
            <g className="plop-in" style={{ animationDelay }}>
              <rect width={MAX_BELONGING} height="10" fill="lightgray" />
              <rect width={belonging} height="10" fill="green"></rect>
              <text x={10} y={TEXT_Y} fontSize={FONT_SIZE}>
                Belonging: {belonging}%
              </text>
            </g>
            <g className="fade-in-out-meter" style={{ animationDelay }}>
              {occurrence.direction > 0 && (
                <rect x={prevBelonging} width={occurrence.value} height="10" fill="darkgreen" />
              )}
              {occurrence.direction < 0 && (
                <rect x={prevBelonging - occurrence.value} width={occurrence.value} height="10" fill="darkred" />
              )}
            </g>
          </>
        )
      })}
    </svg>
    {/* <br />
    <svg viewBox={`0 0 ${MAX_EXCLUSION} 10`} width="200">
      <rect width={MAX_EXCLUSION} height="10" fill="lightgray" />
      <rect width={lastEvent.finalExclusion} height="10" fill="red"></rect>
      <text x={10} y={TEXT_Y} fontSize={FONT_SIZE}>
        Exclusion: {lastEvent.finalExclusion}%
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
    </svg> */}
    </div>
  );
}
