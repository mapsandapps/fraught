import { expectations, firstEventBank, occurrencesWithoutExpectations } from "./bank";
import { Choice, Direction, Event, EventHistoryLog, Occurrence, Stat, WinLossCondition } from "./types";
import { filter, flatten, inRange, last, random, sample, sampleSize, sum } from 'lodash';

const IS_DEBUG_MODE = false

export const DEFAULT_TEXT_ANIMATION_DELAY = IS_DEBUG_MODE ? 500 : 2000; // ms
export const INIT_BELONGING = 30;
export const MAX_BELONGING = 100;
export const INIT_EXCLUSION = 30;
export const MAX_EXCLUSION = 100;
export const HOME_BELONGING = 5;
export const HOME_EXCLUSION = 5;
export const MAX_BELONGING_DELTA = 10;
export const MAX_EXCLUSION_DELTA = 10;
// for tuning, have both meters increase more than they decrease
export const POSITIVE_MULTIPLIER = 2;

// pull a random one of these to find out how many expectations you have about an event
// const SAMPLE_OF_EXPECTATIONS = IS_DEBUG_MODE ? [1, 2, 5, 6, 8] : [1, 1, 2, 2, 2, 2, 2, 2, 3, 3]
const SAMPLE_OF_EXPECTATIONS = [1, 1, 2, 2, 2, 2, 2, 2, 3, 3]
const SAMPLE_OF_OCCURRENCES = [1, 1, 1, 1, 2]
const SAMPLE_OF_OCCURRENCES_FIRST_EVENT = [1, 2, 2, 3, 3]
const LIKELIHOOD_OF_EXTRA_OCCURRENCE = IS_DEBUG_MODE ? 1 : 0.4

const getNumberOfExpectations = () => SAMPLE_OF_EXPECTATIONS[random(0, SAMPLE_OF_EXPECTATIONS.length - 1)]
const getNumberOfOccurrences = (isFirstEvent?: boolean) => {
  return isFirstEvent ? sample(SAMPLE_OF_OCCURRENCES_FIRST_EVENT) : sample(SAMPLE_OF_OCCURRENCES)
}

export const getMonth = (monthNumber: number, isShort?: boolean): string => {
  // 1-indexed
  const months = isShort ? ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return months[monthNumber]
}

const giveOccurrencesValues = (occurrences: Occurrence[]): Occurrence[] => {
  occurrences.map(occurrence => {
    const { direction, stat } = occurrence;
    switch (direction) {
      case Direction.neutral:
        occurrence.value = 0
        break
      case Direction.positive:
        occurrence.value = stat === Stat.belonging ? random(1, MAX_BELONGING_DELTA * POSITIVE_MULTIPLIER) : random(1, MAX_EXCLUSION_DELTA * POSITIVE_MULTIPLIER)
        break
      case Direction.negative:
        occurrence.value = stat === Stat.belonging ? random(1, MAX_BELONGING_DELTA) : random(1, MAX_EXCLUSION_DELTA)
    }
  })

  return occurrences
}

export const getFirstEvent = (): Event => {
  const numberOfOccurrences = getNumberOfOccurrences(true)

  const occurrences = sampleSize(firstEventBank, numberOfOccurrences)

  giveOccurrencesValues(occurrences)

  return [{
    text: '',
    direction: Direction.neutral,
    occurrences
  }]
}

export const getRandomExtraOccurrence = (): Occurrence => {
  let occurrence

  // roll the dice about whether to get an occurrence that's attached to an expectation or one with no expectation
  if (Math.random() < 0.5) {
    // pick an occurrence from the expectations list
    const expectation = sample(expectations)
  
    occurrence = sample(expectation?.occurrences)!
  } else {
    // pick an occurrance that has no expectation
    occurrence = sample(occurrencesWithoutExpectations)!
  }
  
  giveOccurrencesValues([occurrence])

  return occurrence
}

export const getEvent = (): Event => {
  const event: Event = []
  const sampledExpectations = sampleSize(expectations, getNumberOfExpectations())
  const allOccurrences: Occurrence[] = []

  sampledExpectations.map((expectation) => {
    const numberOfOccurrences = getNumberOfOccurrences()
    const occurrences = sampleSize(expectation.occurrences, numberOfOccurrences)

    giveOccurrencesValues(occurrences)

    allOccurrences.push(...occurrences)

    event.push({ ...expectation, 
      occurrences: occurrences
    })
  })

  // sometimes add an occurrence with no expectation
  if (Math.random() < LIKELIHOOD_OF_EXTRA_OCCURRENCE) {
    const randomExtraOccurrence = getRandomExtraOccurrence();

    // if the new occurence isn't already in the list of occurrences, add it
    // NOTE: this means the likelihood will actually be a bit below the constant value
    // i could redraw, but i don't really see a point, haha
    const isRandomOccurrenceNew = !allOccurrences.find(occurrence => {
      return occurrence.text === randomExtraOccurrence.text
    })
  
    if (isRandomOccurrenceNew) {
      event.push({
        text: '',
        direction: Direction.neutral,
        occurrences: [randomExtraOccurrence]
      })
    }
  }

  return event;
}

export const getStatChangeText = (occurrence: Occurrence): string => {
  if (occurrence.direction === Direction.neutral) return ''

  let text = ''

  if (occurrence.stat === Stat.belonging) {
    text += `You feel a bit ${occurrence.direction === Direction.positive ? 'more' : 'less'} integrated into the hobby.`
  } else if (occurrence.direction === Direction.positive) {
    text += `You feel less welcome in the hobby.`
  } else {
    text += `Your sense of exclusion wore off a bit.`
  }

  text += ' '
  text += `[${occurrence.stat === Stat.belonging ? 'Belonging' : 'Exclusion'} ${occurrence.direction === Direction.positive ? '+' : '-'}${occurrence.value}]`

  return text
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
  // return WinLossCondition.belongingMax // for debug purposes

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
