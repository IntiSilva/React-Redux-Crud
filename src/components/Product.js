import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


// Redux
import { useDispatch } from 'react-redux';
import { deleteProductAction, getProductEdit } from '../actions/productActions';

const Product = ({product}) => {
    const { name, price, id } = product;

    const dispatch = useDispatch();
    const history = useHistory(); // enable history to redirect

    //Confirm if they want to delete it
    const confirmDeleteProduct = id => {

        // Question user
        Swal.fire({
            title: 'Are you sure?',
            text: "Once a product it's deleted, it cannot be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                // give it to action
                dispatch( deleteProductAction(id) );
            }
        });
    }

    // function that redirects in a programmed way
    const redirectEdition = product => {
        dispatch( getProductEdit(product) );
        history.push(`/products/edit/${product.id}`)
    }

    return (
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold"> $ {price} </span></td>
            <td className="actions">
                <button
                    type="button"
                    onClick={ () => redirectEdition(product) }
                    className="btn btn-primary mr-2">
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >Delete</button>
            </td>
        </tr>
     );
}

export default Product;