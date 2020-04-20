import React from 'react';
import styles from "./BuildControls.module.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
    
];


const BuildControls = () => {
    return (
        <div className={styles.BuildControls}>
            {controls.map((item) => {
                return(<BuildControl key={item.label} label={item.type}/>);
            })}
        </div>
    );
}

export default BuildControls;