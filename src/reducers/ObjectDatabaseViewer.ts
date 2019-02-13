import {
  IODBVAffixAvailable,
  IODBVCheckpointsAvailable,
  IODBVInvalidate,
  ISelectedODBVCheckpointChanged,
  ISetSelectedHeadRefHash
} from "../actions";
import {
  ODBV_AFFIX_AVAILABLE,
  ODBV_CHECKPOINTS_AVAILABLE,
  ODBV_INVALIDATE,
  SELECTED_ODBV_CHECKPOINT_CHANGED,
  SET_SELECTED_HEAD_REF_HASH
} from "../constants/index";
import { ICheckpoint } from "../types";
import { IState } from "../types/ObjectDatabaseViewer";

export default function(
  state: IState,
  action:
    | IODBVInvalidate
    | ISetSelectedHeadRefHash
    | IODBVCheckpointsAvailable
    | ISelectedODBVCheckpointChanged
    | IODBVAffixAvailable
): IState {
  switch (action.type) {
    case SET_SELECTED_HEAD_REF_HASH:
      return {
        ...state,
        loading: true,
        selectedHeadRefHash: action.payload as string
      };
    case ODBV_CHECKPOINTS_AVAILABLE:
      return {
        ...state,
        checkpoints: action.payload as ICheckpoint[],
        loading: true
      };
    case SELECTED_ODBV_CHECKPOINT_CHANGED:
      return { ...state, loading: true };
    case ODBV_AFFIX_AVAILABLE:
      console.log("new affix showed up, render that mofo", action.payload);
      const checkpoints = state.checkpoints.map(cp => {
        if (cp.affixHash === action.payload.hash) {
          return { affix: action.payload, ...cp };
        }
        return cp;
      });
      return { ...state, loading: false, checkpoints };
    case ODBV_INVALIDATE:
  }
  return { ...state };
}
