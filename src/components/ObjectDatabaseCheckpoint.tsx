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
      <React.Fragment>
        <tr className="obdv__checkpoint">
          <td className="odbv__checkpointHash" title={checkpoint.hash}>
            {checkpoint.hash.substr(7, 8) /* offset skips sha256: prefix */}
          </td>
          <a className="odbv__checkpointSubject" href="#" onClick={this.update}>
            {window.atob(checkpoint.commandDesc).substr(0, 80)}
          </a>
          <td className="odbv__checkpointFieldDate">
            {checkpoint.fields.date}
          </td>
          <td className="odbv__checkpointFieldSession">
            {checkpoint.fields.session}
          </td>
        </tr>
        {affix}
      </React.Fragment>
    );
  }
}

export default ObjectDatabaseCheckpoint;
