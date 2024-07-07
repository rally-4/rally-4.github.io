// STRING MANIPULATION
const Limit = function(e,l){
    if(e.value.length > l){
        e.value = e.value.substr(0,l);
    }
}

// AUDIO FUNCTIONS
const play=m=>{m.play()}
const stop=m=>{m.pause();m.currentTime=0}
const stopAll=()=>{
    var allAudios=document.getElementsByTagName('audio');
    for(i=0;i<allAudios.length;i++){allAudios[i].pause();allAudios[i].currentTime=0}
}

// BOOLEAN ALGEBRA
const Bool = {
    true: true,
    false: false
}
Bool.not=p=>!p;
Bool.and=(p,q)=>!(!p||!q);
Bool.or=(p,q)=>!(!p&&!q);
Bool.xor=(p,q)=>!!(p^q);
Bool.imply=(p,q)=>1!=p||0!=q;
Bool.nonimply=(p,q)=>1==p&&0==q;

// TIMER FUNCTIONS
const setSchedule=(func,i,n,d=0)=>{
    setTimeout(()=>{
        for(let j=0;j<n;j++){
            setTimeout(func,j*i);
        }
    },d)
}

// OTHER
const setRotateAnimation=(e,t)=>{
    e.style.animationName = 'rotate';
    e.style.animationDuration = t+'s';
    e.style.animationIterationCount = '1';
    e.style.animationTimingFunction = 'linear';
    e.style.animationFillMode = 'none';
    e.style.animationPlayState = 'paused';
}
const getResCol=(res)=>{
    if(res=='Slime'){return 'rgb(0,127,255)'}
    else if(res=='Slime Key'){return 'rgb(0,90,210)'}
    else if(res=='Red Fluid'){return 'rgb(210,0,30)'}
    else if(res=='Rusty Key'){return 'rgb(90,60,30)'}
    else if(res=='Chitin'){return 'rgb(120,0,255)'}
    else if(res=='Obsidian Key'){return 'rgb(15,0,30)'}
    else{return 'rgb(255,255,255)'}
}
const rem=(arr,el)=>{for(a=0;a<el.length;a++){arr.splice(arr.indexOf(el[a]),1)}}

const recoverAreaUnlocks = function(areaProgress, areaWins){
    T4 = document.getElementById('T4');
    AD1 = document.getElementById('AD1');
    AD2 = document.getElementById('AD2');
    AD3 = document.getElementById('AD3');
    if(areaProgress['A1C']){
        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';
    }
    if(areaProgress['A2C']){
        document.getElementById('UG6').style.display = 'flex';
        document.getElementById('UG7').style.display = 'flex';
        document.getElementById('UG8').style.display = 'flex';
        document.getElementById('UG9').style.display = 'flex';
        document.getElementById('IB2').style.display = 'flex';
    }
    
    AD1.innerText = 'Drops: Slime, Slime Key\nWins until boss: ' + areaWins['A1Wins'] + '/4';
    AD2.innerText = 'Drops: Slime, Red Fluid, Rusty Key\nWins until boss: ' + areaWins['A2Wins'] + '/10';
    AD3.innerText = 'Drops: Red Fluid, Chitin, Obsidian Key\nWins until boss: ' + areaWins['A3Wins'] + '/8';
}
const recoverUnlocks = function(uus){
    if(uus['uu2']){
        Cost2.innerHTML = '';
        U2.innerHTML = 'SELECTED';
        S3C.classList.remove('locked'); S3C.classList.add('chargeBox');
        S3C.style.backgroundColor = 'rgb(105,120,150)';
        S3C.style.opacity = '0';
        S3.addEventListener('pointerdown',()=>{
            if(A3Use < AA3[obj.AA.AA3v].uses){
                if(this.S3A){S3A = this.S3A}
                if(S3A != '[object CSSAnimation]'){var S3A = S3C.getAnimations();this.S3A = S3A}
                S3A[0].play(); S3.style.pointerEvents = 'none';
                AA3[obj.AA.AA3v].func();
                A3Use++;
            }
        }); S3C.addEventListener('animationend',()=>{S3.style.pointerEvents = 'auto'});
    }
    if(uus['uu3']){
        Cost3.innerHTML = '';
        U3.innerHTML = 'SELECTED';
        S4C.classList.remove('locked'); S4C.classList.add('chargeBox');
        S4C.style.backgroundColor = 'rgb(105,120,150)';
        S4C.style.opacity = '0';
        S4.addEventListener('pointerdown',()=>{
            if(A4Use < AA4[obj.AA.AA4v].uses){
                if(this.S4A){S4A = this.S4A}
                if(S4A != '[object CSSAnimation]'){var S4A = S4C.getAnimations();this.S4A = S4A}
                S4A[0].play(); S4.style.pointerEvents = 'none';
                AA4[obj.AA.AA4v].func();
                A4Use++;
            }
        }); S4C.addEventListener('animationend',()=>{S4.style.pointerEvents = 'auto'});
    }
    if(uus['uu4']){
        document.getElementById('A2').style.display = 'flex';
        document.getElementById('Cost4').innerHTML = '';
        document.getElementById('U4').innerHTML = 'UNLOCKED';
    }
    if(uus['uu6']){
        Cost6.innerHTML = '';
        U6.innerHTML = 'SELECTED';
        S5C.classList.remove('locked'); S5C.classList.add('chargeBox');
        S5C.style.backgroundColor = 'rgb(105,120,150)';
        S5C.style.opacity = '0';
        S5.addEventListener('pointerdown',()=>{
            if(A5Use < AA5[obj.AA.AA5v].uses){
                if(this.S5A){S5A = this.S5A}
                if(S5A != '[object CSSAnimation]'){var S5A = S5C.getAnimations();this.S5A = S5A}
                S5A[0].play(); S5.style.pointerEvents = 'none';
                AA5[obj.AA.AA5v].func();
                A5Use++; CB5.style.height = (AA5[obj.AA.AA5v].uses-A5Use)/AA5[obj.AA.AA5v].uses*100 + '%';
            }
        }); S5C.addEventListener('animationend',()=>{S5.style.pointerEvents = 'auto'});
    }
    if(uus['uu7']){
        Cost7.innerHTML = '';
        U7.innerHTML = 'SELECT';
    }
    if(uus['uu8']){
        Cost8.innerHTML = '';
        U8.innerHTML = 'SELECT';
    }
    if(uus['uu9']){
        document.getElementById('A3').style.display = 'flex';
        document.getElementById('Cost9').innerHTML = '';
        document.getElementById('U9').innerHTML = 'UNLOCKED';
    }
}
const recoverUpgrades = function(uus){
    if(uus['uu1']){
        cc1 = 8 + 2*uus['uu1'];
        if(cc1 >= 40){
            U1.innerHTML = 'MAX';
            cc1 = Infinity;
            Cost1.innerHTML = 'Cost: ' + cc1 + ' Slime';
        }
        Cost1.innerHTML = 'Cost: ' + cc1 + ' Slime';
        UserShield = 200 + 50*uus['uu1'];
        document.getElementById('I1').innerHTML = '\n<br>&nbsp; • Player Shield: ' + UserShield + ' -> ' + (UserShield+50) + '\n<br>&nbsp;';
    }
    if(uus['uu5']){
        cc5 = 20 + 5*uus['uu5'];
        if(cc5 >= 70){
            U5.innerHTML = 'MAX';
            cc5 = Infinity;
            Cost5.innerHTML = 'Cost: ' + cc5 + ' Red Fluid';
        }
        Cost5.innerHTML = 'Cost: ' + cc5 + ' Red Fluid';
        UserHealth = 1000 + 100*uus['uu5'];
        document.getElementById('I5').innerHTML = '\n<br>&nbsp; • Player Health: ' + UserHealth + ' -> ' + (UserHealth+100) + '\n<br>&nbsp;';
    }
}
const selectAbilities = function(AA){
    if(AA.AA1v == 1){
        U7.innerHTML = 'SELECTED';
        for(const node of S1.childNodes){
            if(node.nodeType === 3){
                node.textContent = 'BLAST';
            }
        }
    }
    if(AA.AA2v == 1){
        U8.innerHTML = 'SELECTED';
        for(const node of S2.childNodes){
            if(node.nodeType === 3){
                node.textContent = 'FLARE GUN';
            }
        }
        BB2.style.display = 'flex';
    }
}