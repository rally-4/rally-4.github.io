const loadAreas = function(){
    const AD1 = document.getElementById('AD1');
    const AD2 = document.getElementById('AD2');
    
    const D1 = document.getElementById('D1'); let e1 = false;
    const D2 = document.getElementById('D2'); let e2 = false;
    
    const A1 = document.getElementById('A1');
    const A2 = document.getElementById('A2');
    
    // AREA INFO
    const IB1 = document.getElementById('IB1');
    const AI1 = document.getElementById('AI1');
    IB1.addEventListener('click',()=>{AI1.style.display = 'flex'});
    AI1.addEventListener('click',()=>{AI1.style.display = 'none'});
    
    const IB2 = document.getElementById('IB2');
    const AI2 = document.getElementById('AI2');
    IB2.addEventListener('click',()=>{AI2.style.display = 'flex'});
    AI2.addEventListener('click',()=>{AI2.style.display = 'none'});
    
    // AREA DETAILS
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
}