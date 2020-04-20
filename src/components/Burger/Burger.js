import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    // array of strings eg salad, meat, cheese
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key= {igKey + i} type = {igKey}/>
        }); // [,]
    }).reduce((arr, el) => {
        return (arr.concat(el));
    }, []);
    console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding Ingredients</p>;
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;