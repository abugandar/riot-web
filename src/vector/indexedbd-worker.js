/*
Copyright 2017 Vector Creations Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {IndexedDBStoreWorker} from 'matrix-js-sdk/lib/indexeddb-worker.js';

const remoteWorker = new IndexedDBStoreWorker(postMessage);

onmessage = remoteWorker.onMessage;





//Option to add save self signed certificate
app.on('select-client-certificate', (event, webContents, url, list, callback) => {

  console.log('select-client-certificate', url, list)

  event.preventDefault()



  ipc.once(çlient-certificate-selected', (event, item) => {

    console.log('selected:', item)

    callback(item)

  })



  mainWindow.webContents.send('select-client-certificate', list)

})



app.on(çertificate-error', (event, webContents, url, error, certificate, callback) => {

  console.log(çertificate-error', url)

  event.preventDefault()

  const result = ... // do your validation here

  callback(result)

})


