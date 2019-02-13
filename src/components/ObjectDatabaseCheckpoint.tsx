import * as React from "react";
import { IProps } from "../types/ObjectDatabaseCheckpoint";

import ObjectDatabaseAffix from "./ObjectDatabaseAffix";

class ObjectDatabaseCheckpoint extends React.Component<IProps> {
  public update = (e: any) => {
    this.props.selectCheckpointFn(this.props.checkpoint);
  };
  public render() {
    const checkpoint = this.props.checkpoint;

    if (!checkpoint) {
      return <div>Cannot Render Checkpoint</div>;
    }

    let affix;
    if (checkpoint.affix !== undefined) {
      console.log("checkpoint affix", checkpoint.affix);
      affix = <ObjectDatabaseAffix affix={checkpoint.affix} />;
    }

    return (
      <div className="obdv__checkpoint">
        <span className="odbv__typeShortCode">CHK</span>
        <span className="odbv__checkpointHash" title={checkpoint.hash}>
          {checkpoint.hash.substr(7, 8) /* offset skips sha256: prefix */}
        </span>
        <a className="odbv__checkpointSubject" href="#" onClick={this.update}>
          {window.atob(checkpoint.commandDesc)}
        </a>
        <span className="odbv__checkpointFieldDate">
          {checkpoint.fields.date}
        </span>
        <span className="odbv__checkpointFieldSession">
          {checkpoint.fields.session}
        </span>
        {affix}
      </div>
    );
  }
}

export default ObjectDatabaseCheckpoint;
