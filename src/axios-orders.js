import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-945ad.firebaseio.com/'
});

export default instance;