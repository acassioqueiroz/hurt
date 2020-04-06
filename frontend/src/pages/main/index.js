import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ... productInfo } = response.data;

        console.log(response.data);

        this.setState({
            products: docs,
            productInfo
        })
    }

    prevPage = () => {
        const { productInfo } = this.state;
        const page = parseInt(productInfo.page);
        if (page == 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);

    }

    nextPage = () => {
        const { productInfo } = this.state;
        const page = parseInt(productInfo.page);
        if (page === productInfo.pages) return;
        const pageNumber = page+1;
        console.log(pageNumber);
        this.loadProducts(pageNumber);
    }

    render() {
        const { products, productInfo } = this.state;
        return (
            <div className='product-list'>
                {products.map(product => (
                    <article key={product.id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={ productInfo.page == 1 } onClick={this.prevPage}>Anterior</button>
                    <button disabled={ productInfo.page == productInfo.pages }  onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}