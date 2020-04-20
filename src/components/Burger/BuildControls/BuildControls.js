import React from 'react';
import styles from "./BuildControls.module.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
    
];


const BuildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)} </strong></p>
            {controls.map((item) => {
                return(<BuildControl 
                    added={() => props.ingredientAdded(item.type)}
                    removed={() => props.ingredientRemoved(item.type)} 
                    key={item.label} 
                    label={item.type}
                    disabled={props.disabled[item.type]}/>);
            })}
            <button className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.order}>Order Now</button>
        </div>
    );
}

export default BuildControls;