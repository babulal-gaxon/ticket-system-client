import axios from 'axios';

export default axios.create({
  baseURL: `http://gaxonlab.com/ticket-system/public/api`,
  headers: {
    'Content-Type': 'application/json',

  }
});
