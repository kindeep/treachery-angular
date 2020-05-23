const firebaseConfig = {
  apiKey: "AIzaSyD4budom0CVn9j6D4WaSha9qfCPG6j9Rt8",
  authDomain: "treacherygameonline.firebaseapp.com",
  databaseURL: "https://treacherygameonline.firebaseio.com",
  projectId: "treacherygameonline",
  storageBucket: "treacherygameonline.appspot.com",
  messagingSenderId: "437618812225",
  appId: "1:437618812225:web:1cb42fc94839ff4f5fadc0",
  measurementId: "G-E2GMG6T92G"
};

export const environment = {
  production: true,
  firebase: {
    ...firebaseConfig
  }
};
