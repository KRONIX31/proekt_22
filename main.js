const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
todayYear = new Date().getFullYear()
todayMonth = new Date().getMonth()
todayDay = new Date().getDate()
let localObject = {}
const timetable = [
[new Date(todayYear, todayMonth, todayDay, 8, 30), new Date(todayYear, todayMonth, todayDay, 9, 10)],
[new Date(todayYear, todayMonth, todayDay, 9, 15), new Date(todayYear, todayMonth, todayDay, 9, 55)],
[new Date(todayYear, todayMonth, todayDay, 10, 0), new Date(todayYear, todayMonth, todayDay, 10, 40)],
[new Date(todayYear, todayMonth, todayDay, 10, 45), new Date(todayYear, todayMonth, todayDay, 11, 25)],
[new Date(todayYear, todayMonth, todayDay, 11, 30), new Date(todayYear, todayMonth, todayDay, 12, 10)],
[new Date(todayYear, todayMonth, todayDay, 12, 15), new Date(todayYear, todayMonth, todayDay, 12, 55)],
[new Date(todayYear, todayMonth, todayDay, 13, 0), new Date(todayYear, todayMonth, todayDay, 13, 40)],
[new Date(todayYear, todayMonth, todayDay, 13, 45), new Date(todayYear, todayMonth, todayDay, 14, 25)],
[new Date(todayYear, todayMonth, todayDay, 14, 30), new Date(todayYear, todayMonth, todayDay, 15, 10)],
[new Date(todayYear, todayMonth, todayDay, 15, 15), new Date(todayYear, todayMonth, todayDay, 15, 55)],
[new Date(todayYear, todayMonth, todayDay, 16, 0), new Date(todayYear, todayMonth, todayDay, 16, 40)]
]
console.log(todayYear, todayMonth, todayDay)

let response, data, propysk
const day = new Date().getDay() - 1
// Var DIALOG
/*const dialogText = document.querySelector('.dialog_text')
const dialogText_p = document.querySelector('.dialog_text div:first-child')
const dialogIconWrapper = document.querySelector('.icon_wrapper')
const dialogFirstBlock = document.querySelector('.dialog_first_block')
const dialogUl = document.querySelector('.dialog_ul')
const dialogUlLists = document.querySelectorAll('li')
const dialogButton = document.querySelector('.dialog_second_block button')*/
// Var HEADER
const headerNumClass = document.querySelector('.header_num_class')
const headerNumClass_p = document.querySelector('.header_num_class p')
const burgerMobile = document.querySelector('.burger_mobile')
const burgerMobileClose_img = document.querySelector('.burger_mobile_header img')
const burgerDesktop = document.querySelector('.burger_desktop')
const burgerUl = document.querySelectorAll('.burger_ul')
// Var App
const slide_1_cont = document.querySelector('.slide_1_container')
const loadScreen = document.querySelector('.load_screen')

if(localStorage.getItem('localObject')){
    localObject = JSON.parse(localStorage.getItem('localObject'))
} else{
    localObject.class = '15'
    localObject.classText = '11 класс'
    localStorage.setItem('localObject', JSON.stringify(localObject))
}
document.addEventListener('DOMContentLoaded', DOMLoaded)
function DOMLoaded(){
    spanAddListener()
    getdata()
}
function spanAddListener(){
    burgerUl.forEach(ul => {
        ul.querySelectorAll('span').forEach(span => {
            span.addEventListener('click', chooseClass)
        })
        ul.querySelector(`li:nth-child(${localObject.class})`).classList.add('burger_active')
        headerNumClass_p.innerHTML = `${localObject.classText}`
    })
}
function chooseClass(e){
    slide_1_cont.innerHTML = `<div class="load_screen"><div></div></div>`
    const span = e.target
    if(!span.parentElement.classList.contains('burger_active')){
        let spanText = span.innerText
        let spanNum = span.dataset.class
        console.log(spanNum, spanText)

        headerNumClass_p.innerHTML = `${spanText}`
        burgerUl.forEach(ul => {
            const activeLi = ul.querySelector('.burger_active')
            activeLi.classList.remove('burger_active')
            ul.querySelector(`li:nth-child(${spanNum})`).classList.add('burger_active')
        })
        localObject.class = `${spanNum}`
        localObject.classText = `${spanText}`
        localStorage.setItem('localObject', JSON.stringify(localObject))
        getdata()
        propysk = true
        setTimeout(()=>{
            burgerDesktop.style.cssText = `transform: translateX(0px);
            opacity: 0;`
            burgerMobile.classList.remove('burger_mobile_open')
            setTimeout(()=>{
                burgerMobile.style.display = 'none'
            }, 240)
        }, 60)
    }
}

//DIALOG
/*if(!localStorage.firstOn){
    const firstOn = document.querySelector('.first_on')
    firstOn.style.display = 'flex'
    firstOn.classList.add('welcome_visible')
}*/
document.fonts.onloadingdone = (e) => {
    console.log('font-face load event')
    loadScreen.style.opacity = '0'
    setTimeout(()=>{
        loadScreen.style.display = 'none'
    }, 300)
}

async function getdata(){
    const response = await fetch(`https://kronix31.github.io/proekt_22/data/data_${localObject.class}.json`)
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new (message);
    }
    data = await response.json().catch((message)=>{
        slide_1_cont.innerHTML = `<p class="error_message">${message}</p>`
        console.warn(message)
        return false
    })
    console.log(data)
    if(!data){return}

    window.onresize = render
    render()
    function render(){
        if(window.innerWidth > 640){ // Desktop Table
            const componentDesktop = `<table>
        <thead>
            <tr>
                <th>№</th>
                <th>Понедельник</th>
                <th>Вторник</th>
                <th>Среда</th>
                <th>Четверг</th>
                <th>Пятница</th>
            </tr>
        </thead>
        <tbody>
            <tr> <!-- 1 -->
                <th>1</th>
                <td class="current_lesson">${data[0][1]}<div></div></td>
                <td>${data[1][1]}<div></div></td>
                <td>${data[2][1]}<div></div></td>
                <td>${data[3][1]}<div></div></td>
                <td>${data[4][1]}<div></div></td>
            </tr>
            <tr> <!-- 2 -->
                <th>2</th>
                <td>${data[0][2]}<div></div></td>
                <td>${data[1][2]}<div></div></td>
                <td>${data[2][2]}<div></div></td>
                <td>${data[3][2]}<div></div></td>
                <td>${data[4][2]}<div></div></td>
            </tr>
            <tr> <!-- 3 -->
                <th>3</th>
                <td>${data[0][3]}<div></div></td>
                <td>${data[1][3]}<div></div></td>
                <td>${data[2][3]}<div></div></td>
                <td>${data[3][3]}<div></div></td>
                <td>${data[4][3]}<div></div></td>
            </tr>
            <tr> <!-- 4 -->
                <th>4</th>
                <td>${data[0][4]}<div></div></td>
                <td>${data[1][4]}<div></div></td>
                <td>${data[2][4]}<div></div></dh>
                <td>${data[3][4]}<div></div></td>
                <td>${data[4][4]}<div></div></td>
            </tr>
            <tr> <!-- 5 -->
                <th>5</th>
                <td>${data[0][5]}<div></div></td>
                <td>${data[1][5]}<div></div></td>
                <td>${data[2][5]}<div></div></td>
                <td>${data[3][5]}<div></div></td>
                <td>${data[4][5]}<div></div></td>
            </tr>
            <tr> <!-- 6 -->
                <th>6</th>
                <td>${data[0][6]}<div></div></td>
                <td>${data[1][6]}<div></div></td>
                <td>${data[2][6]}<div></div></td>
                <td>${data[3][6]}<div></div></td>
                <td>${data[4][6]}<div></div></td>
            </tr>
            <tr> <!-- 7 -->
                <th>7</th>
                <td>${data[0][7]}<div></div></td>
                <td>${data[1][7]}<div></div></td>
                <td>${data[2][7]}<div></div></td>
                <td>${data[3][7]}<div></div></td>
                <td>${data[4][7]}<div></div></td>
            </tr>
            <tr> <!-- 8 -->
                <th>8</th>
                <td>${data[0][8]}<div></div></td>
                <td>${data[1][8]}<div></div></td>
                <td>${data[2][8]}<div></div></td>
                <td>${data[3][8]}<div></div></td>
                <td>${data[4][8]}<div></div></td>
            </tr>
            <tr> <!-- 9 -->
                <th>9</th>
                <td>${data[0][9]}<div></div></td>
                <td>${data[1][9]}<div></div></td>
                <td>${data[2][9]}<div></div></td>
                <td>${data[3][9]}<div></div></td>
                <td>${data[4][9]}<div></div></td>
            </tr>
            <tr> <!-- 10 -->
                <th>10</th>
                <td>${data[0][10]}<div></div></td>
                <td>${data[1][10]}<div></div></td>
                <td>${data[2][10]}<div></div></td>
                <td>${data[3][10]}<div></div></td>
                <td>${data[4][10]}<div></div></td>
            </tr>
            <tr> <!-- 11 -->
            <th>11</th>
            <td>${data[0][11]}<div></div></td>
            <td>${data[1][11]}<div></div></td>
            <td>${data[2][11]}<div></div></td>
            <td>${data[3][11]}<div></div></td>
            <td>${data[4][11]}<div></div></td>
        </tr>
        </tbody>
            </table>`
            slide_1_cont.innerHTML = componentDesktop
            const currentCell = slide_1_cont.querySelectorAll('tbody tr td')
            if(day < 5 && day > -1){
                for(i = 0; i < currentCell.length; i+=5){
                    currentCell[i + day].classList.add('current_day')
                }
            }
        } else{ // Mobile Table

            if(!slide_1_cont.querySelector('nav') || propysk){
                propysk = false
                const componentMobile = `
                <nav class="table_nav">
                    <span${day == 0? ' class="active_day"': ''}>Понедельник</span>
                    <span${day == 1? ' class="active_day"': ''}>Вторник</span>
                    <span${day == 2? ' class="active_day"': ''}>Среда</span>
                    <span${day == 3? ' class="active_day"': ''}>Четверг</span>
                    <span${day == 4? ' class="active_day"': ''}>Пятница</span>
                </nav>
                <div class="table_slider_wrapper">
                    <div class="table_slider">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th class="table_day">Понедельник</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td class="current_lesson"><div></div>${data[0][1]}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><div></div>${data[0][2]}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><div></div>${data[0][3]}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><div></div>${data[0][4]}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><div></div>${data[0][5]}</td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><div></div>${data[0][6]}</td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><div></div>${data[0][7]}</td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><div></div>${data[0][8]}</td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><div></div>${data[0][9]}</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><div></div>${data[0][10]}</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><div></div>${data[0][11]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th class="table_day">Вторник</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td><div></div>${data[1][1]}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><div></div>${data[1][2]}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><div></div>${data[1][3]}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><div></div>${data[1][4]}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><div></div>${data[1][5]}</td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><div></div>${data[1][6]}</td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><div></div>${data[1][7]}</td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><div></div>${data[1][8]}</td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><div></div>${data[1][9]}</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><div></div>${data[1][10]}</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><div></div>${data[0][11]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th class="table_day">Среда</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td><div></div>${data[2][1]}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><div></div>${data[2][2]}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><div></div>${data[2][3]}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><div></div>${data[2][4]}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><div></div>${data[2][5]}</td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><div></div>${data[2][6]}</td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><div></div>${data[2][7]}</td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><div></div>${data[2][8]}</td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><div></div>${data[2][9]}</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><div></div>${data[2][10]}</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><div></div>${data[0][11]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th class="table_day">Четверг</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td><div></div>${data[3][1]}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><div></div>${data[3][2]}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><div></div>${data[3][3]}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><div></div>${data[3][4]}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><div></div>${data[3][5]}</td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><div></div>${data[3][6]}</td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><div></div>${data[3][7]}</td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><div></div>${data[3][8]}</td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><div></div>${data[3][9]}</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><div></div>${data[3][10]}</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><div></div>${data[0][11]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th class="table_day">Пятница</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td><div></div>${data[4][1]}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><div></div>${data[4][2]}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><div></div>${data[4][3]}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><div></div>${data[4][4]}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><div></div>${data[4][5]}</td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><div></div>${data[4][6]}</td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><div></div>${data[4][7]}</td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><div></div>${data[4][8]}</td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><div></div>${data[4][9]}</td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><div></div>${data[4][10]}</td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><div></div>${data[0][11]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>`
                slide_1_cont.innerHTML = componentMobile
                const currentColumn = slide_1_cont.querySelectorAll(`table:nth-child(${day+1}) tbody tr td`)
                const tableSlider = slide_1_cont.querySelector('.table_slider')
                if(day < 5 && day > -1){
                    for(i = 0; i < currentColumn.length; i++){
                        currentColumn[i].classList.add('current_day')
                    }
                    tableSlider.style.cssText = `transform: translateX(calc(-20% * ${day}));`
                } else{
                    slide_1_cont.querySelector('nav span').classList.add('active_day')
                }
                    
                const tableNav = slide_1_cont.querySelectorAll('nav span')
                for(let i = 0; i < tableNav.length; i++){
                    tableNav[i].addEventListener('click', ()=>{
                        if(!tableNav[i].classList.contains('active_day')){
                            if(slide_1_cont.querySelector('nav .active_day')){
                                const activeDay = slide_1_cont.querySelector('nav .active_day')
                                activeDay.classList.remove('active_day')
                                tableNav[i].classList.add('active_day')
                                //
                                tableSlider.style.cssText = `transform: translateX(calc(-20% * ${i}))`
                            } else{
                                tableNav[i].classList.add('active_day')
                                //
                                tableSlider.style.cssText = `transform: translateX(calc(-20% * ${i}))`
                            }
                        }
                    })
                }
            }

        }
    }
}

/*function toggleDialog(){
    dialogText_p.classList.toggle('dialog_active')
    dialogFirstBlock.classList.toggle('dialog_active')
    dialogIconWrapper.querySelector('img').classList.toggle('icon_img_active')

    dialogUl.classList.toggle('dialog_ul_active')

}

dialogText.addEventListener('click', ()=>{
    toggleDialog()
})
dialogUlLists.forEach(element => {
    element.addEventListener('click', (e)=>{
        toggleDialog()
        dialogText_p.innerText = e.target.innerText
    })
})
dialogButton.addEventListener('click', ()=>{
    let clas = dialogText_p.innerText
    if(clas == 'Выберите класс'){
        alert('выберите класс!')
    } else{
        localStorage.firstOn = 'false'
        dialogFirstBlock.parentElement.parentElement.classList.remove('welcome_visible')
        setTimeout(()=>{
            dialogFirstBlock.parentElement.parentElement.style.display = 'none'
        }, 300)
    }
})*/


// HEADER
    // Закрытие бок меню при клике вне (desktop)
window.addEventListener('click', (e)=>{ 
    if(!((e.target == headerNumClass) || (e.target == headerNumClass_p))){
        if(burgerDesktop.style.opacity == '1'){
            if(!e.target.closest('.burger_desktop')){
                burgerDesktop.style.cssText = `transform: translateX(0);
                opacity: 0`
            }
        }
    }
})

headerNumClass.addEventListener('click', openBurger)
function openBurger(){
    if(window.innerWidth > 640){  //Desktop
        burgerDesktop.style.cssText = `transform: translateX(100%);
        opacity: 1;`
        burgerMobile.classList.remove('burger_mobile_open')
    } else{  //Mobile
        burgerMobile.style.display = 'block'
        setTimeout(()=>{
            burgerMobile.classList.add('burger_mobile_open')
        }, 10)
        burgerDesktop.style.cssText = `transform: translateX(0%);
        opacity: 0`
    }
}

burgerMobileClose_img.addEventListener('click', ()=>{
    burgerMobile.classList.remove('burger_mobile_open')
    setTimeout(()=>{
        burgerMobile.style.display = 'none'
    }, 240)
})