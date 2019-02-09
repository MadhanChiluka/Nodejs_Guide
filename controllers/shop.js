const Product = require('../models/product')

  exports.products = (req, res, next) => {
    Product.fetchAllProducts((products) => {
      res.render('shop/product-list', {
        prods : products, 
        pageTitle : 'All Products', 
        path: '/products', 
        // hasProducts: products.length > 0, 
        // productCss: true,
        // activeShop: true
        });
    })
  }

  exports.getIndex = (req, res, next) => {
    Product.fetchAllProducts((products) => {
      res.render('shop/index', {
        prods : products, 
        pageTitle : 'Shop', 
        path: '/', 
        // hasProducts: products.length > 0, 
        // productCss: true,
        // activeShop: true
        });
    })
  }

  exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    })
  }

  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path:'/checkout',
      pageTitle: 'Checkout'
    })
  }

  exports.getOrders = (req, res, next) => {
    res.render('shop/orders',{
      path: '/orders',
      pageTitle: 'Your Orders'
    })
  }