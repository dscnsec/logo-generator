import React, { Component } from "react";
import MainToolBar from './MainToolBar'

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class GDGEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.6,
      name: "City Name",
      darkMode: false
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        this.bwImage();
        this.colorImage();
      }
    });
  }

  handleDarkMode = (mode) => {
    this.setState({ darkMode: mode });
  };

  render() {
    return (
      <div className="main">
        <MainToolBar
          toDark={this.handleDarkMode}
          darkMode={this.state.darkMode}
          id="GDGToolbar"
        />
        <div style={hidden}>
          {this.state.darkMode ? (
            <img
              ref={e => {
                this.GDGLogo = e;
              }}
              onLoad={() => {
                this.bwImage();
              }}
              src="assets/gdg/bw.svg"
              alt={`GDG Icon`}
            />
          ) : (
              <img
                ref={e => {
                  this.GDGLogo = e;
                }}
                onLoad={() => {
                  this.colorImage();
                }}
                src="assets/gdg/color.svg"
                alt={`GDG Icon`}
              />
            )}
        </div>

        <TextField
          label="City Name"
          margin="normal"
          variant="outlined"
          style={{
            width: "100%"
          }}
          onChange={e => {
            this.setState(
              {
                name: e.target.value
              },
              () => {
                this.bwImage();
                this.colorImage();
              }
            );
          }}
        />
        <br />
        <canvas
          style={hidden}
          ref={e => {
            this.logoCanvas = e;
          }}
        />

        {this.state.darkMode ? (
          <Card style={{ width: "100%" }}>
            <CardActionArea style={{ background: "#000" }}>
              <CardContent>
                <img
                  ref={e => {
                    this.fullLogoImg = e;
                  }}
                  alt={`GDG ${this.state.name} Logo`}
                  src={this.state.bwImageUrl}
                  style={{ maxWidth: "100%" }}
                />
                <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is white. Please view downloaded logo against dark backgrounds.</Alert>

              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                href={this.state.bwImageUrl}
                style={{ margin: "5px" }}
                download={`GDG ${this.state.name} Dark Horizontal-Logo.png`}
              >
                DOWNLOAD
              </Button>
            </CardActions>
          </Card>
        ) : (
            <Card style={{ width: "100%" }}>
              <CardActionArea>
                <CardContent>
                  <img
                    ref={e => {
                      this.fullLogoImg = e;
                    }}
                    alt={`GDG ${this.state.name} Logo`}
                    src={this.state.colorImageUrl}
                    style={{ maxWidth: "100%" }}
                  />
                  <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is black. Please view downloaded logo against light backgrounds.</Alert>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={this.state.colorImageUrl}
                  style={{ margin: "5px" }}
                  download={`GDG ${this.state.name} Light Horizontal-Logo.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>

            </Card>

          )}
      </div>
    );
  }

  bwImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;
    this.logoScale = 1.35;

    const canvasWidth = ctx.measureText("GDG").width + ctx.measureText(this.state.name).width + this.GDGLogo.width * this.logoScale + 80;
    const canvasHeight = this.GDGLogo.height + 80;
    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    // ctx.fillStyle = "#000";
    ctx.font = `400 96px "Product Sans"`;
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#fff";

    ctx.drawImage(this.GDGLogo, 20, 0, this.GDGLogo.width * this.logoScale, this.GDGLogo.height * this.logoScale);

    ctx.fillText("GDG", this.GDGLogo.width * this.logoScale + 50, 137);

    ctx.font = `400 96px "Product Sans"`;
    ctx.fillText(name, this.GDGLogo.width * this.logoScale + ctx.measureText("GDG").width + 70, 137);

    this.setState({
      bwImageUrl: this.logoCanvas.toDataURL()
    });
  }

  colorImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;

    this.logoScale = 1.35;

    const canvasWidth = ctx.measureText("GDG").width + ctx.measureText(this.state.name).width + this.GDGLogo.width * this.logoScale + 80;
    const canvasHeight = this.GDGLogo.height + 60;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 96px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";

    ctx.drawImage(this.GDGLogo, 20, 0, this.GDGLogo.width * this.logoScale, this.GDGLogo.height * this.logoScale);

    ctx.fillText("GDG", this.GDGLogo.width * this.logoScale + 50, 137);

    ctx.font = `400 96px "Product Sans"`;
    ctx.fillText(name, this.GDGLogo.width * this.logoScale + ctx.measureText("GDG").width + 70, 137);

    this.setState({
      colorImageUrl: this.logoCanvas.toDataURL()
    });
  }
}

const hidden = {
  display: "none"
};