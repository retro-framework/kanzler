import * as React from "react";
import * as renderer from "react-test-renderer";

import { IProps } from "../types/RefSelector";
import RefSelector from "./RefSelector";

type TestCases = Array<{
  readonly name: string;
  readonly props: IProps;
}>;

const cases: TestCases = [
  {
    name: "displays nothing when no refs loaded",
    props: {
      loading: false,
      refs: [],
      selectedHash: "",
      handleChangedSelectedHeadRefHash(_: string) {
        _ = _;
      }
    }
  },
  {
    name: "displays loading span rather than dropdown when loading",
    props: {
      loading: true,
      refs: [],
      selectedHash: "",
      handleChangedSelectedHeadRefHash(_: string) {
        _ = _;
      }
    }
  },
  {
    name: "displays error nothing when no non-existent hash ref is defined",
    props: {
      loading: false,
      refs: [{ hash: "abc123", name: "refs/heads/mainline" }],
      selectedHash: "blah blah",
      handleChangedSelectedHeadRefHash(_: string) {
        _ = _;
      }
    }
  },
  {
    name: "displays correctly when well defined hash ref is selected",
    props: {
      loading: false,
      refs: [{ hash: "abc123", name: "refs/heads/mainline" }],
      selectedHash: "abc123",
      handleChangedSelectedHeadRefHash(_: string) {
        _ = _;
      }
    }
  },
  {
    name: "displays placeholder when no refs loaded and not loading",
    props: {
      loading: false,
      refs: [],
      selectedHash: "",
      handleChangedSelectedHeadRefHash(_: string) {
        _ = _;
      }
    }
  }
];

cases.forEach(testCase => {
  test(testCase.name, () => {
    const component = renderer.create(<RefSelector {...testCase.props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
