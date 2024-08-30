import { useState } from "react";
import { INIT_BELONGING, INIT_EXCLUSION, clampStat, getRandomInt } from "../helpers";
import { Choice, EventHistory, EventHistoryLog, Stat } from "../types";
// import TextAnimation from './TextAnimation';
// import ReactDOM from "react-dom/client";
import { TypeAnimation } from 'react-type-animation';

interface EventProps {
  hobby: string;
  eventHistoryLog: EventHistoryLog;
  onExit: (eventHistory: EventHistory) => void;
}

export default function Event(props: EventProps) {
  const { eventHistoryLog, hobby, onExit } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // useEffect(() => {
  //   let timeout;

  //   const nextText = texts[currentIndex]

  //   if (!nextText) return

  //   timeout = setTimeout(() => {
  //     setCurrentIndex(currentIndex + 1)
  //     setVisibleText(visibleText + nextText + '\n\n')
  //   }, 400);

  //   // TODO: i guess animate the bar here? or inside the above timeout?

  //   return () => clearTimeout(timeout);
  // }, [currentIndex])

  const onFinish = () => {
    console.log('onFinish')
    setCurrentIndex(currentIndex + 1)
    console.log(currentIndex)
  }

  const onFinishText = () => {
    // console.log('onFinishText', index)
    setCurrentIndex(currentIndex + 1);
    console.log(currentIndex)
  }

  return (
    <div className="card">
      {texts.map((text, i) => {
        return (
          <span key={`text-${i}`} style={{ visibility: i < currentIndex ? 'visible' : 'hidden'}}>{text}</span>
        )
      })}
      {currentIndex < texts.length - 1 && (
        <TypeAnimation
          sequence={[
            texts[0],
            1000,
            onFinishText,
            texts[1],
            1000,
            onFinishText,
            texts[2],
            onFinish,
          ]}
          wrapper="span"
          omitDeletionAnimation
          cursor={false}
        />
      )}
      <button onClick={() => onExit(eventHistory)}>Continue</button>
    </div>
  );
}
