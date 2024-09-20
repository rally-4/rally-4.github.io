const setSchedule=(func,i,n,d=0)=>{
    setTimeout(()=>{
        for(let j=0;j<n;j++){
            setTimeout(func,j*i);
        }
    },d)
}
const exp = function(x,f){
    return Number.parseFloat(x).toExponential(f);
}

window.onload=()=>{
    const Res = document.getElementById('Resonance');
    const Start = document.getElementById('Start');
    const TS2 = document.getElementById('TS2');
    const PsiA = document.getElementById('PsiAmount');
    const DC1 = document.getElementById('DC1');
    const UB1 = document.getElementById('UB1');
    const U1 = document.getElementById('U1');
    const DC2 = document.getElementById('DC2');
    const UB2 = document.getElementById('UB2');
    const U2 = document.getElementById('U2');
    const DC3 = document.getElementById('DC3');
    const UB3 = document.getElementById('UB3');
    const U3 = document.getElementById('U3');
    const DC4 = document.getElementById('DC4');
    const UB4 = document.getElementById('UB4');
    const U4 = document.getElementById('U4');
    const DimU = document.getElementById('DimU');
    const DimUB = document.getElementById('DimUB');
    const DimC = document.getElementById('DimC');
    const RedRow = document.getElementById('RedRow');
    const TSC = document.getElementById('TSC');
    const TSUB = document.getElementById('TSUB');
    
    var op = 1;
    let StartClick = function(){
        setSchedule(()=>{
            op -= .02;
            Start.style.backgroundColor = 'rgb(0,0,0,'+op+')';
        },5,50);
        Res.play();
        setTimeout(()=>{Start.remove()},250)
        Start.removeEventListener('click', StartClick);
    }
    Start.addEventListener('click', StartClick);
    
    let TS = 1;
    let TScst = 1E21;
    let Mul = 1;
    let Psi = 1;
    let Dim1cst = 1;
    let Dim1mul = 1;
    let Dim1 = 0;
    var uDim2 = false;
    let Dim2cst = 1000;
    let Dim2mul = 1;
    let Dim2 = 0;
    var uDim3 = false;
    let Dim3cst = 1000000;
    let Dim3mul = 1;
    let Dim3 = 0;
    var uDimU = false;
    var uDim4 = false;
    let Dim4cst = 1000000000;
    let Dim4mul = 1;
    let Dim4 = 0;
    UB1.addEventListener('click',()=>{
        if(Psi >= Dim1cst){
            Psi -= Dim1cst;
            Dim1 += 1;
            Dim1cst *= 100;
            Dim1mul *= 2;
            if(Dim1cst < 1E10){UB1.innerHTML = 'Cost: ' + Dim1cst}else{UB1.innerHTML = 'Cost: ' + exp(Dim1cst,3)}
            if(!uDim2){U2.style.display = 'flex'};
        }
    });
    UB2.addEventListener('click',()=>{
        if(Psi >= Dim2cst){
            Psi -= Dim2cst;
            Dim2 += 1;
            Dim2cst *= 1000;
            Dim2mul *= 2;
            if(Dim2cst < 1E10){UB2.innerHTML = 'Cost: ' + Dim2cst}else{UB2.innerHTML = 'Cost: ' + exp(Dim2cst,3)}
            if(!uDim3){U3.style.display = 'flex'};
        }
    });
    UB3.addEventListener('click',()=>{
        if(Psi >= Dim3cst){
            Psi -= Dim3cst;
            Dim3 += 1;
            Dim3cst *= 10000;
            Dim3mul *= 2;
            if(Dim3cst < 1E10){UB3.innerHTML = 'Cost: ' + Dim3cst}else{UB3.innerHTML = 'Cost: ' + exp(Dim3cst,3)}
            if(!uDimU){DimU.style.display = 'flex'}
            if(!uDim4 && Dim3 == 4){DimUB.innerHTML = 'Reset all 𝛙 and dimensions for a ×2 multiplier.'; tsp = true}
        }
    });
    UB4.addEventListener('click',()=>{
        if(Psi >= Dim4cst){
            Psi -= Dim4cst;
            Dim4 += 1;
            Dim4cst *= 100000;
            Dim4mul *= 2;
            if(Dim4cst < 1E10){UB4.innerHTML = 'Cost: ' + Dim4cst}else{UB4.innerHTML = 'Cost: ' + exp(Dim4cst,3)}
            if(Dim4 == 3+Math.log2(Mul)){DimUB.innerHTML = 'Reset all 𝛙 and dimensions for a ×2 multiplier.'; tsp = true}
        }
    });
    DimUB.addEventListener('click',()=>{
        if(tsp){
            tsp = false;
            Psi = 1;
            Dim1cst = 1; Dim1mul = 1; Dim1 = 0;
            Dim2cst = 1000; Dim2mul = 1; Dim2 = 0;
            Dim3cst = 1000000; Dim3mul = 1; Dim3 = 0;
            TS = 1; TScst = 1E21;
            Dim4cst = 1000000000; Dim4mul = 1; Dim4 = 0;
            Mul *= 2;
            DimUB.innerHTML = 'Requires ' + (3 + Math.log2(Mul)) + ' 4th Dimensions.';
            DimC.innerHTML = ''+Math.log2(Mul);
            if(Dim1cst < 1E10){UB1.innerHTML = 'Cost: ' + Dim1cst}else{UB1.innerHTML = 'Cost: ' + exp(Dim1cst,3)}
            if(Dim2cst < 1E10){UB2.innerHTML = 'Cost: ' + Dim2cst}else{UB2.innerHTML = 'Cost: ' + exp(Dim2cst,3)}
            if(Dim3cst < 1E10){UB3.innerHTML = 'Cost: ' + Dim3cst}else{UB3.innerHTML = 'Cost: ' + exp(Dim3cst,3)}
            if(Dim4cst < 1E10){UB4.innerHTML = 'Cost: ' + Dim4cst}else{UB4.innerHTML = 'Cost: ' + exp(Dim4cst,3)}
            TSC.innerHTML = ''+TS.toFixed(3); TSUB.innerHTML = 'Cost: ' + exp(TScst,0);
            U4.style.display = 'flex';
            uDim4 = true;
        }
        if(Math.log2(Mul) >= 4){
            RedRow.style.display = 'flex';
        }
    });
    RedRow.addEventListener('click',()=>{
        if(Psi >= TScst){
            Psi -= TScst;
            TScst *= 10;
            TS *= 1.25;
            TSC.innerHTML = ''+TS.toFixed(3);
            TSUB.innerHTML = 'Cost: ' + exp(TScst,0);
        }
    });
    
    const display = function(){
        if(Psi < 1E10){PsiA.innerHTML = ''+Psi}else{PsiA.innerHTML = ''+exp(Psi,3)}
        if(Dim1 < 1E10){DC1.innerHTML = Math.round(Dim1) + ' (×' + Dim1mul*Mul + ')'}else{DC1.innerHTML = exp(Dim1,3) + ' (×' + Dim1mul*Mul + ')'}
        if(Dim2 < 1E10){DC2.innerHTML = Math.round(Dim2) + ' (×' + Dim2mul*Mul + ')'}else{DC2.innerHTML = exp(Dim2,3) + ' (×' + Dim2mul*Mul + ')'}
        if(Dim3 < 1E10){DC3.innerHTML = Math.round(Dim3) + ' (×' + Dim3mul*Mul + ')'}else{DC3.innerHTML = exp(Dim3,3) + ' (×' + Dim3mul*Mul + ')'}
        DC4.innerHTML = Dim4 + ' (×' + Dim4mul*Mul + ')';
    }
    var ID = setInterval(()=>{
        Psi += Dim1 * Dim1mul * Mul * TS;
        Dim1 += Dim2 * Dim2mul * Mul * TS;
        Dim2 += Dim3 * Dim3mul * Mul * TS;
        Dim3 += Dim4 * Dim4mul * Mul * TS;
        display();
        if(Psi >= 1E100){TS2.style.display = 'flex';Res.pause();clearInterval(ID)}
    },10);
}