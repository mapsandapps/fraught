import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";
import { Direction, Event, Expectation } from "../types";
import "./ProsAndCons.css";

interface ProsAndConsProps {
  nextEvent: Event
}

export default function ProsAndCons(props: ProsAndConsProps) {
  const { nextEvent } = props;

  const pros: Expectation[] = []
  const cons: Expectation[] = []
  const neutrals: Expectation[] = []

  nextEvent.map((expectation, i) => {
    const timing = DEFAULT_TEXT_ANIMATION_DELAY * (i + 1)
    switch (expectation.direction) {
      case Direction.positive:
        pros.push({ ...expectation, timing })
        break
      case Direction.negative:
        cons.push({ ...expectation, timing })
        break
      case Direction.neutral:
        neutrals.push({ ...expectation, timing })
        break
    }
  })

  return (
    <div className="paper">
      <div className="header" />
      <div className="pros">
        <h2 className="paper-title">Pros:</h2>
        <ul>
          {pros.map(expectation => {
            return (
              <li key={expectation.text} className="fade-in-text" style={{ animationDelay: `${expectation.timing}ms` }}>{ expectation.text }</li>
            )
          })}
        </ul>
      </div>
      <div className="cons">
        <h2 className="paper-title">Cons:</h2>
        <ul>
          {cons.map(expectation => {
            return (
              <li key={expectation.text} className="fade-in-text" style={{ animationDelay: `${expectation.timing}ms` }}>{ expectation.text }</li>
            )
          })}
        </ul>
      </div>
      {neutrals.length > 0 && (
        <div className="neutrals fade-in-text" style={{ animationDelay: `${neutrals[0].timing}ms`}}>
          <h2 className="paper-title">Misc:</h2>
          <ul>
            {neutrals.map(expectation => {
              return (
                <li key={expectation.text} className="fade-in-text" style={{ animationDelay: `${expectation.timing}ms` }}>{ expectation.text }</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
