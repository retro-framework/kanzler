import { IStateErrorable, IStateLoadable, IRefHash } from './index'

/*
 * Redux State
 */ 
export interface IState extends IStateErrorable, IStateLoadable {
    readonly refs: IRefHash[]
    readonly selectedHash: string
}

interface IPropsFromState extends IStateErrorable, IStateLoadable {
    refs: IRefHash[]
    selectedHash: string
}

interface IPropsFromDispatch {
    handleChangedSelectedHeadRefHash: (newRef: string) => void
}

export interface IProps extends IPropsFromState, IPropsFromDispatch {}