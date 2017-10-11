'use strict';

import React, { Component } from 'react'
import TodoList from './js/TodoList'

import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

const markdown =
`* clean kitchen
* find the dog
* ~~wash car~~`;

export default class App extends Component {
  constructor() {
    super()

    this.renderCurrentScene = this.renderCurrentScene.bind(this)
    this.renderCurrentToolbar = this.renderCurrentToolbar.bind(this)

    // scenes: login, main, settings
    this.state = {
      currentScene: 'main'
    }
  }

  render() {
    return <View style={ styles.container }>
             { this.renderCurrentToolbar() }

             <View style= {styles.content }>
               { this.renderCurrentScene() }
             </View>

             <View style={ styles.footer }>
               <Text style={styles.footerText }>
                 <Image source={ require('./assets/icons/wraithware-logo.png')} />
               </Text>
             </View>
           </View>
  }

  renderCurrentScene() {
    if (this.state.currentScene === 'main') {
      return <TodoList rawMarkdown={ markdown }></TodoList>
    } else {
      return <View><Text>settings scene</Text></View>
    }
  }

  renderCurrentToolbar() {
    let nextScene, toolbarBtn

    if (this.state.currentScene === 'main') {
      nextScene = 'settings'
      toolbarBtn = '\u2699'
    } else {
      nextScene = 'main'
      toolbarBtn = '\u270E'
    }

    return <View style={styles.toolbar}>
             <Text style={styles.toolbarTitle}>okonau</Text>
             <Text
               onPress={() => this.setState({ currentScene: nextScene })}
               style={styles.toolbarBtn}>
               {toolbarBtn}
             </Text>
           </View>
  }
}

const styles = StyleSheet.create({
  mainSceneIcon: {
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#fff'
  },

  container: {
    flex: 1
  },

  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#b4d444',
    padding: 5
  },

  toolbarTitle: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 10
  },

  toolbarBtn: {
    color: '#475461',
    fontSize: 17,
    fontWeight: 'bold',
    paddingRight: 10
  },

  content: {
    flex: 1,
    backgroundColor: '#fff'
  },

  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5
  },

  footerText: {
    flex: 1,
    color: '#ccdaee',
    textAlign: 'right'
  }
})
