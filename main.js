const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const NOW = new Date()
let todayYear = NOW.getFullYear()
let todayMonth = NOW.getMonth()
let todayDay = NOW.getDate()
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
console.log(`%c ${todayYear} год, ${todayMonth} месяц, ${todayDay} число`,
'background: #ddd; color: #111; font-size: 14px; padding: 1px')

let response, data, propysk, interval
const day = NOW.getDay() - 1

// Var HEADER
const headerNumClass = document.querySelector('.header_num_class')
const headerNumClass_p = document.querySelector('.header_num_class p')
const headerInformation = document.querySelector('.current_information')
const headerFullDate = document.querySelector('.full_date')
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
    interval = setInterval(timeUpdate, 1000)
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


function hideLoadingScreen(){
    console.log('font-face load event or DomContentLoaded')
    loadScreen.style.opacity = '0'
    setTimeout(()=>{
        loadScreen.style.display = 'none'
    }, 300)
}
if(((/iPad|iPhone|iPod|Mac/.test(navigator.userAgent)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
&& !window.MSStream){
    //IOS
    document.addEventListener('DOMContentLoaded', ()=>{
        hideLoadingScreen()
        console.log('ios')
    })
} else{
    //Все остальное
    document.fonts.onloadingdone = () => {
        hideLoadingScreen()
        console.log('not ios')
    }
}

function sklonenie(num, MinsOrSeconds) {
    if(MinsOrSeconds === 'min'){
        if(num % 10 == 1){
            if(num === 11){
                return `${num} минут`
            } else{
                return `${num} минута`
            }
        } else{
            if(num % 10 == 2 || num % 10 == 3 || num % 10 == 4){
                return `${num} минуты`
            } else{
                return `${num} минут`
            }
        }
    }
    if(MinsOrSeconds === 'sec'){
        if(num % 10 == 1){
            if(num === 11){
                return `${num} секунд`
            } else{
                return `${num} секунда`
            }
        } else{
            if((num % 10 == 2 || num % 10 == 3 || num % 10 == 4) && (num !== 12) && (num !== 13) && (num !== 14)){
                return `${num} секунды`
            } else{
                return `${num} секунд`
            }
        }
    }
}

function timeUpdate(){
    
    const date = new Date()
    headerFullDate.innerText = date.toLocaleString('ru-RU',{
        year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    })

    //проверка на учебное время и день
    if(date > timetable[10][1] || date < timetable[0][0] || date.getDay() == 0 || date.getDay() == 6){
        const current_lesson_for_check = slide_1_cont.querySelector('.current_lesson')
        const current_lesson_span_for_check = slide_1_cont.querySelector('.current_lesson_span')
        if(current_lesson_for_check || current_lesson_span_for_check){
            current_lesson_for_check.classList.remove('current_lesson')
            current_lesson_span_for_check.classList.remove('current_lesson_span')
        }
        headerInformation.innerText = 'Сейчас не учебное время'
        return 'не учебное время'
    }

    timetable.forEach((element, index)=>{

        const currentLessons = slide_1_cont.querySelectorAll(`table .current_day`)
        if(element[0] < date && element[1] > date){
            const lesson = index
            const percent = 100 - ((element[1] - date) / (1000*60) / 40)*100
            currentLessons.forEach((elem)=>{
                if(elem !== currentLessons[lesson])
                elem.childNodes[0].classList.remove('current_lesson_span')
                elem.classList.remove('current_lesson')
            })
            currentLessons[lesson].classList.add('current_lesson')
            currentLessons[lesson].children[0].classList.add('current_lesson_span')
            slide_1_cont.querySelector('.current_lesson div').style.cssText = `--percent:${percent}`
            ////////////////////////////
            headerInformation.innerText = `До конца урока\n${Math.round((timetable[index][1] - date)/1000/60)} мин`/*`До конца урока ${sklonenie(Math.round((timetable[index][1] - date)/1000/60), 'min')}`*/

        } else{
            if(timetable[index+1]){
                if(element[1] < date && timetable[index+1][0] > date){
                    headerInformation.innerText = /*`До конца перемены
                    ${sklonenie(Math.floor((timetable[index+1][0]-date)/1000/60), 'min')}
                    ${sklonenie((Math.floor((timetable[index+1][0]-date)/1000 % 60)), 'sec')}`*/
                    `До конца перемены\n${Math.floor((timetable[index+1][0]-date)/1000/60)} мин : ${Math.floor((timetable[index+1][0]-date)/1000 % 60)} сек`
                    
                    currentLessons[index].classList.add('current_lesson')
                    currentLessons[index].children[1].style.cssText = `--percent: 100`
                }
            }
        }
        
    })
}
async function getdata(){
    clearInterval(interval)
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

    window.addEventListener('resize', ()=>{
        render()
        timeUpdate()
    })
    render()
    timeUpdate()
    interval = setInterval(timeUpdate, 1000)
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
                <td><span>${data[0][1]}</span><div></div></td>
                <td><span>${data[1][1]}</span><div></div></td>
                <td><span>${data[2][1]}</span><div></div></td>
                <td><span>${data[3][1]}</span><div></div></td>
                <td><span>${data[4][1]}</span><div></div></td>
            </tr>
            <tr> <!-- 2 -->
                <th>2</th>
                <td><span>${data[0][2]}</span><div></div></td>
                <td><span>${data[1][2]}</span><div></div></td>
                <td><span>${data[2][2]}</span><div></div></td>
                <td><span>${data[3][2]}</span><div></div></td>
                <td><span>${data[4][2]}</span><div></div></td>
            </tr>
            <tr> <!-- 3 -->
                <th>3</th>
                <td><span>${data[0][3]}</span><div></div></td>
                <td><span>${data[1][3]}</span><div></div></td>
                <td><span>${data[2][3]}</span><div></div></td>
                <td><span>${data[3][3]}</span><div></div></td>
                <td><span>${data[4][3]}</span><div></div></td>
            </tr>
            <tr> <!-- 4 -->
                <th>4</th>
                <td><span>${data[0][4]}</span><div></div></td>
                <td><span>${data[1][4]}</span><div></div></td>
                <td><span>${data[2][4]}</span><div></div></dh>
                <td><span>${data[3][4]}</span><div></div></td>
                <td><span>${data[4][4]}</span><div></div></td>
            </tr>
            <tr> <!-- 5 -->
                <th>5</th>
                <td><span>${data[0][5]}</span><div></div></td>
                <td><span>${data[1][5]}</span><div></div></td>
                <td><span>${data[2][5]}</span><div></div></td>
                <td><span>${data[3][5]}</span><div></div></td>
                <td><span>${data[4][5]}</span><div></div></td>
            </tr>
            <tr> <!-- 6 -->
                <th>6</th>
                <td><span>${data[0][6]}</span><div></div></td>
                <td><span>${data[1][6]}</span><div></div></td>
                <td><span>${data[2][6]}</span><div></div></td>
                <td><span>${data[3][6]}</span><div></div></td>
                <td><span>${data[4][6]}</span><div></div></td>
            </tr>
            <tr> <!-- 7 -->
                <th>7</th>
                <td><span>${data[0][7]}</span><div></div></td>
                <td><span>${data[1][7]}</span><div></div></td>
                <td><span>${data[2][7]}</span><div></div></td>
                <td><span>${data[3][7]}</span><div></div></td>
                <td><span>${data[4][7]}</span><div></div></td>
            </tr>
            <tr> <!-- 8 -->
                <th>8</th>
                <td><span>${data[0][8]}</span><div></div></td>
                <td><span>${data[1][8]}</span><div></div></td>
                <td><span>${data[2][8]}</span><div></div></td>
                <td><span>${data[3][8]}</span><div></div></td>
                <td><span>${data[4][8]}</span><div></div></td>
            </tr>
            <tr> <!-- 9 -->
                <th>9</th>
                <td><span>${data[0][9]}</span><div></div></td>
                <td><span>${data[1][9]}</span><div></div></td>
                <td><span>${data[2][9]}</span><div></div></td>
                <td><span>${data[3][9]}</span><div></div></td>
                <td><span>${data[4][9]}</span><div></div></td>
            </tr>
            <tr> <!-- 10 -->
                <th>10</th>
                <td><span>${data[0][10]}</span><div></div></td>
                <td><span>${data[1][10]}</span><div></div></td>
                <td><span>${data[2][10]}</span><div></div></td>
                <td><span>${data[3][10]}</span><div></div></td>
                <td><span>${data[4][10]}</span><div></div></td>
            </tr>
            <tr> <!-- 11 -->
            <th>11</th>
            <td><span>${data[0][11]}</span><div></div></td>
            <td><span>${data[1][11]}</span><div></div></td>
            <td><span>${data[2][11]}</span><div></div></td>
            <td><span>${data[3][11]}</span><div></div></td>
            <td><span>${data[4][11]}</span><div></div></td>
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
                                    <td><span>${data[0][1]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><span>${data[0][2]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><span>${data[0][3]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><span>${data[0][4]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><span>${data[0][5]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><span>${data[0][6]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><span>${data[0][7]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><span>${data[0][8]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><span>${data[0][9]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><span>${data[0][10]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><span>${data[0][11]}</span><div></div></td>
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
                                    <td><span>${data[1][1]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><span>${data[1][2]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><span>${data[1][3]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><span>${data[1][4]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><span>${data[1][5]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><span>${data[1][6]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><span>${data[1][7]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><span>${data[1][8]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><span>${data[1][9]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><span>${data[1][10]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><span>${data[0][11]}</span><div></div></td>
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
                                    <td><span>${data[2][1]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><span>${data[2][2]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><span>${data[2][3]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><span>${data[2][4]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><span>${data[2][5]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><span>${data[2][6]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><span>${data[2][7]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><span>${data[2][8]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><span>${data[2][9]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><span>${data[2][10]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><span>${data[0][11]}</span><div></div></td>
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
                                    <td><span>${data[3][1]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><span>${data[3][2]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><span>${data[3][3]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><span>${data[3][4]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><span>${data[3][5]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><span>${data[3][6]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><span>${data[3][7]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><span>${data[3][8]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><span>${data[3][9]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><span>${data[3][10]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><span>${data[0][11]}</span><div></div></td>
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
                                    <td><span>${data[4][1]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td><span>${data[4][2]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td><span>${data[4][3]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td><span>${data[4][4]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td><span>${data[4][5]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>6</th>
                                    <td><span>${data[4][6]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>7</th>
                                    <td><span>${data[4][7]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>8</th>
                                    <td><span>${data[4][8]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>9</th>
                                    <td><span>${data[4][9]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>10</th>
                                    <td><span>${data[4][10]}</span><div></div></td>
                                </tr>
                                <tr>
                                    <th>11</th>
                                    <td><span>${data[0][11]}</span><div></div></td>
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


// HEADER
    // Закрытие бок меню при клике вне (desktop)
window.addEventListener('click', (e)=>{ 
    if(!((e.target == headerNumClass) || (e.target == headerNumClass_p))){
        if(!burgerDesktop.classList.contains('burger_desktop_hidden)')){
            if(!e.target.closest('.burger_desktop')){
                burgerDesktop.classList.add('burger_desktop_hidden')
                setTimeout(()=>{
                    burgerDesktop.style.display = 'none'
                }, 250)
            }
        }
    }
})

headerNumClass.addEventListener('click', openBurger)
function openBurger(){
    if(window.innerWidth > 640){  //Desktop
        burgerDesktop.style.cssText = 'display: block;'
        setTimeout(()=>{
            burgerDesktop.classList.remove('burger_desktop_hidden')
        }, 10)
        
        burgerMobile.classList.remove('burger_mobile_open')
    } else{  //Mobile
        burgerMobile.style.display = 'block'
        setTimeout(()=>{
            burgerMobile.classList.add('burger_mobile_open')
        }, 10)
        burgerDesktop.classList.add('burger_desktop_hidden')
    }
}

burgerMobileClose_img.addEventListener('click', ()=>{
    burgerMobile.classList.remove('burger_mobile_open')
    setTimeout(()=>{
        burgerMobile.style.display = 'none'
    }, 240)
})