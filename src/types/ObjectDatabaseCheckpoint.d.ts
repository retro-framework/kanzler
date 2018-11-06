import { IStateErrorable, ICheckpoint } from './index'

/*
 * Redux State
 */
export interface IState extends IStateErrorable {
    readonly checkpoint: ICheckpoint
}

/*
 * Component Props
 */
interface IPropsFromState extends IStateErrorable {
    checkpoint: ICheckpoint
}

// tslint:disable-next-line:no-empty-interface
interface IPropsFromDispatch {
    selectCheckpointFn: (checkpoint: ICheckpoint) => void
}

// tslint:disable-next-line:no-empty-interface
export interface IProps extends IPropsFromState, IPropsFromDispatch {}