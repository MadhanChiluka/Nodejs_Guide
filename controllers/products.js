const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
    {pageTitle: 'Add-Product', 
    path: '/admin/add-product', 
    productCss:true, 
    formsCss: true, 
    activeProduct: true})

    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  }

  exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  }


  exports.products = (req, res, next) => {
    const products = Product.fetchAllProducts();
    res.render('shop', {
      prods : products, 
      pageTitle : 'Shop', 
      path: '/', 
      hasProducts: products.length > 0, 
      productCss: true,
      activeShop: true
      })
  }