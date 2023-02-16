let lscore=document.getElementById("live-score")
let lwickets=document.getElementById("wicket")
let lovers=document.getElementById("lovers")
let county=document.getElementById("show-con")
const socket=io("http://localhost:4500/",{transports:['websocket']})

socket.on("showscore",(show)=>{
    
    let runs=show.runs
    let wicket=show.wickets
    let overs=show.overs
    let con1=show.con1
    let con2=show.con2
   showscore(runs,wicket,overs,con1,con2)
})

function showscore(runs,wickets,overs,con1,con2){
    county.innerHTML=`Match between  ${con1} VS ${con2}`
    lscore.innerText=`Total Runs: ${runs} `
    lwickets.innerText=`Total wickets: ${wickets} `
    lovers.innerText=`Total Overs: ${overs}`
}


let morebut=document.getElementById("moreinfo")

morebut.addEventListener('click',(event)=>{
    socket.emit("showmoreinfo","")
})

socket.on("showextrainfotoall",(show)=>{
    if(show.batsman1==undefined){
        alert("data will update very soom")
    }else{
        showextrainfo(show)
    }
   
})

let exdiv=document.getElementById("upmore-details")
function showextrainfo(show){
    exdiv.innerHTML=""

    let mainexdiv=document.createElement("div")
    mainexdiv.setAttribute('id',"mainexdiv")
   let batsman1=document.createElement('p')
   batsman1.innerText=`1st Batsman: ${show.batsman1}`

   let batsman2=document.createElement('p')
   batsman2.innerText=`2nd Batsman: ${show.batsman2}`

   let bowler=document.createElement("p")
   bowler.innerText=`Bowler: ${show.bowler}`

   mainexdiv.append(batsman1,batsman2,bowler)
   exdiv.appendChild(mainexdiv)
}