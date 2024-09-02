import { getMonth } from "../helpers"
import { GameState } from "../types";
import "./Month.css";

interface MonthProps {
  gameState: GameState
  monthNumber: number
}

export default function Month(props: MonthProps) {
  const { gameState, monthNumber } = props

  const currentMonthName = getMonth(monthNumber, true)
  const prevMonthName = getMonth(monthNumber - 1, true)

  console.log(getMonth(monthNumber))

  if (gameState !== GameState.preEvent) {
    return (
      <h1>{getMonth(monthNumber)}</h1>
    )
  }

  return (
    // https://www.reddit.com/r/svg/comments/1e3qehg/svg_animation_calendar_like/
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='64' height='64'>
      {/* calendar shape */}
      <rect x='64' y='96' width='384' height='10' rx='32' ry='32' fill='#213547'/>
      
      {/* pages with numbers */}
      <g className='pages'>
        <g className='page new-month'>
          <rect x='96' y='128' />
          <text x='256' y='320'>{ currentMonthName }</text>
        </g>
        <g className='page old-month'>
          <rect x='96' y='128' />
          <text x='256' y='320'>{ prevMonthName }</text>
          <g className='tear'></g>
        </g>
      </g>
    </svg>
  )
}
