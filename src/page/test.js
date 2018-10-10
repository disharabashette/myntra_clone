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


