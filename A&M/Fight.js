window.onload=()=>{
    let body = document.getElementById('body');
    let inv = document.getElementById('inv');
    let dar = document.getElementById('dar');
    let BS = document.getElementById('BlackScreen');
    let CD = document.getElementById('Countdown');
    setTimeout(()=>{CD.textContent = '2...'},750);
    setTimeout(()=>{CD.textContent = '1...'},1500);
    setTimeout(()=>{CD.textContent = 'GO!';CD.style.animation = 'none'},2250);
    setTimeout(()=>{BS.style.display = 'none';BEGIN()},3000);
    const ALL = document.querySelectorAll('*');
    
    let OH = document.getElementById('OH'); // Opponent's Health Bar
    let OS = document.getElementById('OS'); // Opponent's Shield Bar
    let PH = document.getElementById('PH'); // Player's Health Bar
    let PS = document.getElementById('PS'); // Player's Shield Bar
    
    let OHS = document.getElementById('OHS'); // Opponent's Health State
    let OHT = document.getElementById('OHT'); // Opponent's Health Text
    let OSS = document.getElementById('OSS'); // Opponent's Shield State
    let OST = document.getElementById('OST'); // Opponent's Shield Text
    let PHS = document.getElementById('PHS'); // Player's Health State
    let PHT = document.getElementById('PHT'); // Player's Health Text
    let PSS = document.getElementById('PSS'); // Player's Shield State
    let PST = document.getElementById('PST'); // Player's Shield Text
    
    let ABT = document.getElementById('EnemyAttack');
    let AB = document.getElementById('AttackBar');
    let ABwidth = 0;
    
    // Enemy Attacks
    class EnemyAttack{
        constructor(name, chance, casting, damage=0, penetratingdamage=0, shielddamage=0, heal=0, shieldheal=0){
            this.name = name;
            this.chance = chance;
            this.casting = casting;
            
            this.damage = damage;
            this.penetratingdamage = penetratingdamage;
            this.shielddamage = shielddamage;
            this.heal = heal;
            this.shieldheal = shieldheal;
        }
    }
    let SLIDE = new EnemyAttack('SLIDE', 40, 2);
    let ABSORB = new EnemyAttack('ABSORB', 75, 4, 25, 0, 0, 50);
    let ENGULF = new EnemyAttack('ENGULF', 100, 4, 50, 0, 0, 25);
    let OpponentAttacks = [SLIDE, ABSORB, ENGULF];
    
    // Health or Shield bar color change
    let R=(pA)=>{
        if(pA){
            OH.style.backgroundColor = 'red';
            setTimeout(()=>{OH.style.backgroundColor = 'rgb(255, 127, 127)'}, 50);
            setTimeout(()=>{OH.style.backgroundColor = 'white'}, 100);
        }else{
            PH.style.backgroundColor = 'red';
            setTimeout(()=>{PH.style.backgroundColor = 'rgb(255, 127, 127)'}, 50);
            setTimeout(()=>{PH.style.backgroundColor = 'white'}, 100);
        }
    }
    let P=(pA)=>{
        if(pA){
            OS.style.backgroundColor = 'rgb(255, 0, 255)';
            setTimeout(()=>{OS.style.backgroundColor = 'rgb(255, 127, 255)'}, 50);
            setTimeout(()=>{OS.style.backgroundColor = 'white'}, 100);
        }else{
            PS.style.backgroundColor = 'rgb(255, 0, 255)';
            setTimeout(()=>{PS.style.backgroundColor = 'rgb(255, 127, 255)'}, 50);
            setTimeout(()=>{PS.style.backgroundColor = 'white'}, 100);
        }
    }
    let H=(pA)=>{
        if(pA){
            OH.style.backgroundColor = 'lime';
            setTimeout(()=>{OH.style.backgroundColor = 'rgb(127, 255, 127)'}, 50);
            setTimeout(()=>{OH.style.backgroundColor = 'white'}, 100);
        }else{
            PH.style.backgroundColor = 'lime';
            setTimeout(()=>{PH.style.backgroundColor = 'rgb(127, 255, 127)'}, 50);
            setTimeout(()=>{PH.style.backgroundColor = 'white'}, 100);
        }
    }
    let SH=(pA)=>{
        if(pA){
            OS.style.backgroundColor = 'lime';
            setTimeout(()=>{OS.style.backgroundColor = 'rgb(127, 255, 127)'}, 50);
            setTimeout(()=>{OS.style.backgroundColor = 'white'}, 100);
        }else{
            PS.style.backgroundColor = 'lime';
            setTimeout(()=>{PS.style.backgroundColor = 'rgb(127, 255, 127)'}, 50);
            setTimeout(()=>{PS.style.backgroundColor = 'white'}, 100);
        }
    }
    
    // Constants and variables
    const width = 80;
    
    var MaxOH = 400; // Max Opponent Health
    var COH = 400; // Current Oponent Health
    var MaxOS = 180; // Max Opponent Shield
    var COS = 180; // Current Oponent Shield
    
    var MaxPH = 1000; // Max Player Health
    var CPH = 1000; // Current Player Heath
    var MaxPS = 100; // Max Player Shield
    var CPS = 100; // Current Player Shield
    
    const ODowntime = 5; // Opponent's Shield Downtime
    const PDowntime = 20; // Player's Shield Downtime
    var OSD = 0; // variable for the Opponent's Shield Downtime
    var PSD = 0; // variable for the Player's Shield Downtime
    let OSR = 0.5; // Oppoent's Shield Regeneration
    let PSR = 0.02; // Player's Shield Regeneration
    
    // Attack and heal functions
    let Damage = function(d, pA){
        if(pA){
            if(COS > 0){
                if(COS >= d){
                    COS -= d; P(pA);
                }else{
                    COH += COS - d; R(pA);
                    COS -= COS; P(pA);
                }
            }else{
                COH -= d; R(pA); OSD = ODowntime;
            }
        }else{
            if(CPS > 0){
                if(CPS >= d){
                    CPS -= d; P(pA);
                }else{
                    CPH += CPS - d; R(pA);
                    CPS -= CPS; P(pA);
                }
            }else{
                CPH -= d; R(pA); PSD = PDowntime;
            }
        }
    }
    let PenetratingDamage = function(d, pA){
        if(pA){
            COH -= d; R(pA);
            if(COS <= 0){
                OSD = ODowntime;
            }
        }else{
            CPH -= d; R(pA);
            if(CPS <= 0){
                PSD = PDowntime;
            }
        }
    }
    let ShieldDamage = function(d, pA){
        if(pA){
            COS -= d; P(pA);
        }else{
            CPS -= d; P(pA);
        }
    }
    let Heal = function(h, pA){
        if(pA){
            COH += h; H(pA);
        }else{
            CPH += h; H(pA);
        }
    }
    let ShieldHeal = function(h, pA){
        if(pA){
            COS += h; SH(pA);
        }else{
            CPS += h; SH(pA);
        }
    }
    
    // Display
    let display = function(){
        var OHP = width - (COH * width / MaxOH);
        OHS.style.width = OHP + '%';
        OHT.textContent = COH.toFixed(1) + ' / ' + MaxOH;
        
        var OSP = width - (COS * width / MaxOS);
        OSS.style.width = OSP + '%';
        OST.textContent = COS.toFixed(1) + ' / ' + MaxOS;
        
        var PHP = width - (CPH * width / MaxPH);
        PHS.style.width = PHP + '%';
        PHT.textContent = CPH.toFixed(1) + ' / ' + MaxPH;
        
        var PSP = width - (CPS * width / MaxPS);
        PSS.style.width = PSP + '%';
        PST.textContent = CPS.toFixed(1) + ' / ' + MaxPS;
        
        AB.style.width = ABwidth + '%';
    }
    
    let BEGIN = function(){
        // Player attacks
        let S1 = document.getElementById('S1');
        let S1C = document.getElementById('S1C');
        let S2 = document.getElementById('S2');
        let S2C = document.getElementById('S2C');
        
        // Smack
        S1.addEventListener('pointerdown', ()=>{
            if(this.S1A){S1A = this.S1A}
            if(S1A != '[object CSSAnimation]'){var S1A = S1C.getAnimations(); this.S1A = S1A}
            S1A[0].play(); S1.style.pointerEvents = 'none';
            Damage(60, true);
        }); S1C.addEventListener('animationend', ()=>{S1.style.pointerEvents = 'auto'});
        
        // Charge
        S2.addEventListener('pointerdown', ()=>{
            if(this.S2A){S2A = this.S2A}
            if(S2A != '[object CSSAnimation]'){var S2A = S2C.getAnimations(); this.S2A = S2A}
            S2A[0].play(); S2.style.pointerEvents = 'none';
            ShieldDamage(80, true);
            Damage(40, true);
        }); S2C.addEventListener('animationend', ()=>{S2.style.pointerEvents = 'auto'});
        
        var c = 1;
        var t = 0;
        var CurrentAttack = false;
        setInterval(()=>{
            if(c){
                if(CurrentAttack != false){
                    if(t <= CurrentAttack.casting){
                        ABwidth += (0.01*80/CurrentAttack.casting);
                        t += 0.01;
                    }else{
                        ABwidth = 0;
                        if(CurrentAttack.damage != 0){
                            Damage(CurrentAttack.damage, false);
                        }
                        if(CurrentAttack.penetratingdamage != 0){
                            PenetratingDamage(CurrentAttack.penetratingdamage, false);
                        }
                        if(CurrentAttack.shielddamage != 0){
                            ShieldDamage(CurrentAttack.shielddamage, false);
                        }
                        if(CurrentAttack.heal != 0){
                            Heal(CurrentAttack.heal, true);
                        }
                        if(CurrentAttack.shieldheal != 0){
                            ShieldHeal(CurrentAttack.shieldheal, true);
                        }
                        CurrentAttack = false;
                    }
                }else{
                    var r = Math.random()*100;
                    for(i=0; i < OpponentAttacks.length; i++){
                        if(r <= OpponentAttacks[i].chance){
                            CurrentAttack = OpponentAttacks[i];
                            AB.textContent = CurrentAttack.name;
                            t = 0;
                            break;
                        }
                    }
                }
                
                // Opponent's Shield
                if(COS <= 0){
                    COS = 0;if(OSD == 0){OSD = ODowntime}
                }if(OSD <= 0){
                    COS += OSR;OSD = 0;
                }else{OSD -= 0.01}
                // Player's Shield
                if(CPS <= 0){
                    CPS = 0;if(PSD == 0){PSD = PDowntime}
                }if(PSD <= 0){
                    CPS += PSR;PSD = 0;
                }else{PSD -= 0.01}
                
                if(COH > MaxOH){COH = MaxOH}if(COH < 0){COH = 0}
                if(COS > MaxOS){COS = MaxOS}
                if(CPH > MaxPH){CPH = MaxPH}if(CPH < 0){CPH = 0}
                if(CPS > MaxPS){CPS = MaxPS}
                display();
                
                if(COH <= 0 || CPH <= 0 && c){
                    for(i=0; i < ALL.length; i++){
                        ALL[i].style.animation = 'none';
                        ALL[i].style.transition = 'none';
                    }
                    S1.style.pointerEvents = 'none';
                    S2.style.pointerEvents = 'none';
                    var S1A = S1C.getAnimations();if(S1A[0]){S1A[0].pause()}
                    var S2A = S2C.getAnimations();if(S2A[0]){S2A[0].pause()}
                    inv.style.display = 'flex';
                    var op = 0;
                    setTimeout(()=>{inv.style.display = 'none'}, 200);
                    setTimeout(()=>{
                        dar.style.display = 'flex';
                        setInterval(()=>{
                            op += .02;
                            dar.style.opacity = op + '';
                        }, 10);
                    }, 500);
                    setTimeout(()=>{window.close()}, 1000);
                    c = 0;
                }
            }
        }, 10);
    }
}
