import { expectations, firstEventBank } from "./bank";
import { Choice, Direction, Event, EventHistoryLog, Occurrence, Stat, WinLossCondition } from "./types";
import { filter, flatten, inRange, last, random, sampleSize, sum } from 'lodash';

export const DEFAULT_HOBBY = "Line dancing";
// TODO: set back to ~2000
export const DEFAULT_TEXT_ANIMATION_DELAY = 500; // ms
export const INIT_BELONGING = 30;
export const MAX_BELONGING = 100;
export const INIT_EXCLUSION = 30;
export const MAX_EXCLUSION = 100;
export const HOME_BELONGING = 5;
export const HOME_EXCLUSION = 5;
export const MAX_BELONGING_DELTA = 10;
export const MAX_EXCLUSION_DELTA = 10;

// pull a random one of these to find out how many expectations you have about an event
const SAMPLE_OF_EXPECTATIONS = [1, 1, 2, 2, 2, 2, 2, 2, 3, 3]
const SAMPLE_OF_OCCURRENCES = [1, 1, 1, 1, 2]

const getNumberOfExpectations = () => SAMPLE_OF_EXPECTATIONS[random(0, SAMPLE_OF_EXPECTATIONS.length - 1)]
const getNumberOfOccurrences = () => SAMPLE_OF_OCCURRENCES[random(0, SAMPLE_OF_OCCURRENCES.length - 1)]

export const getMonth = (monthNumber: number): string => {
  // 1-indexed
  const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return months[monthNumber]
}

const giveOccurrencesValues = (occurrences: Occurrence[]): Occurrence[] => {
  occurrences.map(occurrence => {
    const { direction, stat } = occurrence;
    occurrence.value = direction === Direction.neutral ? 0 : stat === Stat.belonging ? random(1, MAX_BELONGING_DELTA) : random(1, MAX_EXCLUSION_DELTA);
  })

  return occurrences
}

export const getFirstEvent = (): Event => {
  const numberOfOccurrences = getNumberOfOccurrences()

  const occurrences = sampleSize(firstEventBank, numberOfOccurrences)

  giveOccurrencesValues(occurrences)

  return [{
    text: '',
    occurrences
  }]
}

export const getEvent = (): Event => {
  const event: Event = []
  const sampledExpectations = sampleSize(expectations, getNumberOfExpectations())

  sampledExpectations.map((expectation) => {
    const numberOfOccurrences = getNumberOfOccurrences()
    const occurrences = sampleSize(expectation.occurrences, numberOfOccurrences)

    giveOccurrencesValues(occurrences)

    event.push({
      text: expectation.text,
      occurrences: occurrences
    })
  })

  return event;
}

export const getStatChangeText = (occurrence: Occurrence): string => {
  if (occurrence.direction === Direction.neutral) return ''

  return `Your ${occurrence.stat} ${occurrence.direction === Direction.positive ? 'incresed' : 'decreased'} by ${occurrence.value}.`
}

export const getOccurrencesForEvent = (event: Event): Occurrence[] => {
  return flatten(event.map(expectation => {
    return expectation.occurrences
  }))
}

export const getDeltaStat = (event: Event, stat: Stat): number => {
  const occurrences = getOccurrencesForEvent(event)

  const occurrencesOfStat = filter(occurrences, (occurrence: Occurrence) => {
    return occurrence.stat === stat
  })

  const valuesOfStat = occurrencesOfStat.map(occurrence => {
    if (!occurrence.value) return 0

    return occurrence.value * occurrence.direction
  })

  return sum(valuesOfStat)
}

export const checkForWinOrLoss = (eventHistoryLog: EventHistoryLog): WinLossCondition | null => {
  // return WinLossCondition.bothMin // for debug purposes

  if (eventHistoryLog.length > 12) return WinLossCondition.yearEnd

  const lastEvent = last(eventHistoryLog)

  if (!lastEvent) return null

  const { finalBelonging, finalExclusion } = lastEvent
  if (inRange(finalBelonging, 0, 100) && inRange(finalExclusion, 0, 100)) return null

  if (finalBelonging <= 0 && finalExclusion <= 0) return WinLossCondition.bothMin

  if (finalBelonging >= 100 && finalExclusion >= 100) return WinLossCondition.bothMax

  // this should get returned even if exclusion === 0
  if (finalBelonging >= 100) return WinLossCondition.belongingMax

  // this should get returned even if belonging === 0
  if (finalExclusion >= 100) return WinLossCondition.exclusionMax

  if (finalBelonging <= 0) return WinLossCondition.belongingMin

  // i'm not sure if this should be a win condition, but it makes it easier for the game structure:
  if (finalExclusion <= 0) return WinLossCondition.exclusionMin

  console.warn('Unexpected condition occurred')
  return null
}

export const countEventsAttended = (eventHistoryLog: EventHistoryLog): number => {
  const eventsAttended = filter(eventHistoryLog, (event) => {
    return event.choice === Choice.event
  })

  return eventsAttended.length
}
