// STRING MANIPULATION
const Limit = function(e,l){
    if(e.value.length > l){
        e.value = e.value.substr(0,l);
    }
}

// BOOLEAN MANIPULATIONS
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
var setRotateAnimation = function(e,t){
    e.style.animationName = 'rotate';
    e.style.animationDuration = t+'s';
    e.style.animationIterationCount = '1';
    e.style.animationTimingFunction = 'linear';
    e.style.animationFillMode = 'none';
    e.style.animationPlayState = 'paused';
}
