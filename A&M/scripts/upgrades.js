const loadUpgrades = function(){
    const Cost1 = document.getElementById('Cost1'); let cc1 = 8;
    const DT1 = document.getElementById('DT1');
    const I1 = document.getElementById('I1');
    const U1 = document.getElementById('U1');
    
    const Cost2 = document.getElementById('Cost2');
    const DT2 = document.getElementById('DT2');
    const I2 = document.getElementById('I2');
    const U2 = document.getElementById('U2');
    A3Use = 0;
    
    const Cost3 = document.getElementById('Cost3');
    const DT3 = document.getElementById('DT3');
    const I3 = document.getElementById('I3');
    const U3 = document.getElementById('U3');
    A4Use = 0;
    
    const Cost4 = document.getElementById('Cost4');
    const DT4 = document.getElementById('DT4');
    const I4 = document.getElementById('I4');
    const U4 = document.getElementById('U4');
    
    const Cost5 = document.getElementById('Cost5'); let cc5 = 20;
    const DT5 = document.getElementById('DT5');
    const I5 = document.getElementById('I5');
    const U5 = document.getElementById('U5');
    
    const Cost6 = document.getElementById('Cost6');
    const DT6 = document.getElementById('DT6');
    const I6 = document.getElementById('I6');
    const U6 = document.getElementById('U6');
    A5Use = 0;
    
    const Cost7 = document.getElementById('Cost7');
    const DT7 = document.getElementById('DT7');
    const I7 = document.getElementById('I7');
    const U7 = document.getElementById('U7');
    
    const Cost8 = document.getElementById('Cost8');
    const DT8 = document.getElementById('DT8');
    const I8 = document.getElementById('I8');
    const U8 = document.getElementById('U8');
    
    // SHIELD
    DT1.addEventListener('click',()=>{
        if(I1.style.display == 'flex'){
            I1.style.display = 'none';
        }else{
            I1.style.display = 'flex';
        }
    });
    U1.addEventListener('click',()=>{
        if(obj.res.Slime >= cc1){
            play(Upg);
            obj.upgrades.uu1++;
            obj.res.Slime -= cc1; cc1 += 2;
            Cost1.innerHTML = 'Cost: ' + cc1 + ' Slime';
            CSlimeC.innerHTML = 'Quantity: ' + obj.res.Slime;
            UserShield += 50;
            I1.innerHTML = '\n<br>&nbsp; • Player Shield: ' + UserShield + ' -> ' + (UserShield+50) + '\n<br>&nbsp;';
        }
        if(cc1 >= 40){
            U1.innerHTML = 'MAX';
            cc1 = Infinity;
        }
    });
    
    // SLASH
    DT2.addEventListener('click',()=>{
        if(I2.style.display == 'flex'){
            I2.style.display = 'none';
        }else{
            I2.style.display = 'flex';
        }
    });
    U2.addEventListener('click',()=>{
        if(obj.res.materials >= 9 && !obj.unlocks.uu2){
            play(Upg);
            obj.res.materials -= 9;
            Cost2.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U2.innerHTML = 'SELECTED'; obj.unlocks.uu2 = true;
            S3C.classList.remove('locked'); S3C.classList.add('chargeBox');
            S3C.style.backgroundColor = 'rgb(105,120,150)';
            S3C.style.opacity = '0';
            S3.addEventListener('pointerdown',()=>{
                if(A3Use < AA3[AA3v].uses){
                    if(this.S3A){S3A = this.S3A}
                    if(S3A != '[object CSSAnimation]'){var S3A = S3C.getAnimations();this.S3A = S3A}
                    S3A[0].play(); S3.style.pointerEvents = 'none';
                    AA3[AA3v].func();
                    A3Use++;
                }
            }); S3C.addEventListener('animationend',()=>{S3.style.pointerEvents = 'auto'});
        }
        if(obj.unlocks.uu2){
            U2.innerHTML = 'SELECTED';
            AA3v = 0;
        }
    });
    
    // STUN
    DT3.addEventListener('click',()=>{
        if(I3.style.display == 'flex'){
            I3.style.display = 'none';
        }else{
            I3.style.display = 'flex';
        }
    });
    U3.addEventListener('click',()=>{
        if(obj.res.materials >= 15 && !obj.unlocks.uu3){
            play(Upg);
            obj.res.materials -= 15;
            Cost3.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U3.innerHTML = 'SELECTED'; obj.unlocks.uu3 = true;
            S4C.classList.remove('locked'); S4C.classList.add('chargeBox');
            S4C.style.backgroundColor = 'rgb(105,120,150)';
            S4C.style.opacity = '0';
            S4.addEventListener('pointerdown',()=>{
                if(A4Use < AA4[AA4v].uses){
                    if(this.S4A){S4A = this.S4A}
                    if(S4A != '[object CSSAnimation]'){var S4A = S4C.getAnimations();this.S4A = S4A}
                    S4A[0].play(); S4.style.pointerEvents = 'none';
                    AA4[AA4v].func();
                    A4Use++;
                }
            }); S4C.addEventListener('animationend',()=>{S4.style.pointerEvents = 'auto'});
        }
        if(obj.unlocks.uu3){
            U3.innerHTML = 'SELECTED';
            AA4v = 0;
        }
    });
    
    // BADLANDS
    DT4.addEventListener('click',()=>{
        if(I4.style.display == 'flex'){
            I4.style.display = 'none';
        }else{
            I4.style.display = 'flex';
        }
    });
    U4.addEventListener('click',()=>{
        if(obj.res['Slime Key'] >= 1 && !obj.unlocks.uu4){
            play(Upg);
            obj.res.add(['Slime Key'], [-1]);
            Cost4.innerHTML = '';
            U4.innerHTML = 'UNLOCKED'; obj.unlocks.uu4 = true;
            A2.style.display = 'flex';
        }
    });
    
    // HEALTH
    DT5.addEventListener('click',()=>{
        if(I5.style.display == 'flex'){
            I5.style.display = 'none';
        }else{
            I5.style.display = 'flex';
        }
    });
    U5.addEventListener('click',()=>{
        if(obj.res['Red Fluid'] >= cc5){
            play(Upg);
            obj.upgrades.uu5++;
            obj.res.add(['Red Fluid'], [-cc5]); cc5 += 5;
            Cost5.innerHTML = 'Cost: ' + cc5 + ' Red Fluid';
            UserHealth += 100;
            I5.innerHTML = '\n<br>&nbsp; • Player Health: ' + UserHealth + ' -> ' + (UserHealth+100) + '\n<br>&nbsp;';
        }
        if(cc5 >= 70){
            U5.innerHTML = 'MAX';
            cc5 = Infinity;
        }
    });
    
    // HEAL
    DT6.addEventListener('click',()=>{
        if(I6.style.display == 'flex'){
            I6.style.display = 'none';
        }else{
            I6.style.display = 'flex';
        }
    });
    U6.addEventListener('click',()=>{
        if(obj.res.materials >= 40 && !obj.unlocks.uu6){
            play(Upg);
            obj.res.materials -= 40;
            Cost6.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U6.innerHTML = 'SELECTED'; obj.unlocks.uu6 = true;
            S5C.classList.remove('locked'); S5C.classList.add('chargeBox');
            S5C.style.backgroundColor = 'rgb(105,120,150)';
            S5C.style.opacity = '0';
            S5.addEventListener('pointerdown',()=>{
                if(A5Use < AA5[AA5v].uses){
                    if(this.S5A){S5A = this.S5A}
                    if(S5A != '[object CSSAnimation]'){var S5A = S5C.getAnimations();this.S5A = S5A}
                    S5A[0].play(); S5.style.pointerEvents = 'none';
                    AA5[AA5v].func();
                    A5Use++; CB5.style.height = (AA5[AA5v].uses-A5Use)/AA5[AA5v].uses*100 + '%';
                }
            }); S5C.addEventListener('animationend',()=>{S5.style.pointerEvents = 'auto'});
        }
        if(obj.unlocks.uu6){
            U6.innerHTML = 'SELECTED';
            AA5v = 0;
        }
    });
    
    // BLAST
    DT7.addEventListener('click',()=>{
        if(I7.style.display == 'flex'){
            I7.style.display = 'none';
        }else{
            I7.style.display = 'flex';
        }
    });
    U7.addEventListener('click',()=>{
        if(obj.res.materials >= 18 && !obj.unlocks.uu7){
            play(Upg);
            obj.res.materials -= 18;
            Cost7.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U7.innerHTML = 'SELECTED'; obj.unlocks.uu7 = true;
            for(const node of S1.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'BLAST';
                }
            }
            AA1v = 1;
        }
        if(obj.unlocks.uu7){
            U7.innerHTML = 'SELECTED';
            for(const node of S1.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'BLAST';
                }
            }
            AA1v = 1;
        }
    });
    
    // FLARE GUN
    DT8.addEventListener('click',()=>{
        if(I8.style.display == 'flex'){
            I8.style.display = 'none';
        }else{
            I8.style.display = 'flex';
        }
    });
    U8.addEventListener('click',()=>{
        if(obj.res.materials >= 24 && !obj.unlocks.uu8){
            play(Upg);
            obj.res.materials -= 24;
            Cost8.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U8.innerHTML = 'SELECTED'; obj.unlocks.uu8 = true;
            for(const node of S2.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'FLARE GUN';
                }
            }
            BB2.style.display = 'flex';
            AA2v = 1;
        }
        if(obj.unlocks.uu8){
            U8.innerHTML = 'SELECTED';
            for(const node of S2.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'FLARE GUN';
                }
            }
            BB2.style.display = 'flex';
            AA2v = 1;
        }
    });
}