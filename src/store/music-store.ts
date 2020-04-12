import { AlbumList } from '../models/album.list';
import { AlbumDetails } from '../models/album.details';
import { Type } from '../models/type';
import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import jsonp from '../services/jsonp-service';

@Module({ generateMutationSetters: true })
export default class Music extends VuexModule {
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

  get getSongs(): Type[] {
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
    const albumList: AlbumList = await jsonp<AlbumList>('https://itunes.apple.com/search', {
      term: search, entity: 'album'
    });
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
    const albumDetails: AlbumDetails = await jsonp<AlbumDetails>('https://itunes.apple.com/lookup', {
      id, entity: 'song'
    });
    this.setAlbumDetails(albumDetails);
    this.setLoading(false);
  }
}
