// STRING MANIPULATION
const Limit = function(e, l){
    if(e.value.length > l){
        e.value = e.value.substr(0, l);
    }
}

// BOOLEAN MANIPULATIONS
const Bool = {
    true: true,
    false: false
}
Bool.not = function(p){
    return !p;
}
Bool.and = function(p, q){
    if(p && q){
        return true;
    }else{
        return false;
    }
}
Bool.or = function(p, q){
    if(p || q){
        return true;
    }else{
        return false;
    }
}
Bool.xor = function(p, q){
    if(p ^ q){
        return true;
    }else{
        return false;
    }
}
Bool.imply = function(p, q){
    if(p == true && q == false){
        return false;
    }else{
        return true;
    }
}
Bool.nonimply = function(p, q){
    if(p == true && q == false){
        return true;
    }else{
        return false;
    }
}

// TIMER FUNCTIONS
// it's also possible to add d into j*i to achieve the same delay effect
let setSchedule=(func, i, n, d=0)=>{
    setTimeout(()=>{
        for(let j=0; j < n; j++){
            setTimeout(func, j*i);
        }
    }, d);
}
