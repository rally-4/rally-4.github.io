window.addEventListener('DOMContentLoaded',()=>{
    loadAudio();
    loadTabs();
    loadAreas();
    loadUpgrades();
    loadData();
    
    UserHealth = 1000;
    UserShield = 200;
    ShieldDowntime = 20;
    ShieldRegen = .02;
    
    T4 = document.getElementById('T4');
    
    // SETTINGS
    let SettingsBox = document.getElementById('SettingsBox');
    let SettingsScreen = document.getElementById('Settings');
    let SettingsClose = document.getElementById('SettingsClose');
    SettingsBox.addEventListener('click',()=>{SettingsScreen.style.display = 'flex'});
    SettingsClose.addEventListener('click',()=>{SettingsScreen.style.display = 'none'})
    
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
    const GKT = document.getElementById('GKT');
    GKT.style.color = 'orange';
    GKT.innerHTML = 'You should not be here...';
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
            if(input.value.toLowerCase() === 'tetrominos' && !obj.sBossProgress.SB1w){
                LoadFight('Tetrominos Rampage', 4444, 444, .4, .4, UserHealth, UserShield, ShieldDowntime, ShieldRegen, TetrominosAttacks, 0, 'SB1', [], [], T99);
            }
            if(input.value.toLowerCase() === 'dev4s' && !obj.sBossProgress.SB2w){
                LoadFight('DEVAS', 170, 130, 1, .01, UserHealth, UserShield, ShieldDowntime, ShieldRegen, DevasAttacks, 0, 'SB2', [], [], DOM, 17);
            }
            input.value = ''; GKT.style.color = 'orange';
            if(OTI > OrangeText.length-1){OTI = 0}
            GKT.innerHTML = OrangeText[OTI];
            OTI++;
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
    
    let CRY = new EnemyAttack('CRY', (1/3)*100, (20/9), 25, 0, 0, 0, 0, 10);
    let WEEP = new EnemyAttack('WEEP', (2/3)*100, (20/9), 50, 0, 0, 0, 0, 20);
    let SORROW = new EnemyAttack('SORROW', 100, (20/9), 75, 0, 0, 0, 0, 30);
    const DevasAttacks = [CRY, WEEP, SORROW];
    
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
    
    let BB2 = document.getElementById('BB2');
    let CB2 = document.getElementById('CB2');
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
        d *= obj.muls.ndm;
        if(pA && d){
            if(COS > 0){
                if(COS >= d){
                    play(AISD);
                    COS -= d / ODef; P(pA);
                }else{
                    play(AISD);
                    COH += (COS - d) / ODef; R(pA);
                    COS -= COS; P(pA);
                }
            }else{
                play(AIHD);
                COH -= d / ODef; R(pA); OSD = ODowntime;
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
        d *= obj.muls.pdm;
        if(pA && d){
            play(AIHD);
            COH -= d / ODef; R(pA);
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
        d *= obj.muls.sdm;
        if(pA && d){
            play(AISD);
            COS -= d / ODef; P(pA);
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
    let BlastAttack = function(){Damage(80,true)}
    const BLAST = new PlayerAttack(BlastAttack, 2);
    
    let ChargeAttack = function(){ShieldDamage(80,true);Damage(40,true)}
    const CHARGE = new PlayerAttack(ChargeAttack, 2);
    let FlareGunAttack = function(){ShieldDamage(60,true);Damage(120,true)}
    const FLAREGUN = new PlayerAttack(FlareGunAttack, 3, 30);
    
    let SlashAttack = function(){Damage(40,true);PenetratingDamage(32,true)}
    const SLASH = new PlayerAttack(SlashAttack, 2);
    
    const STUN = new PlayerAttack(Interrupt, 20);
    
    let HealAttack = function(){Heal(1050,true)}
    const HEAL = new PlayerAttack(HealAttack, 30, 3);
    
    AA1 = [SMACK, BLAST];
    AA2 = [CHARGE, FLAREGUN];
    AA3 = [SLASH];
    AA4 = [STUN];
    AA5 = [HEAL];
    
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
        if(A1Use < AA1[obj.AA.AA1v].uses){
            if(this.S1A){S1A = this.S1A}
            if(S1A != '[object CSSAnimation]'){var S1A = S1C.getAnimations();this.S1A = S1A}
            S1A[0].play(); S1.style.pointerEvents = 'none';
            AA1[obj.AA.AA1v].func();
            A1Use++;
        }
    }); S1C.addEventListener('animationend',()=>{S1.style.pointerEvents = 'auto'});
    var A2Use = 0;
    S2.addEventListener('pointerdown',()=>{
        if(A2Use < AA2[obj.AA.AA2v].uses){
            if(this.S2A){S2A = this.S2A}
            if(S2A != '[object CSSAnimation]'){var S2A = S2C.getAnimations();this.S2A = S2A}
            S2A[0].play(); S2.style.pointerEvents = 'none';
            AA2[obj.AA.AA2v].func();
            A2Use++; CB2.style.height = (AA2[obj.AA.AA2v].uses-A2Use)/AA2[obj.AA.AA2v].uses*100 + '%';
        }
    }); S2C.addEventListener('animationend',()=>{S2.style.pointerEvents = 'auto'});
    
    // E = Enemy, O = Opponent, U = User, P = Player, H = Health, S = Shield
    LoadFight = function(EnemyName, MaxOH, MaxOS, ODowntime, OSR, MaxPH, MaxPS, PDowntime, PSR, OpponentAttacks, mi, area, resnarr=[], resarr=[], M=November, ODef=1){
        stop(November);play(SSel);
        this.ODowntime = ODowntime;
        this.PDowntime = PDowntime;
        this.ODef = ODef;
        let Enemy = document.getElementById('Enemy'); Enemy.innerHTML = 'Incoming: ' + EnemyName + '!'; Enemy.style.animation = '0.2s ease forwards slide';
        let EnemyN = document.getElementById('EnemyName'); EnemyN.innerHTML = EnemyName; OS.style.display = 'flex'; if(MaxOS == 0){OS.style.display = 'none'}
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
                        tutorialtext.innerHTML = "These are the abilities you have to inflict damage. After using them you must wait for a cooldown time which may vary depending on the ability.";
                        document.body.addEventListener('click',()=>{
                            tutorialtext.remove();
                            EnemyInfo.style.opacity = PlayerStats.style.opacity = '1';
                            S1.style.pointerEvents = S2.style.pointerEvents = 'auto';
                            BEGIN();
                        }, {once:true});
                    }, {once:true});
                }, {once:true});
            }
        },3000);
        
        const width = 80;
        COH = MaxOH; // Current Oponent Health
        COS = MaxOS; // Current Oponent Shield
        CPH = MaxPH; // Current Player Heath
        CPS = MaxPS; // Current Player Shield
        OSD = 0; // Opponent's Shield Downtime
        PSD = 0; // Player's Shield Downtime
        
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
        }
        
        let BEGIN = function(){
            S1.style.pointerEvents = 'auto';setRotateAnimation(S1C,AA1[obj.AA.AA1v].cooldown);
            S2.style.pointerEvents = 'auto';setRotateAnimation(S2C,AA2[obj.AA.AA2v].cooldown);
            if(obj.unlocks.uu2){S3.style.pointerEvents = 'auto';setRotateAnimation(S3C,AA3[obj.AA.AA3v].cooldown)}
            if(obj.unlocks.uu3){S4.style.pointerEvents = 'auto';setRotateAnimation(S4C,AA4[obj.AA.AA4v].cooldown)}
            if(obj.unlocks.uu6){S5.style.pointerEvents = 'auto';setRotateAnimation(S5C,AA5[obj.AA.AA5v].cooldown)}
            
            t = 0;
            CurrentAttack = false;
            let intervalId = setInterval(()=>{
                if(CurrentAttack != false){
                    if(t <= CurrentAttack.casting){
                        ABwidth += (.8/CurrentAttack.casting);
                        t += 0.01;
                    }else{
                        ABwidth = 0;
                        if(CurrentAttack.damage){Damage(CurrentAttack.damage,false)}
                        if(CurrentAttack.penetratingdamage){PenetratingDamage(CurrentAttack.penetratingdamage,false)}
                        if(CurrentAttack.shielddamage){ShieldDamage(CurrentAttack.shielddamage,false)}
                        if(CurrentAttack.heal){Heal(CurrentAttack.heal,false)}
                        if(CurrentAttack.shieldheal){ShieldHeal(CurrentAttack.shieldheal,false)}
                        if(CurrentAttack.selfdamage){Damage(CurrentAttack.selfdamage,true)}
                        
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
                
                if(COS<=0){
                    COS=0;if(!OSD){OSD=ODowntime}
                }if(OSD<=0){
                    COS+=OSR;OSD=0;
                }else{OSD-=0.01}
                
                if(CPS<=0){
                    CPS=0;if(!PSD){PSD=PDowntime}
                }if(PSD<=0){
                    CPS+=PSR;PSD=0;
                }else{PSD-=0.01}
                
                if(COH>MaxOH){COH=MaxOH}if(COH<0){COH=0}
                if(COS>MaxOS){COS=MaxOS}
                if(CPH>MaxPH){CPH=MaxPH}if(CPH<0){CPH=0}
                if(CPS>MaxPS){CPS=MaxPS}
                display();
                
                if(COH <= 0){
                    obj.res.materials += mi;
                    obj.res.add(resnarr,resarr);
                    C1C.innerHTML = 'Quantity: ' + obj.res.materials;
                    
                    // Enemies
                    if(area == 'A1'){obj.areaWins.A1Wins++; AD1.innerText = 'Drops: Slime, Slime Key\nWins until boss: ' + obj.areaWins.A1Wins + '/4'}
                    if(area == 'A2'){obj.areaWins.A2Wins++; AD2.innerText = 'Drops: Slime, Red Fuid, Rusty Key\nWins until boss: ' + obj.areaWins.A2Wins + '/10'}
                    
                    // Normal Bosses
                    if(area == 'A1B'){
                        if(T4.innerHTML != 'RESEARCH'){setTimeout(()=>{displayText(["Ah, the slime key...", "I suppose you were stronger than I thought.", "Use the newly acquired resources at the research facility to become stronger."], ["c01.png", "c01.png", "c01.png"], ["C0", "C0", "C0"])},1000)}
                        obj.areaWins.A1Wins = 0; AD1.innerText = 'Drops: Slime, Slime Key\nWins until boss: ' + obj.areaWins.A1Wins + '/4';
                        T4.id = '';T4.style.backgroundColor = 'rgb(60,60,60)';T4.style.color = 'white';
                        T4.style.left = '76.5%';T4.innerHTML = 'RESEARCH';obj.areaProgress['A1C'] = true;
                    }
                    if(area == 'A2B'){
                        obj.areaWins.A2Wins = 0; AD2.innerText = 'Drops: Slime, Red Fluid, Rusty Key\nWins until boss: ' + obj.areaWins.A2Wins + '/10';
                        document.getElementById('UG6').style.display = 'flex';
                        document.getElementById('UG7').style.display = 'flex';
                        document.getElementById('UG8').style.display = 'flex';
                        document.getElementById('IB2').style.display = 'flex';
                        obj.areaProgress['A2C'] = true;
                    }
                    
                    // Secret Bosses
                    if(area=='SB1'){obj.sBossProgress.SB1w = true; obj.muls.ndm += .05; GKT.style.color = 'cyan'; GKT.innerHTML = 'What an intense fight...'}
                    if(area=='SB2'){obj.sBossProgress.SB2w = true; obj.muls.pdm += .05; GKT.style.color = 'cyan'; GKT.innerHTML = 'Space is not as boundless as we think...'}
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
                    S2A=''; this.S2A=''; A2Use = 0; CB2.style.height = '100%';
                    S3A=''; this.S3A=''; A3Use = 0;
                    S4A=''; this.S4A=''; A4Use = 0;
                    S5A=''; this.S5A=''; A5Use = 0; CB5.style.height = '100%';
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
                    localStorage.setItem('A&MData',JSON.stringify(obj));
                    clearInterval(intervalId);
                }
            },10);
        }
    }
    
    const A1BossWins = 4;
    const A2BossWins = 10;
    const E1 = document.getElementById('E1');
    const E2 = document.getElementById('E2');
    
    E1.addEventListener('click',()=>{
        if(obj.areaWins.A1Wins < A1BossWins){
            if(Math.random() < .5){
                LoadFight('Basic Slime', 400, 180, 5, .4, UserHealth, UserShield, ShieldDowntime, ShieldRegen, BasicSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(2*Math.random())+2], SUEM);
            }else{
                LoadFight('Scrap Slime', 370, 550, 10, .1, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ScrapSlimeAttacks, 1, 'A1', ['Slime'], [Math.round(Math.random())+3], SUEM);
            }
        }else{
            LoadFight('Reinforced Slime', 1000, 750, 15, .2, UserHealth, UserShield, ShieldDowntime, ShieldRegen, ReinforcedSlimeAttacks, 5, 'A1B', ['Slime', 'Slime Key'], [Math.round(2*Math.random())+4, 1], SUBM);
        }
    });
    E2.addEventListener('click',()=>{
        if(obj.areaWins.A2Wins < A2BossWins){
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
    
    window.onload=()=>{
        document.getElementById('LoadingScreen').style.display = 'none';
    }
});
