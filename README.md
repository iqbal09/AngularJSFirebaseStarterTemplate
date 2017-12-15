<p align="center">
  <h2 align="center">AngularJS + Firebase Starter Template</h2>
</p>

![Logo](CoverTemplate.png)

AngularJS + Firebase Starter template to kick start your new project. With the newest, Firebase Database and Firebase Auth, and Angular JS
Rather than use `new Firebase(url)` like with the old SDK, you now configure firebase with `firebase.initializeApp(config)`,
and use the new `firebase.database().ref()` method.

```js
 // Initialize Firebase
  var config = {
    apiKey: "<YOUR-API-KEY>",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    databaseURL: "<YOUR-DATABASE-URL>",
    projectId: "<YOUR-PROJECT-ID>",
    storageBucket: "<YOUR-STORAGE-BUCKET>",
    messagingSenderId: "<YOUR-MESSANGING-SENDER-ID>"
  };
  firebase.initializeApp(config);
```

# Run a Local Web Server for Development
Before running this project you need npm already installed on your computer
if you already have npm before then run this command
```groovy
$ npm install -g firebase-tools
```

now it's time to install firebase into our npm system
```groovy
$ firebase init    # Generate a firebase.json (REQUIRED)
```
sync firebase to your firebase console account then copy the public folder to the public folder that has been generated firebase-cli earlier

now lets run our project

```groovy
$ firebase serve   # Start development server
```
