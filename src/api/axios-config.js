import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 15000
});

api.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF8';
api.defaults.headers.post['Accept'] = 'application/json';
api.defaults.headers.post['Accept-Encoding'] = 'identity';

// Добавляем перехват ответов
api.interceptors.response.use(function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    console.log('Interceptor, response: ', response);
    response.message = `CODE: ${response.data.result?.code}, MSG: ${response.data.result?.msg}`;
    return (response.data.result.code !== 'OK') ? Promise.reject(response) : response
    /* можно бросить исключение
    if (response.data.result.code !== 'OK') throw new Error(response.data.result.code)
    else return response */
    // можно просто вернуть // return response
}, function (error) {
    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    console.log('Interceptor, reject: ', error)
    // Возврат по-умолчанию
    return Promise.reject(error);
});

//-----------------------------------------------

const apiGeneric = axios.create({
    baseURL: 'http://fakeapi.jsonparseronline.com/',
    timeout: 15000
});

export { api, apiGeneric }
