import $ from 'jquery';
import axios from 'axios';
import cookie from 'react-cookies';

const BASE_URL = '/main/api'

export function addPicsDBandFB(picsData) {
    axios.post(`${BASE_URL}/add-pics/`, picsData)
    .then(res => console.log(res.data))
}

// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = $.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
//                 break
//             }
//         }
//     }
//     return cookieValue;
// }