

import React, { Component } from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right,  Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

fetch('https://myntra-clone.myshopify.com/admin/products.json', {
      method: 'GET',
      headers: {
        
        'X-Shopify-Access-Token': '98b5c4001fd4c42b4f7afa01b596bbb5',
      },
    }).then(response => {
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      })

      return(
<Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              enableSnap={true}
            >
                {this.renderImages()}
            </Carousel>
      )