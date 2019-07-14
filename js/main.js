if('serviceWorker' in navigator){
window.addEventListener('load',() => {
    navigator.serviceWorker
    .register('../sw_cached_res.js')
    .then(reg => console.log('service Worker : Registerd'))
    .catch(err => console.log(`service Worker error ${err}`))
})
}