var cal = {
    sMon : false,
    data : null,
    sDay : 0, sMth: 0, sYear: 0,
    
    months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "Oktobeer", "November", "December"],
    days : ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"],
    
    hMth : null, hYear: null,
    hWrap: null,
    hFormWrap : null, hForm : null,
    hfDate : null, hfTxt : null, hfDel: null,
    
    init : () => {
    cal.hMth = document.getElementById("calMonth");
    cal.hYear = document.getElementById("calYear");
    cal.hWrap = document.getElementById("calWrap");
    cal.hFormWrap = document.getElementById("calForm");
    cal.hForm = document.getElementById("form");
    cal.hfDate = document.getElementById("evtDate");
    cal.hfTxt = document.getElementById("evtTxt");
    cal.hfDel = document.getElementById("evtDel");
        
    let now = new Date(), nowMth = now.getMonth();
    cal.hYear.value = parseInt(now.getFullYear());
        for(let i=0;i<12;i++){
            let opt = document.createElement("option");
            opt.value = i;
            opt.innerHTML = cal.months[i];
            if(i == nowMth){
                opt.selected = true;
            }
            cal.hMth.appendChild(opt);
        }
        
        cal.hMth.onchange = cal.draw;
        cal.hYear.onchange = cal.draw;
        document.getElementById("calBack").onclick = () => cal.pshift();
        document.getElementById("calNext").onclick = () => cal.pshift(1);
        cal.hForm.onsubmit = cal.save;
        document.getElementById("evtClose").onclick = () => cal.hFormWrap.close();
        cal.hfDel.onclick = cal.del;
        
        if(cal.sMon){
            cal.days.push(cal.days.shift());
            cal.draw();
        }
},
pshift : forward => {
    cal.sMth = parseInt(cal.hMth.value);
    cal.sYear = parseInt(cal.hYear.value);
    if(forward){
        cal.sMth++;
    } else {
        cal.sMth--;
    }
    if(cal.sMth >11){
        cal.sMth =0;
        cal.sYear++;
    }
     if(cal.sMth < 0){
        cal.sMth = 11;
        cal.sYear--;
    }
    cal.hMth.value = cal.sMth;
    cal.hYear.value = cal.sYear;
    cal.draw();
},
draw : () => {
    cal.sMth = parseInt(cal.hMth.value);
    cal.sYear = parseInt(cal.hYear.value);
    let daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(),
    startDay = new Date(cal.sYear, cal.sMth, 1).getDate(),
    endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDate(),
    now = new Date(),
    nowMth = now.getMonth(),    
   nowYear = parent(now.getFullYear),
    nowDay = cal.sMth == nowMth && cal.sYear == nowYear ? now.getDate() : null;
    
    //load localstorage
    cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
    if(cal.data == null){
        localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
        cal.data ={};
    } else {
        cal.data = JSON.parse(cal.data);
    }
    
    //blank squares before start month
    let squares = [];
    if(cal.sMon && startDay != 1){
        let blanks = startDay == 0 ?  7 : startDay;
        for(let i=1;i<blanks;i++){
            squares.push("b");
        }
    }
    if(!cal.sMon && startDay != 0){
         for(let i=0;i<startDay;i++){
            squares.push("b");
        }
    }
    
    //day of month
    for(let i =1;i<daysInMth;i++){
        squares.push(i);
    }
    
    //blank squares after end month
    if(cal.sMon && endDay != 0){
        let blanks = endDay == 6 ?  1 : 7 - endDay;
        for(let i=0;i<blanks;i++){
            squares.push("b");
        }
    }
    if(!cal.sMon && endDay != 6){
        let blanks = endDay == 0 ?  6 : 6 - endDay;
         for(let i=0;i<blanks;i++){
            squares.push("b");
        }
    }

    //reset cal
    cal.hWrap.innerHTML = "<div class='calHead'></div>
    <div class ='calBody'>
        <div class='calRow'></div>
    </div>";
    
    //header day names
    wrap = cal.hWrap.querySelector(".calHead");
    for(let d of cal.days){
        let cell = document.createElement("div");
        cell.className ="calCell";
        cal.innerHTML = d;
        wrap.appendChild(cell);
    }
    
    
    
}   
    
};

window.onload = cal.init;