const axios = require('axios');


// response.data
// response.status
// response.statusText
// response.headers
// response.config

// error.response.data
// error.response.status
// error.response.statusText
// error.response.headers
// error.response.config


module.exports.get = async (url, params) => {
  try {
    return await axios.get(url, {params: params});
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      config: error.response.config,
    };
  }
};

module.exports.put = async (url, params, body) => {
  try {
    return await axios.put(url, body, {params: params});
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      config: error.response.config,
    };
  }
};

module.exports.post = async (url, params, body) => {
  try {
    return await axios.post(url, body, {params: params});
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      config: error.response.config,
    };
  }
};

module.exports.delete = async (url, params, body) => {
  try {
    return await axios.delete(url, body, {params: params});
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      config: error.response.config,
    };
  }
};

