const fs = require('fs');
const path = require('path');

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
    }

    static fetchAllProducts() {
        return products;
    }
}