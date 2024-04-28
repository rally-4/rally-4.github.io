window.addEventListener('DOMContentLoaded',()=>{
    // let ip1 = '78.155.43.8';
    // const socket = io('http://' + ip1 + ':3000');
    
    // TABS
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
    const UT1 = document.getElementById('UT1');
    const UTS1 = document.getElementById('UTS1');
    const UT2 = document.getElementById('UT2');
    const UTS2 = document.getElementById('UTS2');
    let UTSArr = [UTS1, UTS2];
    let UTArr = [UT1, UT2];
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
    let subswap = function(stab){
        for(j=0; j < UTSArr.length; j++){
            if(j != stab){
                UTSArr[j].style.display = 'none';
                UTArr[j].style.color = 'rgb(60,60,60)';
                UTArr[j].style.backgroundColor = 'rgb(165,165,165)';
            }else{
                UTSArr[j].style.display = 'flex';
                UTArr[j].style.color = 'white';
                UTArr[j].style.backgroundColor = 'rgb(30,30,30)';
            }
        }
    }
    T1.addEventListener('click', ()=>{swap(0)});
    T2.addEventListener('click', ()=>{swap(1)});
    T3.addEventListener('click', ()=>{swap(2)});
    T4.addEventListener('click', ()=>{if(obj.A1C){swap(3)}});
    UT1.addEventListener('click', ()=>{subswap(0)});
    UT2.addEventListener('click', ()=>{subswap(1)});
    swap(0);subswap(0);
    
    // OBJ AND RESOURCES
    var obj = {name: '', uid: -1, res: {materials: 0}, tutorial: true, A1C: false}
    /* if(sessionStorage.getItem('user') != undefined){
        obj = JSON.parse(sessionStorage.getItem('user'));
    } */
    if(obj.A1C){
        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';
    }
    obj.res.add = function(n, a, col){
        for(i=0; i<n.length; i++){
            if(obj.res[n[i]] == undefined){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + n[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (Object.keys(obj.res).length-2)*8 + '%)';
                
                var newDiv = document.createElement('div');
                newCraft.appendChild(newDiv);
                newDiv.style.backgroundColor = col[i];
                newDiv.style.border = '2px solid ' + col[i];
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + n[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
            }
            obj.res[n[i]] += a[i];
            document.getElementById('C' + n[i] + 'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
        }
     }
    
    // TEXTBOX
    const trunk = document.getElementById('trunk');
    const name = document.getElementById('name');
    const img = document.getElementById('img');
    const txt = document.getElementById('txt');
    const div = document.getElementById('col');
    div.style.pointerEvents = 'none';
    let displayText = function(txtarr, imgarr, namarr){
        trunk.style.display = 'flex';
        count = 0;
        this.txtarr = txtarr;
        this.imgarr = imgarr;
        this.namarr = namarr;
        next();
    }
    let next=()=>{
        if(count >= txtarr.length){
            trunk.style.display = 'none';
            div.style.pointerEvents = 'none';
            if((count >= txtarr.length) && obj.tutorial){
                LoadFight('C0', 8500, 1500, 2, 0.05, UserHealth, UserShield, ShieldDowntime, ShieldRegen, C0Attacks, 0, 'Tutorial');
                setTimeout(()=>{obj.tutorial = false}, 4000);
            }
        }else{
            txt.innerHTML = "&gt; " + txtarr[count];
            img.setAttribute('src', "assets/images/" + imgarr[count]);
            name.innerHTML = "&nbsp;" + namarr[count] + "&nbsp;";
            count++;
        }
    }
    trunk.addEventListener('click', next);
    if(obj.tutorial){
        displayText(["Ah, another individual has awakened from its slumber!", "Hopefully you don't die like all the others...", "The objective is simple: you are to vanquish the vermin which have overtaken our planet following the Anoxiphandric Catastrophe.", "Since you might require some basic knowledge on how to fight, I will briefly demonstrate the way we battle around here...", "Very well then, let's begin."], ["c01.png", "c02.png", "c01.png", "c01.png", "c01.png"], ["C0", "C0", "C0", "C0", "C0"]);
    }
    
    // C0 VAULT
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
    let OTI = 1;
    const input = document.getElementById('input');
    input.addEventListener('keyup', e=>{
        if(input.value == ''){
            GKT.style.color = 'white';
            if(WTI > 7){WTI = 0}
            GKT.innerHTML = WhiteText[WTI];
            if(Math.random() >= 0.995){GKT.style.color = 'red'; GKT.innerHTML = "Anoxis will one day pay for what he did..."; WTI--}
            WTI++;
        }
        if((e.key == 'Enter' || e.keyCode == 13) && input.value != ''){
            input.value = '';
            GKT.style.color = 'orange';
            if(OTI > 4){OTI = 0}
            GKT.innerHTML = OrangeText[OTI];
            OTI++;
        }
    });
    
    // SUBURBAN DETAILS
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
    
    // ENEMY ATTACKS
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
    let ABSORB = new EnemyAttack('ABSORB', 75, 4, 50, 0, 0, 50);
    let ENGULF = new EnemyAttack('ENGULF', 100, 4, 75, 0, 0, 25);
    const BasicSlimeAttacks = [SLIDE, ABSORB, ENGULF];
    let CRAWL = new EnemyAttack('CRAWL', 30, 3);
    let CUT = new EnemyAttack('CUT', 80, 1, 75);
    const ScrapSlimeAttacks = [CRAWL, CUT, ENGULF];
    let ADVANCE = new EnemyAttack('ADVANCE', 25, 3, 50);
    let DELUGE = new EnemyAttack('DELUGE', 50, 3, 0, 0, 75, 75);
    let RECOVER = new EnemyAttack('RECOVER', 100, 7, 0, 0, 0, 250, 150);
    let ReinforcedSlimeAttacks = [ADVANCE, DELUGE, CUT, RECOVER];
    
    let ATTACK = new EnemyAttack('ATTACK', 100, 2, 150);
    let C0Attacks = [ATTACK];
    
    let UserHealth = 1000;
    let UserShield = 200;
    let ShieldDowntime = 20;
    let ShieldRegen = .02;
    
    let C1C = document.getElementById('C1C');
    
    // UPGRADES
    const Cost1 = document.getElementById('Cost1'); let cc1 = 8;
    const DT1 = document.getElementById('DT1'); const I1 = document.getElementById('I1');
    DT1.addEventListener('click',()=>{
        if(I1.style.display == 'flex'){
            I1.style.display = 'none';
        }else{
            I1.style.display = 'flex';
        }
    });
    const U1 = document.getElementById('U1');
    U1.addEventListener('click',()=>{
        if(obj.res.Slime >= cc1){
            obj.res.Slime -= cc1; cc1 += 2;
            Cost1.innerHTML = 'Cost: ' + cc1 + ' Slime';
            CSlimeC.innerHTML = 'Quantity: ' + obj.res.Slime;
            UserShield += 50;
            I1.innerHTML = '\n<br>&nbsp; • Player Shield: ' + UserShield + ' -> ' + (UserShield+50) + '\n<br>&nbsp;';
        }
        if(cc1 >= 40){
            U1.innerHTML = 'MAX';
            U1.removeEventListener('click',this);
        }
    });
    
    const Cost2 = document.getElementById('Cost2');
    const DT2 = document.getElementById('DT2'); const I2 = document.getElementById('I2');
    DT2.addEventListener('click',()=>{
        if(I2.style.display == 'flex'){
            I2.style.display = 'none';
        }else{
            I2.style.display = 'flex';
        }
    });
    const U2 = document.getElementById('U2'); let uu2 = false;
    U2.addEventListener('click',()=>{
        if(obj.res.materials >= 9){
            obj.res.materials -= 9;
            Cost2.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U2.innerHTML = 'SELECTED'; uu2 = true;
            S3C.classList.remove('locked'); S3C.classList.add('chargeBox');
            S3C.style.backgroundColor = 'rgb(105,120,150)';
            S3C.style.opacity = '0';
            S3.addEventListener('pointerdown',()=>{
                if(this.S3A){S3A = this.S3A}
                if(S3A != '[object CSSAnimation]'){var S3A = S3C.getAnimations(); this.S3A = S3A}
                S3A[0].play(); S3.style.pointerEvents = 'none';
                AA3[AA3v]();
            }); S3C.addEventListener('animationend',()=>{S3.style.pointerEvents = 'auto'});
        }
        if(uu2){
            U2.innerHTML = 'SELECTED'; AA3v = 0;
        }
    });
    
    const Cost3 = document.getElementById('Cost3');
    const DT3 = document.getElementById('DT3'); const I3 = document.getElementById('I3');
    DT3.addEventListener('click',()=>{
        if(I3.style.display == 'flex'){
            I3.style.display = 'none';
        }else{
            I3.style.display = 'flex';
        }
    });
    const U3 = document.getElementById('U3'); let uu3 = false;
    U3.addEventListener('click',()=>{
        if(obj.res.materials >= 15){
            obj.res.materials -= 15;
            Cost3.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U3.innerHTML = 'SELECTED'; uu3 = true;
            S4C.classList.remove('locked'); S4C.classList.add('chargeBox');
            S4C.style.backgroundColor = 'rgb(105,120,150)';
            S4C.style.opacity = '0';
            S4.addEventListener('pointerdown',()=>{
                if(this.S4A){S4A = this.S4A}
                if(S4A != '[object CSSAnimation]'){var S4A = S4C.getAnimations(); this.S4A = S4A}
                S4A[0].play(); S4.style.pointerEvents = 'none';
                AA4[AA4v]();
            }); S4C.addEventListener('animationend',()=>{S4.style.pointerEvents = 'auto'});
        }
        if(uu3){
            U3.innerHTML = 'SELECTED'; AA4v = 0;
        }
    });
    
    // FIGHT SYSTEM BARS
    const ALL = body.querySelectorAll('*');
    const IB = document.getElementById('InterruptBar');
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
    
    // COLOR ANIMATIONS
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
    
    // ATTACK FUNCTIONS
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
    let Interrupt = function(){
        CurrentAttack.damage = 0;
        CurrentAttack.penetratingdamage = 0;
        CurrentAttack.shielddamage = 0;
        CurrentAttack.heal = 0;
        CurrentAttack.shieldheal = 0;
        IB.style.display = 'flex';
    }
    
    // PLAYER ATTACKS
    const SMACK=()=>{Damage(60,true)}
    const CHARGE=()=>{ShieldDamage(80,true);Damage(40,true)}
    const SLASH=()=>{Damage(40,true);PenetratingDamage(32,true)}
    const STUN=()=>{Interrupt()}
    let AA1 = [SMACK]; var AA1v = 0;
    let AA2 = [CHARGE]; var AA2v = 0;
    let AA3 = [SLASH]; var AA3v = 0;
    let AA4 = [STUN]; var AA4v = 0;
    
    let S1 = document.getElementById('S1');
    let S1C = document.getElementById('S1C');
    let S2 = document.getElementById('S2');
    let S2C = document.getElementById('S2C');
    let S3 = document.getElementById('S3');
    let S3C = document.getElementById('S3C');
    S1.addEventListener('pointerdown',()=>{
        if(this.S1A){S1A = this.S1A}
        if(S1A != '[object CSSAnimation]'){var S1A = S1C.getAnimations(); this.S1A = S1A}
        S1A[0].play(); S1.style.pointerEvents = 'none';
        AA1[AA1v]();
    }); S1C.addEventListener('animationend',()=>{S1.style.pointerEvents = 'auto'});
    S2.addEventListener('pointerdown',()=>{
        if(this.S2A){S2A = this.S2A}
        if(S2A != '[object CSSAnimation]'){var S2A = S2C.getAnimations(); this.S2A = S2A}
        S2A[0].play(); S2.style.pointerEvents = 'none';
        AA2[AA2v]();
    }); S2C.addEventListener('animationend',()=>{S2.style.pointerEvents = 'auto'});
    
    // Wins -> Number of battles won | BossWins -> Wins required for bossfight.
    var A1Wins = 0; const A1BossWins = 4;
    
    // E -> Enemy, O -> Opponent, U -> User, P -> Player, H -> Health, S -> Shield
    let LoadFight = function(EnemyName, MaxEH, MaxES, EDowntime, ESR, MaxUH, MaxUS, UDowntime, USR, OpponentAttacks, mi, area, resnarr=[], resarr=[], colarr=[]){
        let Enemy = document.getElementById('Enemy'); Enemy.innerHTML = 'Incoming: ' + EnemyName + '!'; Enemy.style.animation = '0.2s ease forwards slide';
        let EnemyN = document.getElementById('EnemyName'); EnemyN.innerHTML = EnemyName;
        let body = document.getElementById('body'); body.style.display = 'flex';
        let inv = document.getElementById('inv');
        let dar = document.getElementById('dar');
        let BS = document.getElementById('BlackScreen');
        let CD = document.getElementById('Countdown');
        CD.style.animation = '0.75s linear infinite fade';
        BS.style.display = 'flex';
        ABwidth = 0;
        setTimeout(()=>{CD.textContent = '2...'},750);
        setTimeout(()=>{CD.textContent = '1...'},1500);
        setTimeout(()=>{CD.textContent = 'GO!';CD.style.animation = 'none'},2250);
        setTimeout(()=>{
            BS.style.display = 'none';
            CD.textContent = '3...';
            if(!obj.tutorial){
                BEGIN();
            }else{
                S1.style.pointerEvents = S2.style.pointerEvents = 'none';
                const EnemyInfo = document.getElementById('EnemyInfo');
                const PlayerStats = document.getElementById('PlayerStats');
                const Attacks = document.getElementById('Attacks');
                PlayerStats.style.opacity = Attacks.style.opacity = '.2';
                let tutorialtext = document.createElement('p');
                document.body.appendChild(tutorialtext);
                tutorialtext.id = 'TTXT';
                tutorialtext.innerHTML = "This is your opponent. Here you can see its name, the next incoming attack, and both its health and shield.";
                document.body.addEventListener('click', ()=>{
                    EnemyInfo.style.opacity = '.2';
                    PlayerStats.style.opacity = '1';
                    tutorialtext.style.top = '21%';
                    tutorialtext.innerHTML = "These are your stats. The shield will take incoming damage and regenerate until depleted, then damage will be taken by the health bar. If your HP reaches 0 before defeating the opponent, you will lose.";
                    document.body.addEventListener('click', ()=>{
                        PlayerStats.style.opacity = '.2';
                        Attacks.style.opacity = '1';
                        tutorialtext.style.top = '40%';
                        tutorialtext.innerHTML = "These are the abilities you have to inflict damage upon your opponent. After using them you must wait for a cooldown time which may vary depending on the ability.";
                        document.body.addEventListener('click', ()=>{
                            tutorialtext.remove();
                            EnemyInfo.style.opacity = PlayerStats.style.opacity = '1';
                            S1.style.pointerEvents = S2.style.pointerEvents = 'auto';
                            BEGIN();
                        }, {once: true});
                    }, {once: true});
                }, {once: true});
            }
        },3000);
        
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
            S1.style.pointerEvents = 'auto';
            setRotateAnimation(S1C,2);
            S2.style.pointerEvents = 'auto';
            setRotateAnimation(S2C,2);
            if(uu2){S3.style.pointerEvents = 'auto';setRotateAnimation(S3C,2)}
            if(uu3){S4.style.pointerEvents = 'auto';setRotateAnimation(S4C,20)}
            
            t = 0;
            CurrentAttack = false;
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
                            CurrentAttack = window.structuredClone(OpponentAttacks[i]);
                            AB.textContent = CurrentAttack.name;
                            IB.style.display = 'none';
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
                    obj.res.add(resnarr, resarr, colarr);
                    C1C.innerHTML = 'Quantity: ' + obj.res.materials;
                    
                    if(area == 'A1'){A1Wins++}
                    if(area == 'A1B'){
                        A1Wins = 0;
                        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
                        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';obj.A1C = true;
                    }
                }
                if(COH <= 0 || CPH <= 0){
                    for(i=0; i < ALL.length; i++){ALL[i].style.animation = 'none'}
                    S1.style.pointerEvents = 'none';
                    S2.style.pointerEvents = 'none';
                    S3.style.pointerEvents = 'none';
                    S4.style.pointerEvents = 'none';
                    S1A = S1C.getAnimations();if(S1A[0]){S1A[0].cancel()}
                    S2A = S2C.getAnimations();if(S2A[0]){S2A[0].cancel()}
                    S3A = S3C.getAnimations();if(S3A[0]){S3A[0].cancel()}
                    S4A = S4C.getAnimations();if(S4A[0]){S4A[0].cancel()}
                    S1A=''; this.S1A='';
                    S2A=''; this.S2A='';
                    S3A=''; this.S3A='';
                    S4A=''; this.S4A='';
                    inv.style.display = 'flex';
                    var op = 0;
                    setTimeout(()=>{inv.style.display = 'none'}, 250);
                    setTimeout(()=>{dar.style.display = 'flex'}, 500);
                    setSchedule(()=>{
                        op += 0.02;
                        dar.style.opacity = op + '';
                    }, 10, 50, 500);
                    setTimeout(()=>{dar.style.display = 'none'; dar.style.opacity = '0'; body.style.display = 'none'; o = false}, 1000);
                    if(area == 'Tutorial'){setTimeout(()=>{displayText(["I evidently won, but at least you stroke some good hits...", "The teleporters should be enabled now, good luck against whichever foes you encounter."], ["c01.png", "c01.png"], ["C0", "C0"])}, 1000)}
                    sessionStorage.setItem('user',JSON.stringify(obj));
                    clearInterval(intervalId);
                }
            }, 10);
        }
    }
    let E1 = document.getElementById('E1');
    E1.addEventListener('click', ()=>{
        if(A1Wins < A1BossWins){
            if(Math.random() < .5){
                LoadFight('Basic Slime', 400, 180, 5, .5, UserHealth, UserShield, ShieldDowntime, ShieldRegen, BasicSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], ['rgb(0, 127, 255)']);
            }else{
                LoadFight('Scrap Slime', 370, 550, 10, .1, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ScrapSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], ['rgb(0, 127, 255)']);
            }
        }else{
            LoadFight('Reinforced Slime', 1000, 750, 15, .2, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ReinforcedSlimeAttacks, 5, 'A1B', ['Slime', 'Slime Key'], [Math.round(3*Math.random())+3, 1], ['rgb(0, 127, 255)', 'rgb(0, 90, 210)']);
        }
    });
});