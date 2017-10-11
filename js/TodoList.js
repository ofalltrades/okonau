'use strict'

import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Header
} from 'react-native'

import { List, ListItem } from 'react-native-elements'

export default class TodoList extends Component {
  // setup
  constructor(props) {
    super(props)

    const items = this.markdownToList(this.props.rawMarkdown)

    this.state = {
      items: items
    }

    // prebind methods; in place of autobinding performed prior to es6 classes
    this.markdownToList = this.markdownToList.bind(this)
    // this.buildRow = this.buildRow.bind(this)
    // this.toggleStrikeOut = this.toggleStrikeOut.bind(this)
    // this.deleteItem = this.deleteItem.bind(this)
  }

// { title: 'Todo', data: this.state.items.completed.concat(this.state.items.incomplete) }

  // rendering functions
  render() {
    console.log(View)
    return (
      <View style={ styles.container }>
        <List>
          <FlatList
            data={[{ key: 'dsa' }]}
            renderItem={ ({ item }) => <ListItem title={ item.key } /> } />
        </List>
      </View>
    )
  }

  // <Text style={ styles.item }>{ item }</Text>

  //         <Text style={ styles.deleteBtn }>
  //           { '\u2717' }
  //         </Text>

  // buildRow(item) {
  //   return null
  // }


  // general functions
  // deleteItem(item) {
    // const splicedList = this.state.items.slice()
    // splicedList.splice(rowId, 1)

    // this.setState({
    //   list: splicedList,
    //   dataSource: this.state.dataSource.cloneWithRows(splicedList)
    // })
  // }

  markdownToList(markdown) {
    return markdown.replace(/\* /g, '')
                   .split('\n')
                   .reduce(
                     (accumulator, item) => {
                       if (item.includes('~~')) {
                         return Object.assign(accumulator, {
                           completed: accumulator.completed.concat(item.replace(/\~~/g, ''))
                         })
                       }

                       return Object.assign(accumulator, {
                         incomplete: accumulator.incomplete.concat(item)
                       })
                     },
                     { incomplete: [], completed: [] }
                   )
  }

  // toggleStrikeOut(rowId) {
  //   // Assign objects by value
  //   const listCopy = this.state.items.slice(),
  //         itemCopy = Object.assign({}, this.state.items[rowId])


  //   // Toggle row completion state
  //   itemCopy.complete = !itemCopy.complete
  //   // Replace existing item with new object, and hence a new reference
  //   listCopy[rowId] = itemCopy

  //   this.setState({
  //     list: listCopy,
  //     dataSource: this.state.dataSource.cloneWithRows(listCopy)
  //   })
  // }

  // updateItem(item, rowId) {
  //   // Assign object by value
  //   const listCopy = this.state.items.slice()
  //
  //   listCopy[rowId] ? listCopy[rowId] = item : listCopy.push(item)
  //
  //   this.setState({
  //     list: listCopy,
  //     dataSource: this.state.dataSource.cloneWithRows(listCopy)
  //   })
  // }
}

TodoList.propTypes = { rawMarkdown: React.PropTypes.string }

const styles = StyleSheet.create({
  // list: {
  //   padding: 15
  // },

  // deleteBtn: {
  //   color: '#c0392b'
  // },

  // row: {
  //   flexDirection: 'row',
  //   paddingBottom: 5
  // },

  // itemText: {
  //   flex: 1
  // },

  // strikeOut: {
  //   textDecorationLine: 'line-through'
  // },

  container: {
    flex: 1,
    paddingTop: 22
   },

   sectionHeader: {
     paddingTop: 2,
     paddingLeft: 10,
     paddingRight: 10,
     paddingBottom: 2,
     fontSize: 14,
     fontWeight: 'bold',
     backgroundColor: 'rgba(247,247,247,1.0)',
   },

   item: {
     padding: 10,
     fontSize: 18,
     height: 44
   },
})


