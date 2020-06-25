const Axios = require('axios');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export const config = {
  //   serverHost: 'https://backend.carnivalist.tk/api',
  serverHost: 'http://91d90ac373dc.sn.mynetname.net:2020/api/',

  //serverHost: 'http://localhost:9000/api',
};

export function getRequest(url) {
  const tokenString = localStorage.token;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

  return Axios({
    method: 'GET',
    url: config.serverHost + url,
    headers,
  }).then(response => response.data);
}

export function postRequest(url, data) {
  const tokenString = localStorage.token;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    CrossDomain: true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': 86400,
  };
  tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;
  return Axios({
    method: 'POST',
    url: config.serverHost + url,
    headers,
    data: JSON.stringify(data),
  }).then(response => response.data);
}

export function postRequestMultipart(url, file) {
  const tokenString = localStorage.token;

  const formData = new FormData();
  formData.append('file', file);

  const headers = {
    Authorization: tokenString ? `Bearer ${tokenString}` : undefined,
    processData: false,
    contentType: 'multipart/form-data',
    cache: false,
    CrossDomain: true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': 86400,
  };

  tokenString ? (headers.Authorization = `Bearer ${tokenString}`) : null;

  return Axios({
    method: 'POST',
    url: config.serverHost + url,
    headers,
    data: formData,
  }).then(response => response.data);
}
