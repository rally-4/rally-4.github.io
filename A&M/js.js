window.addEventListener('DOMContentLoaded',()=>{
    // let ip1 = '78.155.43.8';
    // const socket = io('http://' + ip1 + ':3000');
    
    // AUDIO
    const November = document.getElementById('November');
    const SUEM = document.getElementById('SUEM');
    const SUBM = document.getElementById('SUBM');
    const BLEM = document.getElementById('BLEM');
    const BLBM = document.getElementById('BLBM');
    const T99 = document.getElementById('T99');T99.volume = 0.5;
    
    const SSel = document.getElementById('SSel');
    const FSt = document.getElementById('FSt');
    const TCr = document.getElementById('TCr');
    const CCh = document.getElementById('CCh');
    const Sl = document.getElementById('Sl');
    const BE = document.getElementById('BE');
    const Upg = document.getElementById('Upg');
    const CS = document.getElementById('CS');
    
    const AIHD = document.getElementById('AIHD');
    const AISD = document.getElementById('AISD');
    const PHDA = document.getElementById('PHDA');
    const PSDA = document.getElementById('PSDA');
    const IR = document.getElementById('IR');
    const EH = document.getElementById('EH');
    const He = document.getElementById('He');
    
    const loudSFX = [SSel, FSt, TCr, CCh, Sl, BE, Upg, CS, AIHD, AISD, PHDA, PSDA, IR, EH, He];
    for(l=0;l<loudSFX.length;l++){loudSFX[l].volume=.4}
    
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
                TArr[i].style.backgroundColor = 'rgb(60,60,60)';
            }else{
                TSArr[i].style.display = 'flex';
                TArr[i].style.backgroundColor = 'rgb(30,30,30)';
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
    T1.addEventListener('click', ()=>{play(CS);swap(0)});
    T2.addEventListener('click', ()=>{play(CS);swap(1)});
    T3.addEventListener('click', ()=>{play(CS);swap(2)});
    T4.addEventListener('click', ()=>{if(obj.A1C){play(CS);swap(3)}});
    UT1.addEventListener('click', ()=>{play(CS);subswap(0)});
    UT2.addEventListener('click', ()=>{play(CS);subswap(1)});
    swap(0);subswap(0);
    
    // OBJ AND RESOURCES
    let C1C = document.getElementById('C1C');
    var obj = {name: '', uid: -1, res: {materials: 0}, tutorial: true, A1C: false}
    if(sessionStorage.getItem('user') != undefined){
        obj = JSON.parse(sessionStorage.getItem('user'));
        obj.res.readd = function(n,a){
            for(i=0; i<n.length; i++){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + n[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (Object.keys(obj.res).length-2)*8 + '%)';
                
                var newDiv = document.createElement('div');
                newCraft.appendChild(newDiv);
                var rescol = getResCols(n[i]);
                newDiv.style.backgroundColor = rescol;
                newDiv.style.border = '2px solid ' + rescol;
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + n[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
                
                obj.res[n[i]] += a[i];
                document.getElementById('C'+n[i]+'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
            }
        }
        var keys = Object.keys(obj.res); keys.shift(); rem(keys,['readd']);
        var values = Object.values(obj.res); values.shift(); rem(values,['readd']);
        obj.res.readd(keys,values);
        obj.res.materials += obj.res.materials;
        C1C.innerHTML = 'Quantity: ' + obj.res.materials;
    }
    if(obj.A1C){
        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';
    }
    obj.res.add = function(n,a){
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
                var rescol = getResCols(n[i]);
                newDiv.style.backgroundColor = rescol;
                newDiv.style.border = '2px solid ' + rescol;
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + n[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
            }
            obj.res[n[i]] += a[i];
            document.getElementById('C'+n[i]+'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
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
        trunk.style.display = 'flex'; count = 0;
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
                LoadFight('C0', 750, 250, 2, .1, UserHealth, UserShield, ShieldDowntime, ShieldRegen, C0Attacks, 0, 'Tutorial');
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
    if(obj.tutorial){displayText(["Ah, another individual has awakened from its slumber!", "Hopefully you don't die like all the others...", "The objective is simple: you are to vanquish the vermin which have overtaken our planet following the Anoxiphandric Catastrophe.", "Since you might require some basic knowledge on how to fight, I will briefly demonstrate the way we battle around here...", "Very well then, let's begin."], ["c01.png", "c02.png", "c01.png", "c01.png", "c01.png"], ["C0", "C0", "C0", "C0", "C0"])}
    
    // C0 VAULT
    let SB1w = false;
    
    let GKT = document.getElementById('GKT');
    if(obj.name != ''){
        GKT.innerHTML = obj.name + ', the compelled one...';
    }else{
        GKT.style.color = 'orange';
        GKT.innerHTML = 'You should not be here...';
    }
    let WhiteText = ["There is nothing else in here for you.", "Leave!", "You're not supposed to stay here...", "Waiting for something to happen?", "Go fight some slimes!", "What do you want from me?", "Your presence disturbs me.", "What are you trying to accomplish?", "Our time here isn't unlimited."];
    let OrangeText = ["You should not linger around here...", "Go away!", "You're hopeless...", "Why are you still here?", "..."];
    let WTI = 0;
    let OTI = 1;
    const input = document.getElementById('input');
    input.addEventListener('keyup',e=>{
        if(input.value == ''){
            GKT.style.color = 'white';
            if(WTI > WhiteText.length-1){WTI = 0}
            GKT.innerHTML = WhiteText[WTI];
            if(Math.random() >= 0.995){GKT.style.color = 'red'; GKT.innerHTML = "Anoxis will one day pay for what he did..."; WTI--}
            if(Math.random() >= 0.96){GKT.style.color = 'lime'; GKT.innerHTML = "The endlessly falling blocks... how were they called?"; WTI--}
            WTI++;
        }
        if((e.key == 'Enter' || e.keyCode == 13) && input.value != ''){
            if(input.value == 'Tetrominos' && !SB1w){
                LoadFight('Tetrominos Rampage', 4444, 444, .4, .4, UserHealth, UserShield, ShieldDowntime, ShieldRegen, TetrominosAttacks, 0, 'SB1', ['Tetromino'], [1], ['rgb(120,45,0)'], T99);
            }
            input.value = ''; GKT.style.color = 'orange';
            if(OTI > OrangeText.length-1){OTI = 0}
            GKT.innerHTML = OrangeText[OTI];
            OTI++;
        }
    });
    
    // AREA DETAILS
    let e1 = false;
    let D1 = document.getElementById('D1');
    let AD1 = document.getElementById('AD1');
    D1.addEventListener('click',()=>{
        play(CS);
        D1.style.borderColor = 'rgb(105,105,105)';
        D1.style.backgroundColor = 'rgb(45,45,45)';
        D1.style.color = 'white';
        setTimeout(()=>{
            D1.style.borderColor = 'rgb(150,150,150)';
            D1.style.backgroundColor = 'rgb(210,210,210)';
            D1.style.color = 'black';
        },100);
        if(e1){
            AD1.style.display = 'none';
            e1 = false;
        }else{
            AD1.style.display = 'flex';
            e1 = true;
        }
    });
    const IB1 = document.getElementById('IB1');
    const AI1 = document.getElementById('AI1');
    IB1.addEventListener('click',()=>{AI1.style.display = 'flex'});
    AI1.addEventListener('click',()=>{AI1.style.display = 'none'});
    
    let e2 = false;
    let D2 = document.getElementById('D2');
    let AD2 = document.getElementById('AD2');
    let A2 = document.getElementById('A2');
    D2.addEventListener('click',()=>{
        play(CS);
        D2.style.borderColor = 'rgb(105,105,105)';
        D2.style.backgroundColor = 'rgb(45,45,45)';
        D2.style.color = 'white';
        setTimeout(()=>{
            D2.style.borderColor = 'rgb(150,150,150)';
            D2.style.backgroundColor = 'rgb(210,210,210)';
            D2.style.color = 'black';
        },100);
        if(e2){
            AD2.style.display = 'none';
            e2 = false;
        }else{
            AD2.style.display = 'flex';
            e2 = true;
        }
    });
    
    // ENEMY ATTACKS
    class EnemyAttack{
        constructor(name, chance, casting, damage=0, penetratingdamage=0, shielddamage=0, heal=0, shieldheal=0, selfdamage=0, nextattack='none'){
            this.name = name;
            this.chance = chance;
            this.casting = casting;
            
            this.damage = damage;
            this.penetratingdamage = penetratingdamage;
            this.shielddamage = shielddamage;
            this.heal = heal;
            this.shieldheal = shieldheal;
            this.selfdamage = selfdamage;
            
            this.nextattack = nextattack;
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
    let RECOVER = new EnemyAttack('RECOVER', 100, 6, 0, 0, 0, 250, 100);
    const ReinforcedSlimeAttacks = [ADVANCE, DELUGE, CUT, RECOVER];
    
    let SCRATCH = new EnemyAttack('SCRATCH', 80, 2, 90);
    let BITE = new EnemyAttack('BITE', 100, 3, 300);
    const MelancholicRatAttacks = [SCRATCH, BITE];
    let NIBBLE = new EnemyAttack('NIBBLE', 80, 1, 30);
    let BITE2 = new EnemyAttack('BITE', 100, 3, 400);
    const EnragedRatAttacks = [NIBBLE, BITE2];
    let RADIOACTIVE_BITE = new EnemyAttack('RADIOACTIVE BITE', 90, 4, 400);
    let DECAY = new EnemyAttack('DECAY', 100, 2, 0, 0, 0, 0, 0, 30);
    const RadiantRatAttacks = [NIBBLE, RADIOACTIVE_BITE, DECAY];
    let SQUIRT = new EnemyAttack('SQUIRT', 100, 1, 0, 0, 1050);
    let DEVOUR = new EnemyAttack('DEVOUR', 0, 2, 550);
    let DIGEST = new EnemyAttack('DIGEST', 0, 8, 0, 0, 0, 600, 300);
    SQUIRT.nextattack = 1;
    DEVOUR.nextattack = 2;
    DIGEST.nextattack = 0;
    const VelvetWormAttacks = [SQUIRT, DEVOUR, DIGEST];
    let CHEW = new EnemyAttack('CHEW', 40, 1, 30);
    let ROYAL_DECREE = new EnemyAttack('ROYAL DECREE', 90, 5, 300);
    let REPLENISH = new EnemyAttack('REPLENISH', 100, 3, 0, 0, 0, 200);
    const RatKingAttacks = [CHEW, SCRATCH, ROYAL_DECREE, REPLENISH];
    
    let ATTACK = new EnemyAttack('ATTACK', 100, 2, 75);
    const C0Attacks = [ATTACK];
    
    let FALL = new EnemyAttack('FALL', 70, 0.4, 4);
    let ROTATE = new EnemyAttack('ROTATE', 90, 0.4, 14);
    let DROP = new EnemyAttack('DROP', 96, 0.4, 44, 14, 14);
    let LINE = new EnemyAttack('LINE', 100, 0.4, 0, 0, 0, 100, 100);
    const TetrominosAttacks = [FALL, ROTATE, DROP, LINE];
    
    let UserHealth = 1000;
    let UserShield = 200;
    let ShieldDowntime = 20;
    let ShieldRegen = .02;
    
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
            play(Upg);
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
    
    const Cost2 = document.getElementById('Cost2');
    const DT2 = document.getElementById('DT2'); const I2 = document.getElementById('I2');
    DT2.addEventListener('click',()=>{
        if(I2.style.display == 'flex'){
            I2.style.display = 'none';
        }else{
            I2.style.display = 'flex';
        }
    });
    const U2 = document.getElementById('U2'); let uu2 = false; var A3Use = 0;
    U2.addEventListener('click',()=>{
        if(obj.res.materials >= 9 && !uu2){
            play(Upg);
            obj.res.materials -= 9;
            Cost2.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U2.innerHTML = 'SELECTED'; uu2 = true;
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
    const U3 = document.getElementById('U3'); let uu3 = false; var A4Use = 0;
    U3.addEventListener('click',()=>{
        if(obj.res.materials >= 15 && !uu3){
            play(Upg);
            obj.res.materials -= 15;
            Cost3.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U3.innerHTML = 'SELECTED'; uu3 = true;
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
        if(uu3){
            U3.innerHTML = 'SELECTED'; AA4v = 0;
        }
    });
    
    const Cost4 = document.getElementById('Cost4');
    const DT4 = document.getElementById('DT4'); const I4 = document.getElementById('I4');
    DT4.addEventListener('click',()=>{
        if(I4.style.display == 'flex'){
            I4.style.display = 'none';
        }else{
            I4.style.display = 'flex';
        }
    });
    const U4 = document.getElementById('U4'); let uu4 = false;
    U4.addEventListener('click',()=>{
        if(obj.res['Slime Key'] >= 1 && !uu4){
            play(Upg);
            obj.res.add(['Slime Key'], [-1]);
            Cost4.innerHTML = '';
            U4.innerHTML = 'UNLOCKED'; uu4 = true;
            A2.style.display = 'flex';
        }
    });
    
    const Cost6 = document.getElementById('Cost6');
    const DT6 = document.getElementById('DT6'); const I6 = document.getElementById('I6');
    DT6.addEventListener('click',()=>{
        if(I6.style.display == 'flex'){
            I6.style.display = 'none';
        }else{
            I6.style.display = 'flex';
        }
    });
    const U6 = document.getElementById('U6'); let uu6 = false; var A5Use = 0;
    U6.addEventListener('click',()=>{
        if(obj.res.materials >= 40 && !uu6){
            play(Upg);
            obj.res.materials -= 40;
            Cost6.innerHTML = '';
            C1C.innerHTML = 'Quantity: ' + obj.res.materials;
            U6.innerHTML = 'SELECTED'; uu6 = true;
            S5C.classList.remove('locked'); S5C.classList.add('chargeBox');
            S5C.style.backgroundColor = 'rgb(105,120,150)';
            S5C.style.opacity = '0';
            S5.addEventListener('pointerdown',()=>{
                if(A5Use < AA5[AA5v].uses){
                    if(this.S5A){S5A = this.S5A}
                    if(S5A != '[object CSSAnimation]'){var S5A = S5C.getAnimations();this.S5A = S5A}
                    S5A[0].play(); S5.style.pointerEvents = 'none';
                    AA5[AA5v].func();
                    A5Use++;
                }
            }); S5C.addEventListener('animationend',()=>{S5.style.pointerEvents = 'auto'});
        }
        if(uu6){
            U6.innerHTML = 'SELECTED'; AA5v = 0;
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
    
    let BB5 = document.getElementById('BB5');
    let CB5 = document.getElementById('CB5');
    
    let ABT = document.getElementById('EnemyAttack');
    let AB = document.getElementById('AttackBar');
    let ABwidth = 0;
    
    // COLOR ANIMATIONS
    let R=(pA)=>{
        if(pA){
            OH.style.backgroundColor = 'red';
            setTimeout(()=>{OH.style.backgroundColor = 'rgb(255,127,127)'},50);
            setTimeout(()=>{OH.style.backgroundColor = 'white'},100);
        }else{
            PH.style.backgroundColor = 'red';
            setTimeout(()=>{PH.style.backgroundColor = 'rgb(255,127,127)'},50);
            setTimeout(()=>{PH.style.backgroundColor = 'white'},100);
        }
    }
    let P=(pA)=>{
        if(pA){
            OS.style.backgroundColor = 'rgb(255,0,255)';
            setTimeout(()=>{OS.style.backgroundColor = 'rgb(255,127,255)'},50);
            setTimeout(()=>{OS.style.backgroundColor = 'white'},100);
        }else{
            PS.style.backgroundColor = 'rgb(255,0,255)';
            setTimeout(()=>{PS.style.backgroundColor = 'rgb(255,127,255)'},50);
            setTimeout(()=>{PS.style.backgroundColor = 'white'},100);
        }
    }
    let H=(pA)=>{
        if(pA){
            OH.style.backgroundColor = 'lime';
            setTimeout(()=>{OH.style.backgroundColor = 'rgb(127,255,127)'},50);
            setTimeout(()=>{OH.style.backgroundColor = 'white'},100);
        }else{
            PH.style.backgroundColor = 'lime';
            setTimeout(()=>{PH.style.backgroundColor = 'rgb(127,255,127)'},50);
            setTimeout(()=>{PH.style.backgroundColor = 'white'},100);
        }
    }
    let SH=(pA)=>{
        if(pA){
            OS.style.backgroundColor = 'lime';
            setTimeout(()=>{OS.style.backgroundColor = 'rgb(127,255,127)'},50);
            setTimeout(()=>{OS.style.backgroundColor = 'white'},100);
        }else{
            PS.style.backgroundColor = 'lime';
            setTimeout(()=>{PS.style.backgroundColor = 'rgb(127,255,127)'},50);
            setTimeout(()=>{PS.style.backgroundColor = 'white'},100);
        }
    }
    
    // ATTACK FUNCTIONS
    let Damage = function(d, pA){
        if(pA && d){
            if(COS > 0){
                if(COS >= d){
                    play(AISD);
                    COS -= d; P(pA);
                }else{
                    play(AISD);
                    COH += COS - d; R(pA);
                    COS -= COS; P(pA);
                }
            }else{
                play(AIHD);
                COH -= d; R(pA); OSD = ODowntime;
            }
        }else{
            if(CPS > 0){
                if(CPS >= d){
                    play(PSDA);
                    CPS -= d; P(pA);
                }else{
                    play(PSDA);
                    CPH += CPS - d; R(pA);
                    CPS -= CPS; P(pA);
                }
            }else{
                play(PHDA);
                CPH -= d; R(pA); PSD = PDowntime;
            }
        }
    }
    let PenetratingDamage = function(d, pA){
        if(pA && d){
            play(AIHD);
            COH -= d; R(pA);
            if(COS <= 0){
                OSD = ODowntime;
            }
        }else{
            play(PHDA);
            CPH -= d; R(pA);
            if(CPS <= 0){
                PSD = PDowntime;
            }
        }
    }
    let ShieldDamage = function(d, pA){
        if(pA && d){
            play(AISD);
            COS -= d; P(pA);
        }else{
            play(PSDA);
            CPS -= d; P(pA);
        }
    }
    let Heal = function(h, pA){
        if(!pA && h){
            play(EH);
            COH += h; H(!pA);
        }else{
            play(He);
            CPH += h; H(!pA);
        }
    }
    let ShieldHeal = function(h, pA){
        if(!pA && h){
            COS += h; SH(!pA);
        }else{
            CPS += h; SH(!pA);
        }
    }
    let Interrupt = function(){
        play(IR);
        CurrentAttack.damage = 0;
        CurrentAttack.penetratingdamage = 0;
        CurrentAttack.shielddamage = 0;
        CurrentAttack.heal = 0;
        CurrentAttack.shieldheal = 0;
        CurrentAttack.selfdamage = 0;
        IB.style.display = 'flex';
    }
    
    // PLAYER ATTACKS
    class PlayerAttack{
        constructor(func, cooldown, uses='Infinity'){
            this.func = func;
            this.cooldown = cooldown;
            this.uses = uses;
        }
    }
    let SmackAttack = function(){Damage(60,true)}
    const SMACK = new PlayerAttack(SmackAttack, 2);
    
    let ChargeAttack = function(){ShieldDamage(80,true);Damage(40,true)}
    const CHARGE = new PlayerAttack(ChargeAttack, 2);
    
    let SlashAttack = function(){Damage(40,true);PenetratingDamage(32,true)}
    const SLASH = new PlayerAttack(SlashAttack, 2);
    
    const STUN = new PlayerAttack(Interrupt, 20);
    
    let HealAttack = function(){Heal(1050,true)}
    const HEAL = new PlayerAttack(HealAttack, 30, 3);
    
    let AA1 = [SMACK]; var AA1v = 0;
    let AA2 = [CHARGE]; var AA2v = 0;
    let AA3 = [SLASH]; var AA3v = 0;
    let AA4 = [STUN]; var AA4v = 0;
    let AA5 = [HEAL]; var AA5v = 0;
    
    let S1 = document.getElementById('S1');
    let S1C = document.getElementById('S1C');
    let S2 = document.getElementById('S2');
    let S2C = document.getElementById('S2C');
    let S3 = document.getElementById('S3');
    let S3C = document.getElementById('S3C');
    let S4 = document.getElementById('S4');
    let S4C = document.getElementById('S4C');
    let S5 = document.getElementById('S5');
    let S5C = document.getElementById('S5C');
    var A1Use = 0;
    S1.addEventListener('pointerdown',()=>{
        if(A1Use < AA1[AA1v].uses){
            if(this.S1A){S1A = this.S1A}
            if(S1A != '[object CSSAnimation]'){var S1A = S1C.getAnimations();this.S1A = S1A}
            S1A[0].play(); S1.style.pointerEvents = 'none';
            AA1[AA1v].func();
            A1Use++;
        }
    }); S1C.addEventListener('animationend',()=>{S1.style.pointerEvents = 'auto'});
    var A2Use = 0;
    S2.addEventListener('pointerdown',()=>{
        if(A2Use < AA2[AA2v].uses){
            if(this.S2A){S2A = this.S2A}
            if(S2A != '[object CSSAnimation]'){var S2A = S2C.getAnimations();this.S2A = S2A}
            S2A[0].play(); S2.style.pointerEvents = 'none';
            AA2[AA2v].func();
            A2Use++;
        }
    }); S2C.addEventListener('animationend',()=>{S2.style.pointerEvents = 'auto'});
    
    // Wins -> Number of battles won | BossWins -> Wins required for bossfight
    var A1Wins = 0; const A1BossWins = 4;
    var A2Wins = 0; const A2BossWins = 10;
    
    // E = Enemy, O = Opponent, U = User, P = Player, H = Health, S = Shield
    let LoadFight = function(EnemyName, MaxEH, MaxES, EDowntime, ESR, MaxUH, MaxUS, UDowntime, USR, OpponentAttacks, mi, area, resnarr=[], resarr=[], M=November){
        stop(November);play(SSel);
        let Enemy = document.getElementById('Enemy'); Enemy.innerHTML = 'Incoming: ' + EnemyName + '!'; Enemy.style.animation = '0.2s ease forwards slide';
        let EnemyN = document.getElementById('EnemyName'); EnemyN.innerHTML = EnemyName; OS.style.display = 'flex'; if(MaxES == 0){OS.style.display = 'none'}
        let body = document.getElementById('body'); body.style.display = 'flex';
        let inv = document.getElementById('inv');
        let dar = document.getElementById('dar');
        let BS = document.getElementById('BlackScreen');
        let CD = document.getElementById('Countdown');
        CD.style.animation = '0.75s linear infinite fade';
        BS.style.display = 'flex';
        ABwidth = 0; play(CCh);
        setTimeout(()=>{play(CCh);CD.textContent = '2...'},750);
        setTimeout(()=>{play(CCh);CD.textContent = '1...'},1500);
        setTimeout(()=>{play(FSt);CD.textContent = 'GO!';CD.style.animation = 'none';play(M)},2250);
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
                document.body.addEventListener('click',()=>{
                    EnemyInfo.style.opacity = '.2';
                    PlayerStats.style.opacity = '1';
                    tutorialtext.style.top = '21%';
                    tutorialtext.innerHTML = "These are your stats. The shield will take incoming damage and regenerate until depleted, then damage will be taken by the health bar. If your HP reaches 0 before defeating the opponent, you will lose.";
                    document.body.addEventListener('click',()=>{
                        PlayerStats.style.opacity = '.2';
                        Attacks.style.opacity = '1';
                        tutorialtext.style.top = '40%';
                        tutorialtext.innerHTML = "These are the abilities you have to inflict damage upon your opponent. After using them you must wait for a cooldown time which may vary depending on the ability.";
                        document.body.addEventListener('click',()=>{
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
            
            AB.style.width = Math.min(100,ABwidth) + '%';
            
            CB5.style.height = (AA5[AA5v].uses-A5Use)/AA5[AA5v].uses*100 + '%';
        }
        
        let BEGIN = function(){
            S1.style.pointerEvents = 'auto';setRotateAnimation(S1C,AA1[AA1v].cooldown);
            S2.style.pointerEvents = 'auto';setRotateAnimation(S2C,AA2[AA2v].cooldown);
            if(uu2){S3.style.pointerEvents = 'auto';setRotateAnimation(S3C,AA3[AA3v].cooldown)}
            if(uu3){S4.style.pointerEvents = 'auto';setRotateAnimation(S4C,AA4[AA4v].cooldown)}
            if(uu6){S5.style.pointerEvents = 'auto';setRotateAnimation(S5C,AA5[AA5v].cooldown)}
            
            t = 0;
            CurrentAttack = false;
            let intervalId = setInterval(()=>{
                if(CurrentAttack != false){
                    if(t <= CurrentAttack.casting){
                        ABwidth += (.8/CurrentAttack.casting);
                        t += 0.01;
                    }else{
                        ABwidth = 0;
                        if(CurrentAttack.damage != 0){
                            Damage(CurrentAttack.damage,false);
                        }
                        if(CurrentAttack.penetratingdamage != 0){
                            PenetratingDamage(CurrentAttack.penetratingdamage,false);
                        }
                        if(CurrentAttack.shielddamage != 0){
                            ShieldDamage(CurrentAttack.shielddamage,false);
                        }
                        if(CurrentAttack.heal != 0){
                            Heal(CurrentAttack.heal,false);
                        }
                        if(CurrentAttack.shieldheal != 0){
                            ShieldHeal(CurrentAttack.shieldheal,false);
                        }
                        if(CurrentAttack.selfdamage != 0){
                            Damage(CurrentAttack.selfdamage,true);
                        }
                        
                        if(CurrentAttack.nextattack == 'none'){
                            CurrentAttack = false;
                        }else{
                            CurrentAttack = window.structuredClone(OpponentAttacks[CurrentAttack.nextattack]);
                            AB.textContent = CurrentAttack.name;
                            IB.style.display = 'none';
                            t = 0;
                        }
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
                
                if(COS <= 0){
                    COS = 0;if(OSD == 0){OSD = ODowntime}
                }if(OSD <= 0){
                    COS += OSR;OSD = 0;
                }else{OSD -= 0.01}
                
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
                    obj.res.add(resnarr,resarr);
                    C1C.innerHTML = 'Quantity: ' + obj.res.materials;
                    
                    // Enemies
                    if(area == 'A1'){A1Wins++; AD1.innerText = 'Drops: materials, slime, slime key\nWins until boss: ' + A1Wins + '/4'}
                    if(area == 'A2'){A2Wins++; AD2.innerText = 'Drops: materials, slime, slime key\nWins until boss: ' + A2Wins + '/10'}
                    
                    // Normal Bosses
                    if(area == 'A1B'){
                        A1Wins = 0; AD1.innerText = 'Drops: materials, slime, slime key\nWins until boss: ' + A1Wins + '/4';
                        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
                        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';obj.A1C = true;
                        setTimeout(()=>{if(obj.res['Slime Key'] >= 0 && (T4.innerHTML != 'RESEARCH')){displayText(["Ah, the slime key...", "I suppose you were stronger than I had initially suspected.", "Use the newly acquired resources to become stronger at the research facility."], ["c01.png", "c01.png", "c01.png"], ["C0", "C0", "C0"])}},1000);
                    }
                    if(area == 'A2B'){
                        A2Wins = 0; AD2.innerText = 'Drops: materials, slime, slime key\nWins until boss: ' + A2Wins + '/10';
                    }
                    
                    // Secret Bosses
                    if(area=='SB1'){SB1w = true}
                }
                if(COH <= 0 || CPH <= 0){
                    play(BE);
                    for(i=0; i < ALL.length; i++){ALL[i].style.animation = 'none'}
                    S1.style.pointerEvents = 'none';
                    S2.style.pointerEvents = 'none';
                    S3.style.pointerEvents = 'none';
                    S4.style.pointerEvents = 'none';
                    S5.style.pointerEvents = 'none';
                    S1A = S1C.getAnimations();if(S1A[0]){S1A[0].cancel()}
                    S2A = S2C.getAnimations();if(S2A[0]){S2A[0].cancel()}
                    S3A = S3C.getAnimations();if(S3A[0]){S3A[0].cancel()}
                    S4A = S4C.getAnimations();if(S4A[0]){S4A[0].cancel()}
                    S5A = S5C.getAnimations();if(S5A[0]){S5A[0].cancel()}
                    S1A=''; this.S1A=''; A1Use = 0;
                    S2A=''; this.S2A=''; A2Use = 0;
                    S3A=''; this.S3A=''; A3Use = 0;
                    S4A=''; this.S4A=''; A4Use = 0;
                    S5A=''; this.S5A=''; A5Use = 0;
                    inv.style.display = 'flex';
                    var op = 0;
                    setTimeout(()=>{inv.style.display = 'none'}, 250);
                    setTimeout(()=>{dar.style.display = 'flex'}, 500);
                    setSchedule(()=>{
                        op += 0.02;
                        dar.style.opacity = op + '';
                    },10,50,500);
                    setTimeout(()=>{dar.style.display = 'none'; dar.style.opacity = '0'; body.style.display = 'none'; o = false; stopAll(); play(November)}, 1000);
                    if(area == 'Tutorial'){setTimeout(()=>{displayText(["Not a bad fight...", "The teleporters should be enabled now, good luck against whichever foes you encounter."], ["c01.png", "c01.png"], ["C0", "C0"])}, 1000)}
                    sessionStorage.setItem('user',JSON.stringify(obj));
                    clearInterval(intervalId);
                }
            },10);
        }
    }
    let E1 = document.getElementById('E1');
    E1.addEventListener('click',()=>{
        if(A1Wins < A1BossWins){
            if(Math.random() < .5){
                LoadFight('Basic Slime', 400, 180, 5, .5, UserHealth, UserShield, ShieldDowntime, ShieldRegen, BasicSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], SUEM);
            }else{
                LoadFight('Scrap Slime', 370, 550, 10, .1, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ScrapSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(Math.random())+3], SUEM);
            }
        }else{
            LoadFight('Reinforced Slime', 1000, 750, 15, .2, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ReinforcedSlimeAttacks, 5, 'A1B', ['Slime', 'Slime Key'], [Math.round(2*Math.random())+4, 1], SUBM);
        }
    });
    let E2 = document.getElementById('E2');
    E2.addEventListener('click',()=>{
        if(A2Wins < A2BossWins){
            re = Math.random();
            if(re < .3){
                LoadFight('Melancholic Rat', 1200, 0, null, 0, UserHealth, UserShield, ShieldDowntime, ShieldRegen, MelancholicRatAttacks, 3, 'A2', ['Red Fluid'], [2], BLEM);
            }else if(re < .6){
                LoadFight('Enraged Rat', 1200, 0, null, 0, UserHealth, UserShield, ShieldDowntime, ShieldRegen, EnragedRatAttacks, 3, 'A2', ['Red Fluid'], [2], BLEM);
            }else if(re < .7){
                LoadFight('Velvet Worm', 900, 900, 5, .15, UserHealth, UserShield, ShieldDowntime, ShieldRegen, VelvetWormAttacks, 3, 'A2', ['Slime', 'Red Fluid'], [Math.round(2*Math.random())+8, 4], BLEM);
            }else{
                LoadFight('Radiant Rat', 1600, 0, null, 0, UserHealth, UserShield, ShieldDowntime, ShieldRegen, RadiantRatAttacks, 6, 'A2', ['Red Fluid'], [2], BLEM);
            }
        }else{
            LoadFight('Rat King', 4000, 0, null, 0, UserHealth, UserShield, ShieldDowntime, ShieldRegen, RatKingAttacks, 6, 'A2B', ['Red Fluid', 'Rusty Key'], [8, 1], BLBM);
        }
    });
});