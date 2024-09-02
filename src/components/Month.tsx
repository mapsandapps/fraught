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
    // modified from https://www.reddit.com/r/svg/comments/1e3qehg/svg_animation_calendar_like/
    <svg className="month-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 768' width='128' height='96'>
      <rect className="calendar-bar" x='0' y='0' />
      
      <g className='pages'>
        <g className='page new-month'>
          <rect x='32' y='64' />
          <text x='512' y='448'>{ currentMonthName }</text>
        </g>
        <g className='page old-month'>
          <rect x='32' y='64' />
          <text x='512' y='448'>{ prevMonthName }</text>
        </g>
      </g>

      <line className="calendar-perforate" x1='32' x2='992' y1='64' y2='68' />
    </svg>
  )
}
