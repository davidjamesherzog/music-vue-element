<template>
  <el-container v-if="noResults">
    <div class="text-xs-center">
    <h2>No Music in API with {{this.name}}</h2>
    </div>
  </el-container>

  <el-container v-else v-loading="loading" grid-list-xl>
    <album-table class="hidden-sm-and-up" :album-list="albumList"></album-table>

    <el-row :gutter="20" class="hidden-xs-only scroll-container" style="overflow-y: auto;">
      <el-col :span="12" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" v-for="(item, index) in albumList.results" :key="index">
        <album-card :item="item"></album-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { State, Mutation, Action, namespace } from 'vuex-class';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AlbumList } from '../models/album.list';
import { Type } from '../models/type';
import AlbumCard from '../components/AlbumCard.vue';
import AlbumTable from '../components/AlbumTable.vue';

const musicModule = namespace('music');

@Component({
  name: 'SearchMusic',
  components: {
    AlbumCard,
    AlbumTable
  }
})
export default class SearchMusic extends Vue {

  // props
  @Prop({type: String})
  private name!: string;

  @musicModule.State
  private loading!: boolean;
  @musicModule.State
  private albumList!: AlbumList;
  @musicModule.Action
  private getAlbums: any;

  // computed
  get noResults() {
    return this.albumList.resultCount === 0;
  }

  // methods
  public singleMusic(id: string) {
    this.$router.push('/music/' + id);
  }

  public async fetchResult(value: string) {
    await this.getAlbums(value);
  }

  // lifecycle phases
  public mounted() {
    this.fetchResult(this.name);
  }

  // watchers
  @Watch('name')
  public onNameChanged(val: string, oldVal: string) {
    this.fetchResult(val);
  }

}
</script>

<style lang="scss" scoped>
</style>
