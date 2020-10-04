import { ATTR, TEXT, REMOVE, REPLACE } from './patchTypes'
import Element from './Element'
import { render, setAttrs } from './virtualDom'
let finalPatches = {}
let realIndex = 0

export default function doPatches(realDom, patches) {
  finalPatches = patches
  realNodeWalk(realDom)
}

function realNodeWalk(realNode) {
  const rnPatch = finalPatches[realIndex++]
  const childNodes = [...realNode.childNodes]
  childNodes.map((c) => {
    realNodeWalk(c)
  })
  if (rnPatch) {
    patchAction(realNode, rnPatch)
  }
}

function patchAction(realNode, rnPatch) {
  rnPatch.map((p) => {
    switch (p.type) {
      case ATTR:
        for (let key in p.attrs) {
          const value = p.attrs[key]
          if (value) {
            setAttrs(realNode, key, value)
          } else {
            realNode.removeAttribute(key)
          }
        }
        break
      case TEXT:
        realNode.textContent = p.text
        break
      case REPLACE:
        const newNode =
          p.newNode instanceof Element
            ? render(p.newNode)
            : document.createTextNode(p.newNode)
        realNode.parentNode.replaceChild(newNode, realNode)
        break
      case REMOVE:
        realNode.parentNode.removeChild(realNode)
        break
      default:
        break
    }
  })
}
