import * as React from "react";
import {withStyles} from "material-ui/styles/index";
import ProductsTable from "../components/ProductsTable";
import {connect} from "react-redux";
import MenuCategoryChipArray from "../components/MenuCategoryChipArray";
import {MenuCategory} from "../redux/switches";


const styles = theme => ({});


const Menu = ({classes, products, onProductClick, categories, dispatch}) => (
    <div>
        <MenuCategoryChipArray data={categories} onClick={category => dispatch(MenuCategory.setter(category))}/>
        <ProductsTable products={products}
                       onProductClick={product => onProductClick && onProductClick(product)}/>
    </div>
);

const selector = state => ({
    products: Object.values(state.repo.products).filter(pro => state.switches.menuCategory === '' || pro.type === state.switches.menuCategory),
    categories: Array.from(new Set(Object.values(state.repo.products).map(pro => pro.type))),
});

export default connect(selector)(withStyles(styles)(Menu));