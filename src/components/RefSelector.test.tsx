import * as React from 'react';
import * as renderer from 'react-test-renderer';

import RefSelector from './RefSelector';

const cases = [
  {
      name: 'displays nothing when no refs loaded', 
      props: {}
  },
  {
    name: 'displays loading span rather than dropdown when loading', 
    props: { loading: true }
  },
  {
    name: 'displays nothing when no ref is undefined', 
    props: { refs: undefined }
  },
  {
    name: 'displays nothing when no refs loaded', 
    props: {}
  }
]

cases.forEach(testCase => {

  test(testCase.name, () => {
    const component = renderer.create(
      <RefSelector {...testCase.props} />,
    );
  
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
  //   // manually trigger the callback
  //   tree.props.onMouseEnter();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  
  //   // manually trigger the callback
  //   tree.props.onMouseLeave();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  });
})