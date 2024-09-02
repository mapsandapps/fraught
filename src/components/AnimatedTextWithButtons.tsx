import React, { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";

interface AnimatedTextWithButtonsProps {
  children?: React.ReactNode
  texts: string[],
}

export default function AnimatedTextWithButtons(props: AnimatedTextWithButtonsProps) {
  const { children, texts } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const animationDuration = texts.length * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <>
      {texts.map((text, i) => {
        const animationDelay = `${i * DEFAULT_TEXT_ANIMATION_DELAY}ms`

        return (
          <p 
            key={`text-${i}`} 
            className="fade-in-text" 
            style={{ animationDelay }}
          >
            { text }
          </p>
        )
      })}
      {buttonsShown && (
        <>
          {children}
        </>
      )}
    </>
  )
}