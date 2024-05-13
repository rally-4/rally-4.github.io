// STRING MANIPULATION
const Limit = function(e,l){
    if(e.value.length > l){
        e.value = e.value.substr(0,l);
    }
}

// AUDIO FUNCTIONS
const play=m=>m.play();
const stop=m=>{m.pause();m.currentTime=0}
const stopAll=()=>{
    var allAudios=document.getElementsByTagName('audio');
    for(i=0;i<allAudios.length;i++){allAudios[i].pause();allAudios[i].currentTime=0}
}

// BOOLEAN ALGEBRA
const Bool = {
    true: true,
    false: false
}
Bool.not=p=>!p;
Bool.and=(p,q)=>!(!p||!q);
Bool.or=(p,q)=>!(!p&&!q);
Bool.xor=(p,q)=>!!(p^q);
Bool.imply=(p,q)=>1!=p||0!=q;
Bool.nonimply=(p,q)=>1==p&&0==q;

// TIMER FUNCTIONS
// it's also possible to add d into j*i to achieve the same delay effect
let setSchedule=(func,i,n,d=0)=>{
    setTimeout(()=>{
        for(let j=0;j<n;j++){
            setTimeout(func,j*i);
        }
    },d)
}

// OTHER
const setRotateAnimation=(e,t)=>{
    e.style.animationName = 'rotate';
    e.style.animationDuration = t+'s';
    e.style.animationIterationCount = '1';
    e.style.animationTimingFunction = 'linear';
    e.style.animationFillMode = 'none';
    e.style.animationPlayState = 'paused';
}
const getResCols=(res)=>{
    if(res=='Slime'){return 'rgb(0,127,255)'}
    else if(res=='Slime Key'){return 'rgb(0,90,210)'}
    else if(res=='Red Fluid'){return 'rgb(210,0,30)'}
    else if(res=='Rusty Key'){return 'rgb(90,45,0)'}
    else{return 'rgb(255,255,255)'}
}
const rem=(arr,el)=>{for(a=0;a<el.length;a++){arr.splice(arr.indexOf(el[a]),1)}}