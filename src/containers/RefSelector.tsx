import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as actions from "../actions/";
import RefSelector from "../components/RefSelector";
import { ICheckpoint } from "../types";
import { IPropsFromDispatch, IPropsFromState } from "../types/RefSelector";
import IStoreState from "../types/store";

export function mapStateToProps(state: IStoreState): IPropsFromState {
  return {
    loading: state.refSelector.loading,
    refs: state.refSelector.refs,
    selectedHash: state.refSelector.selectedHash
  };
}

async function getCheckpoints(startHash: string): Promise<ICheckpoint[]> {
  const getCheckpoint = async (hash: string) => {
    const result = await fetch(`/obj/${hash}`)
      .then(response => response.json())
      .catch(e => console.error);
    if (result) {
      return Object.assign({ hash }, result);
    } else {
      return;
    }
  };
  const checkpoints: any[] = [];
  const firstCp = await getCheckpoint(startHash);
  if (!firstCp) {
    return checkpoints;
  }

  // const realDate = Date.parse(firstCp.fields.date);
  // console.log(
  //   "Checkpoint With Parsed Date",
  //   {
  //     ...firstCp,
  //     fields: { ...firstCp.fields, date: realDate }
  //   },
  //   firstCp.fields.date,
  //   realDate
  // );
  checkpoints.push({
    ...firstCp
    // fields: { ...firstCp.fields, date: realDate }
  });

  let last = checkpoints[checkpoints.length - 1];
  while (last.parentHashes && last.parentHashes.length) {
    checkpoints.push(
      await getCheckpoint(checkpoints[checkpoints.length - 1].parentHashes[0])
    );
    last = checkpoints[checkpoints.length - 1];
  }
  return checkpoints;
}

function mapDispatchToProps(
  dispatch: Dispatch<
    | actions.ISetSelectedHeadRefHash
    | actions.IODBVCheckpointsAvailable
    | actions.IODBVInvalidate
  >
): IPropsFromDispatch {
  return {
    handleChangedSelectedHeadRefHash: (newSelectedHeadRefHash: string) => {
      dispatch(actions.odbvInvalidate());
      dispatch(actions.setSelectedHeadRefHash(newSelectedHeadRefHash));
      getCheckpoints(newSelectedHeadRefHash).then(checkpoints => {
        dispatch(actions.odbvCheckpointsAvailable(checkpoints));
      });
    }
  };
}

export default connect<IPropsFromState, IPropsFromDispatch, void>(
  mapStateToProps,
  mapDispatchToProps
)(RefSelector);
