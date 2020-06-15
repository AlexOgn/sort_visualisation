function stop_button(id, pause, resume){
    if (document.getElementById(id).innerHTML == "Пускане"){
       document.getElementById(id).innerHTML = "Спиране"
       resume();
    }else{
       document.getElementById(id).innerHTML = "Пускане";
       pause();
    }
}
