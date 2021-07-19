import axios from 'axios';

const startup = 'http://localhost:5000/startup';
const search = 'http://localhost:5000/search';

export const indiaInitialize = () => axios.get(`${startup}/initialize-india`);
export const worldInitialize = () => axios.get(`${startup}/initialize-world`);

export const indiaSubmit = () => axios.get(`${search}/submit-india`);
export const worldSubmit = () => axios.get(`${search}/submit-world`);
