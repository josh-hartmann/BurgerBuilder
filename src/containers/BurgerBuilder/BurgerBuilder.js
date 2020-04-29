import React, {Component} from 'react';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export default class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-945ad.firebaseio.com/Ingredients.json').then(response => {
            this.setState({ingredients: response.data});
        });
    }
    
    updatePurchaseSate (ingredients) {
       
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseSate(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 1) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseSate(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    
    purchaseCanceledHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinuedHandler = () => {
        this.setState({loading:true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Josh Hartmann',
        //         address: {
        //             street: 'Line 2 North',
        //             country: 'Canada',
        //             zipCode: 'L0L1X0'
        //         },
        //         email: 'josh@test.com'
        //     },
        //     deliveryMethod: 'ground'
        // }
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({loading:false, purchasing:false})
        // }).catch(error => {
        //     this.setState({loading:false, purchasing: false})
        // });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        let orderSummary = null;
        

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let burger = <Spinner/>

        if (this.state.ingredients) {
            burger = <div> <Burger ingredients={this.state.ingredients} />
            <div>
                <Controls
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                     disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    order={this.purchaseHandler} />
            </div>
        </div>
        orderSummary = <OrderSummary ingredients = {this.state.ingredients}
        cancelOrder={this.purchaseCanceledHandler}
        continueWithOrder = {this.purchaseContinuedHandler}
        price={this.state.totalPrice}></OrderSummary>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}
                </Modal>
                { burger }
            </Aux>
            
        );

    }
}