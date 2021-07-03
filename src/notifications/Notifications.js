import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from "react-native";
import firebase from "react-native-firebase";

class Notification extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();

    const channelId = new firebase.notifications.Android.Channel(
      "bloodapp",
      "Blood App",
      firebase.notifications.Android.Importance.High
    ).setSound("alarmfrenzy.mp3");
    firebase.notifications().android.createChannel(channelId);
  }

  async componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(async (notification) => {
        let localNotification = new firebase.notifications.Notification({
          data: notification.data,
          title: notification.title,
          body: notification.body,
        }).android
          .setPriority(firebase.notifications.Android.Priority.Max)
          .android.setChannelId("default_notification_channel_id")
          .android.setVibrate(1000);

        firebase.notifications().displayNotification(localNotification);
      });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcm_token");
    let auth = await AsyncStorage.getItem("auth");

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      alert(fcmToken);

      if (fcmToken) {
        await AsyncStorage.setItem("fcm_token", fcmToken);
      }
    }

    let user = firebase.auth().currentUser;

    firebase
      .database()
      .ref("profile")
      .orderByChild("id_user")
      .equalTo(user.uid)
      .on("child_added", (snapshot) => {
        firebase
          .database()
          .ref("profile/" + snapshot.key)
          .update({
            token: fcmToken,
          })
          .then(() => {});
      });

    firebase
      .messaging()
      .subscribeToTopic("Donor")
      .then(() => {});
  }

  async requestPermission() {
    try {
      const permission = await firebase.messaging().requestPermission();

      this.getToken();
    } catch (error) {
      console.log("Permission rejected");
    }
  }

  render() {
    return null;
  }
}

export default Notification;
