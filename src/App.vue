<template>
  <div id="app">

    <tree ref="tree" :initData="treeData" @changeSel='changeSel'>
      <template v-slot="{ item }">
        <div>{{ item.label }}</div>
      </template>
    </tree>

    <div style="margin-top: 20px">
      <button @click="$refs.tree.expandAll()">展开所有</button>
      <button @click="$refs.tree.collapseAll()" style="margin: 0 10px">折叠所有</button>
      <button @click="$refs.tree.checkAll()" style="margin-right: 10px">选择所有</button>
      <button @click="$refs.tree.checkCancel()">反选所有</button>
    </div>

  </div>
</template>

<script>
import tree from './components/tree'
import generateData from "./utils/generateTreeData"

export default {
  name: 'App',
  components: {
    tree
  },
  computed: {
    treeData () {
      return generateData()
    }
  },
  methods: {
    changeSel (val) {
      console.log(val)
    }
  }
}
</script>

<style>
</style>
