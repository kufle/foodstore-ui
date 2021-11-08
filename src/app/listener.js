import { saveCart } from '../api/cart';
import store from './store';

let currentAuth;
let currentCart;

function listener(){
    //AUTH
    //buat variable previous auth dan berikan currentAuth sebagai nilai
    let previousAuth = currentAuth;
    let previousCart = currentCart;
    //update nilai currentAuth dari nilai state terbaru
    currentAuth = store.getState().auth;
    currentCart = store.getState().cart;

    let{ token } = currentAuth;
    //cek apakah nilai state auth berubah dari nilai sebelumnya
    if(currentAuth !== previousAuth){
        //jika berubah simpan ke local storage
        localStorage.setItem('auth',JSON.stringify(currentAuth));
        saveCart(token, currentCart);
    }

    if(currentCart !== previousCart){
        localStorage.setItem('cart', JSON.stringify(currentCart));
        saveCart(token, currentCart);
    }
    
}

function listen(){
    store.subscribe(listener);
}

export { listen };