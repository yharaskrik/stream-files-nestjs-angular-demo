import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { saveAs } from 'file-saver';

export interface DownloadState {
  totalDownloaded: number;
  downloading: boolean;
}

@Injectable()
export class DownloadStore extends ComponentStore<DownloadState> {
  /*
   * Selectors for the store to show the total bytes downloaded and whether it is downloading or not
   */
  readonly totalDownloaded$ = this.select((state) => state.totalDownloaded);

  readonly downloading$ = this.select((state) => state.downloading);

  /*
   * Updaters so the effect can set the properties in the store
   */
  private readonly setDownloading = this.updater(
    (state, downloading: boolean) => ({ ...state, downloading })
  );

  private readonly setTotalDownloaded = this.updater(
    (state, totalDownloaded: number) => ({ ...state, totalDownloaded })
  );

  constructor(private _httpClient: HttpClient) {
    super({ totalDownloaded: 0, downloading: false });
  }

  /**
   * The effect that handles the downloading of the file.
   */
  readonly download = this.effect((origin$) =>
    origin$.pipe(
      // Toggle the flag so that the UI shows we are downloading the file
      tap(() => this.setDownloading(true)),
      switchMap(() =>
        this._httpClient
          /*
           * Configurations here:
           *
           * observe: We sent it to `events` so that we get the event that says when the download is complete, used with
           * reportProgress
           *
           * responseType: We set it to blob as we are receiving binary data from this endpoint that we will use to save
           * to a file
           *
           * reportProgress: Setting this to true is what tells the client to report DownloadProgress, this is what gives us the
           * number of bytes loaded so far
           */
          .get(`/api`, {
            observe: 'events',
            responseType: 'blob',
            reportProgress: true,
          })
          .pipe(
            tapResponse(
              (response) => {
                console.log(response);
                // When more bytes are loaded update the store so the ui can update
                if (response.type === HttpEventType.DownloadProgress) {
                  this.setTotalDownloaded(response.loaded);
                  // Once the response is finished then save the file to the local computer and set downloading false
                } else if (
                  response.type === HttpEventType.Response &&
                  response.body
                ) {
                  saveAs(response.body, 'data.csv');
                  this.setDownloading(false);
                }
              },
              (error) => {
                console.error(error);
                this.setDownloading(false);
              }
            )
          )
      )
    )
  );
}
