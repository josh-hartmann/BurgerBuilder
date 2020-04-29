import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }
    
    render () {
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type = "text" name="name" placeHolder="Your name"/>
                    <input type = "email" name="email" placeHolder="Your email"/>
                    <input type = "text" name="street" placeHolder="Street"/>
                    <input type = "text" name="postal" placeHolder="Postal Code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;