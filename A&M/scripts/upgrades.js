const loadUpgrades = function(){
    const Cost1 = document.getElementById('Cost1'); cc1 = 8;
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
    
    const Cost5 = document.getElementById('Cost5'); cc5 = 20;
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
    
    const Cost9 = document.getElementById('Cost9');
    const DT9 = document.getElementById('DT9');
    const I9 = document.getElementById('I9');
    const U9 = document.getElementById('U9');
    
    const Cost10 = document.getElementById('Cost10');
    const DT10 = document.getElementById('DT10');
    const I10 = document.getElementById('I10');
    const U10 = document.getElementById('U10');
    
    const Cost11 = document.getElementById('Cost11'); cc11 = 5;
    const DT11 = document.getElementById('DT11');
    const I11 = document.getElementById('I11');
    const U11 = document.getElementById('U11');
    
    const Cost12 = document.getElementById('Cost12'); cc12 = 7;
    const DT12 = document.getElementById('DT12');
    const I12 = document.getElementById('I12');
    const U12 = document.getElementById('U12');
    
    const Cost13 = document.getElementById('Cost13');
    const DT13 = document.getElementById('DT13');
    const I13 = document.getElementById('I13');
    const U13 = document.getElementById('U13');
    
    const Cost14 = document.getElementById('Cost14');
    const DT14 = document.getElementById('DT14');
    const I14 = document.getElementById('I14');
    const U14 = document.getElementById('U14');
    
    const Cost15 = document.getElementById('Cost15');
    const DT15 = document.getElementById('DT15');
    const I15 = document.getElementById('I15');
    const U15 = document.getElementById('U15');
    
    S1AA = [U7, U14];
    S2AA = [U8];
    S3AA = [U2, U13];
    S4AA = [U3];
    S5AA = [U6, U15];
    
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
            Cost1.innerHTML = 'Cost: ' + cc1 + ' Slime';
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
            obj.unlocks.uu2 = true;
            if(obj.unlocks.uu13){U13.innerHTML = 'SELECT'}
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
        if(obj.unlocks.uu2){
            for(a of S3AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U2.innerHTML = 'SELECTED';
            for(const node of S3.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'SLASH';
                }
            }
            obj.AA.AA3v = 0;
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
            obj.unlocks.uu3 = true;
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
        if(obj.unlocks.uu3){
            for(a of S4AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U3.innerHTML = 'SELECTED';
            obj.AA.AA4v = 0;
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
            obj.add(['Slime Key'], [-1]);
            Cost4.innerHTML = '';
            U4.innerHTML = 'UNLOCKED';
            A2.style.display = 'flex';
            obj.unlocks.uu4 = true;
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
            obj.add(['Red Fluid'], [-cc5]); cc5 += 5;
            Cost5.innerHTML = 'Cost: ' + cc5 + ' Red Fluid';
            UserHealth += 100;
            I5.innerHTML = '\n<br>&nbsp; • Player Health: ' + UserHealth + ' -> ' + (UserHealth+100) + '\n<br>&nbsp;';
        }
        if(cc5 >= 70){
            U5.innerHTML = 'MAX';
            cc5 = Infinity;
            Cost5.innerHTML = 'Cost: ' + cc5 + ' Red Fluid';
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
        if(obj.res.materials >= 50 && !obj.unlocks.uu6){
            play(Upg);
            obj.res.materials -= 50;
            Cost6.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            obj.unlocks.uu6 = true;
            S5C.classList.remove('locked'); S5C.classList.add('chargeBox');
            S5C.style.backgroundColor = 'rgb(105,120,150)';
            S5C.style.opacity = '0';
            S5.addEventListener('pointerdown',()=>{
                if(A5Use < AA5[obj.AA.AA5v].uses){
                    clearTimeout(Casting);clearSchedule();
                    setSchedule((j)=>{
                        CTB.style.width=84/AA5[obj.AA.AA5v].casting*j+'%';
                        CTB.style.opacity=.4*j/AA5[obj.AA.AA5v].casting;
                    },10,AA5[obj.AA.AA5v].casting);
                    Casting=setTimeout(()=>{
                        if(this.S5A){S5A=this.S5A}
                        if(S5A!='[object CSSAnimation]'){var S5A=S5C.getAnimations();this.S5A=S5A}
                        S5A[0].play();S5.style.pointerEvents='none';
                        AA5[obj.AA.AA5v].func();
                        A5Use++;CB5.style.height=(AA5[obj.AA.AA5v].uses-A5Use)/AA5[obj.AA.AA5v].uses*100+'%';
                        CTB.style.width=0;
                    },AA5[obj.AA.AA5v].casting*10);
                }
            });S5C.addEventListener('animationend',()=>{S5.style.pointerEvents = 'auto'});
        }
        if(obj.unlocks.uu6){
            for(a of S5AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U6.innerHTML = 'SELECTED';
            for(const node of S5.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'HEAL';
                }
            }
            obj.AA.AA5v = 0;
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
            obj.unlocks.uu7 = true;
            obj.AA.AA1v = 1;
        }
        if(obj.unlocks.uu7){
            S1.style.fontSize = '46px';
            for(a of S1AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U7.innerHTML = 'SELECTED';
            for(const node of S1.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'BLAST';
                }
            }
            BB1.style.display = 'none';
            obj.AA.AA1v = 1;
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
            obj.unlocks.uu8 = true;
            obj.AA.AA2v = 1;
        }
        if(obj.unlocks.uu8){
            for(a of S2AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U8.innerHTML = 'SELECTED';
            for(const node of S2.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'FLARE GUN';
                }
            }
            BB2.style.display = 'flex';
            obj.AA.AA2v = 1;
        }
    });
    
    // MOLTEN CLIFFS
    DT9.addEventListener('click',()=>{
        if(I9.style.display == 'flex'){
            I9.style.display = 'none';
        }else{
            I9.style.display = 'flex';
        }
    });
    U9.addEventListener('click',()=>{
        if(obj.res['Rusty Key'] >= 1 && !obj.unlocks.uu9){
            play(Upg);
            obj.add(['Rusty Key'], [-1]);
            Cost9.innerHTML = '';
            U9.innerHTML = 'UNLOCKED';
            A3.style.display = 'flex';
            obj.unlocks.uu9 = true;
        }
    });
    
    // COLLAPSED CITY
    DT10.addEventListener('click',()=>{
        if(I10.style.display == 'flex'){
            I10.style.display = 'none';
        }else{
            I10.style.display = 'flex';
        }
    });
    U10.addEventListener('click',()=>{
        if(obj.res['Rusty Key'] >= 1 && !obj.unlocks.uu10){
            play(Upg);
            obj.add(['Rusty Key'], [-1]);
            Cost10.innerHTML = '';
            U10.innerHTML = 'UNLOCKED';
            A4.style.display = 'flex';
            obj.unlocks.uu10 = true;
        }
    });
    
    // SHIELD REGENERATION
    DT11.addEventListener('click',()=>{
        if(I11.style.display == 'flex'){
            I11.style.display = 'none';
        }else{
            I11.style.display = 'flex';
        }
    });
    U11.addEventListener('click',()=>{
        if(obj.res['Chitin'] >= cc11){
            play(Upg);
            obj.upgrades.uu11++;
            obj.add(['Chitin'], [-cc11]); cc11 += 3;
            Cost11.innerHTML = 'Cost: ' + cc11 + ' Chitin';
            ShieldRegen += .005;
            ShieldRegen = Number(ShieldRegen.toFixed(3));
            I11.innerHTML = '\n<br>&nbsp; • Shield Regeneration: ' + Number((100*ShieldRegen).toFixed(3)) + ' -> ' + Number((100*(ShieldRegen+.005)).toFixed(3)) + '\n<br>&nbsp;';
        }
        if(cc11 >= 53){
            U11.innerHTML = 'MAX';
            cc11 = Infinity;
            Cost11.innerHTML = 'Cost: ' + cc11 + ' Chitin';
        }
    });
    
    // SHIELD DOWNTIME
    DT12.addEventListener('click',()=>{
        if(I12.style.display == 'flex'){
            I12.style.display = 'none';
        }else{
            I12.style.display = 'flex';
        }
    });
    U12.addEventListener('click',()=>{
        if(obj.res['Orichalcum'] >= cc12){
            play(Upg);
            obj.upgrades.uu12++;
            obj.add(['Orichalcum'], [-cc12]); cc12 = 7+Math.ceil(4*Math.sqrt(obj.upgrades.uu12));
            Cost12.innerHTML = 'Cost: ' + cc12 + ' Orichalcum';
            ShieldDowntime /= 1.1;
            I12.innerHTML = '\n<br>&nbsp; • Shield Downtime: ' + ShieldDowntime.toFixed(2) + ' -> ' + (ShieldDowntime/1.1).toFixed(2) + '\n<br>&nbsp;';
        }
        if(obj.upgrades.uu12 >= 10){
            U12.innerHTML = 'MAX';
            cc12 = Infinity;
            Cost12.innerHTML = 'Cost: ' + cc12 + ' Orichalcum';
        }
    });
    
    // STAB
    DT13.addEventListener('click',()=>{
        if(I13.style.display == 'flex'){
            I13.style.display = 'none';
        }else{
            I13.style.display = 'flex';
        }
    });
    U13.addEventListener('click',()=>{
        if(obj.res.materials >= 48 && !obj.unlocks.uu13 && obj.unlocks.uu2){
            play(Upg);
            obj.res.materials -= 48;
            Cost13.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            obj.unlocks.uu13 = true;
        }
        if(obj.unlocks.uu13){
            for(a of S3AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U13.innerHTML = 'SELECTED';
            for(const node of S3.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'STAB';
                }
            }
            obj.AA.AA3v = 1;
        }
    });
    
    // FRAG GRENADE
    DT14.addEventListener('click',()=>{
        if(I14.style.display == 'flex'){
            I14.style.display = 'none';
        }else{
            I14.style.display = 'flex';
        }
    });
    U14.addEventListener('click',()=>{
        if(obj.res.materials >= 60 && !obj.unlocks.uu14 && obj.unlocks.uu7){
            play(Upg);
            obj.res.materials -= 60;
            Cost14.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            obj.unlocks.uu14 = true;
        }
        if(obj.unlocks.uu14){
            S1.style.fontSize = '30px';
            for(a of S1AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U14.innerHTML = 'SELECTED';
            for(const node of S1.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'FRAG GRENADE';
                }
            }
            BB1.style.display = 'flex';
            obj.AA.AA1v = 2;
        }
    });
    
    // MAGMA FLOWER
    DT15.addEventListener('click',()=>{
        if(I15.style.display == 'flex'){
            I15.style.display = 'none';
        }else{
            I15.style.display = 'flex';
        }
    });
    U15.addEventListener('click',()=>{
        if(obj.res.materials >= 75 && !obj.unlocks.uu15 && obj.unlocks.uu6){
            play(Upg);
            obj.res.materials -= 75;
            Cost15.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            obj.unlocks.uu15 = true;
        }
        if(obj.unlocks.uu15){
            S5.style.fontSize = '46px';
            for(a of S5AA){
                let unum = Number(a.id.slice(1));
                if(obj.unlocks[`uu${unum}`]){
                    a.innerHTML = 'SELECT';
                }else{
                    a.innerHTML = 'Unlock';
                }
            }
            U15.innerHTML = 'SELECTED';
            for(const node of S5.childNodes){
                if(node.nodeType === 3){
                    node.textContent = 'MAGMA FLOWER';
                }
            }
            obj.AA.AA5v = 1;
        }
    });
}