export const flatten = (
  data,
  childKey,
  level,
  defaultExpand,
  parent
) => {
  let arr = []
  data.forEach(item => {
    item.level = level
    item.parent = parent
    item.expand = defaultExpand
    item.visible = parent.expand
    item.checked = false
    arr.push(item)
    if (item[childKey]) {
      arr.push(
        ...flatten(
          item[childKey],
          childKey,
          level + 1,
          defaultExpand,
          item
        )
      )
    }
  })
  return arr
}