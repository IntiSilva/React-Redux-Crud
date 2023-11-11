import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    BEGIN_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    GET_PRODUCT_DELETE,
    DELETED_PRODUCT_SUCCESS,
    DELETED_PRODUCT_ERROR,
    GET_PRODUCT_EDIT,
    BEGIN_PRODUCT_EDITION,
    EDITED_PRODUCT_SUCCESS,
    EDITED_PRODUCT_ERROR
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

// Create new products
export function createNewProductAction(product) {
    return async (dispatch) => {
        dispatch( addProduct() );

        try {
            // put in API
            await axiosClient.post('/products', product);

            // if everything goes well, update state
           dispatch( addProductSuccess(product) );

            // Alert
            Swal.fire(
                'Success',
                'The product has been added successfully',
                'success'
            );

        } catch (error) {
            console.log(error);
            // if there is an error, change state
            dispatch( addProductError(true) );

            // error alert
            Swal.fire({
                icon: 'error',
                title: 'There was an error',
                text: 'There was an error, try again'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

// if product is stored in DB
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

// if there was an error
const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
});


// download products from DB function
export function getProductsAction() {
    return async (dispatch) => {
        dispatch( downloadProducts() );

        try {
            const res = await axiosClient.get('/products');
            dispatch( downloadProductsSuccess(res.data) )
        } catch (error) {
            console.log(error);
            dispatch( downloadProductsError() )
        }
    }
}

const downloadProducts = () => ({
    type: BEGIN_PRODUCTS_DOWNLOAD,
    payload: true
});

const downloadProductsSuccess = products => ({
    type: PRODUCTS_DOWNLOAD_SUCCESS,
    payload: products
})
const downloadProductsError = () => ({
    type: PRODUCTS_DOWNLOAD_ERROR,
    payload: true
});

// select and delete product
export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch(getProductDelete(id) );

        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch( deleteProductSuccess() );

            // If deleted, show alert
            Swal.fire(
                'Deleted',
                'The product has been deleted successfully',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( deleteProductError() );
        }
    }
}

const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
});
const deleteProductSuccess = () => ({
    type: DELETED_PRODUCT_SUCCESS
})
const deleteProductError = () => ({
    type: DELETED_PRODUCT_ERROR,
    payload: true
});

// put product in edition
export function getProductEdit(product) {
    return (dispatch) => {
        dispatch( getProductEditAction(product) )
    }
}

const getProductEditAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
})

// Edit a register in the api and state
export function editProductAction(product) {
    return async (dispatch) => {
        dispatch( editProduct() );

        try {
            console.log('Product before put:', product);
            await axiosClient.put(`/products/${product.id}`, product);    
            dispatch( editProductSuccess(product) );
        } catch (error) {
            console.log(error);
            dispatch( editProductError() );
        }
    }
}
const editProduct = () => ({
    type: BEGIN_PRODUCT_EDITION
});

const editProductSuccess = product => ({
    type: EDITED_PRODUCT_SUCCESS,
    payload: product
});

const editProductError = () => ({
    type: EDITED_PRODUCT_ERROR,
    payload: true
})