import React, { Component, } from 'react';

import { AppBar, Toolbar, Link, Typography, CircularProgress, Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Mouse, Keyboard, Touch } from './input';

import Scene from './Scene';

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

            const pixelWidth = window.innerWidth - 16;
            const pixelHeight = window.innerHeight - 72;

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
        return (<>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#4caf50',
                }}
            >
                <Toolbar>
                    <Link
                        variant="h6"
                        underline="none"
                        component="a"
                        href="https://en.wikipedia.org/wiki/Maurer_rose"
                        target="_blank"
                        color="inherit"
                    >
                        Maurer Rose Explorer
                    </Link>
                    <Box sx={{ flexGrow: 1 }} ></Box>
                    <Button
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        startIcon={<GitHubIcon />}
                        href="https://github.com/filip26/maurer-rose-explorer"
                        target="_blank"
                    >
                        Code
                    </Button>
                </Toolbar>
            </AppBar>

            {(!this.state.error && !this.state.initialized) &&
                <CircularProgress
                    color="secondary"
                    disableShrink
                    size={80}
                    thickness={6}
                    sx={{
                        position: 'absolute',
                        left: '46vw',
                        top: '40vh',
                        color: '#ffc107',
                        zIndex: 30,
                    }}
                />
            }
            {this.state.error &&
                <Typography
                    color="error"
                    display="block"
                    gutterBottom={true}
                    paragraph={true}
                    align="left"
                    sx={{
                        paddingLeft: 4,
                        padingRight: 4,
                        paddingTop: 3,
                        paddingBottom: 3,
                    }}
                >
                    Please use latest Chrome or Firefox.
                    {JSON.stringify(this.state.error)}
                </Typography>

            }
            {(!this.state.error) &&
                (<Box
                    ref="container"
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Box
                    >
                        <canvas
                            ref="canvas3d"
                            width={this.state.pixelWidth}
                            height={this.state.pixelHeight}

                        />
                    </Box>

                        <canvas
                            ref="canvas2d"
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                zIndex: 10,
                                touchAction: "none",    
                            }}
                            width={this.state.pixelWidth}
                            height={this.state.pixelHeight}
                        />
                    {this.state.initialized &&
                        <Box
                            ref="help"
                            sx={{
                                position: 'absolute',
                                bottom: 7,
                                right: 100,
                                backgroundColor: '#eaeaeaff',
                                padding: 1,
                                fontSize: 15,
                                fontWeight: 300,
                                color: '#1a1a1aff',
                                borderRadius: "5px",
                                marginLeft: "48px",
                            }}
                        >
                            use a mouse or gestures to move and zoom
                        </Box>
                    }
                </Box>)
            }
        </>
        );
    }
}

export default Explorer;