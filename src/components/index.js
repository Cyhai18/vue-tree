import tree from './tree'

tree.install = function (Vue) {
  if (tree.install.installed) return
  Vue.component(tree.name, tree)
}

if (typeof window !== 'undefined' && window.Vue) {
  tree.install(window.Vue)
}

export default tree
