let livescore=document.getElementById('liverscore')
let overs=document.getElementById('overs')
let wickets=document.getElementById('wickets')
let form=document.getElementById("score-form")
let con1=document.getElementById('con1')
let con2=document.getElementById('con2')
let msg=document.getElementById('show-msg')

const socket=io("http://localhost:4500/",{transports:['websocket']})

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let con1=event.target[0].value
    let con2=event.target[1].value
    let score=event.target[2].value;
    let wic=event.target[3].value;
    let ove=event.target[4].value;
    socket.emit("updatescore",{con1:con1,con2:con2,score:score,wickets:wic,overs:ove})
    event.target[0].value=""
    event.target[1].value=""
    event.target[2].value=""
    event.target[3].value=""
    event.target[4].value=""
    msg.innerText='Score Updated successfully'
})


let moredetails=document.getElementById("more-details")
let bat1=document.getElementById("bat1")
let bat2=document.getElementById("bat2")
let bowler=document.getElementById("bowler")
let showmore=document.getElementById("show-more")

moredetails.addEventListener("submit",(event)=>{
    event.preventDefault()
    
    let batsman1=event.target[0].value;
    let batsman2=event.target[1].value;
    let bowler=event.target[2].value;
    socket.emit("extrainfo",{batsman1:batsman1,batsman2:batsman2,bowler:bowler})
    event.target[0].value=""
    event.target[1].value=""
    event.target[2].value=""
    showmore.innerText='Info updated successfully'
})