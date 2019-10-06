<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header>
        <router-link
        to='/'
        tag='span'
        style='cursor: pointer'>
        Music
        </router-link>
        <span class="float-right">
          <el-input placeholder="Search Albums" clearable v-model="searchString">
            <el-button slot="append" icon="el-icon-search" :disabled="!dataAvailable" @click="searchMusic"></el-button>
          </el-input>
        </span>  
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'App'
})
export default class App extends Vue {

  private searchString: string = '';

  public searchMusic() {
    //console.log(`SEARCH MUSIC - ${this.searchString}`);
    this.$router.push('/search/' + this.searchString);
    this.searchString = '';
  }

  get dataAvailable() {
    return this.searchString !== null && this.searchString !== '';
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.float-right {
  float: right;
}

.el-header {
  overflow: hidden;
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  font-size: 1rem;
  position: fixed;
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 9999;
}

.el-main {
  margin-top: 60px;
}

.el-aside {
  color: #333;
}

body {
  margin: 0px
}
</style>
