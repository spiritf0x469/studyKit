//calculator
document.getElementById("i1").addEventListener("click",function(){
    document.getElementById("i1").textContent="close";
    // toggle logic
    let b=document.getElementById("i2");
    if(b.style.display==="flex"){
        b.style.display="none";
        this.textContent="open";
    }
    else{
        b.style.display="flex";
        this.textContent="close";
    }
    // document.getElementById("i2").style.display="flex";
});
document.getElementById('a1').addEventListener("click",function(){
    let n1=parseFloat(document.getElementById("i11").value);
    let n2=parseFloat(document.getElementById("i12").value);
    let o=document.getElementById("op").value;
    let r;
    if(isNaN(n1) || isNaN(n2)) r="enter valid numbers!";
    else if(o==="v1") r=(n1+n2).toFixed(2);
    else if(o==="v2") r=(n1-n2).toFixed(2);
    else if(o==="v3") r=(n1*n2).toFixed(2);
    else if(o==="v4") r=n2===0?"division by zero!":(n1/n2).toFixed(2);
    else if(o==="v5") r=n2===0?"mod by zero!":(n1%n2).toFixed(2);
    document.getElementById("p1").textContent=r;
});

//stopwatch-reset on background fixed
let di;
const str=document.getElementById("i31");
const pau=document.getElementById("i32");
const stp=document.getElementById("i33");
const cls=document.getElementById("i34");
const dis=document.getElementById("a2");
function ud(c){
    let h=String(Math.floor(c/3600)).padStart(2,"0");
    let m=String(Math.floor((c%3600)/60)).padStart(2,"0");
    let s=String(Math.floor(c%60)).padStart(2,"0");
    return h+":"+m+":"+s;
}
function st(state){
    chrome.storage.local.set({sw:state});
}
function ge(state){
    if(state.phase==="r") return state.accumalated+(Date.now()-state.startTime)/1000;
    return state.accumalated;
}
function aui(state){
    if(state.phase==="i"){
        str.classList.remove("hd");
        pau.classList.add("hd");
        stp.classList.add("hd");
        cls.classList.add("hd");
        pau.textContent="pause";
    }
    else if(state.phase==="r"){
        str.classList.add("hd");
        pau.classList.remove("hd");
        stp.classList.remove("hd");
        cls.classList.add("hd");
        pau.textContent="pause";
    }
    else if(state.phase==="p"){
        str.classList.add("hd");
        pau.classList.remove("hd");
        stp.classList.remove("hd");
        cls.classList.add("hd");
        pau.textContent="resume";
    }
    else if(state.phase==="s"){
        str.classList.add("hd");
        pau.classList.add("hd");
        stp.classList.add("hd");
        cls.classList.remove("hd");
    }
}
function tk(){
    chrome.storage.local.get(["sw"],function(result){
        const state=result.sw;
        if(!state) return;
        dis.textContent=ud(ge(state));
    });
}
function stk(){
    clearInterval(di);
    di=setInterval(tk,1000);
}
function is(){
    chrome.storage.local.get(["sw"],function(result){
        const state=result.sw || {phase:"i",startTime:null,accumalated:0};
        aui(state);
        dis.textContent=ud(ge(state));
        if(state.phase==='r') stk();
    });
}
str.addEventListener("click",function(){
    const state={phase:"r",startTime:Date.now(),accumalated:0};
    st(state);aui(state);
    stk();
});
pau.addEventListener("click",function(){
    chrome.storage.local.get(["sw"],function(result){
        const state=result.sw;
        if(state.phase==="r"){
            const e=ge(state);
            const ns={phase:"p",startTime:null,accumalated:e};
            st(ns);aui(ns);
            clearInterval(di);
            dis.textContent=ud(e);
        }
        else if(state.phase==="p"){
            const ns={phase:"r",startTime:Date.now(),accumalated:state.accumalated};
            st(ns);aui(ns);
            stk();
        }
    });
});
stp.addEventListener("click",function(){
    chrome.storage.local.get(["sw"],function(result){
        const state=result.sw;
        const e=ge(state);
        const ns={phase:"s",startTime:null,accumalated:e};
        st(ns);aui(ns);
        clearInterval(di);
        dis.textContent=ud(e);
    });
});
cls.addEventListener("click",function(){
    const ns={phase:"i",startTime:null,accumalated:0};
    st(ns);aui(ns);
    clearInterval(di);
    dis.textContent=ud(0);
});
is();
//notes
function rn(){
    chrome.storage.local.get(["notes"],function(result){
        const n=result.notes || [];
        const l=document.getElementById("nl");
        l.innerHTML="";
        n.forEach(function(n){
            const p=document.createElement("p");
            p.textContent=n.text;
            const db=document.createElement("button");
            db.textContent="x";
            db.className="db";
            db.addEventListener("click",function(){dn(n.id);});
            p.appendChild(db);
            l.appendChild(p);
        });
    });
}
function dn(id){
    chrome.storage.local.get(["notes"],function(result){
        let n=result.notes || [];
        n=n.filter(function(n){return n.id!==id;});
        chrome.storage.local.set({notes:n},function(){rn();});
    });
}
rn();