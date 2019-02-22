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
            <tr key={"event" + j}>
              <td className="odbv__entityName">{name}</td>
              <td className="odbv__eventHash">
                {ev.hash.substr(7, 8) /* offset skips sha256: prefix */}
              </td>
              <td className="odbv__eventName">{ev.name}</td>
              <td className="odbv__eventPayload">
                {JSON.stringify(ev.payload)}
              </td>
            </tr>
          );
        });

        return events;
      });
    }

    return (
      <tr className="obdv__affix">
        <td className="odbv__affixHash">
          {affix.hash.substr(7, 8) /* offset skips sha256: prefix */}
        </td>
        <td colSpan={3}>
          <table className="odbv__affixEntities">{entities}</table>
        </td>
      </tr>
    );
  }
}

export default ObjectDatabaseAffix;
