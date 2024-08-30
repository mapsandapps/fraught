import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";
import { Choice, Event } from "../types";

interface PreEventProps {
  hobby: string;
  nextEvent: Event;
  onExit: (choice: Choice) => void;
}

export default function PreEvent(props: PreEventProps) {
  const { hobby, nextEvent, onExit } = props;

  const texts = [
    nextEvent.length > 1 ? 'A number of thoughts go through your head about the next upcoming event:' : 'You contemplate the next upcoming event:'
  ]

  nextEvent.map((expectation) => {
    texts.push(expectation.text)
  })

  texts.push(`Do you choose to go to the ${hobby.toLowerCase()} event, or would you
  rather stay home?`)

  return (
    <div className="card">
      {texts.map((text, i) => {
        const animationDelay = `${i * DEFAULT_TEXT_ANIMATION_DELAY}ms`
        
        return (
          <p 
            key={`text-${i}`} 
            className="fade-in" 
            style={{ animationDelay }}
          >
            { text }
          </p>
        )
      })}
      <button onClick={() => onExit(Choice.event)}>Go to the event</button>
      <button onClick={() => onExit(Choice.home)}>Stay home</button>
    </div>
  );
}
