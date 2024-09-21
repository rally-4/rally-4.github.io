const Worley = {}
Worley.distancing2 = function(list, x, y, distancing){
    let v = true;
    for(l of list){
        if(Math.hypot(x-l[0],y-l[1])<=distancing){v=false}
    }
    return v;
}
Worley.distancing3 = function(list, x, y, z, distancing){
    let v = true;
    for(l of list){
        if(Math.hypot(x-l[0],y-l[1],z-l[2])<=distancing){v=false}
    }
    return v;
}
Worley.map2 = function(width, height, scale, density, distancing){
    let points = []; let c = 0;
    for(let x=0;x<width;x+=scale){for(let y=-height;y<height;y+=scale){
        if(Math.random()<density){
            if(points[0]){
                if(Worley.distancing2(points, x, y, distancing)){
                    points.push([x,y]); c++;
                }
            }else{
                points.push([x,y]);
            }
        }
    }}
    return points;
}
Worley.map3 = function(width, height, depth, scale, density, distancing){
    let points = []; let c = 0;
    for(let x=-width;x<width;x+=scale){for(let y=-height;y<height;y+=scale){for(let z=-depth;z<depth;z+=scale){
        if(Math.random()<density){
            if(points[0]){
                if(Worley.distancing3(points, x, y, z, distancing)){
                    points.push([x,y,z]); c++;
                }
            }else{
                points.push([x,y,z]);
            }
        }
    }}}
    return points;
}
Worley.noise2 = function(map, min, x, y){
    let dst = [min];
    for(let i=0; i<map.length; i++){dst.push(Math.hypot(x-map[i][0],y-map[i][1]))}
    return Math.min(...dst);
}
Worley.noise3 = function(map, min, x, y, z){
    let dst = [min];
    for(let i=0; i<map.length; i++){dst.push(Math.hypot(x-map[i][0],y-map[i][1],z-map[i][2]))}
    return Math.min(...dst);
}