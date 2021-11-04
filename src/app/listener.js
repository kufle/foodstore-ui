import store from './store';

let currentAuth;

function listener(){
    //buat variable previous auth dan berikan currentAuth sebagai nilai
    let previousAuth = currentAuth;
    //update nilai currentAuth dari nilai state terbaru
    currentAuth = store.getState().auth;
    //cek apakah nilai state auth berubah dari nilai sebelumnya
    if(currentAuth !== previousAuth){
        //jika berubah simpan ke local storage
        localStorage.setItem('auth',JSON.stringify(currentAuth));
    }
}

function listen(){
    store.subscribe(listener);
}

export { listen };