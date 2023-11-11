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
    EDITED_PRODUCT_SUCCESS,
    EDITED_PRODUCT_ERROR,
} from '../types';

// cada reducer tiene su propio state
const initialState = {
    products: [],
    error: null,
    loading: false, 
    deleteproduct: null,
    editproduct: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case BEGIN_PRODUCTS_DOWNLOAD:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
        case PRODUCTS_DOWNLOAD_ERROR:
        case DELETED_PRODUCT_ERROR:
        case EDITED_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCTS_DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            }
        case GET_PRODUCT_DELETE:
            return {
                ...state,
                deleteproduct: action.payload
            }
        case DELETED_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.deleteproduct ),
                deleteproduct: null
            }
        case  GET_PRODUCT_EDIT:
            return {
                ...state,
                editproduct: action.payload
            }
        case EDITED_PRODUCT_SUCCESS:
            return {
                ...state,
                editproduct: null,
                products: state.products.map( product =>
                    product.id === action.payload.id ? product = action.payload : product
                )
            }
        default:
            return state;
    }
}