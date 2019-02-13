export interface IState extends IStateErrorable, IStateLoadable {
  readonly refs: IRefHash[];
  readonly selectedHash: string;
}

export interface IStateLoadable {
  readonly loading: boolean;
}

export interface IStateErrorable {
  readonly error?: Error | undefined;
}

/*
 * Hash refers to the hashed string including the hash function name prefix
 * e.g "sha256:9ad01eb3759cd5f...."
 */

export type HashStr = string;

export interface IRefHash {
  readonly hash: HashStr;
  readonly name: string;
}

export interface ICheckpoint {
  readonly hash: HashStr;
  readonly parentHashes: string[];
  readonly affixHash: HashStr;
  readonly commandDesc: string;
  readonly summary: string;
}

/*
 * Events must have at least a hash (they are hashed server-side)
 * but aside from this constraint they may have any other properties
 * with any level of arbitrary nesting.
 */

type Any = any;
export interface IEvent extends Any {
  readonly hash: HashStr;
}

export interface IAffix {
  readonly hash: HashStr;
  readonly entities: Array<{
    readonly name: string;
    readonly events: IEvent[];
  }>;
}
