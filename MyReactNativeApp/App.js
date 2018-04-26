/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  StackNavigator,
} from 'react-navigation';
var ImagePicker = require('react-native-image-picker');
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  CameraRoll,
  Image,
  ImageResizeMode,
  TextInput,
} from 'react-native';

// var SendIntentAndroid = require('react-native-send-intent');

type Props = {};

class HomePage extends Component<Props> {
  constructor() {
    super()
    this.state = {
      latestImageUri: { uri: 'http://www.gstatic.com/webp/gallery/1.jpg' },
      cameraImageUri: { uri: 'http://www.gstatic.com/webp/gallery/1.jpg' },
      subjectText: '',
      messageText: '',
    }
  }

  static navigationOptions = {
    title: 'Home Page',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.commonMargin}><Button style={styles.commonMargin} title="Dial phone" onPress={this._dialPhone} /></View>
        <View style={styles.commonMargin} />
        <View style={styles.commonMargin}><Button title="Get latest Image from Gallery" onPress={this._getLatestCameraImage} /></View>
        <View style={styles.flowRight}>
          <Image style={styles.imageThumbnail} source={{ uri: 'http://www.gstatic.com/webp/gallery/1.jpg' }} />
          <Image style={styles.imageThumbnail} source={this.state.latestImageUri} />
        </View>
        <View style={styles.commonMargin} />
        <View style={styles.commonMargin}><Button title="Start Camera" onPress={this._startCamera} /></View>
        <View style={styles.commonMargin} />
        <Image style={styles.imageThumbnail} source={this.state.cameraImageUri} />
        <View style={styles.commonMargin} />
        <TextInput style={[styles.commonMargin, { width: '86%', borderColor: 'gray', borderWidth: 1 }]} placeholder="Subject" multiline={false} numberOfLines={1} value={this.state.subjectText} onChangeText={(text) => { this.setState({ subjectText: text }) }} />
        <View style={styles.commonMargin} />
        <TextInput style={[styles.commonMargin, { width: '86%', borderColor: 'gray', borderWidth: 1 }]} placeholder="Message" multiline={true} numberOfLines={1} value={this.state.messageText} onChangeText={(text) => { this.setState({ messageText: text }) }} />
        <View style={styles.commonMargin}><Button title="Share with..." onPress={this._shareMessageWith} /></View>
      </ScrollView>
    );
  }

  _startCamera = () => {
    // SendIntentAndroid.openCamera();
    var options = {
      quality: 1.0,
      // maxWidth: 500,
      // maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          cameraImageUri: source
        });
      }
    });
  }

  _shareMessageWith = () => {
    ImagePicker.openChooserWithOptions({
      subject: this.state.subjectText,
      text: this.state.messageText
    }, "Share using");
  }

  _getLatestCameraImage = () => {
    CameraRoll.getPhotos({
      first: 1,
    })
      .then(r => {
        // this.setState({ textMessage: r.edges[0].node.image.uri });
        this.setState({ latestImageUri: { uri: r.edges[0].node.image.uri } });
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  _dialPhone = () => {
    SendIntentAndroid.sendPhoneDial('+918970453075');
  }
}

const App = StackNavigator({
  Home: { screen: HomePage },
});
export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 100,
    paddingTop: 25,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  commonMargin: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  imageThumbnail: {
    margin: 16,
    width: 150,
    height: 150,
  },
});
