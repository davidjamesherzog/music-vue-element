<template>
  <el-container v-loading="loading" grid-list-xl>
    <el-row :gutter="20">
      <el-col :span="8"  v-for="(item, index) in albumList.results" :key="index">
        <album-card :item="item"></album-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State,
  Mutation,
  Action,
  namespace
} from 'vuex-class';
import { AlbumList } from '../models/album.list';
import { Type } from '../models/type';
import AlbumCard from '../components/AlbumCard.vue';

const musicModule = namespace('Music');

@Component({
  name: 'LatestMusic',
  components: {
    AlbumCard
  }
})
export default class LatestMusic extends Vue {

  @musicModule.State
  private loading!: boolean;
  @musicModule.State
  private albumList!: AlbumList;
  @musicModule.Action
  private getAlbums: any;

  public mounted() {
    this.getAlbums('Metallica');
  }

  public singleMusic(id: number) {
    this.$router.push('/music/' + id);
  }
}
</script>

<style lang="scss" scoped>
</style>