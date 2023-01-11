window.addEventListener('load', ()=>{
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('service Worker зарегестрирован', registration)
            })
            .catch(error => {
                console.log('ошибка регистрации service Worker', error)
            })
    }
})
