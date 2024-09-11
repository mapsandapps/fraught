export enum GameState {
  start = 'start',
  event = 'event',
  home = 'home',
  win = 'win',
  preEvent = 'pre-event',
  interstitial = 'interstitial',
}

export enum WinLossCondition {
  yearEnd = 'Year end',
  bothMax = 'Both max',
  bothMin = 'Both min',
  belongingMax = 'Belonging max',
  belongingMin = 'Belonging min',
  exclusionMax = 'Exclusion max',
  exclusionMin = 'Exclusion min'
}

export enum Direction {
  positive = 1,
  negative = -1,
  neutral = 0,
}

export enum Stat {
  belonging = 'belonging',
  exclusion = 'exclusion',
}

export enum Choice {
  init = 'init',
  event = 'event',
  home = 'home',
}

export type Expectation = {
  text: string;
  direction: Direction;
  occurrences: Occurrence[];
  timing?: number; // ms
};

export type Event = Expectation[]

export type Occurrence = {
  text: string;
  value?: number;
  direction: Direction;
  stat: Stat;
  timing?: number; // ms
};

export type EventHistory = {
  // TODO: add date/month?
  choice: Choice;
  finalBelonging: number;
  finalExclusion: number;
};

export type EventHistoryLog = EventHistory[];
