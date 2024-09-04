import React, { useState } from "react";
import { DEFAULT_TEXT_ANIMATION_DELAY } from "../helpers";

interface AnimatedTextWithButtonsProps {
  children?: React.ReactNode
  texts: string[]
  extraDelay?: number // number of extra delay periods — NOTE: if meters also animate, they will also need to be adjusted
  hasInnerList?: boolean
}

export default function AnimatedTextWithButtons(props: AnimatedTextWithButtonsProps) {
  const { children, extraDelay, hasInnerList, texts } = props;
  const [buttonsShown, setButtonsShown] = useState(false)

  const animationDuration = (texts.length + (extraDelay || 0)) * DEFAULT_TEXT_ANIMATION_DELAY

  setTimeout(() => {
    setButtonsShown(true)
  }, animationDuration)

  return (
    <>
      {texts.map((text, i) => {
        const animationDelay = `${i * DEFAULT_TEXT_ANIMATION_DELAY}ms`


        if (hasInnerList && (i > 0 && i < texts.length - 1)) {
          return (
            <li 
              key={`text-${i}`} 
              className="fade-in-text" 
              style={{ animationDelay }}
            >
              { text }
            </li>
          )
        }

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