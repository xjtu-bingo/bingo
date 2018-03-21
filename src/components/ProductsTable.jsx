import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

const ProductsBody = ({products, onProductClick}) => (
    <TableBody>
        {
            products.map(product => (
                <TableRow key={product.id} hover={true} onClick={() => onProductClick && onProductClick(product)}>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell numeric>{product.price}</TableCell>
                </TableRow>
            ))
        }
    </TableBody>
);

const ProductsTable = ({products, onProductClick}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>类别</TableCell>
                <TableCell>品名</TableCell>
                <TableCell numeric>价格</TableCell>
            </TableRow>
        </TableHead>
        <ProductsBody products={products} onProductClick={onProductClick}/>
    </Table>
);

export default ProductsTable;