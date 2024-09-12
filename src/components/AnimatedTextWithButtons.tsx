import React, { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";
import { AnimatedText } from "../types";

interface AnimatedTextWithButtonsProps {
  children?: React.ReactNode
  texts: AnimatedText[]
  extraDelay?: number // number of extra delay periods — NOTE: if meters also animate, they will also need to be adjusted
}

export default function AnimatedTextWithButtons(props: AnimatedTextWithButtonsProps) {
  const { children, extraDelay, texts } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const animationDuration = (texts.length + (extraDelay || 0)) * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <>
      {texts.map((text, i) => {
        const animationDelay = `${(i + (extraDelay || 0)) * DEFAULT_TEXT_ANIMATION_DELAY}ms`

        return (
          <p 
            key={`text-${i}`} 
            className="fade-in-text" 
            style={{ animationDelay }}
          >
            { text.text }
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