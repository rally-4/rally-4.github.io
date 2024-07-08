const loadAudio = function(){
    const November = document.getElementById('November');
    const SUEM = document.getElementById('SUEM');
    const SUBM = document.getElementById('SUBM');
    const BLEM = document.getElementById('BLEM');
    const BLBM = document.getElementById('BLBM');
    const MCEM = document.getElementById('MCEM');
    const MCBM = document.getElementById('MCBM');
    const T99 = document.getElementById('T99');
    const DOM = document.getElementById('DOM');
    const MRR = document.getElementById('MRR');
    
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
    
    const SFX = [SSel, FSt, TCr, CCh, Sl, BE, Upg, CS, AIHD, AISD, PHDA, PSDA, IR, EH, He];
    function setDefaultSoundVolume(){
        for(let l=0;l<SFX.length;l++){SFX[l].volume=.3}
    }
    function disableSound(){
        for(let l=0;l<SFX.length;l++){SFX[l].volume=0}
    }
    const Music = [November, SUEM, SUBM, BLEM, BLBM, MCEM, MCBM, T99, DOM, MRR];
    function setDefaultMusicVolume(){
        for(let l=0;l<Music.length;l++){Music[l].volume=1}
        T99.volume = BLBM.volume = .6; MCEM.volume = MCBM.volume = .8;
    }
    function disableMusic(){
        for(let l=0;l<Music.length;l++){Music[l].volume=0}
    }
    setDefaultSoundVolume();
    setDefaultMusicVolume();
    
    const MT = document.getElementById('MusicToggle');
    MT.addEventListener('click',()=>{
        if(MT.checked){
            setDefaultMusicVolume();
        }else{
            disableMusic();
        }
    });
    const ST = document.getElementById('SoundToggle');
    ST.addEventListener('click',()=>{
        if(ST.checked){
            setDefaultSoundVolume();
        }else{
            disableSound();
        }
    })
}