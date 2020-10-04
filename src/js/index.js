/**
 * Virtual DOM
 *
 */
import { createElement, render, renderDOM } from './virtualDom'
import domDiff from './domDiff'
import doPatches from './doPatches'
const vDom = createElement('ul', { class: 'list', style: 'width:300px;' }, [
  createElement('li', { class: 'item', 'data-index': 0 }, ['第一项列表']),
  createElement('li', { calss: 'item', 'data-index': 1 }, [
    createElement('p', { class: 'text' }, ['第二项列表']),
  ]),
])

const vDom1 = createElement(
  'ul',
  {
    class: 'lists',
    style: 'width:300px; background-color:red;',
  },
  []
)

// console.log(vDom)

const red = render(vDom)
renderDOM(red, document.querySelector('#app'))
const patches = domDiff(vDom, vDom1)
doPatches(red, patches)
// console.log(patches)
