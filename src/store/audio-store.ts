import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import { Media } from '../models/media';
import moment from 'moment';

@Module({ generateMutationSetters: true })
export default class Audio extends VuexModule {
  // state
  public media: Media = new Media();

  // mutations
  @Mutation
  public canPlay(value: boolean): void {
    this.media.canplay = value;
  }

  @Mutation
  public loadedMetadata(value: number): void {
    this.media.loadedmetadata = true;

    this.media.duration = this.formatTime(value * 1000, 'HH:mm:ss');
    this.media.durationSec = value;
    this.media.mediaType = 'mp3';
  }

  @Mutation
  public playing(value: boolean): void {
    this.media.playing = value;
  }

  @Mutation
  public timeUpdate(value: number): void {
    this.media.timeSec = value;
    this.media.time = this.formatTime(value * 1000, 'HH:mm:ss');
    this.media.percentage = Math.round((this.media.timeSec / this.media.durationSec) * 100);
  }

  @Mutation
  public loadStart(value: boolean): void {
    this.media.loadstart = value;
  }

  @Mutation
  public reset(): void {
    this.media = new Media();
  }

  private formatTime(time: number, format: string): string {
    return moment.utc(time).format(format);
  }
}
