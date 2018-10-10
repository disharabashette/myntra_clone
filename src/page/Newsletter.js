
import React, { Component } from 'react';
import { Container, View,  Left, Button, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

import {Icon} from 'react-native-elements';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import Colors from '../Colors';

export default class Newsletter extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: ''
      }
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="close" type='ant-design'size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title="NEWSLETTER" />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 40}}>
              <Item>
                  <Icon active name='email' type= 'material-communityIcons' />
                  <Input placeholder='Your email address' onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <View style={{alignItems: 'center'}}>
                <Button onPress={() => this.subscribe()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
                  <Text style={{color: 'black'}}>Subscribe</Text>
                </Button>
              </View>
            </View>
      </Container>
    );
  }

  subscribe() {
    alert('Subscribe address: '+this.state.email);
  }
}
