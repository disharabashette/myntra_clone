/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Item, Input, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
// Our custom files and classes import
import SideMenuSecondLevel from './SideMenuSecondLevel';
import Text from './Text';

export default class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
        searchError: false,
        subMenu: false,
        subMenuItems: [],
        clickedItem: ''
      };

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return(
          <ScrollView style={styles.container}>
              {this.renderMenu()}
          </ScrollView>
    );
  }

  renderMenu() {
    if(!this.state.subMenu) {
      return(
        <View>
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <Item error={this.state.searchError}>
                <Input
                  placeholder='Search...'
                  onChangeText={(text) => this.setState({search: text, searchError: false})}
                  onSubmitEditing={() => this.search()}
                />
                <Icon active name='search'type= 'feather' onPress={() => this.search()} />
            </Item>
          </View>
          <View style={{paddingRight: 15}}>
            <List>
              <ListItem
                icon
                key={0}
                button={true}
                onPress={() => Actions.home()}
              >
                <Body>
                  <Text>Home</Text>
                </Body>
                <Right>
                  <Icon name='keyboard-arrow-right' type='materialIcons' />
                </Right>
              </ListItem>
              {this.renderMenuItems()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15}}>
            <List>
              {this.renderSecondaryList()}
            </List>
          </View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Follow us</Text>
            <Grid>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='facebook' type='entypo' onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='instagram' type='entypo' onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='twitter' type='entypo' onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='youtube' type='entypo' onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18}} name='snapchat' type='font-awesome' onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))} /></Col>
            </Grid>
          </View>
        </View>
      );
    }
    else {
      return(
        <SideMenuSecondLevel back={this.back.bind(this)} title={this.state.clickedItem} menu={this.state.subMenuItems} />
      );
    }
  }

  renderMenuItems() {
    let items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i+1}
          icon 
          type
          key={item.id}
          button={true}
          onPress={() => this.itemClicked(item)}
        >
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Icon name='keyboard-arrow-right' type='materialIcons' />
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  itemClicked(item) {
    if(!item.subMenu || item.subMenu.length<=0) {
      Actions.category({id: item.id, title: item.title});
      return;
    }
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: true, subMenuItems: item.subMenu, clickedItem: item.title});
  }

  back() {
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
  }

  search(text) {
    if(this.state.search.length <= 2)
      this.setState({searchError: true, search: ""});
    else
      Actions.search({searchText: this.state.search});
  }

  renderSecondaryList() {
    let secondaryItems = [];
    menusSecondaryItems.map((item, i) => {
      secondaryItems.push(
        <ListItem
          last
          icon
          type
          key={item.id}
          button={true}
          onPress={Actions[item.key]}
        >
          <Left>
            <Icon style={{fontSize: 18}} name={item.icon} type={item.type}/>
          </Left>
          <Body style={{marginLeft: -15}}>
            <Text style={{fontSize: 16}}>{item.title}</Text>
          </Body>
        </ListItem>
      );
    });
    return secondaryItems;
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = [
  {
    id: 1,
    title: 'MEN',
    subMenu: [
      {
        id: 5,
        title: 'NEW IN'
      },
      {
        id: 6,
        title: 'JACKETS'
      },
      {
        id: 7,
        title: 'BLAZERS'
      },
      {
        id: 8,
        title: 'TROUSERS'
      },
      {
        id: 9,
        title: 'JEANS'
      },
      {
        id: 10,
        title: 'SHORTS'
      },
      {
        id: 11,
        title: 'SHOES'
      }
    ]
  },
  {
    id: 2,
    title: 'WOMEN',
    subMenu: [
      {
        id: 12,
        title: 'NEW IN'
      },
      {
        id: 13,
        title: 'JACKETS'
      },
      {
        id: 14,
        title: 'BLAZERS'
      },
      {
        id: 15,
        title: 'TROUSERS'
      },
      {
        id: 16,
        title: 'JEANS'
      },
      {
        id: 17,
        title: 'SHORTS'
      },
      {
        id: 18,
        title: 'SHOES'
      }
    ]
  },
  {
    id: 3,
    title: 'KIDS',
    subMenu: [
      {
        id: 12,
        title: 'NEW IN',
        
      },
      {
        id: 13,
        title: 'SHOES'
      },
      {
        id: 14,
        title: 'BLAZERS'
      },
      {
        id: 15,
        title: 'TROUSERS'
      },
      {
        id: 16,
        title: 'JEANS'
      },
      {
        id: 17,
        title: 'SHORTS'
      }
    ]
  },
  {
    id: 4,
    title: 'ACCESORIES',
    subMenu: [
      {
        id: 12,
        title: 'NEW IN'
      },
      {
        id: 13,
        title: 'NECKLACE'
      },
      {
        id: 14,
        title: 'BEAUTY PRODUCT'
      },
      {
        id: 15,
        title: 'BEALTS'
      },
      {
        id: 16,
        title: 'WALLET'
      },
      {
        id: 17,
        title: 'SHORTS'
      }
    ]
  }
];


const menusSecondaryItems = [
  {
    id: 190,
    title: 'Login',
    icon: 'person' ,
    type: 'materialIcons',
    key: 'login'
  },
  {
    id: 519,
    title: 'Signup',
    icon: 'person-add',
    type: 'materialIcons',
    key: 'signup'
  },
  {
    id: 19,
    title: 'Wish List',
    icon: 'heart',
    type: 'entypo',
    key: 'wishlist'
  },
  {
    id: 20,
    key: 'map',
    title: 'Store Finder',
    icon: 'map-pin',
    type: 'feather',
    key: 'map'
  },
  {
    id: 21,
    key: 'contact',
    title: 'Contact Us',
    icon: 'smartphone',
    type: 'feather',
    key: 'contact'
  },
  {
    id: 23,
    key: 'newsletter',
    title: 'Newsletter',
    icon: 'newspaper-o',
    type: 'font-awesome',
    key: 'newsletter'
  }
];
