Demo of creating and and streaming files to a client

Uses the nodejs stream API, json2csv streaming API and falso to generate mock data

Includes an Angular application using the HttpClient, NgRx ComponentStore and `file-saver` packages to download the file and show progress

To run
`yarn nx serve api`

Go to `http://localhost:333/api` in your browser. a CSV filled with data will get downloaded

OR

`yarn nx serve client` and open the Angular app that will display download progress and then save to the file when done.

References:

https://docs.nestjs.com/techniques/streaming-files
https://www.npmjs.com/package/json2csv
https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
https://angular.io/api/common/http/HttpClient#get
https://ngrx.io/guide/component-store
https://www.npmjs.com/package/file-saver
