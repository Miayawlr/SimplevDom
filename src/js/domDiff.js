import { ATTR, TEXT, REMOVE, REPLACE } from './patchTypes'
let patches = {}
let vNodeIndex = 0
function domDiff(oldVirtualDom, newVirtualDom) {
  let index = 0
  vNodeWalk(oldVirtualDom, newVirtualDom, index)
  return patches
}
//  遍历
function vNodeWalk(oldNode, newNode, index) {
  let vNodePatch = []
  if (!newNode) {
    vNodePatch.push({ type: REMOVE, index })
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      vNodePatch.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    const attrPatch = attrsWalk(oldNode.props, newNode.props)
    // console.log(Object.keys(attrPatch))
    if (Object.keys(attrPatch).length > 0) {
      vNodePatch.push({ type: ATTR, attrs: attrPatch })
    }
    childrenWalk(oldNode.children, newNode.children)
  }
  if (vNodePatch.length > 0) {
    patches[index] = vNodePatch
    // console.log(patches)
  } else {
    vNodePatch.push({ type: REPLACE, newNode })
  }
}

function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {}
  for (let key in oldAttrs) {
    // 修改属性
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key]
    }
  }
  // 新增属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key]
    }
  }

  return attrPatch
}

// 遍历 children
function childrenWalk(oldChildren, newChildren) {
  oldChildren.map((cl, index) => {
    vNodeWalk(cl, newChildren[index], ++vNodeIndex)
  })
}

export default domDiff
