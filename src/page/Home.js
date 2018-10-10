/**
 * User id: 1357068
Default Password: bwQvGO
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, StyleSheet} from 'react-native';
import { Container, Content, View, Button, Left, Right,  Card, CardItem, cardBody } from 'native-base';
import {Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';


export default class Home extends Component {
  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='menu' type= 'entypo' color='black'  />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='search'type= 'feather' color='black' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='shopping-cart' type='font-awesome' color='black'/>
        </Button>
      </Right>
    );
    return(
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <Navbar left={left} right={right} title=" Myntra " color='black' titleStyle={styles.navTitle} />
            <Content>
              {this.renderCategories()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories() {
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} />
      );
    }
    return cat;
  }

}

var categories = [
  {
    id: 1,
    title: 'MEN',
    image: 'https://res.cloudinary.com/devurubyh/image/upload/v1538387296/shopping.jpg'
  },
  {
    id: 2,
    title: 'WOMEN',
    image: 'https://res.cloudinary.com/devurubyh/image/upload/v1538387296/women-shopping-in-the-city.jpg'
  },
  {
    id: 3,
    title: 'KIDS',
    image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_445/v1500284286/child-childrens-baby-children-s_shcevh.jpg'
  },
  {
    id: 4,
    title: 'ACCESORIES',
    image: 'https://res.cloudinary.com/devurubyh/image/upload/v1537425965/samples/ecommerce/accessories-bag.jpg'
  },
  {
    id: 5,
    title: 'BAG',
    image: 'https://res.cloudinary.com/devurubyh/image/upload/v1537425965/samples/ecommerce/leather-bag-gray.jpg'
  }
];
const styles = StyleSheet.create({
  navTitle: {
    color: 'white', // changing navbar title color
  },})