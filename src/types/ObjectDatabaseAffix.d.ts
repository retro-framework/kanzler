import { IStateErrorable, IAffix } from "./index";

/*
 * Redux State
 */
export interface IState extends IStateErrorable {
  readonly affix: IAffix;
}

/*
 * Component Props
 */
interface IPropsFromState extends IStateErrorable {
  affix: IAffix;
}

// tslint:disable-next-line:no-empty-interface
interface IPropsFromDispatch {
  // selectCheckpointFn: (affix: IAffix) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IProps extends IPropsFromState, IPropsFromDispatch {}
