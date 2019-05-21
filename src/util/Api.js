import axios from 'axios';

export default axios.create({
  baseURL: `http://gaxonlab.com/dev/ticket-system/public/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});
