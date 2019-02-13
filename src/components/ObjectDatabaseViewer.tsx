import "./ObjectDatabaseViewer.css";

import * as React from "react";
import * as types from "../types";

import { IProps } from "../types/ObjectDatabaseViewer";

import ObjectDatabaseCheckpoint from "./ObjectDatabaseCheckpoint";

class ObjectDatabaseViewer extends React.Component<IProps> {
  public changeSelectedCheckpoint = (checkpoint: types.ICheckpoint) => {
    this.props.changeSelectedCheckpoint(checkpoint);
  };
  public render() {
    if (this.props.loading === true) {
      return <span>Loading…</span>;
    }
    if (this.props.selectedHeadRefHash === "") {
      return (
        <span>
          Please choose a ref from above {this.props.selectedHeadRefHash}
        </span>
      );
    }
    if (!this.props.checkpoints || this.props.checkpoints.length === 0) {
      return (
        <span>
          Branch {this.props.selectedHeadRefHash} contains no checkpoints
        </span>
      );
    }
    const cps = this.props.checkpoints.map((checkpoint: types.ICheckpoint) => (
      <ObjectDatabaseCheckpoint
        key={checkpoint.hash}
        checkpoint={checkpoint}
        selectCheckpointFn={this.changeSelectedCheckpoint}
      />
    ));
    let className = "odbv";
    if (this.props.loading) {
      className += " odbv--loading";
    }
    return <div className={className}>{cps}</div>;
  }
}

export default ObjectDatabaseViewer;
