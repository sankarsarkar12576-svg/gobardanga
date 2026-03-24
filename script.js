<script>

let bookedSlots = []; // google sheet theke asbe

/* Load slots */
function loadSlots(){
  let clinic = document.getElementById("clinic").value;
  let date = document.getElementById("date").value;

  if(!clinic || !date) return;

  // 👇 Google Sheet theke data fetch (example)
  fetch("YOUR_GOOGLE_SHEET_WEB_APP_URL")
    .then(res => res.json())
    .then(data => {

      bookedSlots = data.filter(d => 
        d.clinic == clinic && d.date == date
      ).map(d => d.time);

      generateSlots(clinic);
    });
}

/* Generate slots */
function generateSlots(clinic){

  let start, end;

  if(clinic == "gobardanga1"){
    start = 8; end = 10;
  }
  else if(clinic == "gobardanga2"){
    start = 10; end = 12;
  }
  else if(clinic == "tarunipur"){
    start = 8; end = 11;
  }
  else if(clinic == "basirhat"){
    start = 19; end = 21;
  }

  let html = "";

  for(let h = start; h < end; h++){
    for(let m = 0; m < 60; m += 10){

      let hour = h > 12 ? h - 12 : h;
      let ampm = h >= 12 ? "PM" : "AM";
      let min = m < 10 ? "0"+m : m;

      let time = hour + ":" + min + " " + ampm;

      let isBooked = bookedSlots.includes(time);

      html += `
        <div class="slot ${isBooked ? 'booked' : ''}" 
        onclick="${isBooked ? '' : `selectSlot(this,'${time}')`}">
        ${time}
        </div>
      `;
    }
  }

  document.getElementById("slots").innerHTML = html;
}

/* Select */
function selectSlot(el,time){
  document.querySelectorAll(".slot").forEach(s=>s.classList.remove("selected"));
  el.classList.add("selected");
}

</script>