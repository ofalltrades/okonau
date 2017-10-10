'use strict'

import React, { Component } from 'react'

import {
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native'

export default class TodoList extends Component {
  // setup
  constructor(props) {
    super(props)

    const list = this.markdownToObjects(this.props.initMarkdown),
          dataSource = new ListView.DataSource(
            { rowHasChanged: (r1, r2) => r1 !== r2 }
          ).cloneWithRows(list)

    this.state = {
      dataSource: dataSource,
      list: list
    }

    // prebind methods; in place of autobinding performed prior to es6 classes
    this.markdownToObjects = this.markdownToObjects.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.toggleStrikeOut = this.toggleStrikeOut.bind(this)
  }

  // rendering functions
  render() {
    return <ListView
             dataSource={ this.state.dataSource }
             renderRow={ this.renderRow }
             style={ styles.list }
           />
  }

  renderRow(itemData, sectionId, rowId) {
    return <View style={ styles.row }>
             <Text
               onPress={ () => this.toggleStrikeOut(rowId) }
               style={ [itemData.complete && styles.strikeOut, styles.itemText] }>
               {itemData.item}
             </Text>
             <Text
               onPress={() => this.deleteItem(rowId)}
               style={styles.deleteBtn}>
               {'\u2717'}
             </Text>
           </View>
  }


  // general functions
  deleteItem(rowId) {
    const splicedList = this.state.list.slice()
    splicedList.splice(rowId, 1)

    this.setState({
      list: splicedList,
      dataSource: this.state.dataSource.cloneWithRows(splicedList)
    })
  }

  markdownToObjects(markdown) {
    return markdown.replace(/\* /g, '')
                   .split('\n')
                   .map((item, index) => ({
                     item: item.replace(/\~~/g, ''),
                     complete: item.includes('~~')
                   }))
  }

  toggleStrikeOut(rowId) {
    // Assign objects by value
    const listCopy = this.state.list.slice(),
          itemCopy = Object.assign({}, this.state.list[rowId])


    // Toggle row completion state
    itemCopy.complete = !itemCopy.complete
    // Replace existing item with new object, and hence a new reference
    listCopy[rowId] = itemCopy

    this.setState({
      list: listCopy,
      dataSource: this.state.dataSource.cloneWithRows(listCopy)
    })
  }

  // updateItem(item, rowId) {
  //   // Assign object by value
  //   const listCopy = this.state.list.slice()
  //
  //   listCopy[rowId] ? listCopy[rowId] = item : listCopy.push(item)
  //
  //   this.setState({
  //     list: listCopy,
  //     dataSource: this.state.dataSource.cloneWithRows(listCopy)
  //   })
  // }
}

TodoList.propTypes = { initMarkdown: React.PropTypes.string }

const styles = StyleSheet.create({
  list: {
    padding: 15
  },

  deleteBtn: {
    color: '#c0392b'
  },

  row: {
    flexDirection: 'row',
    paddingBottom: 5
  },

  itemText: {
    flex: 1
  },

  strikeOut: {
    textDecorationLine: 'line-through'
  }
})


