import React, {Component} from 'react';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export default class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
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
        alert("You continued");
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                    cancelOrder={this.purchaseCanceledHandler}
                    continueWithOrder = {this.purchaseContinuedHandler}
                    price={this.state.totalPrice}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    <Controls 
                    ingredientRemoved= {this.removeIngredientHandler} 
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    order={this.purchaseHandler}/>
                </div>
            </Aux>
            
        );

    }
}