
import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Image, Button, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
//import  {fetch} from 'react-native-fetch';
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

  componentWillMount() {
     var products = [
      {id: 1, title: 'Black Hat', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'https://cdn.shopify.com/s/files/1/0056/3317/9717/products/1.jpg?v=1539085432', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 2, title: 'V Neck T-Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 10, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      
      {id: 15, title: 'Long Sleeves T-Shirt', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_100,y_50/v1500465308/pexels-photo-500034_uvxwcq.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 14, title: 'Baby Girl Dress', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'https://res.cloudinary.com/devurubyh/image/upload/v1538387584/girl-kid.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 18, title: 'Baby Boy Dress', categoryId: 2, categoryTitle: 'KIDS', price: '2$', image: 'https://res.cloudinary.com/devurubyh/image/upload/v1538387584/boy-kid.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      
      {id: 11, title: 'Pink Diamond Watch', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 22, title: 'Golden Tie', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 100, title: 'Black Pearl Earrings', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_center,h_250/v1500465307/pexels-photo-262226_kbjbl3.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 215, title: 'Grey Blazer', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 12, title: 'Mirror Sunglasses', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250/v1500465307/pexels-photo-488541_s0si3h.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 29, title: 'White Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 16, title: 'Tie', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold."},
      {id: 20, title: 'Shoes', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'https://res.cloudinary.com/devurubyh/image/upload/v1537425961/samples/ecommerce/shoes.png', description: "Hello there, i'm a cool product with a heart of gold."},
    ];
    //this.setState({items: products});
  
    displayProducts = [];
    fetch('https://myntra-clone.myshopify.com/admin/products.json', {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': '98b5c4001fd4c42b4f7afa01b596bbb5',
      },
      json: true,
    }).then(response => {
      console.log(response);
      if(response.products === undefined) {
        displayProducts = products;
      } else {
        response.products.forEach(product => {
          displayProducts.push(createProducts(product));
        })
      }
    })
      .catch((error) => {
        console.error(error);
      })
      this.setState({items: displayProducts});
  }
  createProducts(product) {
     obj = {};
     obj.id = product.id;
     obj.title = product.title;
     obj.price =  500;
     obj.image =  product.images[0].src;
     return obj;
   };

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
