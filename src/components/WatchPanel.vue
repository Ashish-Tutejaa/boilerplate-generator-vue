<template>
  <div class="watch-panel-wrapper">
    <!-- <div class="selected">{{thingFor}}</div> -->
    <h3>watch</h3>
    <div class="adder">
      <span
        v-for="(x, i) in comp['props']"
        :key="i"
        class="prop item"
        @click="toggleSelected(x)"
        :class="{
          selected_p: comp.watch.includes(x),
        }"
        >{{ x }}</span
      >
      <span
        v-for="(x, i) in comp['computed']"
        :key="i"
        class="computed item"
        @click="toggleSelected(x)"
        :class="{
          selected_c: comp.watch.includes(x),
        }"
        >{{ x }}</span
      >
      <span
        v-for="(x, i) in comp['data']"
        :key="i"
        class="data item"
        @click="toggleSelected(x, true)"
        :class="{
          selected_d: comp.watch.some(
            (i) => JSON.stringify(i) === JSON.stringify(x)
          ),
        }"
        >{{ x }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["comp"],
  methods: {
    sendUp(name, arg) {
      this.$parent.$emit(name, arg);
    },
    toggleSelected(item, isData) {
      let t = JSON.parse(JSON.stringify(this.$props.comp));
      if (
        isData &&
        t.watch.some((i) => JSON.stringify(i) === JSON.stringify(item))
      ) {
        t.watch = t.watch.reduce((acc, cur) => {
          if (isData) {
            if (JSON.stringify(cur) === JSON.stringify(item)) return acc;
          }
          return [...acc, cur];
        }, []);
      } else if (t.watch.find((ele) => ele === item)) {
        t.watch = t.watch.reduce((acc, cur) => {
          if (cur === item) return acc;
          return [...acc, cur];
        }, []);
      } else t.watch.push(item);
      this.sendUp("updateComp", t);
    },
  },
};
</script>

<style scoped>
.array-panel-wrapper {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
h3 {
  color: white;
  align-self: flex-start;
  margin: 0px 10px;
}
.adder {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.item {
  color: white;
  margin: 10px;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}
.prop {
  box-shadow: 0px 0px 0px 2px #29bb89;
}
.selected_p {
  background: #29bb89;
  color: black;
}
.computed {
  box-shadow: 0px 0px 0px 2px #d7385e;
}
.selected_c {
  background: #d7385e;
  color: black;
}
.data {
  box-shadow: 0px 0px 0px 2px #81e6d9;
}
.selected_d {
  background: #81e6d9;
  color: black;
}
</style>