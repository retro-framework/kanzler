import * as React from 'react';

import { IProps } from '../types/ObjectDatabaseCheckpoint';

// readonly hash: string
// readonly parentHashes: string[]
// readonly affixHash: string
// readonly commandDesc: string
// readonly summary: string

class ObjectDatabaseCheckpoint extends React.Component<IProps> {
    public update = (e: any) => {
        this.props.selectCheckpointFn(this.props.checkpoint);
    }
    public render() {

        const checkpoint = this.props.checkpoint;

        if (!checkpoint)  {
            return (<div>Cannot Render Checkpoint</div>);
        }

        return (
            <div className="obdv__checkpoint" onClick={this.update}>
                <span className="odbv__checkpointHash" title={checkpoint.hash} >{checkpoint.hash.substr(7, 8)}</span>
                <span className="odbv__checkpointSubject">{window.atob(checkpoint.commandDesc)}</span>
            </div>
        )

    }
}

export default ObjectDatabaseCheckpoint;
