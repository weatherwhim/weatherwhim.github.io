const nimi_pi_tenpo_kule = ["walo", "loje", "jelo", "laso"];

const kule_lon_toki_Inli = ["rgb(248,248,242)", "rgb(255,85,85)", "rgb(241,250,141)", "rgb(109,242,188)"];

const tenpo_kule = [
  "open", "toki", "nimi", "nanpa", "luka",
  "lawa", "sitelen", "sona", "pilin", "olin",
  "meli", "mije", "mama", "suli", "lili",
  "tomo", "lape", "len", "linja", "lipu",
  "ilo", "musi", "kalama", "uta", "kute",
  "lukin", "kule", "kulupu", "wawa", "jan",
  "poka", "weka", "palisa", "kiwen", "nena",
  "supa", "leko", "sike", "lupa", "poki",
  "insa", "selo", "sijelo", "tenpo", "pimeja",
  "mun", "suno", "seli", "lete", "anpa",
  "sewi", "nasin", "lon", "tonsi", "jasima",
  "nasa", "pali", "mani", "esun", "pana",
  "lanpan", "utala", "pakala", "mu", "jaki",
  "ko", "pan", "suwi", "unpa", "moku",
  "kala", "pipi", "akesi", "soweli", "waso",
  "telo", "ma", "soko", "kili", "kasi",
  "kon", "wile", "alasa", "monsuta", "moli",
  "awen", "noka", "kama", "tawa", "pini"
];

const tenpo_pona = [
  "namako", "kijetesantakalu", "pi pali sin",
  "pi nasin ale", "pi weka ike", "pi toki pona"
];

let date;

let day; let month; let year;
let hour; let minute; let second;

let is_leap_year; let month_lengths;

let suno; let tenpo; let sike; let sike_suli;

let sike_suli_lon;

let kule;

let calendar;

function update_time() {
  calendar = document.getElementById("tenpo-ante").value;
  if(calendar !== "") {
    set_date(calendar + "T00:00:00");
  } else {
    set_date("lon");
  }
  update_GUI();
}

function set_date(d) {
  if(d == "lon") {
    date = new Date();
  } else {
    date = new Date(d);
  }

  day    = date.getDate();
  month  = date.getMonth();
  year   = date.getFullYear();

  hour   = date.getHours();
  minute = date.getMinutes();
  second = date.getSeconds();

  is_leap_year = (year % 4 === 0) && ( (year % 100 !== 0) || (year % 400 === 0) );

  month_lengths = [31, 28 + (is_leap_year ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  suno_tenpo_sike();
}

function suno_tenpo_sike() {
  let value = day_of_sike();

  if(value <= 360) {
    suno = tenpo_kule[(value - 1) % 90];
    tenpo = nimi_pi_tenpo_kule[Math.floor((value - 1) / 90)];
    kule = kule_lon_toki_Inli[Math.floor((value - 1) / 90)];
  } else {
    suno = tenpo_pona[value - 360 - (is_leap_year ? 1 : 0)];
    tenpo = "pona";
    kule = "rgb(189,147,249)";
  }

  sike = tenpo_kule[(year + 69 -
    ( (value > 145) ? 1 : 0) ) % 90];

  sike_suli = tenpo_kule[(Math.floor( (year + 69 -
    ( (value > 145) ? 1 : 0) ) / 90) + 67) % 90];

  if(calendar === "") {
    sike_suli_lon = sike_suli;
  }
}

function day_of_sike() {
  let value = day_of_gregorian_year();

  if(value <= 220 + (is_leap_year ? 1 : 0)) {
    value += 145;
  }
  else {
    value -= 220 + (is_leap_year ? 1 : 0);
  }
  return value;
}

function day_of_gregorian_year() {
  let value = 0;
  for(let i = 0; i < month; ++i) {
    value += month_lengths[i];
  }
  value += day;
  return value;
}

function update_GUI() {
  if(!suno.includes(" ")) {
    document.getElementById("suno-pona").innerHTML = "-" + suno;
  } else {
    let suno_pona;
    switch(suno) {
      case "pi pali sin": {
        suno_pona = " pi-__pali+sin";
        break;
      }
      case "pi nasin ale": {
        suno_pona = " pi-__nasin+ale";
        break;
      }
      case "pi weka ike": {
        suno_pona = " pi-__weka+ike";
        break;
      }
      case "pi toki pona": {
        suno_pona = " pi-__toki+pona";
        break;
      }
    }
    document.getElementById("suno-pona").innerHTML = suno_pona;
  }
  document.getElementById("suno").innerHTML = suno;
  document.getElementById("tenpo").innerHTML = tenpo;
  document.getElementById("sike").innerHTML = sike;
  document.getElementById("sike-suli").innerHTML = sike_suli;

  document.getElementById("poki-sike-suli").style.display = (sike_suli !== sike_suli_lon) ? "block" : "none";

  document.getElementById("date").style.color = kule;

  document.getElementById("hour").innerHTML = (hour < 10 ? "0" : "") + hour;
  document.getElementById("minute").innerHTML = (minute < 10 ? "0" : "") + minute;
  document.getElementById("second").innerHTML = (second < 10 ? "0" : "") + second;

  let month_names = ["Jan", "Feb", "Mar", "Apr", "May",
  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  document.getElementById("day").innerHTML = (day < 10 ? "0" : "") + day;
  document.getElementById("month").innerHTML = month_names[month];
  document.getElementById("year").innerHTML = year;

  if(calendar !== "") {
    document.getElementById("nanpa-wan").style.display = "none";
    document.getElementById("nanpa-tu").style.display = "block";
  } else {
    document.getElementById("nanpa-wan").style.display = "block";
    document.getElementById("nanpa-tu").style.display = "none";
  }
}


update_time();

let x = setInterval(update_time, 100);
