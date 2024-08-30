import { expectations } from "./bank";
import { Direction, Event, Occurrence, Stat } from "./types";
import { filter, flatten, random, sampleSize, sum, values } from 'lodash';

export const DEFAULT_HOBBY = "Line dancing";
export const INIT_BELONGING = 50;
export const MAX_BELONGING = 100;
export const INIT_EXCLUSION = 50;
export const MAX_EXCLUSION = 100;
export const HOME_BELONGING = 10;
export const HOME_EXCLUSION = 10;
export const MAX_BELONGING_DELTA = 10;
export const MAX_EXCLUSION_DELTA = 10;

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// TODO: is this still used?
export const clampStat = (value: number, stat: Stat): number => {
  if (stat === Stat.belonging) {
    return clamp(value, 0, MAX_BELONGING);
  } else if (stat === Stat.exclusion) {
    return clamp(value, 0, MAX_EXCLUSION);
  }
  console.warn("Unknown stat");
  return clamp(value, 0, 100);
};

// pull a random one of these to find out how many expectations you have about an event
const SAMPLE_OF_EXPECTATIONS = [1, 1, 2, 2, 2, 2, 2, 3, 3, 4]
const SAMPLE_OF_OCCURRENCES = [1, 1, 1, 1, 2]

const getNumberOfExpectations = () => SAMPLE_OF_EXPECTATIONS[random(0, SAMPLE_OF_EXPECTATIONS.length - 1)]
const getNumberOfOccurrences = () => SAMPLE_OF_OCCURRENCES[random(0, SAMPLE_OF_OCCURRENCES.length - 1)]

export const getEvent = (): Event => {
  const event: Event = []
  const sampledExpectations = sampleSize(expectations, getNumberOfExpectations())

  sampledExpectations.map((expectation) => {
    const numberOfOccurrences = getNumberOfOccurrences()
    const occurrences = sampleSize(expectation.occurrences, numberOfOccurrences)

    occurrences.map(occurrence => {
      const { direction, stat } = occurrence;
      occurrence.value = direction === Direction.neutral ? 0 : stat === Stat.belonging ? random(0, MAX_BELONGING_DELTA) : random(0, MAX_EXCLUSION_DELTA);
    })

    event.push({
      text: expectation.text,
      occurrences: occurrences
    })
  })

  return event;
}

export const getStatChangeText = (occurrence: Occurrence): string => {
  console.log(occurrence)

  if (occurrence.direction === Direction.neutral) return ''

  return `Your ${occurrence.stat} ${occurrence.direction === Direction.positive ? 'incresed' : 'decreased'} by ${occurrence.value}.`
}

export const getDeltaStat = (event: Event, stat: Stat): number => {
  const occurrences = flatten(event.map((expectation) => {
    return expectation.occurrences
  }))

  const occurrencesOfStat = filter(occurrences, (occurrence: Occurrence) => {
    return occurrence.stat === stat
  })

  const valuesOfStat = occurrencesOfStat.map(occurrence => {
    return occurrence.value
  })

  return sum(valuesOfStat)
}
