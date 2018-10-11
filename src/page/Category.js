
import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Image, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import  {fetch} from 'fetch';
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  createProducts(product) {
    obj = {
    id: product.id,
    title: product.title,
    //price: 500,
    image: product.images[0].src,
    }
    return obj;
  };

 componentWillMount() {
     
    let displayProducts = [];
    fetch('https://myntra-clone.myshopify.com/admin/products.json', {
      method: 'GET',
      headers: new Headers({
        'X-Shopify-Access-Token': '98b5c4001fd4c42b4f7afa01b596bbb5',
      }),
      //json: true,
    }).then(response => response.json())
    .then(response => {
      console.log(response);
      if(response.products.length === 0) {
      } else {
        response.products.forEach(product => {
          let result = this.createProducts(product);
          displayProducts.push(result);
        })
        this.setState({items: displayProducts});
      }
    })
      .catch((error) => {
        console.error(error);
      }) 
      
  }
  
  
   /*
  ComponentDidMount (){
    fetch('https://myntra-clone.myshopify.com/admin/products.json')
    .then(res => res.json())
    .then(items=>{
      this.setState({

      })
    })
  }
*/
  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='menu' type='entypo' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='search' type='feather' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='shopping-cart' type='font-awesome' />
        </Button>
      </Right>
    );

    return (
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container style={{ backgroundColor: '#d6c9d4' }}>
          <Navbar left={left} right={right} title={this.props.title} />
          <Content padder>
            {this.renderProducts()}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  renderProducts() {
    let items = [];
    let stateItems = this.state.items
    for (var i = 0; i < stateItems.length; i += 2) {
      if (stateItems[i + 1]) {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Product key={stateItems[i + 1].id} product={stateItems[i + 1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i + 1} />
          </Grid>
        );
      }
    }
    return items;
  }
}
