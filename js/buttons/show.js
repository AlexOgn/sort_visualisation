function show_options(id_button, id_div, pause, resume) {
    let а = document.getElementById(id_div);
    if (а.style.display === "none") {
      а.style.display = "block";
      document.getElementById(id_button).innerHTML = "Скриване на Визуализацията";
      resume();
    } else {
      а.style.display = "none";
      document.getElementById(id_button).innerHTML = "Показване на Визуализацията";
      pause();
    }
}
function show_text(id_button, id_div) {
  let а = document.getElementById(id_div);
  if (а.style.display === "none") {
    а.style.display = "block";
    document.getElementById(id_button).innerHTML = "Скриване на Информацията";
  } else {
    а.style.display = "none";
    document.getElementById(id_button).innerHTML = "Показване на Информацията";
  }
}

function show_creators(id_ul){
  let а = document.getElementById(id_ul);
  if (а.style.display === "none") {
    а.style.display = "block";
  } else {
    а.style.display = "none";
  }
}