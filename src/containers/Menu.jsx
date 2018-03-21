import * as React from "react";
import {withStyles} from "material-ui/styles/index";
import ProductsTable from "../components/ProductsTable";


const styles = theme => ({});

const getCategories = (products) => {
    let t = new Set();
    for (let id in products) {
        t.add(products[id].type);
    }
    return Array.from(t);
};

const getProducts = (products) => {
    let res = [];
    for (let id in products) {
        res.push(products[id]);
    }
    return res;
};


const Menu = ({classes, products, onProductClick}) => (
    <div>
        {/*<MenuCategoryChipArray data={this.cats} onClick={i => this.setState({category: i})}/>*/}
        <ProductsTable products={getProducts(products)}
                       onProductClick={product => onProductClick && onProductClick(product)}/>
    </div>
);

export default withStyles(styles)(Menu);