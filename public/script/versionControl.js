let elm=document.head
let appversion=elm.dataset.appVersion

let localVersion=localStorage.getItem('appVersion')
if(!localVersion || localVersion!=appversion){
    localStorage.clear();
}

localStorage.setItem("appVersion",appversion)

