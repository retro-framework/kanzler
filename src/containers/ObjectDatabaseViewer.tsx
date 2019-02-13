import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actions from "../actions";
import ObjectDatabaseViewerComponent from "../components/ObjectDatabaseViewer";
import { HashStr, IAffix, ICheckpoint, IEvent } from "../types";
import {
  IPropsFromDispatch,
  IPropsFromState
} from "../types/ObjectDatabaseViewer";
import IStoreState from "../types/store";

export function mapStateToProps(state: IStoreState): IPropsFromState {
  return {
    checkpoints: state.odbViewer.checkpoints,
    loading: false,
    selectedHeadRefHash: state.odbViewer.selectedHeadRefHash
  };
}

async function getAffix(hash: HashStr): Promise<IAffix> {
  const getEvent = async (eventHash: HashStr): Promise<IEvent> => {
    const getEventResult = await fetch(`/obj/${eventHash}`)
      .then(response => response.json())
      .catch(e => console.error);
    return Object.assign({ hash }, getEventResult);
  };

  const result = await fetch(`/obj/${hash}`)
    .then(response => response.json())
    .catch(e => console.error);
  if (!result) {
    return Promise.reject("error getting affix result");
  }

  const affix = Object.assign({ hash, entites: [] });
  const affixEvents = {};

  Object.keys(result).forEach(entity => {
    affixEvents[entity] = [];
    result[entity].forEach(async (ev: any) => {
      affixEvents[entity].push(await getEvent(ev));
    });
  });

  Object.keys(affixEvents).forEach(entity => {
    affix.entites.push({ name: entity, events: affixEvents[entity] });
  });

  return affix;
}

function mapDispatchToProps(
  dispatch: Dispatch<
    actions.ISelectedODBVCheckpointChanged | actions.IODBVAffixAvailable
  >
): IPropsFromDispatch {
  return {
    changeSelectedCheckpoint: (checkpoint: ICheckpoint) => {
      dispatch(actions.changeSelectedODBVCheckpoint(checkpoint));
      getAffix(checkpoint.affixHash).then(affix => {
        dispatch(actions.odbvAffixAvailable(affix));
      });
    }
  };
}

export default connect<IPropsFromState, IPropsFromDispatch, void>(
  mapStateToProps,
  mapDispatchToProps
)(ObjectDatabaseViewerComponent);
