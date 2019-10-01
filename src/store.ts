import Vue from 'vue';
import Vuex from 'vuex';
import { AlbumList } from './models/album.list';
import { AlbumDetails } from './models/album.details';
import { Type } from './models/type';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

Vue.use(Vuex);

interface MusicStore {
  music: Music;
}
// Declare empty store first
const store = new Vuex.Store<MusicStore>({});

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'music'
})
class Music extends VuexModule {
  // state
  public loading: boolean = false;
  public search: string = '';
  public id: number = 0;
  public albumList: AlbumList = new AlbumList();
  public albumDetails: AlbumDetails = new AlbumDetails();

  // getters
  get getAlbum(): Type {
    let album: Type = this.albumDetails.results.find((type: Type) => type.wrapperType === 'collection')!;
    if (!album) {
      album = new Type();
    }
    return album;
  }

  get getSongs() {
    return this.albumDetails.results.filter((type) => type.wrapperType === 'track');
  }

  // mutations
  @Mutation
  public setLoading(loading: boolean): void {
    this.loading = loading;
  }

  @Mutation
  public setSearch(search: string): void {
    this.search = search;
  }

  @Mutation
  public setId(id: number): void {
    this.id = id;
  }

  @Mutation
  public setAlbumList(albumList: AlbumList): void {
    this.albumList = albumList;
  }

  @Mutation
  public setAlbumDetails(albumDetails: AlbumDetails): void {
    this.albumDetails = albumDetails;
  }

  // actions
  @Action
  public async getAlbums(search: string): Promise<void> {
    if (this.search === search) {
      return Promise.resolve();
    }
    this.setSearch(search);
    this.setLoading(true);
    const response: any = await fetch(`https://itunes.apple.com/search?term=${search}&entity=album`);
    const albumList: AlbumList = await response.json();
    this.setAlbumList(albumList);
    this.setLoading(false);
  }

  @Action
  public async getAlbumDetails(id: number): Promise<void> {
    if (this.id === id) {
      return Promise.resolve();
    }
    this.setId(id);
    this.setLoading(true);
    const response: any = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
    const albumDetails: AlbumDetails = await response.json();
    this.setAlbumDetails(albumDetails);
    this.setLoading(false);
  }
}

export default new Vuex.Store({
  modules: {
    Music
  }
});
