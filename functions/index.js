// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBLU8AGtD5U_c2t4EPM-5zyQ5ic_vYrgA0",
//   authDomain: "saima-tigran.firebaseapp.com",
//   projectId: "saima-tigran",
//   storageBucket: "saima-tigran.appspot.com",
//   messagingSenderId: "705108784197",
//   appId: "1:705108784197:web:4c930fb51f8be7c983df2c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// import 'TOOL';
import fs from 'node:fs';
import ytdl from 'ytdl-core';
import http from 'http';

const server = http.createServer((req, res) => {
  console.log('starting')
});
server.listen(8080, () => {
  console.log('starting')
});

// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// Call the package method to test
// myPackage.method();

ytdl.getBasicInfo('https://www.youtube.com/watch?v=BJFkmXPZbF0').then((info) => {
  const video = info.formats.find((format) => format.mimeType.split(';')[0] === 'video/mp4')
  console.log(video);
});
