import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Products from './components/Products';
import Footer from './components/Footer';
import './scss/style.scss';

class App extends Component{
	constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			cartBounce: false
		};
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
	}

	getProducts(){
		this.setState({
			products : require('./products_list')
		});
	}
	componentWillMount(){
		this.getProducts();
	}

	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if(this.checkProduct(productID)){
			let index = cartItem.findIndex((x => x.id == productID));
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		setTimeout(function(){
			this.setState({
				cartBounce:false
			});
		}.bind(this),1000);
	}

	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		e.preventDefault();
	}

	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		});
	}

	render(){
		return(
			<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
				/>
				<Products
					productsList={this.state.products}
					addToCart={this.handleAddToCart}
				/>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
		document.getElementById('root')
);
