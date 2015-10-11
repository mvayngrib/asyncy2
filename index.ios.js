/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

require('./shim')
var asyncstorage = require('asyncstorage-down')
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var levelup = require('levelup');
var db = levelup('/does/not/matter', { db: asyncstorage });

db.put('name', 'Yuri Irsenovich Kim');
db.put('dob', '16 February 1941');
db.put('spouse', 'Kim Young-sook');
db.put('occupation', 'Clown');

db.readStream()
   .on('data', function (data) {
      if (typeof data.value !== 'undefined') {
         console.log(data.key, '=', data.value);
      }
   })
   .on('error', function (err) {
      console.log('Oh my!', err);
   })
   .on('close', function () {
      console.log('Stream closed');
   })
   .on('end', function () {
     console.log('Stream ended');
   });

var asyncy = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('asyncy2', () => asyncy);
