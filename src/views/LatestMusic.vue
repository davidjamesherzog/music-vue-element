<template>
  <el-container v-loading="loading" grid-list-xl>
    <album-table class="hidden-sm-and-up" :album-list="albumList"></album-table>

    <el-row :gutter="20" class="hidden-xs-only scroll-container" style="overflow-y: auto;">
      <el-col :span="12" :xs="{span: 24}" :sm="{span: 8}" :lg="{span: 6}" :xl="{span: 4}" v-for="(item, index) in albumList.results" :key="index" style="overflow-y: auto;">
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
import AlbumTable from '../components/AlbumTable.vue';

const musicModule = namespace('music');

@Component({
  name: 'LatestMusic',
  components: {
    AlbumCard,
    AlbumTable
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
