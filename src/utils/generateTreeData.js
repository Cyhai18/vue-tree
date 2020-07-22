const maxNode = 100000
let index = 0

const createNode = () => {
  ++index
  const id = Math.random().toString().slice(3) * 1
  return {
    id: id,
    label: `节点--${id}`
  }
}

const createData = () => {
  let data = []
  let obj = createNode()
  obj.children = []
  for (; index < maxNode; ) {
    let child = createNode()
    createChild(child)
    obj.children.push(child)
  }
  data.push(obj)
  return data
}

const createChild = (tree, level = 1) => {
  tree.children = []
  for (let i = 0; i < 3; i++) {
    if (index > maxNode - 1) break
    let obj = createNode()
    if (level < 3) {
      createChild(obj, ++level)
    }
    tree.children.push(obj)
  }
}

export default createData
