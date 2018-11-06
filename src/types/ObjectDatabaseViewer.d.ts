import { IStateErrorable, IStateLoadable, ICheckpoint } from './index'

/*
 * Redux State
 */
export interface IState extends IStateErrorable, IStateLoadable {
    readonly selectedHeadRefHash: string
    readonly checkpoints: ICheckpoint[]
} 

/*
 * Component Props
 */
interface IPropsFromState extends IStateErrorable, IStateLoadable {
    checkpoints: ICheckpoint[]
    selectedHeadRefHash: string
}

// tslint:disable-next-line:no-empty-interface
interface IPropsFromDispatch {
    changeSelectedCheckpoint: (checkpoint: ICheckpoint) => void
}

// tslint:disable-next-line:no-empty-interface
export interface IProps extends IPropsFromState, IPropsFromDispatch {}