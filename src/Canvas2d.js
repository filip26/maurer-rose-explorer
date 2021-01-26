
const AXIS_SIZE = 40;
const AXIS_BACKGROUND = '#dadadaff';
const AXIS_FONT_COLOR = '#3a3a3aff';
const AXIS_DELIMITER_COLOR = '#ffffffff';

export default class Canvas2d {
    
    initialize = async (canvas) => {
     
        const ctx = canvas.getContext("2d")
                
        if (!ctx) {
            return Promise.reject("2d canvas is not supported by your browser.");
        }
        this.ctx = ctx;
        
        return Promise.resolve();        
    }
    
    draw = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); 
        this.drawLegend();
    }
    
    update = ({aspect, center, zoom, tile, width, height}) => {

        const centerX = width / 2 + width * aspect.y * zoom * (center.x / 2);
        const centerY = height / 2 - height * aspect.x * zoom * (center.y / 2);
        
        const size = aspect.y === 1 ? tile.pixelWidth : tile.pixelHeight;
                           
        this.xAxis = {
                start: ((centerX / size) - Math.floor(centerX / size)) * size,
                label: -1*Math.floor(centerX / size),                
                size: size 
                }; 

        this.yAxis = {
                start: ((centerY / size) - Math.floor(centerY / size)) * size,
                label: -1*Math.floor(centerY / size),                
                size: size  
                }; 
    }
                

    drawScene = () => {
        if (!this.xAxis || !this.yAxis) {
            return;
        }
        
        this.ctx.fillStyle = AXIS_BACKGROUND;        
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, AXIS_SIZE);        
        this.ctx.fillRect(0, 0, AXIS_SIZE, this.ctx.canvas.height);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = AXIS_FONT_COLOR;        
        this.ctx.font = '300 13px sans-serif'
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        let yLabel = this.yAxis.label;
        
        this.ctx.fillText(yLabel-1, AXIS_SIZE / 2,  this.yAxis.start - this.yAxis.size / 2 );
        
        // y Axis        
        for (let y=this.yAxis.start; y < this.ctx.canvas.height; y += this.yAxis.size) {
            
            this.ctx.fillText(yLabel++, AXIS_SIZE / 2,  y + this.yAxis.size / 2 );
            
            this.ctx.moveTo(0,  y);
            this.ctx.lineTo(AXIS_SIZE, y);
        }
        
        let xLabel = this.xAxis.label;
        
        this.ctx.fillText(xLabel-1, this.xAxis.start - this.xAxis.size / 2, AXIS_SIZE / 2);

        // x Axis        
        for (let x=this.xAxis.start; x < this.ctx.canvas.width; x += this.xAxis.size) {
                        
            this.ctx.fillText(xLabel++, x + this.xAxis.size / 2, AXIS_SIZE / 2);
            
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, AXIS_SIZE);
        }
        
        this.ctx.closePath();
        
        this.ctx.lineWidth = 1.0;
        this.ctx.strokeStyle = AXIS_DELIMITER_COLOR;
        this.ctx.stroke();
        this.ctx.restore();

        this.ctx.fillStyle = AXIS_BACKGROUND;        
        this.ctx.fillRect(0, 0, AXIS_SIZE, AXIS_SIZE);
        
        this.ctx.strokeStyle = '#eaeaeaff';
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;

        this.ctx.moveTo(AXIS_SIZE - 1, 0);
        this.ctx.lineTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.moveTo(0, AXIS_SIZE - 1);
        this.ctx.lineTo(AXIS_SIZE - 1, AXIS_SIZE - 1);

        this.ctx.moveTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.lineTo(AXIS_SIZE - 1, this.ctx.canvas.height);
        this.ctx.moveTo(AXIS_SIZE - 1, AXIS_SIZE - 1);
        this.ctx.lineTo(this.ctx.canvas.width, AXIS_SIZE - 1);        
        this.ctx.closePath();        
        this.ctx.stroke();
    }
    
    drawLegend = (length = 70) => {
        this.ctx.save();
        this.ctx.translate(this.ctx.canvas.width - length - 5, this.ctx.canvas.height - length - 5);
        
        this.ctx.fillStyle = '#666666aa';
        
        this.ctx.fillRect(0, 0, length, length);        

        this.ctx.beginPath();
        
        this.ctx.moveTo(length / 3, 5);
        this.ctx.lineTo(length / 3, length - 5);
        this.ctx.lineTo(length / 3 - 4, length - length / 8 - 5);
        this.ctx.moveTo(length / 3, length - 5);
        this.ctx.lineTo(length / 3 + 4, length - length / 8 - 5);

        this.ctx.moveTo(5, length / 3);
        this.ctx.lineTo(length - 5, length / 3);
        this.ctx.lineTo(length - length / 8 - 5, length / 3 - 4);
        this.ctx.moveTo(length - 5, length / 3);
        this.ctx.lineTo(length - length / 8 - 5, length / 3 + 4);

        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, length);
        this.ctx.lineTo(length, length);
        this.ctx.lineTo(length, 0);
        this.ctx.lineTo(0, 0);
        
        this.ctx.closePath();
        
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#ffffffff';        
        
        this.ctx.stroke();
        
        this.ctx.font = '300 14px Roboto'
        this.ctx.fillStyle = '#357a38';

        this.ctx.fillStyle = '#ffffffff';
        
        this.ctx.textAlign = 'left';
        this.ctx.fillText("d", length / 3 + 7,  length - 7);
        this.ctx.textAlign = 'right';
        this.ctx.fillText("n", length - 7, length / 3 - 7);
        
        this.ctx.restore();
    }
}