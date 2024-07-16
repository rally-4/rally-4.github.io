const loadTabs = function(){
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
    const UTs = document.getElementById('UTs');
    const UTSs = document.getElementById('UTSs');
    let UTSArr = [UTS1, UTS2, UTSs];
    let UTArr = [UT1, UT2, UTs];
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
    T1.addEventListener('click',()=>{play(CS);swap(0)});
    T2.addEventListener('click',()=>{play(CS);swap(1)});
    T3.addEventListener('click',()=>{play(CS);swap(2)});
    T4.addEventListener('click',()=>{if(obj.areaProgress['A1C']){play(CS);swap(3)}});
    UT1.addEventListener('click',()=>{play(CS);subswap(0)});
    UT2.addEventListener('click',()=>{play(CS);subswap(1)});
    UTs.addEventListener('click',()=>{play(CS);setStats();subswap(UTSArr.length-1)});
    swap(0);subswap(0);
}