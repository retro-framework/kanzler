import { IODBVCheckpointsAvailable, ISelectedODBVCheckpointChanged, ISetSelectedHeadRefHash } from '../actions';
import { ODBV_CHECKPOINTS_AVAILABLE, SELECTED_ODBV_CHECKPOINT_CHANGED, SET_SELECTED_HEAD_REF_HASH } from '../constants/index';
import { ICheckpoint } from '../types';
import { IState } from '../types/ObjectDatabaseViewer';

export default function (state: IState, action: ISetSelectedHeadRefHash | IODBVCheckpointsAvailable | ISelectedODBVCheckpointChanged): IState {
  switch (action.type) {
    case SET_SELECTED_HEAD_REF_HASH:
      return { ...state, selectedHeadRefHash: action.payload as string }
    case ODBV_CHECKPOINTS_AVAILABLE:
      return { ...state, checkpoints: action.payload as ICheckpoint[] };
    case SELECTED_ODBV_CHECKPOINT_CHANGED:
      // nothing to do 
  }
  return { ...state };
}