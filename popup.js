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
    else if(o==="v1") r=n1+n2;
    else if(o==="v2") r=n1-n2;
    else if(o==="v3") r=n1*n2;
    else if(o==="v4") r=n2===0?"division by zero!":(n1/n2).toFixed(2);
    else if(o==="v5") r=n2===0?"mod by zero!":n1%n2;
    document.getElementById("p1").textContent=r;
});

//stopwatch
let t;
let c=0;
let f=false;
const str=document.getElementById("i31");
const pau=document.getElementById("i32");
const stp=document.getElementById("i33");
const cls=document.getElementById("i34");
function ud(){
    let h=String(Math.floor(c/3600)).padStart(2,"0");
    let m=String(Math.floor((c%3600)/60)).padStart(2,"0");
    let s=String(Math.floor(c%60)).padStart(2,"0");
    document.getElementById("a2").textContent=h+":"+m+":"+s;
}
function st(){
    clearInterval(t);
    t=setInterval(function(){
        c++;ud();
    },1000);
    f=true;
}
str.addEventListener("click",function(){
    str.classList.add("hd");
    pau.classList.remove("hd");
    stp.classList.remove("hd");
    st();
});
pau.addEventListener("click",function(){
    if(f){
        clearInterval(t);
        f=false;
        pau.textContent="resume";
    }
    else{st();pau.textContent="pause";}
});
stp.addEventListener("click",function(){
    clearInterval(t);
    f=false;
    pau.textContent="pause";
    pau.classList.add("hd");
    stp.classList.add("hd");
    cls.classList.remove("hd");
});
cls.addEventListener("click",function(){
    c=0;ud();
    pau.textContent="pause";
    cls.classList.add("hd");
    str.classList.remove("hd");
});