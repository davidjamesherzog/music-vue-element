<template>
  <el-card :body-style="{ padding: '0px' }" class="margin">
    <img :src="item.artworkUrl100" class="image">
    <div style="padding: 14px;">
      <span>{{item.artistName}}</span>
      <div class="bottom clearfix">
        <div class="ellipsis">Title: {{item.collectionName}}</div>
        <div>Date: {{item.releaseDate.substring(0,4)}}</div>
        <div>Genre: {{item.primaryGenreName}}</div>
        <div>Tracks: {{item.trackCount - 1}}</div>
        <el-button type="text" class="button" @click="singleMusic(item.collectionId)">View</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Type } from '../models/type';

@Component({
  name: 'AlbumCard'
})
export default class AlbumCard extends Vue {

  @Prop({type: Object})
  private item!: Type;

  public singleMusic(id: number) {
    this.$router.push('/music/' + id);
  }
}
</script>

<style lang="scss" scoped>
  .margin {
    margin-bottom: 15px;
  }

  .image {
    width: 100%;
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>