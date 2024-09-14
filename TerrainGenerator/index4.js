function remn(n){return n<0?0:n}
function redn(n){return n<0?n/3:n}
window.addEventListener('DOMContentLoaded',()=>{
    const a=document.getElementById('a');
    const button=document.getElementById('download');
    const reload=document.getElementById('reload');
    const col=document.getElementById('col'); col.value='Terrestrial';
    const sed=document.getElementById('sed'); sed.value='Random';
    const sclE=document.getElementById('sclE'); sclE.value='4';
    const magE=document.getElementById('magE'); magE.value='256';
    const octE=document.getElementById('octE'); octE.value='5';
    const obj = {}
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wight = width/height;
    let rw = Math.round(width/2);
    let rh = Math.round(height/2);
    const canvas = document.getElementById('canvas');
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = width; canvas.height = height;
    canvas.style.height = height + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    ctx.translate(rw,rh);
    
    /* function ptc(_,$){
        let x=Math.cos(_)*Math.cos($);
        let y=Math.cos(_)*Math.sin($);
        let z=Math.sin(_);
        return [x,y,z];
    } */
    
    let h;
    let temp;
    let mois;
    const Terrestrial='h<60?ctx.fillStyle=`rgb(0,${redn(h/2)+60},${1.5*redn(h/2)+135})`:h<210?mois<0?ctx.fillStyle=`rgb(${h/2+15},${h/3},10)`:temp<-.2?ctx.fillStyle=`rgb(${30-5*temp},${h/4+60},60)`:ctx.fillStyle=`rgb(${h/2+150*temp-60},${h/3+60},5)`:ctx.fillStyle=`rgb(${h/2},${h/2},${h/2})`,temp<-.6&&(ctx.fillStyle=`rgb(${-30*temp+195},${-30*temp+210},${-30*temp+225})`)';
    const Noise='ctx.fillStyle=`rgb(${h},${h},${h})`';
    const Flesh='h<210?ctx.fillStyle=`rgb(${Math.abs(h+60)},0,${Math.abs(h/5)}`:ctx.fillStyle=`rgb(255,${h/6},${h/5})`';
    const Visual='ctx.fillStyle=`rgb(${128+128*temp},${255*mois},${h})`';
    let colDis = Terrestrial;
    
    function ptc(_,$){return[Math.cos(_)*Math.cos($),Math.cos(_)*Math.sin($),Math.sin(_)]}
    const Pi = Math.PI;
    const Tau = 2*Math.PI;
    const e = Math.E;
    const r = 256;
    let scl = 4;
    let mag = 256;
    let oct = 5;
    let add = -240;
    let rand = true;
    let maxHeight = 510;
    let map = Worley.map3(r,r,r,2,.000002,0);
    function draw(){
        reload.innerHTML='Loading...';
        setTimeout(()=>{
            let hseed,moiseed,tmpseed;
            if(rand===true){
                hseed=Math.round(65536*Math.random());
                moiseed=Math.round(65536*Math.random());
                tmpseed=Math.round(65536*Math.random());
            }else{
                hseed=rand[0];
                moiseed=rand[1];
                tmpseed=rand[2];
            }
            for(let t=-Pi/2;t<Pi/2;t+=.01*scl){for(let p=-Pi;p<Pi;p+=.01*scl){
                let c=ptc(t,p);
                x=r*c[0]/mag;
                y=r*c[1]/mag;
                z=r*c[2]/mag;
                rx=width*p/Tau;
                ry=height*t/Pi;
                h=add;
                // h+=Math.abs(ry)/2
                const PO=PL(obj,hseed);
                for(let i=0;i<oct;i++){h+=(255-30*i)*PO.perlin3(i*x,i*y,i*z)}
                h+=1.5*(255-Worley.noise3(map,x*mag,y*mag,z*mag));
                h=Math.min(h,maxHeight);
                mois=PL(obj,moiseed).perlin3(x,y,z);
                temp=.4*Math.abs(PL(obj,tmpseed).perlin3(x,y,z))+1.6*(rh-Math.abs(ry))/rh-1;
                eval(colDis);
                ctx.fillRect(rx,ry,e*scl,Tau*scl);
            }}
            console.log(`${hseed}, ${moiseed}, ${tmpseed}`);
            reload.innerHTML='Reload';
        },10);
    }
    draw();
    
    function download(){a.href=canvas.toDataURL('image/png');a.download='noise.png';a.click()}
    button.addEventListener('click',download);
    reload.addEventListener('click',draw);
    
    col.addEventListener('keyup',e=>{
        if((e.key == 'Enter' || e.keyCode == 13) && col.value){
            let v=col.value.toLowerCase();
            if(v=='terrestrial'){colDis=col.value=Terrestrial}
            else if(v=='noise'){colDis=col.value=Noise}
            else if(v=='flesh'){colDis=col.value=Flesh}
            else if(v=='visual'){colDis=col.value=Visual}
            else{colDis=col.value}
        }
    });
    sed.addEventListener('keyup',e=>{
        if((e.key == 'Enter' || e.keyCode == 13) && sed.value){
            let v=sed.value.toLowerCase();
            if(v=='random'||v=='rand'){rand=true;sed.value='Random'}
            else{rand=sed.value.split(',');for(let r in rand){rand[r]=Number(rand[r])}}
        }
    });
    sclE.addEventListener('keyup',e=>{
        if((e.key == 'Enter' || e.keyCode == 13) && sclE.value && !isNaN(sclE.value)){
            scl = Number(sclE.value);
        }
    });
    magE.addEventListener('keyup',e=>{
        if((e.key == 'Enter' || e.keyCode == 13) && magE.value && !isNaN(magE.value)){
            mag = Number(magE.value);
        }
    });
    octE.addEventListener('keyup',e=>{
        if((e.key == 'Enter' || e.keyCode == 13) && octE.value && !isNaN(octE.value)){
            oct = Number(octE.value);
        }
    });
    
    window.addEventListener('resize',()=>{
        
    });
});