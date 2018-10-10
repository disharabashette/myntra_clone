
import React, { Component } from 'react';
import { Container, View, Left, Button, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';

import {Icon} from 'react-native-elements';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import Colors from '../Colors';

export default class Contact extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        subject: '',
        message: ''
      }
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="close" type='ant-design'  size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title="CONTACT" />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
              <Item>
                  <Icon active name='person' type='materialIcons' />
                  <Input placeholder='Your name' onChangeText={(text) => this.setState({name: text})}/>
              </Item>
              <Item>
                  <Icon active name='email' type= 'material-communityIcons' />
                  <Input placeholder='Your email address' onChangeText={(text) => this.setState({email: text})}/>
              </Item>
              <Item>
                  <Icon active name='subject' type='materialIcons'/>
                  <Input placeholder='Subject' onChangeText={(text) => this.setState({subject: text})}/>
              </Item>
              <Item>
                  <Icon active name='message' type='materialIcons' style={{marginTop: -20}}/>
                  <Input
                    placeholder='Message'
                    multiline={true}
                    style={{height: 100, marginTop: -20}}
                    onChangeText={(text) => this.setState({message: text})}/>
              </Item>
              <View style={{alignItems: 'center'}}>
                <Button onPress={() => this.send()} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20}}>
                  <Text style={{color: 'black'}}>Send</Text>
                </Button>
              </View>
            </View>
      </Container>
    );
  }

  send() {
    alert('Send email');
  }
}
