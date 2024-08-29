import { Stat } from "./types";

export const DEFAULT_HOBBY = "Line dancing";
export const INIT_BELONGING = 50;
export const MAX_BELONGING = 100;
export const INIT_EXCLUSION = 50;
export const MAX_EXCLUSION = 100;
export const HOME_BELONGING = 10;
export const HOME_EXCLUSION = 10;

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const clampStat = (value: number, stat: Stat): number => {
  if (stat === Stat.belonging) {
    return clamp(value, 0, MAX_BELONGING);
  } else if (stat === Stat.exclusion) {
    return clamp(value, 0, MAX_EXCLUSION);
  }
  console.warn("Unknown stat");
  return clamp(value, 0, 100);
};

export const getRandomInt = (min: number, max: number): number => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
