let lang = "toki-pona";

function lang_toggle() {
  let hide = document.getElementsByClassName(lang);
  for(let i = 0; i < hide.length; ++i) {
    hide[i].style.display = "none";
  }

  lang = (lang === "toki-pona") ? "english" : "toki-pona";

  let show = document.getElementsByClassName(lang);
  for(let i = 0; i < show.length; ++i) {
    show[i].style.display = "block";
  }
}
