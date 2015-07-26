import test from 'tape'
import {Selector} from '../../lib/client/lib/selector'
// react plus addons for testing
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

test('REACT', (t) => {
  let shallowRenderer = TestUtils.createRenderer()
  shallowRenderer.render(React.createElement(Selector, { className: 'sekector' }, 'children'))
  let component = shallowRenderer.getRenderOutput()
  t.equal(typeof component.props.title, 'string', 'our component has a prop title')
  t.end()
})
