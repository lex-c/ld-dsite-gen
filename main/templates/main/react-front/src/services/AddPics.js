import $ from 'jquery';
import axios from 'axios';
import cookie from 'react-cookies';

const BASE_URL = '/main/api'

export function addPicsDBandFB(picsData) {
    return axios.post(`${BASE_URL}/add-pics/`, picsData)
    .then(res => console.log(res.data))
}

export function removePicDBandFB(picName) {
    return axios.post(`${BASE_URL}/remove-pic/`, {'picName': picName})
    .then(res => res.data)
}