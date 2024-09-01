import { WinLossCondition } from '../types';

interface WinProps {
  hobby: string;
  winLossCondition: WinLossCondition;
}

export default function Win(props: WinProps) {
  const { hobby, winLossCondition } = props;

  const texts = []

  switch (winLossCondition) {
    case WinLossCondition.belongingMax: 
      texts.push(`You've become very comfortable in your new ${hobby} hobby. You've really found a home here with these folks. ❤️`)
      texts.push('You continue to attend events for the rest of the year.')
      break;
    case WinLossCondition.belongingMin:
      texts.push(`You no longer feel like you belong at the ${hobby} events. Over time, you've dropped out of the hobby.`)
      texts.push('It just doesn\'t feel like home to you.')
      break;
    default:
      console.warn('Unexpected condition')
  }

  return (
    <div className="card">
      <h1>Fraught</h1>
      <p className="debug">
        { winLossCondition }, { hobby }
      </p>
      <button onClick={() => window.location.reload()}>Start a new game</button>
    </div>
  );
}
