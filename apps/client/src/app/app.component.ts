import { Component } from '@angular/core';
import { DownloadStore } from './download.store';

@Component({
  selector: 'stream-files-nestjs-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DownloadStore],
})
export class AppComponent {
  readonly downloading$ = this.downloadStore.downloading$;

  readonly totalDownloaded$ = this.downloadStore.totalDownloaded$;

  constructor(private downloadStore: DownloadStore) {}

  download(): void {
    this.downloadStore.download();
  }
}
