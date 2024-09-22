function remn(n){return n<0?0:n}
function isInt(n){return n===Math.floor(n)?1:0}
window.addEventListener('DOMContentLoaded',()=>{
    const a=document.getElementById('a');
    const button=document.getElementById('download');
    const reload=document.getElementById('reload');
    const p1=document.getElementById('p1'); p1.value='ctx.strokeStyle=`rgb(255,255,255)`';
    const p2=document.getElementById('p2'); p2.value='7';
    const p3=document.getElementById('p3'); p3.value='1';
    const p4=document.getElementById('p4'); p4.value='0';
    const p5=document.getElementById('p5'); p5.value='0';
    const p6=document.getElementById('p6'); p6.value='16';
    let width = window.innerWidth - 256;
    let height = window.innerHeight;
    let wight = width/height;
    let rw = Math.round(width/2);
    let rh = Math.round(height/2);
    
    const canvas = document.getElementById('canvas');
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.height = height + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    ctx.translate(0,0);
    
    const White='ctx.strokeStyle=`rgb(255,255,255)`';
    const StartValue='ctx.strokeStyle=`rgb(${255*s.x/width},${255*s.y/height},${127*s.x/width+127*s.y/height})`';
    const EndValue='ctx.strokeStyle=`rgb(${255*e.x/width},${255*e.y/height},${127*e.x/width+127*e.y/height})`';
    const CombinedValue='ctx.strokeStyle=`rgb(${255*s.x/width},${127*s.y/height+127*e.x/width},${255*e.y/height})`';
    const Trigonometric='ctx.strokeStyle=`rgb(${255*Math.sin(s.x/32)},${255*Math.cos(s.y/32)},180)`';
    let inv = false;
    let col = White;
    
    function ptc(_,$){return[Math.cos(_)*Math.cos($),Math.cos(_)*Math.sin($),Math.sin(_)]}
    const pi = Math.PI;
    const tau = 2*Math.PI;
    const e = Math.E;
    
    const incrementArray = function(si,sk){
        if(si/sk !== Math.floor(si/sk) && si/2 !== Math.floor(si/2)){return []}
        const inc = si/sk;
        let val = si/sk;
        let arr = [val];
        while(val < si){
            val += inc;
            arr.push(val);
        }
        return arr;
    }
    const cvIncrement = function(si,sk){
        return 0;
    }
    const truncate = function(varr,dst){
        let idst = 1-dst;
        let narr = [];
        for(let v=0; v<varr.length; v++){
            let x1 = varr[v].x, y1 = varr[v].y;
            let x2 = varr[(v+1) % varr.length].x, y2 = varr[(v+1) % varr.length].y;
            
            let x = idst*x1 + dst*x2;
            let y = idst*y1 + dst*y2;
            let p1 = {x, y}
            
            x = dst*x1 + idst*x2;
            y = dst*y1 + idst*y2;
            let p2 = {x, y}
            
            narr.push(p1);
            narr.push(p2);
        }
        tsides=sides*2;
        return narr;
    }
    let margin = 16;
    let r = Math.min(rw,rh)-margin; // radius of the polygon
    let sides = 7; // number of segments
    let tsides = 14; // a truncated polygon has twice the segments
    let skips = 1; // skipped vertices per iteration - 1
    let ang = 0; // starting angle
    let trc = 0; // truncate distance
    function draw(){
        reload.innerHTML='Loading...';
        ctx.fillStyle='black';
        ctx.clearRect(0,0,width,height);
        setTimeout(()=>{
            let vertices = [];
            for(let i=0; i<sides; i++){
                let t = (2*pi*i/sides) - pi/2 + ang;
                let x = rw + r*Math.cos(t);
                let y = rh + r*Math.sin(t);
                vertices.push({x,y});
            }
            let cv = 0;
            if(trc){
                vertices = truncate(vertices, trc);
                let iarr = incrementArray(tsides,skips);
                let cvInc = cvIncrement(tsides,skips);
                for(let j=0; j<=tsides; j++){
                    let s = vertices[cv % tsides];
                    let e = vertices[(cv+skips) % tsides];
                    eval(col);
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(e.x, e.y);
                    ctx.closePath();
                    ctx.stroke();
                    for(let n of iarr){
                        if(j==n){cv++}
                    }
                    cv += skips + cvInc;
                }
            }else{
                let iarr = incrementArray(sides,skips);
                let cvInc = cvIncrement(sides,skips);
                for(let j=0; j<=sides; j++){
                    let s = vertices[cv % sides];
                    let e = vertices[(cv+skips) % sides];
                    eval(col);
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(e.x, e.y);
                    ctx.closePath();
                    ctx.stroke();
                    for(let n of iarr){
                        if(j==n){cv++}
                    }
                    cv += skips + cvInc;
                }
            }
            reload.innerHTML='Reload';
        },10);
    }
    draw();
    
    function download(){a.href=canvas.toDataURL('image/png');a.download='polygram.png';a.click()}
    button.addEventListener('click',download);
    reload.addEventListener('click',draw);
    
    p1.addEventListener('keyup',e=>{
        if(p1.value){
            let v=p1.value.toLowerCase();
            if(v=='white'){col=p1.value=White}
            else if(v=='startvalue'||v=='svalue'){col=p1.value=StartValue}
            else if(v=='endvalue'||v=='evalue'){col=p1.value=EndValue}
            else if(v=='combinedvalue'||v=='cvalue'){col=p1.value=CombinedValue}
            else if(v=='trig'){col=p1.value=Trigonometric}
            else{col=p1.value}
        }
    });
    p2.addEventListener('keyup',e=>{
        try{
            let v=eval(p2.value);
            if(!Number.isNaN(v) && v>1 && isInt(v)){sides=v;p2.style.color='white'}
            else{p2.style.color='red'}
        }catch(e){p2.style.color='red'}
    });
    p3.addEventListener('keyup',e=>{
        try{
            let v=eval(p3.value);
            if(!Number.isNaN(v) && v>0 && isInt(v)){skips=v;p3.style.color='white'}
            else{p3.style.color='red'}
        }catch(e){p3.style.color='red'}
    });
    p4.addEventListener('keyup',e=>{
        try{
            let v=eval(p4.value);
            if(!Number.isNaN(v)){ang=v;p4.style.color='white'}
            else{p4.style.color='red'}
        }catch(e){p4.style.color='red'}
    });
    p5.addEventListener('keyup',e=>{
        try{
            let v=eval(p5.value);
            if(!Number.isNaN(v)){trc=v;p5.style.color='white'}
            else{p5.style.color='red'}
        }catch(e){p5.style.color='red'}
    });
    p6.addEventListener('keyup',e=>{
        try{
            let v=eval(p6.value);
            if(!Number.isNaN(v)){margin=v;r=Math.min(rw,rh)-margin;p6.style.color='white'}
            else{p6.style.color='red'}
        }catch(e){p6.style.color='red'}
    });
    
    window.addEventListener('resize',()=>{
        
    });
});