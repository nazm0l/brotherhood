import axios from 'axios';

export default axios.create({
  baseURL: 'https://spread-auth-api-staging.azurewebsites.net/api',
});
