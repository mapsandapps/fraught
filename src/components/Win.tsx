import { WinLossCondition } from '../types';
import AnimatedTextWithButtons from './AnimatedTextWithButtons';

interface WinProps {
  hobby: string;
  winLossCondition: WinLossCondition;
}

export default function Win(props: WinProps) {
  const { hobby, winLossCondition } = props

  const texts = []

  const hobbyLowerCase = hobby.toLowerCase()

  switch (winLossCondition) {
    case WinLossCondition.belongingMax: 
      texts.push(`You've become very comfortable in your new ${hobbyLowerCase} hobby. You've really found a home here with these folks. ❤️`)
      texts.push('You continue to attend events for the rest of the year.')
      break
    case WinLossCondition.belongingMin:
    case WinLossCondition.bothMin:
      texts.push(`You no longer feel like you belong at the ${hobbyLowerCase} events. Over time, you've dropped out of the hobby.`)
      texts.push('It just doesn\'t feel like home to you.')
      break
    case WinLossCondition.exclusionMax:
      texts.push(`The ${hobbyLowerCase} hobby has felt pretty exclusionary. Over time, you've stopped attending events.`)
      texts.push('Even though sometimes you felt like you belonged there, you also couldn\'t help but feel excluded. Maybe they just aren\'t right for you.')
      break
    case WinLossCondition.exclusionMin:
      texts.push(`You aren't always sure if you belong in the ${hobbyLowerCase} hobby, but at least you don't feel pushed away from it.`)
      texts.push('You decide to continue attending events regularly for the foreseeable future.')
      break
    case WinLossCondition.yearEnd:
      texts.push(`You've made it through a full year of ${hobbyLowerCase} events! You're not always sure if you belong there or not, but you're looking forward to see what next year has to offer.`)
      break
    case WinLossCondition.bothMax:
      texts.push(`What a weird experience. You really feel like you've found a home in the ${hobbyLowerCase} community. But on the other hand, you often feel excluded from various events.`)
      texts.push(`You feel some kind of way about this, and you decide to pause on attending ${hobbyLowerCase} events for now.`)
      break
    default:
      console.warn('Unexpected condition')
  }

  return (
    <div className="card">
      <h1>Fraught</h1>
      <p className="debug">
        { winLossCondition }, { hobby }
      </p>
      <AnimatedTextWithButtons texts={texts}>
        <button onClick={() => window.location.reload()}>Start a new game</button>
      </AnimatedTextWithButtons>
    </div>
  )
}
