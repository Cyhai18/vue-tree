<template>
  <div>
    <div :class="['tree-switch', {'tree-switch--on': openOrClose}]" @click="switchChange">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      openOrClose: this.value
    }
  },
  methods: {
    switchChange () {
      this.openOrClose = !this.openOrClose
      this.$emit('input', this.openOrClose)
      this.$emit('change')
    }
  },
  watch: {
    value (val) {
      this.openOrClose = val
    }
  }
}
</script>

<style scoped>
.tree-switch {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 16PX;
  height: 16PX;
  background-color: #fff;
  border: 1PX solid #dcdee2;
  border-radius: 2PX;
  cursor: pointer;
  /* transition: all 0.3s ease */
}
.tree-switch::after {
  content: "";
  position: absolute;
  top: 0;
  left: 4PX;
  width: 4PX;
  height: 9PX;
  border: 2PX solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(0);
  /* transition: transform 0.3s ease */
}
.tree-switch--on {
  background: #1989fa;
  border: 1PX solid #1989fa
}
.tree-switch--on::after {
  transform: rotate(45deg) scale(1)
}
</style>
