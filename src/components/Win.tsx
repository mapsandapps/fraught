import { useState } from 'react';
import { EventHistoryLog, WinLossCondition } from '../types';
import AnimatedTextWithButtons from './AnimatedTextWithButtons';
import { MAX_BELONGING, getMonth } from '../helpers';

interface WinProps {
  eventHistoryLog: EventHistoryLog;
  hobby: string;
  winLossCondition: WinLossCondition;
}

export default function Win(props: WinProps) {
  const { eventHistoryLog, hobby, winLossCondition } = props
  const [isYearReviewVisible, setYearReviewVisible] = useState(false)

  const isWin = winLossCondition === WinLossCondition.belongingMax

  const texts = []

  switch (winLossCondition) {
    case WinLossCondition.belongingMax: 
      texts.push(`You've become very comfortable in your new ${hobby} hobby. You've really found a home here with these folks. ❤️`)
      texts.push('You continue to attend events for the rest of the year.')
      break
    case WinLossCondition.belongingMin:
    case WinLossCondition.bothMin:
      texts.push(`You no longer feel like you belong at the ${hobby} events. Over time, you've dropped out of the hobby.`)
      texts.push('It just doesn\'t feel like home to you.')
      break
    case WinLossCondition.exclusionMax:
      texts.push(`The ${hobby} hobby has felt pretty exclusionary. Over time, you've stopped attending events.`)
      texts.push('Even though sometimes you felt like you belonged there, you also couldn\'t help but feel excluded. Maybe this hobby just isn\'t right for you.')
      break
    case WinLossCondition.exclusionMin:
      texts.push(`You aren't always sure if you belong in the ${hobby} hobby, but at least you don't feel pushed away from it.`)
      texts.push('You decide to continue attending events regularly for the foreseeable future.')
      break
    case WinLossCondition.yearEnd:
      texts.push(`You've made it through a full year of ${hobby} events! You're not always sure if you belong there or not, but you're looking forward to see what next year has to offer.`)
      break
    case WinLossCondition.bothMax:
      texts.push(`What a weird experience. You really feel like you've found a home in the ${hobby} community. But on the other hand, you often feel excluded from various events.`)
      texts.push(`You feel some kind of way about this, and you decide to pause on attending ${hobby} events for now.`)
      break
    default:
      console.warn('Unexpected condition')
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
              <g>
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
