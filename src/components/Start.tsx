import { useState } from 'react';
import { sample } from 'lodash';
import { HOBBY_OPTIONS } from '../bank';

interface StartProps {
  onExit: (hobby: string) => void;
}

export default function Start(props: StartProps) {
  const { onExit } = props;

  const defaultHobby = sample(HOBBY_OPTIONS) as string

  const [hobby, setHobby] = useState(defaultHobby);

  return (
    <div className="card">
      <h1>Fraught</h1>
      <p>You've made it a habit to try out a new hobby each new year.</p>
      <p>
        <label>
          What hobby would you like to start?
          <input placeholder={defaultHobby} type="text" onChange={(e) => setHobby(e.target.value || defaultHobby)} />
        </label>
      </p>
      <button onClick={() => onExit(hobby)}>Continue</button>
    </div>
  );
}
