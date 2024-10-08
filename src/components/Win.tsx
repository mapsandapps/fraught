import { useState } from 'react';
import { Choice, EventHistoryLog, Hobby, WinLossCondition } from '../types';
import AnimatedTextWithButtons from './AnimatedTextWithButtons';
import { MAX_BELONGING, getMonth } from '../helpers';

interface WinProps {
  eventHistoryLog: EventHistoryLog;
  hobby: Hobby;
  winLossCondition: WinLossCondition;
}

export default function Win(props: WinProps) {
  const { eventHistoryLog, hobby, winLossCondition } = props
  const [isYearReviewVisible, setYearReviewVisible] = useState(false)

  const isWin = winLossCondition === WinLossCondition.belongingMax

  const texts = []

  switch (winLossCondition) {
    case WinLossCondition.belongingMax: 
      texts.push({ text: `You've become very comfortable in your new ${hobby.name} hobby. You've really found a home here with these folks. ❤️` })
      // texts.push({ text: 'You continue to attend events for the rest of the year.' })
      break
    case WinLossCondition.belongingMin:
    case WinLossCondition.bothMin:
      texts.push({ text: `You no longer feel like you belong at the ${hobby.name} events. Over time, you've dropped out of the hobby.` })
      texts.push({ text: 'It just doesn\'t feel like home to you.' })
      break
    case WinLossCondition.exclusionMax:
      texts.push({ text: `The ${hobby.name} hobby has felt pretty exclusionary. Over time, you've stopped attending events.` })
      texts.push({ text: 'Even though sometimes you felt like you belonged there, you also couldn\'t help but feel excluded. Maybe this hobby just isn\'t right for you.' })
      break
    case WinLossCondition.exclusionMin:
      texts.push({ text: `You aren't always sure if you belong in the ${hobby.name} hobby, but at least you don't feel pushed away from it.` })
      // texts.push({ text: 'You decide to continue attending events regularly for the foreseeable future.' })
      break
    case WinLossCondition.yearEnd:
      texts.push({ text: `You've made it through a full year of ${hobby.name} events! You're not always sure if you belong there or not, but you're looking forward to see what next year has to offer.` })
      break
    case WinLossCondition.bothMax:
      texts.push({ text: `What a weird experience. You really feel like you've found a home in the ${hobby.name} community. But on the other hand, you often feel excluded from various events.` })
      // texts.push({ text: `You feel some kind of way about this, and you decide to pause on attending ${hobby.name} events for now.` })
      break
  }

  const meterFullWidth = MAX_BELONGING

  return (
    <div className="card">
      <h1 style={{ textDecoration: isWin ? 'line-through' : 'none' }}>Fraught</h1>
      <AnimatedTextWithButtons texts={texts}>
        <button onClick={() => window.location.reload()}>Start a new game</button>
        <button onClick={() => setYearReviewVisible(!isYearReviewVisible)}>{isYearReviewVisible ? 'Hide year recap' : 'View year recap'}</button>
      </AnimatedTextWithButtons>
      <br /><br />
      {isYearReviewVisible && (
        <svg viewBox={`0 0 ${meterFullWidth * 2} ${(eventHistoryLog.length + 1) * 10}`} style={{ backgroundColor: '#DEDEDE' }}>
          <text 
            x={meterFullWidth - 2} 
            y={7} 
            fontSize='0.5em' 
            textAnchor='end'
          >
            Exclusion
          </text>
          <text 
            x={meterFullWidth + 2} 
            y={7} 
            fontSize='0.5em' 
            textAnchor='start'
          >
            Belonging
          </text>
          {eventHistoryLog.map((logItem, i) => {
            const y = (i + 1) * 10
            return (
              <g key={`log-item-${i}`}>
                <rect 
                  className="filled exclusion" 
                  x={meterFullWidth - logItem.finalExclusion}
                  y={y}
                  width={logItem.finalExclusion}
                />
                <rect 
                  className="filled belonging" 
                  x={meterFullWidth}
                  y={y}
                  width={logItem.finalBelonging}
                />
                <text y={y + 7} fontSize='0.5em'>{getMonth(i, true) || '—'}</text>
                <text x={meterFullWidth * 2} y={y + 7} fontSize='0.5em' textAnchor='end'>{logItem.choice === Choice.home ? '🏡' : hobby.emoji}</text>
              </g>
            )
          })}
          <line
            x1={meterFullWidth}
            x2={meterFullWidth}
            y1={0}
            y2={(eventHistoryLog.length + 1) * 10} 
            stroke="gray"
            strokeWidth={1}
            strokeDasharray='3.33 3.33'
          />
        </svg>
      )}
    </div>
  )
}
