const loadData = function(){
    const C1C = document.getElementById('C1C');
    obj = {
        res: {materials: 0},
        tutorial: true,
        sBossProgress: {SB1w: false, SB2w: false, SB3w: false, SB4w: false},
        areaProgress: {A1C: false, A2C: false, A3C: false, A4C: false},
        areaWins: {A1Wins: 0, A2Wins: 0, A3Wins: 0, A4Wins: 0},
        unlocks: {uu2: false, uu3: false, uu4: false, uu6: false, uu7: false, uu8: false, uu9: false, uu10: false, uu13: false, uu14: false},
        upgrades: {uu1: 0, uu5: 0, uu11: 0, uu12: 0},
        muls: {ndm: 1, sdm: 1, pdm: 1},
        stats: {wins: 0, losses: 0},
        AA: {AA1v: 0, AA2v: 0, AA3v: 0, AA4v: 0, AA5v: 0}
    }
    document.getElementById('Reset').addEventListener('click',()=>{
        localStorage.clear();
        obj = {
            res: {materials: 0},
            tutorial: true,
            sBossProgress: {SB1w: false, SB2w: false, SB3w: false, SB4w: false},
            areaProgress: {A1C: false, A2C: false, A3C: false, A4C: false},
            areaWins: {A1Wins: 0, A2Wins: 0, A3Wins: 0, A4Wins: 0},
            unlocks: {uu2: false, uu3: false, uu4: false, uu6: false, uu7: false, uu8: false, uu9: false, uu10: false, uu13: false, uu14: false},
            upgrades: {uu1: 0, uu5: 0, uu11: 0, uu12: 0},
            muls: {ndm: 1, sdm: 1, pdm: 1},
            stats: {wins: 0, losses: 0},
            AA: {AA1v: 0, AA2v: 0, AA3v: 0, AA4v: 0, AA5v: 0}
        }
        location.href = location.href;
    });
    /*document.getElementById('TTC').addEventListener('click',()=>{
        obj.res.materials += 1000; C1C.innerHTML = 'Quantity: ' + obj.res.materials;
        obj.tutorial = false;
        obj.areaProgress.A1C = true;
        obj.areaProgress.A2C = true;
        recoverAreaUnlocks(obj.areaProgress, obj.areaWins);
        obj.add(['Slime','Slime Key', 'Red Fluid', 'Rusty Key'], [400,1,500,1]);
    });*/
    
    if(localStorage.getItem('A&MData')){
        obj = JSON.parse(localStorage.getItem('A&MData'));
        recoverAreaUnlocks(obj.areaProgress, obj.areaWins);
        recoverUnlocks(obj.unlocks);
        recoverUpgrades(obj.upgrades);
        selectAbilities(obj.AA);
        obj.readd = function(n,a){
            var rarr = [];
            for(i=0; i<n.length; i++){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + n[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (8+rarr.length*8) + '%)';
                
                var newDiv = document.createElement('div');
                newCraft.appendChild(newDiv);
                var rescol = getResCol(n[i]);
                newDiv.style.backgroundColor = rescol;
                newDiv.style.border = '2px solid ' + rescol;
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + n[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
                
                obj.res[n[i]] += a[i];
                document.getElementById('C'+n[i]+'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
                rarr.push(newCraft.style.top);
            }
        }
        var keys = Object.keys(obj.res); keys.shift();
        var values = Object.values(obj.res); values.shift();
        obj.readd(keys,values);
        delete obj.readd;
        C1C.innerHTML = 'Quantity: ' + obj.res.materials;
    }
    
    obj.add = function(n,a){
        for(i=0; i<n.length; i++){
            if(obj.res[n[i]] == undefined){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + n[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (Object.keys(obj.res).length-1)*8 + '%)';
                
                var newDiv = document.createElement('div');
                newCraft.appendChild(newDiv);
                var rescol = getResCol(n[i]);
                newDiv.style.backgroundColor = rescol;
                newDiv.style.border = '2px solid ' + rescol;
                
                var p1 = document.createElement('p');
                newCraft.appendChild(p1);
                p1.innerHTML = n[i];
                
                var p2 = document.createElement('p');
                newCraft.appendChild(p2);
                p2.id = 'C' + n[i] + 'C';
                p2.innerHTML = 'Quantity: ' + obj.res[n[i]];
            }
            obj.res[n[i]] += a[i];
            document.getElementById('C'+n[i]+'C').innerHTML = 'Quantity: ' + obj.res[n[i]];
        }
    }
    
    const SaveInput = document.getElementById('SaveInput');
    const Import = document.getElementById('Import');
    const Export = document.getElementById('Export');
    
    Import.addEventListener('click',()=>{
        if(SaveInput.value.endsWith('=')){
            obj = JSON.parse(window.atob(SaveInput.value));
        }else{
            SaveInput.value = 'Invalid Save';
        }
        localStorage.setItem('A&MData',JSON.stringify(obj));
        location.href = location.href;
    });
    Export.addEventListener('click',()=>{
        SaveInput.value = window.btoa(JSON.stringify(obj));
    });
    
    if(obj.areaProgress.A4C === undefined){obj.areaProgress.A4C = false}
    if(obj.areaWins.A4Wins === undefined){obj.areaWins.A4Wins = 0}
    if(obj.upgrades.uu11 === undefined){obj.upgrades.uu11 = 0}
    if(obj.upgrades.uu12 === undefined){obj.upgrades.uu12 = 0}
    if(obj.stats === undefined){obj.stats = {wins: 0, losses: 0}}
    if(obj.unlocks.uu13 === undefined){obj.unlocks.uu13 = false}
    if(obj.sBossProgress.SB4w === undefined){obj.sBossProgress.SB4w = false}
    if(obj.unlocks.uu14 === undefined){obj.unlocks.uu14 = false}
}