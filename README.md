# vue-tree

一个可以用来渲染十万级别以上数据量的vue树组件

## Describe

公司有个项目，如果在部门组织架构同时全选十万级别以上的数据时，部门树就非常卡，需要优化。

简单分析，是因为全选时相当于一下子重新渲染所有数据导致的卡顿，于是做了以下的改造：

- 用上虚拟滚动，即使全选所有数据，也只渲染可见范围内的数据

- 需要把原数据从层叠的树形结构转换成同级结构，才能应用到虚拟滚动上面去

## Use

```html
<tree ref="tree" :initData="treeData" @changeSel='changeSel'>
  <template v-slot="{ item }">
    <div>{{ item.label }}</div>
  </template>
</tree>
```

## Options

| 参数      |    说明 | 类型  | 是否可选  | 默认值  |
| :-------: | :-------:|:------:|:------:| :--: |
| initData  | 数据源(树形结构) |  Array   |  否   |  [ ]  |
| itemHeight  | 每项高度 |  Number   |  是   |  40   |
| remain  | 展示条数 |  Number   |  是   |  10   |
| childKey | 数据源的子名称 | String | 是 | children |
| defaultExpand | 默认展开 | Boolean | 是 | true |

## Methods

|   名称    |      返回值      |
| :-------: | :--------------: |
| changeSel | 返回所有选中的值 |

## Project setup

`yarn install`

`yarn serve`

`yarn lib`

