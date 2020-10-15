import axios from 'axios';
//Defines apis to be accessed by client application
export default axios.create({
    baseURL: `127.0.0.1:3000`
});