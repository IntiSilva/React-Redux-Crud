import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productActions';
import { useHistory } from 'react-router-dom';

const EditProduct = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // Product new state
    const [ product, saveProduct] = useState({
        name: '',
        price: ''
    })

    // Product to edit
    const editproduct = useSelector(state => state.products.editproduct);

    // Auto fill state
    useEffect(() => {
            saveProduct(editproduct);
    }, [editproduct]);
    

    // Read form data
    const onChangeForm = e => {
        console.log(e.target.name, e.target.value);
        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }
    


    const { name, price} = product;

    const submitEditProduct = e => {
        e.preventDefault();


        dispatch( editProductAction(product) );

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>

                        <form
                            onSubmit={submitEditProduct}
                        >
                            <div className="form-group">
                                <label>Product&apos;s Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product&apos;s Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    name="price"
                                    value={price}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default EditProduct;