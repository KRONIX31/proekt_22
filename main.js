const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const timetable = [[8, 30, 9, 10], [9, 15, 9, 55], [10, 00, 10, 40], [10, 45, 11, 25], [11, 30, 12,10],
[12, 15, 12, 55], [13, 00, 13, 40], [13, 45, 14, 25], [14, 30, 15, 10], [15, 15, 15, 55]]
let response, data
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
// Var App
const slide_1_cont = document.querySelector('.slide_1_container')


//DIALOG
/*if(!localStorage.firstOn){
    const firstOn = document.querySelector('.first_on')
    firstOn.style.display = 'flex'
    firstOn.classList.add('welcome_visible')
}*/
document.fonts.onloadingdone = () => {
    console.log('font-face load event')
    const loadScreen = document.querySelector('.load_screen')
    loadScreen.style.opacity = '0'
    setTimeout(()=>{
        loadScreen.style.display = 'none'
    }, 300)
}
  
document.addEventListener('DOMContentLoaded', getdata)
async function getdata(){
    const response = await fetch('https://kronix31.github.io/proekt_22/')
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    data = await response.json()
    console.log(data)

    window.onresize = render
    render()
    function render(){
        alert(window.screen.height, window.innerHeight)
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
                <td>${data[0][1]}</td>
                <td>${data[1][1]}</td>
                <td>${data[2][1]}</td>
                <td>${data[3][1]}</td>
                <td>${data[4][1]}</td>
            </tr>
            <tr> <!-- 2 -->
                <th>2</th>
                <td>${data[0][2]}</td>
                <td>${data[1][2]}</td>
                <td>${data[2][2]}</td>
                <td>${data[3][2]}</td>
                <td>${data[4][2]}</td>
            </tr>
            <tr> <!-- 3 -->
                <th>3</th>
                <td>${data[0][3]}</td>
                <td>${data[1][3]}</td>
                <td>${data[2][3]}</td>
                <td>${data[3][3]}</td>
                <td>${data[4][3]}</td>
            </tr>
            <tr> <!-- 4 -->
                <th>4</th>
                <td>${data[0][4]}</td>
                <td>${data[1][4]}</td>
                <td>${data[2][4]}</dh>
                <td>${data[3][4]}</td>
                <td>${data[4][4]}</td>
            </tr>
            <tr> <!-- 5 -->
                <th>5</th>
                <td>${data[0][5]}</td>
                <td>${data[1][5]}</td>
                <td>${data[2][5]}</td>
                <td>${data[3][5]}</td>
                <td>${data[4][5]}</td>
            </tr>
            <tr> <!-- 6 -->
                <th>6</th>
                <td>${data[0][6]}</td>
                <td>${data[1][6]}</td>
                <td>${data[2][6]}</td>
                <td>${data[3][6]}</td>
                <td>${data[4][6]}</td>
            </tr>
            <tr> <!-- 7 -->
                <th>7</th>
                <td>${data[0][7]}</td>
                <td>${data[1][7]}</td>
                <td>${data[2][7]}</td>
                <td>${data[3][7]}</td>
                <td>${data[4][7]}</td>
            </tr>
            <tr> <!-- 8 -->
                <th>8</th>
                <td>${data[0][8]}</td>
                <td>${data[1][8]}</td>
                <td>${data[2][8]}</td>
                <td>${data[3][8]}</td>
                <td>${data[4][8]}</td>
            </tr>
            <tr> <!-- 9 -->
                <th>9</th>
                <td>${data[0][9]}</td>
                <td>${data[1][9]}</td>
                <td>${data[2][9]}</td>
                <td>${data[3][9]}</td>
                <td>${data[4][9]}</td>
            </tr>
            <tr> <!-- 10 -->
                <th>10</th>
                <td>${data[0][10]}</td>
                <td>${data[1][10]}</td>
                <td>${data[2][10]}</td>
                <td>${data[3][10]}</td>
                <td>${data[4][10]}</td>
            </tr>
        </tbody>
            </table>`
            slide_1_cont.innerHTML = componentDesktop
            const currentCell = slide_1_cont.querySelectorAll('tbody tr td')
            if(day < 5 && day > -1){
                for(i = 0; i < currentCell.length; i+=5){
                    currentCell[i + day].classList.add('current_day')
                }
                setInterval(()=>{
                    let time = new Date()
                    let hours = time.getHours()
                    let minutes = time.getMinutes()
                    if(hours <= timetable[0][0]){
                        
                    }
                    //console.log(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
                }, 10000)
            }
        } else{ // Mobile Table
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
                            <td>${data[0][1]}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>${data[0][2]}</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>${data[0][3]}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>${data[0][4]}</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>${data[0][5]}</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>${data[0][6]}</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>${data[0][7]}</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>${data[0][8]}</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>${data[0][9]}</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>${data[0][10]}</td>
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
                            <td>${data[1][1]}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>${data[1][2]}</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>${data[1][3]}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>${data[1][4]}</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>${data[1][5]}</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>${data[1][6]}</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>${data[1][7]}</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>${data[1][8]}</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>${data[1][9]}</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>${data[1][10]}</td>
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
                            <td>${data[2][1]}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>${data[2][2]}</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>${data[2][3]}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>${data[2][4]}</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>${data[2][5]}</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>${data[2][6]}</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>${data[2][7]}</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>${data[2][8]}</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>${data[2][9]}</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>${data[2][10]}</td>
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
                            <td>${data[3][1]}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>${data[3][2]}</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>${data[3][3]}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>${data[3][4]}</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>${data[3][5]}</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>${data[3][6]}</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>${data[3][7]}</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>${data[3][8]}</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>${data[3][9]}</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>${data[3][10]}</td>
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
                            <td>${data[4][1]}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>${data[4][2]}</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>${data[4][3]}</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>${data[4][4]}</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>${data[4][5]}</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>${data[4][6]}</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>${data[4][7]}</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>${data[4][8]}</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>${data[4][9]}</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>${data[4][10]}</td>
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
