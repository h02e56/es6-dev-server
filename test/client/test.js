import test from 'tape'
import * as patterns from '../../lib/client/lib/patterns'
import {Selector} from '../../lib/client/lib/selector'
//react plus addons for testing
import React from 'react/addons'
import * as helpers from'./helpers'

var createComponent = helpers.createComponent

test('CLIENT TEST', (t) => {
  // before testt
  t.test('client before test', (t) => {
    t.end()
  })

  t.test('class sugar module  works as expected', (t) => {
    var classy = patterns.Foo()
    t.equal(typeof classy.render, 'function', 'classs method loaded rigth')
    t.equal(classy.render(), '(0, 0)', 'classs method loaded rigth')
    t.end()
  })

  // teardown
  t.test('client teardown', (t) => {
    t.end()
  })
})

test('REACT', (t) => {
  let component
  let fakeData
  let wrapper

  // before test
  t.test('client before test', (t) => {
    fakeData = [{
      value: 0,
      text: 'opt1',
      content: 'text1'
    }, {
      value: 1,
      text: 'opt2',
      content: 'opt2'
    }]
    // create our DOM react component passing props, wrapper
    component = createComponent(Selector, {data: fakeData, selected: null}, wrapper)
    t.end()
  })

  t.test('react module loads as expected', (t) => {
    t.equal(typeof component, 'object', 'component is loaded')
    t.end()
  })

  // teardown
  t.test('client teardown', (t) => {
    component = null
    fakeData = null
    t.end()
  })
})
