import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Link, Typography } from '@material-ui/core';

import WebGl from './WebGl';
import Overlay from './Overlay';

import GlTile from './GlTile';

const MAX_VISIBLE_COLUMNS = 10;
const UNIFORM_CELL_SIZE = 2 / MAX_VISIBLE_COLUMNS; 
     
const styles = theme => ({
    container: {
        position: 'relative',
    },
    canvas: {
        display: 'block',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10,
    },
    appBar: {
        backgroundColor: '#4caf50',
    },
    title: {

    },
    error: {
        padding: theme.spacing(3, 4),
    },
    help: {
        position: 'absolute',
        bottom: 5,
        right: 85,
        backgroundColor: '#eaeaeaff',
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 300,
        color: '#1a1a1aff',
        marginLeft: 45,
    }
});     
        
class Explorer extends Component {

    constructor(props) {
        super(props);

        this.webGl = new WebGl(MAX_VISIBLE_COLUMNS);
        this.overlay = new Overlay(MAX_VISIBLE_COLUMNS);
        
        this.aspect = 1;

        this.touchEvents = [];
        this.prevDist = -1;
        this.lastTouchTime = 0;

        this.state = {
            pixelWidth: window.innerWidth,
            pixelHeight: window.innerHeight, 
            initialized: false,
        };
    }
    
    componentDidMount() {
//        this.updateDimensions();
        
        window.addEventListener("resize", this.updateDimensions);
        
        window.addEventListener("orientationchange", () => {
            this.refs.canvas.width = 'auto';
            this.refs.canvas.height = 'auto';
            this.refs.overlay.width = 'auto';
            this.refs.overlay.height = 'auto';
        });
        
        this.updateCanvasSize().then(() => {
          
            return this.webGl.initialize(this.refs.canvas);
              
        }).then(() => {
            
            return this.overlay.initialize(this.refs.overlay);
              
        }).then(() => {

            window.addEventListener("keydown", this.handleKeyDown);
            
            this.refs.overlay.addEventListener("touchmove", this.handleTouchMove, false);
            this.refs.overlay.addEventListener("touchstart", this.handleTouchStart, false);
            this.refs.overlay.addEventListener("touchend", this.handleTouchEnd, false);
            this.refs.overlay.addEventListener("touchcancel", this.handleTouchCancel, false);
    
            const cells = [];
            for (let y=0; y < 20; y++) {
                for (let x=0; x < 20; x++) {                
                    const cell = new GlTile(UNIFORM_CELL_SIZE);
                    cell.bind(this.webGl);
                    cells.push(cell);
                }
            }
         
            this.objects = cells;
            
            this.webGl.update(cells);
            this.webGl.drawScene(0, cells);
            this.overlay.draw(0, cells);
            this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);
            this.setState({
                initialized: true,
            });            
        }).catch(error => {
            this.setState({
                error: error,
            });                        
        })

    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);        
        
        window.removeEventListener("keydown", this.handleKeyDown);

        this.refs.overlay.removeEventListener("touchcancel", this.handleTouchMove);
        this.refs.overlay.removeEventListener("touchend", this.handleTouchEnd);
        this.refs.overlay.removeEventListener("touchstart", this.handleTouchStart);
        this.refs.overlay.removeEventListener("touchmove", this.handleTouchMove);        
    }
    
    updateDimensions = () => {
        this.updateCanvasSize().then(() => {
            this.webGl.update(this.objects);        
            this.webGl.drawScene(0, this.objects);
            this.overlay.draw(0);
            this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);            
        });
    }
    
    updateCanvasSize = async () => {
        return new Promise((resolve, reject) => {
            
            let pixelWidth = window.innerWidth -1;
            let pixelHeight = window.innerHeight -65;
    
            // calculate aspect
            const aspect = pixelWidth / pixelHeight; 
            
            this.aspect = aspect;
            
            this.setState({
                pixelWidth: pixelWidth,
                pixelHeight: pixelHeight, 
                
            }, () => {
                resolve();    
            });        
        });
    }
    
    handleMouseWheel = e => {
        
        this.isMouseDown = false;
        
        let zoom = this.webGl.zoom;
        
        if (e.deltaY < 0) {
            zoom -= 0.1             
        } else if (e.deltaY > 0) {
            zoom += 0.1             
        }
        
        if (zoom < 0.5) {
            zoom = 0.5;
        }
        
        this.webGl.zoom = zoom;
        
        this.webGl.update(this.objects);
        this.webGl.drawScene(0, this.objects);
        this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);
        return false;
    }
        
    handleMouseDown = e => {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            
        } else {
            this.lastDragCoords = [e.pageX, e.pageY];
            this.isMouseDown = true;
        }

        e.preventDefault();
        return false;
    }

    handleMouseUp = e => {
        this.isMouseDown = false;
        
        e.preventDefault();
        return false;
    }

    handleMouseMove = e => {
        if (this.isMouseDown) {
            
            const dX = (e.pageX-this.lastDragCoords[0]);
            const dY = (e.pageY-this.lastDragCoords[1]);

            this.lastDragCoords = [e.pageX, e.pageY];

            this.move(dX, dY);
            e.preventDefault();
            return false;
        }
    }
    
    handleMouseOut = e => {
        this.isMouseDown = false;
    }
    
    handleTouchMove = e => {

        if (this.touchEvents.length === 1) {
            if (this.lastTouchCoords) {
                let dX = (e.changedTouches[0].pageX-this.lastTouchCoords[0]) ;
                let dY = (e.changedTouches[0].pageY-this.lastTouchCoords[1]) ;

                this.move(dX, dY);        
            }                        
            this.lastTouchCoords = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];

        } else if (this.touchEvents.length === 2) {
            
            for (let i = 0; i < this.touchEvents.length; i++) {

                if (e.changedTouches[0].identifier === this.touchEvents[i].changedTouches[0].identifier) {
                    this.touchEvents[i] = e;
                    break;
                }
            }
            
            const curDist = Math.sqrt(
                                    Math.pow(
                                        this.touchEvents[0].changedTouches[0].clientX - this.touchEvents[1].changedTouches[0].clientX,
                                        2
                                    )
                                    +
                                    Math.pow(
                                        this.touchEvents[0].changedTouches[0].clientY - this.touchEvents[1].changedTouches[0].clientY,
                                        2                                        
                                    )
                                );

            let zoom = this.webGl.zoom;

            if (this.prevDist > 0) {

                if (curDist > this.prevDist) {
                    zoom += (0.04 * zoom);
                }
                if (curDist < this.prevDist) {
                    zoom -= (0.04  * zoom);
                }
        if (zoom < 0.5) {
            zoom = 0.5;
        }
        this.webGl.zoom = zoom;
        
        this.webGl.update(this.objects);
        this.webGl.drawScene(0, this.objects);
        this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);

            }
            this.prevDist = curDist;
        }
        e.preventDefault();
        return false;
        
    }
    
    handleTouchStart = (e) => {
                
        if (this.touchEvents.length === 0) {
            
            const now = new Date().getTime();
            const timesince = now - this.lastTouchTime;
            
            if ((timesince < 300) && (timesince > 0)){
                // double tap
//                this.refs.help.style.backgroundColor = 'red';
                
                        let zoom = this.webGl.zoom;

                        zoom += (0.5  * zoom);

                        if (zoom < 0.5) {
                            zoom = 0.5;
                        }
                        this.webGl.zoom = zoom;

                      
                this.lastTouchTime = 0;
                this.webGl.update(this.objects);
                this.webGl.drawScene(0, this.objects);
                this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);

                e.preventDefault();
                return false;
            }
            
            this.lastTouchCoords = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
            this.lastTouchTime = new Date().getTime() 
            this.touchEvents.push(e);

        } else if (this.touchEvents.length === 1) {
            this.touchEvents.push(e);
        }

        e.preventDefault();
        return false;        
    }
    
    handleTouchEnd = (e) => {
        this.touchEvents = [];
        this.lastTouchCoords = null;
        this.prevDist = -1;
        e.preventDefault();
        return false;
    }

    handleTouchCancel = (e) => {
        this.touchEvents = [];
        this.lastTouchCoords = null;
        this.prevDist = -1;
        this.lastTouchTime = 0;
    }
    
    handleKeyDown = (e) => {
        
        const shiftX = this.webGl.gl.canvas.width / (MAX_VISIBLE_COLUMNS * 2.5 * this.webGl.aspect[0]);
        const shiftY = this.webGl.gl.canvas.height / (MAX_VISIBLE_COLUMNS * 2.5 * this.webGl.aspect[1] );
                
        // down
        if (e.keyCode === 38) {
            this.move(0, shiftY);
            
        // up
        } else if (e.keyCode === 40) {
            this.move(0, -shiftY);
            
        // left
        } else if (e.keyCode === 37) {
            this.move(shiftX, 0);
            
        } else if (e.keyCode === 39) {
            this.move(-shiftX, 0);            
        }   
   
    }
    
    move = (dX, dY) => {
        this.webGl.move(dX, dY)

        this.webGl.update(this.objects);
        this.webGl.drawScene(0, this.objects);
        this.overlay.update(this.webGl.aspect, this.webGl.translate, this.webGl.zoom);

    }

    render() {
        const { classes } = this.props;

        return (<Fragment>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                            <Link className={classes.title}
                                variant="h6"
                                underline="none"
                                component="a"
                                href="https://en.wikipedia.org/wiki/Maurer_rose" target="_blank"
                                color="inherit"
                                >
                                Maurer Rose Explorer
                            </Link>
                        </Toolbar>
                    </AppBar>
                    {this.state.error &&

                        <Typography color="error" display="block" gutterBottom={true} paragraph={true} align="left"
                        className={classes.error}
                        >
                            {this.state.error} Please use latest Chrome or Firefox.
                        </Typography>

                    }
             {!this.state.error &&
              <div className={classes.container} ref="container">                  
                    <canvas ref="canvas"
                        className={classes.canvas}
                        width={this.state.pixelWidth}
                        height={this.state.pixelHeight}                        
                    />
                    <canvas ref="overlay" 
                        className={classes.overlay}
                        width={this.state.pixelWidth}
                        height={this.state.pixelHeight}                        

                        onWheel={(e) => this.handleMouseWheel(e)} 
                        onMouseDown={(e) => this.handleMouseDown(e)} 
                        onMouseUp={(e) => this.handleMouseUp(e)}
                        onMouseMove={(e) => this.handleMouseMove(e)}
                        onMouseOut={(e) => this.handleMouseOut(e)}
                        onKeyDown={(e) => this.handleKeyDown(e) }
                        
                    />
                    {this.state.initialized &&
                    <div className={classes.help} ref="help" >
                        use mouse or gestures to move and zoom 
                    </div>
                    }
                </div>
               } 
                
                </Fragment>);
    }
}


export default withStyles(styles)(Explorer);