export enum GameState {
  start = 'start',
  event = 'event',
  home = 'home',
  win = 'win',
  preEvent = 'pre-event',
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
  key: string; // i think maybe expectations should have a short summary that associates them with an occurrence
  copy: string;
};

export type Occurrence = {
  copy: string;
  min: number;
  max: number;
  stat: Stat;
  expectationKey: string;
};

export type EventHistory = {
  // TODO: add date/month?
  choice: Choice;
  finalBelonging: number;
  finalExclusion: number;
};

export type EventHistoryLog = EventHistory[];
