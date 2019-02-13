import "./ObjectDatabaseAffix.css";

import * as React from "react";
import { IProps } from "../types/ObjectDatabaseAffix";

class ObjectDatabaseAffix extends React.Component<IProps> {
  public render() {
    const affix = this.props.affix;
    let entities;
    if (affix.entities !== undefined) {
      entities = affix.entities.map((e, i) => {
        let name = e.name;
        if (name === "_") {
          name = "[root]";
        }

        const events = e.events.map((ev, j) => {
          return (
            <li key={"event" + j}>
              <span className="odbv__entityName">{name}</span>
              <span className="odbv__typeShortCode">EVT</span>
              <span className="odbv__eventHash">
                {ev.hash.substr(7, 8) /* offset skips sha256: prefix */}
              </span>
              <span className="odbv__eventHash">{ev.name}</span>
              <span className="odbv__eventPayload">
                {JSON.stringify(ev.payload)}
              </span>
            </li>
          );
        });

        return (
          <li key={"entity" + i}>
            <ul className="odbv__entityEvents">{events}</ul>
          </li>
        );
      });
    }

    return (
      <div className="obdv__affix">
        <span className="odbv__typeShortCode">AFX</span>
        <span className="odbv__affixHash">
          {affix.hash.substr(7, 8) /* offset skips sha256: prefix */}
        </span>
        <ul className="odbv__affixEntities">{entities}</ul>
      </div>
    );
  }
}

export default ObjectDatabaseAffix;
