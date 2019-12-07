

export default class GlMaurerRose {

        constructor(column, row, width, height, radius = 1) {
    
        height  = width;
    
        const x = column * width;
        const y = row * height;

        this.vertices = [x, y, x, y + height, x + width, y + height, x + width, y];
        
        this.style = 'line-loop'; 
        
        this.zoomable = true;
        this.radius = radius;
        
    }   
        
    bind = gl => {
        this.buffer = gl.createBuffer(this.vertices);
    }

        
    vertices = (n = 4, d = 31, ofsetX = 0, ofsetY = 0, points, index) => {

//console.log(n, d);        
        
        for (let theta=0; theta < 360; theta+=1) {

            const k = theta * d * Math.PI / 180;
            const r = 0.25 / this.radius  * Math.sin(n * k) ;
            
            const x = r * Math.cos(k);
            const y = r * Math.sin(k);
    
            points[index + theta*2] = x  + ofsetX; 
            points[index + theta*2 + 1] = y   - ofsetY;        
            
        }
//        console.log(v);
        return index + 360 * 2;
    }
}
