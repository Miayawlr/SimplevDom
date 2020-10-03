/**
 * Virtual DOM
 *
 */
import { createElement, render, renderDOM } from './virtualDom'

const vDom = createElement('ul', { class: 'list', style: 'width:300px;' }, [
  createElement('li', { class: 'item', 'data-index': 0 }, ['第一项列表']),
  createElement('li', { calss: 'item', 'data-index': 1 }, [
    createElement('p', { class: 'text' }, ['第二项列表']),
  ]),
])

// console.log(vDom)

const red = render(vDom)
renderDOM(red, document.querySelector('#app'))
console.log(red)
