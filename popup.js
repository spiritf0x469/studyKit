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
            else if(o==="v5") r=n2===0?0:n1%n2;
            document.getElementById("p1").textContent=r;
        });