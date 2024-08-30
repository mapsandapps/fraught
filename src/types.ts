export enum GameState {
  start = 'start',
  event = 'event',
  home = 'home',
  win = 'win',
  preEvent = 'pre-event',
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
  event = 'event',
  home = 'home',
}

export type Expectation = {
  text: string;
  occurrences: Occurrence[];
};

export type Event = Expectation[]

export type Occurrence = {
  text: string;
  value?: number;
  direction: Direction;
  stat: Stat;
};

export type EventHistory = {
  // TODO: add date/month?
  choice: Choice;
  finalBelonging: number;
  finalExclusion: number;
};

export type EventHistoryLog = EventHistory[];
