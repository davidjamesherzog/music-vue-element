<template>
  <div v-if="noResults">
    <div class="text-xs-center">
    <h2>No Music ID in API with {{this.id}}</h2>
    </div>
  </div>

  <div v-loading="loading" v-else>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-image :src="getAlbum.artworkUrl100" lazy class="image"></el-image>
      </el-col>
      <el-col :span="16">
        <div style="padding: 14px;">
          <h2 class="ellipsis">{{getAlbum.artistName}}</h2>
          <div class="bottom clearfix">
            <div class="ellipsis">Title: {{getAlbum.collectionName}}</div>
            <div>Date: {{getAlbum.releaseDate.substring(0,4)}}</div>
            <div>Genre: {{getAlbum.primaryGenreName}}</div>
            <div>Tracks: {{getAlbum.trackCount - 1}}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-table
        :data="getSongs"
        style="width: 100%">
        <el-table-column
          prop="trackNumber"
          label="#"
          min-width="40"
          width="40">
        </el-table-column>
        <el-table-column
          prop="trackName"
          label="Name">
        </el-table-column>
      </el-table>
    </el-row>
    
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  namespace
} from 'vuex-class';
import { AlbumDetails } from '../models/album.details';
import { Type } from '../models/type';

const musicModule = namespace('Music');

@Component({
  name: 'Music'
})
export default class Music extends Vue {

  // props
  @Prop({type: String})
  private id!: string;

  @musicModule.State
  private loading!: boolean;
  @musicModule.Getter
  private getAlbum: any;
  @musicModule.Getter
  private getSongs: any;
  @musicModule.Action
  private getAlbumDetails: any;

  // computed
  get noResults() {
    return !this.getAlbum.artistName;
  }

  // lifecycle phases
  public async mounted() {
    await this.getAlbumDetails(this.id);
  }
}
</script>
<style lang="scss">
  .image {
    width: 100%;
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>