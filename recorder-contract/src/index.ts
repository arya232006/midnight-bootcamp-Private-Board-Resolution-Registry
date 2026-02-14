export * as Counter from "./managed/counter/contract/index.js";
export * as Voting from "./managed/voting/contract/index.js";
export * as Recorder from "./managed/recorder/contract/index.js";

export type CounterPrivateState = { privateCounter: number };

export function createPrivateState(initialCount: number): CounterPrivateState {
  return { privateCounter: initialCount };
}

export type RecorderPrivateState = { yesVotes: bigint; noVotes: bigint };

export function createRecorderPrivateState(yesVotes: bigint = 0n, noVotes: bigint = 0n): RecorderPrivateState {
  return { yesVotes, noVotes };
}
