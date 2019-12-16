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
        <el-table-column
          align="right">
          <template slot-scope="scope">
            <span v-if="currentIndex === scope.$index" class="vertical-align">
              <span class="start-time">{{media.time}}</span>
              <el-progress class="hidden-xs-only" :percentage="media.percentage" :format="duration"></el-progress>
            </span>
            <i v-if="currentIndex !== scope.$index" class="el-icon-video-play vertical-align" @click="openFile(scope.$index, scope.row)"></i>
            <i v-if="currentIndex === scope.$index && media.playing === false" class="el-icon-video-play vertical-align" @click="play()"></i>
            <i v-if="currentIndex === scope.$index && media.playing === true" class="el-icon-video-pause vertical-align" @click="pause()"></i>
          </template>
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
import AudioService from '../services/audio-service';
import { Media } from '../models/media';

const musicModule = namespace('music');
const audioModule = namespace('audio');

@Component({
  name: 'music'
})
export default class Music extends Vue {

  // props
  @Prop({type: String})
  private id!: string;

  private currentFile!: Type;
  private currentIndex: number = -1;
  private audioService = new AudioService();

  // music store
  @musicModule.State
  private loading!: boolean;
  @musicModule.Getter
  private getAlbum: any;
  @musicModule.Getter
  private getSongs: any;
  @musicModule.Action
  private getAlbumDetails: any;

  // audio store
  @audioModule.State
  private media!: Media;
  @audioModule.Mutation
  private reset: any;
  @audioModule.Mutation
  private canPlay: any;
  @audioModule.Mutation
  private loadedMetadata: any;
  @audioModule.Mutation
  private playing: any;
  @audioModule.Mutation
  private timeUpdate: any;
  @audioModule.Mutation
  private loadStart: any;


  // computed
  get noResults() {
    return !this.getAlbum.artistName;
  }

  /* get percentage() {
    return this.media ? (this.media.timeSec / this.media.durationSec) * 100 : 0;
  } */

  // lifecycle phases
  public async mounted() {
    await this.getAlbumDetails(this.id);
  }

  public destroyed() {
    this.resetState();
  }

  // methods
  public duration() {
    return this.media.duration;
  }

  public openFile(index: number, file: Type) {
    this.currentFile = file;
    this.currentIndex = index;
    this.playStream(file.previewUrl);
  }

  public resetState() {
    this.audioService.stop();
    this.reset();
  }

  public playStream(url: string) {
    this.resetState();
    this.audioService.playStream(url).subscribe((event) => {
      const audioObj = event.target;

      switch (event.type) {
        case 'canplay':
          return this.canPlay(true);

        case 'loadedmetadata':
          return this.loadedMetadata(audioObj.duration);

        case 'playing':
          return this.playing(true);

        case 'pause':
          return this.playing(false);

        case 'timeupdate':
          return this.timeUpdate(audioObj.currentTime);

        case 'loadstart':
          return this.loadStart(true);
      }
    });
  }

  public play() {
    this.audioService.play();
  }

  public pause() {
    this.audioService.pause();
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

  .start-time {
    padding-right: 0.3em;
  }

  .vertical-align {
    vertical-align: middle !important;
  }

  .progress-width {
    width: 90%;
  }

  div {
    &.cell i {
      font-size: 2em;

      &:hover {
        color: #5cb6ff;
        cursor: pointer;
      }
    }

    &.el-progress {
      display: inline;
      margin-right: 0.5em;
    }

    &.el-progress-bar {
      width: 50%;
    }
  }
</style>
