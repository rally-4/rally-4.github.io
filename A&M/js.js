window.addEventListener('DOMContentLoaded', ()=>{
    var o = true;
    // let ip1 = '78.155.43.8';
    // const socket = io('http://' + ip1 + ':3000');
    var obj = {name: '', uid: -1, res: {materials: 0}}
    try{
        // obj = JSON.parse(sessionStorage.getItem('user'));
    }catch(err){
        console.log(err);
    }
    
    const TS1 = document.getElementById('TS1');
    const T1 = document.getElementById('T1');
    const TS2 = document.getElementById('TS2');
    const T2 = document.getElementById('T2');
    const TS3 = document.getElementById('TS3');
    const T3 = document.getElementById('T3');
    const TS4 = document.getElementById('TS4');
    const T4 = document.getElementById('T4');
    let TSArr = [TS1, TS2, TS3, TS4];
    let TArr = [T1, T2, T3, T4];
    obj.res.add = function(n, a, id, col){
        for(i=0; i<n.length; i++){
            if(obj.res[n[i]] == undefined){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + id[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (id[i]-1)*8 + '%)';
                
                var newDiv = document.createElement('div');
                newCraft.appendChild(newDiv);
                newDiv.style.backgroundColor = col[i];
                newDiv.style.border = '2px solid ' + col[i];
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + id[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
            }
            obj.res[n[i]] += a[i];
            document.getElementById('C' + id[i] + 'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
        }
    }
    
    let GKT = document.getElementById('GKT');
    if(obj.name != ''){
        GKT.innerHTML = obj.name + ', the compelled one...';
    }else{
        GKT.style.color = 'orange';
        GKT.innerHTML = 'You should not be here...';
    }
    
    let WhiteText = ["There is nothing else in here for you.", "Leave!", "You're not supposed to be here...", "Waiting for something to happen?", "Go fight some slimes!", "What do you want from me?", "Your presence disturbs me.", "What are you trying to accomplish?"];
    let OrangeText = ["You should not be here...", "Go away!", "You're hopeless...", "Why are you still here?", "..."];
    let WTI = 0;
    let OTI = 0;
    const input = document.getElementById('input');
    input.addEventListener('keyup', e=>{
        if(input.value == ''){
            GKT.style.color = 'white';
            if(WTUI > 7){WTI = 0}
            GKT.innerHTML = WhiteText[WTI];
            if(Math.random() >= 0.99){GKT.style.color = 'red'; GKT.innerHTML = "Anoxis will one day pay for what he did..."}
            WTI++;
        }
        if((e.key == 'Enter' || e.keyCode == 13) && input.value != ''){
            input.value = '';
            GKT.style.color = 'orange';
            if(OTI > 4){OTI = 0}
            GKT.innerHTML = [OTI];
            OTI++;
        }
    });
    
    let swap = function(tab){
        for(i=0; i < TSArr.length; i++){
            if(i != tab){
                TSArr[i].style.display = 'none';
                TArr[i].style.backgroundColor = 'rgb(60, 60, 60)';
            }else{
                TSArr[i].style.display = 'flex';
                TArr[i].style.backgroundColor = 'rgb(30, 30, 30)';
            }
        }
    }
    T1.addEventListener('click', ()=>{swap(0)});
    T2.addEventListener('click', ()=>{swap(1)});
    T3.addEventListener('click', ()=>{swap(2)});
    T4.addEventListener('click', ()=>{if(false){swap(3)}});
    swap(0);
    
    let e = false;
    let D1 = document.getElementById('D1');
    let AD1 = document.getElementById('AD1');
    D1.addEventListener('click', ()=>{
        D1.style.borderColor = 'rgb(105, 105, 105)';
        D1.style.backgroundColor = 'rgb(45, 45, 45)';
        D1.style.color = 'white';
        setTimeout(()=>{
            D1.style.borderColor = 'rgb(150, 150, 150)';
            D1.style.backgroundColor = 'rgb(210, 210, 210)';
            D1.style.color = 'black';
        }, 100);
        if(e){
            AD1.style.display = 'none';
            e = false;
        }else{
            AD1.style.display = 'flex';
            e = true;
        }
    });
    
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
    const BasicSlimeAttacks = [SLIDE, ABSORB, ENGULF];
    let CRAWL = new EnemyAttack('CRAWL', 30, 3);
    let CUT = new EnemyAttack('CUT', 80, 1, 75);
    const ScrapSlimeAttacks = [CRAWL, CUT, ENGULF];
    let ADVANCE = new EnemyAttack('ADVANCE', 25, 3, 50);
    let DELUGE = new EnemyAttack('DELUGE', 50, 3, 0, 0, 75, 75);
    let RECOVER = new EnemyAttack('RECOVER', 100, 5, 0, 0, 0, 250, 200);
    let ReinforcedSlimeAttacks = [ADVANCE, DELUGE, CUT, RECOVER];
    
    let UserHealth = 1000;
    let UserShield = 100;
    let ShieldDowntime = 20;
    let ShieldRegen = .02;
    
    let C1C = document.getElementById('C1C');
    
    // Wins -> Number of battles won | BossWins -> Wins required for bossfight.
    var A1Wins = 0; const A1BossWins = 4;
    
    // E -> Enemy, O -> Opponent, U -> User, P -> Player, H -> Health, S -> Shield
    let LoadFight = function(EnemyName, MaxEH, MaxES, EDowntime, ESR, MaxUH, MaxUS, UDowntime, USR, OpponentAttacks, mi, area, resnarr=[], resarr=[], idarr=[], colarr=[]){
        let Enemy = document.getElementById('Enemy'); Enemy.innerHTML = 'Incoming: ' + EnemyName + '!';
        Enemy.style.animation = '0.2s ease forwards slide';
        let EnemyN = document.getElementById('EnemyName'); EnemyN.innerHTML = EnemyName;
        let body = document.getElementById('body'); body.style.display = 'flex';
        let inv = document.getElementById('inv');
        let dar = document.getElementById('dar');
        let BS = document.getElementById('BlackScreen');
        let CD = document.getElementById('Countdown');
        CD.style.animation = '0.75s linear infinite fade';
        BS.style.display = 'flex';
        setTimeout(()=>{CD.textContent = '2...'},750);
        setTimeout(()=>{CD.textContent = '1...'},1500);
        setTimeout(()=>{CD.textContent = 'GO!';CD.style.animation = 'none'},2250);
        setTimeout(()=>{BS.style.display = 'none'; CD.textContent = '3...'; BEGIN()},3000);
        const ALL = body.querySelectorAll('*');
        
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
        
        MaxOH = MaxEH; // Max Opponent Health
        COH = MaxOH; // Current Oponent Health
        MaxOS = MaxES; // Max Opponent Shield
        COS = MaxOS; // Current Oponent Shield
       
        MaxPH = MaxUH; // Max Player Health
        CPH = MaxPH; // Current Player Heath
        MaxPS = MaxUS; // Max Player Shield
        CPS = MaxPS; // Current Player Shield
        
        ODowntime = EDowntime; // Opponent's Shield Downtime
        PDowntime = UDowntime; // Player's Shield Downtime
        OSD = 0; // variable for the Opponent's Shield Downtime
        PSD = 0; // variable for the Player's Shield Downtime
        OSR = ESR; // Oppoent's Shield Regeneration
        PSR = USR; // Player's Shield Regeneration
        
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
            let S1 = document.getElementById('S1'); S1.style.pointerEvents = 'auto';
            let S1C = document.getElementById('S1C');
            setRotateAnimation(S1C);
            let S2 = document.getElementById('S2'); S2.style.pointerEvents = 'auto';
            let S2C = document.getElementById('S2C');
            setRotateAnimation(S2C);
            
            // Smack
            if(o){
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
            }
            
            var t = 0;
            var CurrentAttack = false;
            let intervalId = setInterval(()=>{
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
                
                if(COH <= 0){
                    obj.res.materials += mi;
                    obj.res.add(resnarr, resarr, idarr, colarr);
                    C1C.innerHTML = 'Quantity: ' + obj.res.materials;
                    
                    if(area == 'A1'){A1Wins++}
                    if(area == 'A1B'){A1Wins = 0}
                }
                if(COH <= 0 || CPH <= 0 && c){
                    for(i=0; i < ALL.length; i++){
                        ALL[i].style.animation = 'none';
                        // ALL[i].style.transition = 'none';
                    }
                    S1.style.pointerEvents = 'none';
                    S2.style.pointerEvents = 'none';
                    // var S1A = S1C.getAnimations();if(S1A[0]){S1A[0].pause()}
                    // var S2A = S2C.getAnimations();if(S2A[0]){S2A[0].pause()}
                    S1A=''; this.S1A='';
                    S2A=''; this.S2A='';
                    inv.style.display = 'flex';
                    var op = 0;
                    setTimeout(()=>{inv.style.display = 'none'}, 200);
                    setTimeout(()=>{dar.style.display = 'flex'}, 500);
                    setSchedule(()=>{
                        op += 0.02;
                        dar.style.opacity = op + '';
                    }, 10, 50, 500);
                    setTimeout(()=>{dar.style.display = 'none'; dar.style.opacity = '0'; body.style.display = 'none'; o = false}, 1000);
                    // setTimeout(()=>{window.close()}, 1000);
                    clearInterval(intervalId);
                }
            }, 10);
        }
    }
    let E1 = document.getElementById('E1');
    E1.addEventListener('click', ()=>{
        if(A1Wins < A1BossWins){
            if(Math.random() < .5){
                LoadFight('Basic Slime', 400, 180, 5, .5, UserHealth, UserShield, ShieldDowntime, ShieldRegen, BasicSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], [2], ['rgb(0, 127, 255)']);
            }else{
                LoadFight('Scrap Slime', 350, 570, 10, .1, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ScrapSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], [2], ['rgb(0, 127, 255)']);
            }
        }else{
            LoadFight('Reinforced Slime', 1000, 750, 15, .2, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ReinforcedSlimeAttacks, 5, 'A1B', ['Slime', 'Slime Key'], [Math.round(3*Math.random())+3, 1], [2, 3], ['rgb(0, 127, 255)', 'rgb(0, 90, 210)']);
        }
    });
});
