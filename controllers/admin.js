const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', 
    {pageTitle: 'Add-Product', 
    path: '/admin/add-product', 
    productCss:true, 
    formsCss: true, 
    activeProduct: true})

    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  }

  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
  }

  exports.getAdminProducts = (req, res, next) => {
    Product.fetchAllProducts((products) => {
        res.render('admin/products', {
          prods : products, 
          pageTitle : 'Admin Products', 
          path: '/admin/products', 
          // hasProducts: products.length > 0, 
          // productCss: true,
          // activeShop: true
          });
      })
  }