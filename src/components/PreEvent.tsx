import { Choice, Event } from "../types";

interface PreEventProps {
  hobby: string;
  nextEvent: Event;
  onExit: (choice: Choice) => void;
}

export default function PreEvent(props: PreEventProps) {
  const { hobby, nextEvent, onExit } = props;

  return (
    <div className="card">
      {nextEvent.map((expectation, i) => {
        return (
          <p key={`expectation-${i}`}>
            { expectation.text }
          </p>
        )
      })}
      <p>
        Do you choose to go to the {hobby.toLowerCase()} event, or would you
        rather stay home?
      </p>
      <button onClick={() => onExit(Choice.event)}>Go to the event</button>
      <button onClick={() => onExit(Choice.home)}>Stay home</button>
    </div>
  );
}
