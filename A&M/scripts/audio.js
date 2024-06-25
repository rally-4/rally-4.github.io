const loadAudio = function(){
    const November = document.getElementById('November');
    const SUEM = document.getElementById('SUEM');
    const SUBM = document.getElementById('SUBM');
    const BLEM = document.getElementById('BLEM');
    const BLBM = document.getElementById('BLBM');
    const T99 = document.getElementById('T99');
    const DOM = document.getElementById('DOM');
    T99.volume = BLBM.volume = .6;
    
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
    for(l=0;l<loudSFX.length;l++){loudSFX[l].volume=.3}
}