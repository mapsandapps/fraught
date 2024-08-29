import { useState } from 'react';
import { DEFAULT_HOBBY } from '../helpers';

interface StartProps {
  onExit: (hobby: string) => void;
}

export default function Start(props: StartProps) {
  const { onExit } = props;

  const [hobby, setHobby] = useState(DEFAULT_HOBBY);

  return (
    <div className="card">
      <label>
        What new hobby would you like to start?
        <input placeholder="Line dancing" type="text" onChange={(e) => setHobby(e.target.value || DEFAULT_HOBBY)} />
      </label>
      <button onClick={() => onExit(hobby)}>Continue</button>
    </div>
  );
}
