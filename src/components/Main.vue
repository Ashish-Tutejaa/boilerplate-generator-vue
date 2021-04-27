<template>
  <div class="wrapper">
    <div
      ref='arena'
      class="main"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <div
        class="spacer"
        :style="{
          height: `${count * 120}px`,
        }"
      >
        <template v-for="component in components" :key="component.id">
          <comp :class='{
              selected : selected?.id == component.id
          }' @click='setSelected(component.id)' :id="component.id" :uid="component.id" />
        </template>
      </div>
    </div>
    <side-bar :current='selected' @makeComp="makeComp" />
  </div>
</template>

<script>
import SideBar from "./SideBar";
import Comp from "./Comp";

export default {
  data() {
    return {
      components: [],
      count: 0,
      selected: null
    };
  },
  created() {
    this.clicked = false;
  },
  methods: {
    setSelected(id){
        console.log(id);
        let selectedObj = {...this.components.reduce((acc,cur) => {
            if(acc)
                return acc;
            else if(cur.id === id)
                return cur;
        },null)};
        this.selected = selectedObj;
    },
    makeComp() {
      this.count++;
      this.components.push({ 
          id: this.count,
          name : 'unnamed component',
          props : [],
          emits : [],
          data : null,
          components: null,
          watch: null,
          computed: null,
        });
    },
    handleMouseDown(e) {
      if (Array.from(e.target.classList).includes("piece")) {
        this.clicked = e.target.id;
      }
    },
    handleMouseUp() {
      let piece = document.getElementById(this.clicked);
      let arenaWidth = this.$refs.arena.offsetWidth;
      let arenaHeight = this.$refs.arena.offsetHeight;
      let coords = piece?.getBoundingClientRect();
      let leftMost = coords?.right;
      let bottomMost = coords?.bottom;      
      if (leftMost > arenaWidth) {
        piece.style.left = `${arenaWidth - 150}px`;
      }
      if (bottomMost > arenaHeight) {
        piece.style.top = `${arenaHeight - 150}px`;
      }
        console.log('up');
      this.clicked = false;
      this.selected = null;
    },
    handleMouseMove(e) {
      if (this.clicked) {
        let piece = document.getElementById(this.clicked);
        let scrolled = this.$refs.arena.scrollTop;
        piece.style.top = `${e.clientY - 60 + scrolled}px`;
        piece.style.left = `${e.clientX - 60}px`;
      }
    },
  },
  components: {
    "side-bar": SideBar,
    comp: Comp,
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main {
  flex-grow: 1;
  height: 100%;
  background: var(--primary-black);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  position: relative;
  overflow: auto;
}
.spacer {
  width: 100%;
  min-height: 100%;
  flex-shrink: 0;
}
.selected{
    border-color: #f4eee8;
    transition: border-color 500ms ease-in-out 0ms;
}
</style>