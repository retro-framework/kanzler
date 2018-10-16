import * as React from 'react';

import { IProps } from '../types/RefSelector';

import './RefSelector.css';

class RefSelector extends React.Component<IProps> {
  public update = (e: any) => {
    this.props.handleChangedSelectedHeadRefHash(e.target.value);
  }
  public componentDidUpdate() {
    this.props.handleChangedSelectedHeadRefHash(this.props.selectedHash);
  }
  public render() {
    if (this.props.loading) {
      return "<span>Loading ...</span>"
    }
    return (
      <select className="RefSelector" value={this.props.selectedHash} onChange={this.update}>
        <option>Choose...</option>
        {this.options()}
      </select>
      );
  }
  private options():any {
    return (this.props && this.props.refs).map((ref: any) => <option key={ref.hash.concat(ref.name)} value={ref.hash}>{ref.name}</option>);
  }
}

export default RefSelector;
