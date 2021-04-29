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
        <connections :update='update' :comps='components'/>
        <template v-for="component in components" :key="component.id">
          <comp :class='{
              selected : selected?.id == component.id
          }' @click='setSelected(component.id)' :id="component.id" :uid="component.id" :name='component.name'/>
        </template>
      </div>
    </div>
    <side-bar @updateComp='updateComp($event)' :current='selected' @makeComp="makeComp" />
  </div>
</template>

<script>
import SideBar from "./SideBar";
import Comp from "./Comp";
import Connections from './Connections';

export default {
  data() {
    return {
      components: [],
      count: 0,
      selected: null,
      update: 0,
    };
  },
  created() {
    this.clicked = false;
  },
  watch : {
    components(){
      if(this.selected){
        this.setSelected(this.selected.id);
      }
    }
  },
  methods: {
    setSelected(id){
        console.log(id);
        let selectedObj = JSON.parse(JSON.stringify(this.components.reduce((acc,cur) => {
            if(acc)
                return acc;
            else if(cur.id === id)
                return cur;
        },null)));
        this.selected = selectedObj;
    },
    updateComp(e){
      console.log(e);
      this.components = this.components.map(comp => {
        if(comp.id === e.id){
          return e;
        } else return comp;
      })
    },
    makeComp() {
      this.count++;
      this.components.push({ 
          id: this.count,
          name : `unnamed component ${this.count}`,
          props : [],
          emits : [],
          data : [],
          components: [],
          watch: [],
          computed: [],
          methods: [],
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
      if(this.clicked)
        this.update += 1;
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
    Connections
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