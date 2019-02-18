const Product = require('../models/product');

exports.products = (req, res, next) => {
    Product.findAll().then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path:'/products'
      })
    }).catch(err => console.log(err));

  // Product.fetchAllProducts().then(([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products',
  //     // hasProducts: products.length > 0, 
  //     // productCss: true,
  //     // activeShop: true
  //   });
  // }).catch(error => console.log(error));
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => console.log(err));
  // Product.fetchAllProducts().then(([rows, fieldData]) =>{
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/',
  //     // hasProducts: products.length > 0, 
  //     // productCss: true,
  //     // activeShop: true
  //   });
  // }).catch(error => {
  //   console.log(error);
  // }); 
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          })
      })
    .catch();
  })
  .catch(err => console.log(err));
  // Cart.getCart(cart => {
  //   Product.fetchAllProducts(products => {
  //     cartProducts = [];
  //     for(product of products) {
  //       cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if(cartProductData) {
  //         cartProducts.push({productData: product, qty: cartProductData.qty});
  //       }
  //     }
  //      res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     })
  //   })
  // })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId}});
  })
  .then(products => {
    let product;
    if(products.length > 0) {
      product = prodcts[0];
    }
   
    if(product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }
    return Product.findById(prodId)
  })
  then(product => {
    return fetchedCart.addProduct(product, { through: {quantity: newQuantity}})
  })
  .then( () =>{
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // })
  // res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
   return cart.getProducts({where: {id: prodId}});
  })
  .then(products => {
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  // })
  res.redirect('/cart');
}


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId} }).then(products => {
    res.render('shop/product-details', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    })
  }).catch(err => console.log(err));

  // Product.findById(prodId).then((product) => {
  //   res.render('shop/product-details', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   })
  // }).catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  req.getCart()
  .then(cart => {
    return cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProducts(
        products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity}
      return product;
        })
      )
    })
    .catch(err => console.log(err))
    console.log(products)
  })
  .then(result => {
    res.render('/orders')
  })
  .catch(err => console.log(err));
}