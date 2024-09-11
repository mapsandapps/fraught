import { useState } from 'react';
import { Hobby } from '../types';

interface StartProps {
  defaultHobby: Hobby;
  onExit: (hobby: Hobby) => void;
}

export default function Start(props: StartProps) {
  const { defaultHobby, onExit } = props;

  const [hobby, setHobby] = useState(defaultHobby);

  return (
    <div className="card">
      <h1>Fraught</h1>
      <p>You've made it a habit to try out a new hobby each new year.</p>
      <p>
        <label>
          What hobby would you like to start?<br />
          <input placeholder={defaultHobby.name} type="text" onChange={(e) => setHobby({ ...hobby, name: e.target.value || defaultHobby.name })} />
        </label>
      </p>
      <p>
        <label>
          What emoji would you like to use to represent your hobby?<br />
          <input placeholder={defaultHobby.emoji} type="text" maxLength={1} size={4} onChange={(e) => setHobby({ ...hobby, emoji: e.target.value || defaultHobby.emoji })} />
        </label>
      </p>
      <button onClick={() => onExit(hobby)}>Continue</button>
    </div>
  );
}
