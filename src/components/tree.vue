<template>
  <div
    class="vs-box"
    ref="vsBox"
    :style="{height: vsBoxHeight}"
    @scroll="handleScroll">
      <div :style="{height: contentHeight}"></div>
      <div
      class="vs-list"
      :style="{transform: `translate3d(0, ${offset}px, 0)`}">
        <div
          v-for="(item, index) in visibleData"
          :key="index"
          class="tree-view"
          :style="{
            paddingLeft: 40 * (item.level - 1) + 'px',
            height: itemHeight + 'px'
          }"
        >
          <i
            :class="['tree-expand-icon', item.expand ? 'tree-expand' : 'tree-expand-close']"
            @click="toggleExpand(item)"
            v-if="item.children && item.children.length"
          />
          <checkbox v-model="item.checked" @change='checkChange(item)' class="tree-checkbox"/>
          <slot :item="item"></slot>
        </div>
      </div>
  </div>
</template>

<script>
import { flatten } from '@/utils/flattenData'
import checkbox from './checkbox'
export default {
  name: 'tree',
  components: {
    checkbox
  },
  props: {
    itemHeight: {
      type: Number,
      default: 40
    },
    remain: {
      type: Number,
      default: 10
    },
    initData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    childKey: {
      type: String,
      default: 'children'
    },
    defaultExpand: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      offset: 0,
      sIndex: 0,
      eIndex: this.remain,
      flattenData: [],
      visibleData: [],
      contentHeight: 0
    }
  },
  computed: {
    vsBoxHeight () {
      return this.itemHeight * this.remain + 'px'
    }
  },
  mounted () {
    const parent = {
      level: 0,
      visible: true,
      expand: true,
      checked: false
    }
    parent[this.childKey] = this.initData
    this.flattenData = flatten(this.initData, this.childKey, 1, this.defaultExpand, parent)
    this.handleScroll()
  },
  methods: {
    handleScroll () {
      const scrollTop = this.$refs.vsBox.scrollTop
      this.sIndex = Math.floor(scrollTop / this.itemHeight)
      this.eIndex = this.sIndex + this.remain
      this.offset = this.sIndex * this.itemHeight

      const res = this.flattenData.filter(item => item.visible)
      this.contentHeight = res.length * this.itemHeight + 'px'
      this.visibleData = res.slice(this.sIndex, this.eIndex)
    },
    toggleExpand (item) {
      item.expand = !item.expand
      item[this.childKey] && this.recursion(item[this.childKey], item.expand, 'visible', 'expand')
      this.handleScroll()
    },
    checkChange (item) {
      item[this.childKey] && this.recursion(item[this.childKey], item.checked, 'checked')
      let res = this.flattenData.filter(item => item.checked)
      this.$emit('changeSel', res)
    },
    recursion(children, status, param, param2) {
      children.forEach(node => {
        node[param] = status
        if (param2) {
          node[param2] = status
        }
        node[this.childKey] && this.recursion(node[this.childKey], status, param, param2)
      })
    },
    collapseAll(level = 1) {
      this.flattenData.forEach(item => {
        item.expand = false
        if (item.level != level) {
          item.visible = false
        }
      })
      this.handleScroll()
    },
    expandAll() {
      this.flattenData.forEach(item => {
        item.expand = true
        item.visible = true
      })
      this.handleScroll()
    },
    checkAll () {
      this.flattenData.forEach(item => {
        item.checked = true
      })
    },
    checkCancel () {
      this.flattenData.forEach(item =>{
        item.checked = false
      })
    }
  }
}
</script>

<style>
  .vs-box {
    position: relative;
    width: 100%;
    overflow: auto;
  }
  .vs-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%
  }
  .tree-view {
    display: flex;
    align-items: center;
    cursor: pointer
  }
  .tree-expand-icon {
    display: inline-block;
    width: 0;
    height: 0;
    margin-right: 5px;
    border: 5px solid #c0c4cc
  }
  .tree-expand-close {
    border-color: transparent transparent transparent #c0c4cc
  }
  .tree-expand {
    transform: translateY(3px);
    border-color: #c0c4cc transparent transparent transparent
  }
  .tree-checkbox {
    transform: translateY(2px);
    margin-right:5px
  }
</style>
