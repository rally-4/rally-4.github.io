bit32={}
function bit32.band(a,b)
    local result=0
    local bitval=1
    while a > 0 and b > 0 do
        if a % 2 == 1 and b % 2 == 1 then
            result=result+bitval
        end
        bitval=bitval*2
        a=math.floor(a/2)
        b=math.floor(b/2)
    end
    return result
end
perlin={}perlin.p={}local a={151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180}for b=0,255 do perlin.p[b]=a[b+1]perlin.p[b+256]=a[b+1]end;function perlin:noise(c,d,e)d=d or 0;e=e or 0;local f=bit32.band(math.floor(c),255)local g=bit32.band(math.floor(d),255)local h=bit32.band(math.floor(e),255)c=c-math.floor(c)d=d-math.floor(d)e=e-math.floor(e)local i=self.fade(c)local j=self.fade(d)local k=self.fade(e)local l=self.p;local m,n,o,p,q,r,s,t,u,v,w,x,y,z;m=l[f]+g;n=l[m]+h;o=l[m+1]+h;p=l[n]q=l[o]r=l[n+1]s=l[o+1]t=l[f+1]+g;u=l[t]+h;v=l[t+1]+h;w=l[u]x=l[v]y=l[u+1]z=l[v+1]return self.lerp(k,self.lerp(j,self.lerp(i,self:grad(p,c,d,e),self:grad(w,c-1,d,e)),self.lerp(i,self:grad(q,c,d-1,e),self:grad(x,c-1,d-1,e))),self.lerp(j,self.lerp(i,self:grad(r,c,d,e-1),self:grad(y,c-1,d,e-1)),self.lerp(i,self:grad(s,c,d-1,e-1),self:grad(z,c-1,d-1,e-1))))end;perlin.dot_product={[0x0]=function(c,d,e)return c+d end,[0x1]=function(c,d,e)return-c+d end,[0x2]=function(c,d,e)return c-d end,[0x3]=function(c,d,e)return-c-d end,[0x4]=function(c,d,e)return c+e end,[0x5]=function(c,d,e)return-c+e end,[0x6]=function(c,d,e)return c-e end,[0x7]=function(c,d,e)return-c-e end,[0x8]=function(c,d,e)return d+e end,[0x9]=function(c,d,e)return-d+e end,[0xA]=function(c,d,e)return d-e end,[0xB]=function(c,d,e)return-d-e end,[0xC]=function(c,d,e)return d+c end,[0xD]=function(c,d,e)return-d+e end,[0xE]=function(c,d,e)return d-c end,[0xF]=function(c,d,e)return-d-e end}function perlin:grad(A,c,d,e)return self.dot_product[bit32.band(A,0xF)](c,d,e)end;function perlin.fade(B)return B*B*B*(B*(B*6-15)+10)end;function perlin.lerp(B,C,D)return C+B*(D-C)end
