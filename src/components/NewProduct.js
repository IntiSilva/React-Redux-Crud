import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Actions
import { createNewProductAction } from '../actions/productActions';
import { showAlert, hideAlertAction } from '../actions/alertActions';

const NewProduct = ({history}) => {

    // component state
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    // utilize use dispatch to create a function
    const dispatch = useDispatch();

    // Access store's state
    const loading = useSelector( state => state.products.loading );
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state => state.alert.alert);


    // call productAction's action
    const addProduct = product => dispatch( createNewProductAction(product) );

    // when user submits
    const submitNewProduct = e => {
        e.preventDefault();

        // validate form
        if(name.trim() === '' || price <= 0) {

            const alert = {
                msg: 'Both fields are required',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( showAlert(alert) );

            return;
        }

        // if there are no errors
        dispatch( hideAlertAction() );

        // create new product
        addProduct({
            name,
            price
        });

        // redirect
        history.push('/');
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>

                        {alert ? <p className={alert.classes}> {alert.msg} </p> : null }

                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className="form-group">
                                <label>Product's Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={e => saveName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product's Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={price}
                                    onChange={e =>  savePrice( Number(e.target.value) )}
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Add</button>
                        </form>

                        { loading ? <p>Loading...</p> : null }

                        { error ? <p className="alert alert-danger p2 mt-4 text-center">There was an error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}

export default NewProduct;