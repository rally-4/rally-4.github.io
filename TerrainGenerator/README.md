A simple terrain generator made to create maps which can be tiled onto a sphere.  
[This article](https://tonisagrista.com/blog/2021/procedural-planetary-surfaces/#seamless-tilable-noise) was very helpful.  
  
## Settings info
Coloration — Defines how different values get colored using `ctx.fillStyle`. There are three variables: `h` (height), `mois` (moisture) and `temp` (temperature).
Four default functions are also available: `Terrestrial` (creates a terrestrial environment), `Noise` (monochromatic, height-only), `Flesh` (yes), `Visual` (separates each value into a different color channel).  
Seeds — For randomising the perlin noise, one for every value.  
  
**Parameters**  
Scale — Determines the size of each pixel. Values lower than 3 will result in long loading times.  
Magnitude — Divides `x`, `y`, and `z` by a this value. Doesn't affect worley noise.  
Octaves — Amount of octaves applied to the heightmap.  
Base height — Default value of `h`.  
Max height — Maximum height possible.
Worley map — Enables/disables worley noise.
