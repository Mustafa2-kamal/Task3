


function init(){
    let theme;

    theme=localStorage.getItem('Theme');
    setTheme(theme);

    onToggleTheme(()=>{
        theme = (theme == "dark") ? "light" : "dark";
        toggleTheme(theme);
        localStorage.setItem('Theme', theme);
    });

}

function setTheme( theme){

    if (theme == "dark") {
        toggleTheme(theme);
    }
}

function toggleTheme(theme){

    let modeButton=document.getElementById('mode');

    if (theme == "dark") {//dark
        
        modeButton.innerHTML="<i class='fa-regular fa-sun'></i> Light Mode";
    }

    else{
        modeButton.innerHTML="<i class='fa-regular fa-moon'></i> Dark Mode";
    }

    document.body.classList.toggle('dark-theme');

}

//Mode dark or light
function onToggleTheme(callBack){

    let modeButton=document.getElementById('mode');

    modeButton.addEventListener('click',()=>{
        callBack();
})
}

init();