import { getMonth } from "../helpers"
import { GameState } from "../types";
import "./Month.css";

interface MonthProps {
  gameState: GameState
  monthNumber: number
}

export default function Month(props: MonthProps) {
  const { gameState, monthNumber } = props

  const currentMonthName = getMonth(monthNumber)
  const prevMonthName = getMonth(monthNumber - 1)

  console.log(getMonth(monthNumber))

  if (gameState !== GameState.preEvent) {
    return (
      <h1>{getMonth(monthNumber)}</h1>
    )
  }

  return (
    <div className="month">
      {/* modified from https://www.reddit.com/r/svg/comments/1e3qehg/svg_animation_calendar_like/ */}
      <svg className="month-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 96' width='128' height='96'>
        <line className="calendar-bar" x1='0' x2='128' y1='0' y2='0' />
        
        <g className='pages'>
          <g className='page new-month'>
            <rect x='4' y='8' />
            <text x='64' y='56'>{ currentMonthName }</text>
          </g>
          <g className='page old-month'>
            <rect x='4' y='8' />
            <text x='64' y='56'>{ prevMonthName }</text>
          </g>
        </g>

        <line className="calendar-perforate" x1='4' x2='124' y1='8' y2='8' />
      </svg>
    </div>
  )
}
