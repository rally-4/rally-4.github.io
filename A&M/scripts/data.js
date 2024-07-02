const loadData = function(){
    const C1C = document.getElementById('C1C');
    obj = {
        res: {materials: 0},
        tutorial: true,
        sBossProgress: {SB1w: false, SB2w: false},
        areaProgress: {A1C: false, A2C: false},
        areaWins: {A1Wins: 0, A2Wins: 0},
        unlocks: {uu2: false, uu3: false, uu4: false, uu6: false, uu7: false, uu8: false},
        upgrades: {uu1: 0, uu5: 0},
        muls: {ndm: 1, sdm: 1, pdm: 1},
        AA: {AA1v: 0, AA2v: 0, AA3v: 0, AA4v: 0, AA5v: 0}
        
    }
    
    // DEBUGGING
    /* obj.res.materials += 1000;
    obj.tutorial = false;
    obj.areaProgress.A1C = true;
    obj.areaProgress.A2C = true;
    recoverAreaUnlocks(obj.areaProgress, obj.areaWins); */
    
    if(localStorage.getItem('A&MData')){
        obj = JSON.parse(localStorage.getItem('A&MData'));
        recoverAreaUnlocks(obj.areaProgress, obj.areaWins);
        recoverUnlocks(obj.unlocks);
        recoverUpgrades(obj.upgrades);
        selectAbilities(obj.AA);
        obj.res.readd = function(n,a){
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
        var keys = Object.keys(obj.res); rem(keys,['materials', 'readd']);
        var values = Object.values(obj.res); rem(values,['materials', 'readd']);
        obj.res.readd(keys,values);
        obj.res.materials += obj.res.materials;
        C1C.innerHTML = 'Quantity: ' + obj.res.materials;
    }
    
    obj.res.add = function(n,a){
        for(i=0; i<n.length; i++){
            if(obj.res[n[i]] == undefined){
                obj.res[n[i]] = 0;
                
                var newCraft = document.createElement('div');
                TS2.appendChild(newCraft);
                newCraft.id = 'C' + n[i];
                newCraft.classList.add('crafts');
                newCraft.style.top = 'calc(16px + ' + (Object.keys(obj.res).length-2)*8 + '%)';
                
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
    
    // obj.res.add(['Slime','Slime Key', 'Red Fluid'], [120,1,200]); // DEBUGGING
}