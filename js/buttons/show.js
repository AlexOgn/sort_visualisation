function show_options(id_button, id_div, pause, resume) {
    let x = document.getElementById(id_div);
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById(id_button).innerHTML = "Скриване на Визуализацията";
      resume();
    } else {
      x.style.display = "none";
      document.getElementById(id_button).innerHTML = "Показване на Визуализацията";
      pause();
    }
}
function show_text(id_button, id_div) {
  let y = document.getElementById(id_div);
  if (y.style.display === "none") {
    y.style.display = "block";
    document.getElementById(id_button).innerHTML = "Скриване на Информацията";
  } else {
    y.style.display = "none";
    document.getElementById(id_button).innerHTML = "Показване на Информацията";
  }
}

