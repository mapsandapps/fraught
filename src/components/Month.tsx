import { getMonth } from "../helpers"

interface MonthProps {
  monthNumber: number
}

export default function Month(props: MonthProps) {
  const { monthNumber } = props

  return (
    <h1>{getMonth(monthNumber)}</h1>
  )
}
