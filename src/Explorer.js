import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Link, Typography, CircularProgress } from '@material-ui/core';
import { Mouse, Keyboard, Touch } from './input';

import Scene from './Scene';

const styles = theme => ({
    container: {
        position: 'relative',
    },
    canvas3d: {
        display: 'block',
    },
    canvas2d: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10,
    },
    appBar: {
        backgroundColor: '#4caf50',
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
        fontSize: 15,
        fontWeight: 300,
        color: '#1a1a1aff',
        marginLeft: 45,
    },
    progress: {
        position: 'absolute',
        left: '46vw',
        top: '40vh',
        color: '#ffc107',
        zIndex: 30,
    }
});     
        
class Explorer extends Component {

    constructor(props) {
        super(props);

        this.scene = new Scene();
        
        this.input = {
            keyboard: new Keyboard(this.scene),
            touch: new Touch(this.scene),
            mouse: new Mouse(this.scene),
        };
        
        this.state = {
            pixelWidth: window.innerWidth,
            pixelHeight: window.innerHeight, 
            initialized: false,
            error: false,
        };
    }
    
    componentDidMount() {

        this.updateCanvasSize().then(() => {

            return this.scene.initialize(this.refs.canvas2d, this.refs.canvas3d);
            
        }).then(() => {

            this.scene.updateSize(this.state.pixelWidth, this.state.pixelHeight);

            window.addEventListener("orientationchange", this.chromeWorkaround);            
            window.addEventListener("resize", this.handleResize);            

            this.input.mouse.bind(this.refs.canvas2d);
            this.input.touch.bind(this.refs.canvas2d);
            this.input.keyboard.bind(this.refs.canvas2d);    
            
            this.setState({
                initialized: true,
 
            }, () => {
                window.requestAnimationFrame(this.scene.draw);                                             
            });
                        
        }).catch(error => {
            this.setState({
                error: error,
            });                        
        })
    }
    
    componentWillUnmount() {
        if (this.state.initialized) {
            window.removeEventListener("resize", this.handleResize);
            window.removeEventListener("orientationchange", this.chromeWorkaround);        
    
            this.input.keyboard.unbind();
            this.input.touch.unbind();        
            this.input.mouse.unbind();
        }
    }
    
    handleResize = () => {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(this.updateDimensions, 125);
    }
    
    updateDimensions = () => {
        this.updateCanvasSize().then(() => {                
            this.scene.updateSize(this.state.pixelWidth, this.state.pixelHeight);
            window.requestAnimationFrame(this.scene.draw);                

        });
    }
    
    updateCanvasSize = async () => {
        return new Promise((resolve) => {
            
            const pixelWidth = window.innerWidth -1;
            const pixelHeight = window.innerHeight -65;

            this.setState({
                pixelWidth: pixelWidth,
                pixelHeight: pixelHeight, 
                
            }, () => {                
                resolve();    
            });        
        });
    }
    
    chromeWorkaround = () => {
        this.refs.canvas2d.width = 1;
        this.refs.canvas2d.height = 1;
        this.refs.canvas3d.width = 1;
        this.refs.canvas3d.height = 1;
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
                    {(!this.state.error && !this.state.initialized) &&
                    <CircularProgress color="secondary" className={classes.progress}
                        disableShrink
                        size={80}
                        thickness={6}
                        />
                    }
                    {this.state.error &&

                        <Typography color="error" display="block" gutterBottom={true} paragraph={true} align="left"
                        className={classes.error}
                        >
                            {this.state.error} Please use latest Chrome or Firefox.
                        </Typography>

                    }
                    {(!this.state.error) &&
                        (<div className={classes.container} ref="container">                  
                            <canvas ref="canvas3d"
                                className={classes.canvas3d}
                                width={this.state.pixelWidth}
                                height={this.state.pixelHeight}                        
                                />
                            <canvas ref="canvas2d" 
                                className={classes.canvas2d}
                                width={this.state.pixelWidth}
                                height={this.state.pixelHeight}                                                
                                />
                            {this.state.initialized &&
                                <div className={classes.help} ref="help" >
                                    use a mouse or gestures to move and zoom 
                                </div>
                            }
                        </div>)
                    } 
                </Fragment>
                );
    }
}

export default withStyles(styles)(Explorer);