import { WinLossCondition } from '../types';

interface WinProps {
  hobby: string;
  winLossCondition: WinLossCondition;
}

export default function Win(props: WinProps) {
  const { hobby, winLossCondition } = props;

  return (
    <div className="card">
      <h1>Fraught</h1>
      <p>
        You won! Or lost! I haven't figured it out yet!
      </p>
      <p>
        { winLossCondition }, { hobby }
      </p>
      <button onClick={() => window.location.reload()}>Start a new game</button>
    </div>
  );
}
