import React, { Component } from "react";
import MainToolBar from './MainToolBar'

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

class DSCEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.5,
      name: "School Name",
      darkMode: false
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        this.bwImageHorizontal();
        this.colorImage();
        this.colorImageVertical();
        this.bwImageVertical();
      }
    });
  }

  handleDarkMode =  (mode) => {
    this.setState({ darkMode: mode });
  };

  render() {
    return (
      <div className="main">
        <MainToolBar
          toDark={this.handleDarkMode}
          darkMode={this.state.darkMode}
          id="DSCToolbar"
          />
        <div style={hidden}>
          {this.state.darkMode ? (
            <img
              ref={e => {
                this.dscLogo = e;
              }}
              onLoad={() => {
                this.bwImageHorizontal();
                this.bwImageVertical();
              }}
              src="assets/dsc/bw.svg"
              alt={`DSC Icon`}
            />
          ) : (
            <img
              ref={e => {
                this.dscLogo = e;
              }}
              onLoad={() => {
                this.colorImage();
                this.colorImageVertical();
              }}
              src="assets/dsc/color.svg"
              alt={`DSC Icon`}
            />
          )}
        </div>

        <TextField
          label="School Name"
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
                this.bwImageHorizontal();
                this.colorImage();
                this.bwImageVertical();
                this.colorImageVertical();
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
          <>
            <Card style={{width: "100%"}}>
              <CardActionArea style={{background: "#000"}}>
                <CardContent>
                  <img
                    ref={e => {
                      this.fullLogoImg = e;
                    }}
                    alt={`DSC ${this.state.name} Logo`}
                    src={this.state.fullLogoUrl}
                    style={{maxWidth: "100%"}}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={this.state.fullLogoUrl}
                  style={{ margin: "5px" }}
                  download={`DSC ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>
            </Card>
            <Card style={{width: "100%", marginTop: "1rem"}}>
              <CardActionArea style={{background: "#000"}}>
                <CardContent>
                  <img
                    ref={e => {
                      this.fullLogoImg = e;
                    }}
                    alt={`DSC ${this.state.name} Logo`}
                    src={this.state.fullLogoUrlVertical}
                    style={{maxWidth: "100%"}}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={this.state.fullLogoUrlVertical}
                  style={{ margin: "5px" }}
                  download={`DSC ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>
            </Card>
          </>
        ) : (
          <>
            <Card style={{width: "100%"}}>
              <CardActionArea>
                <CardContent>
                  <img
                    ref={e => {
                      this.fullLogoImg = e;
                    }}
                    alt={`DSC ${this.state.name} Logo`}
                    src={this.state.fullLogoUrlOld}
                    style={{maxWidth: "100%"}}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={this.state.fullLogoUrlOld}
                  style={{ margin: "5px" }}
                  download={`DSC ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>
            </Card>
            <Card style={{width: "100%", marginTop: "1rem"}}>
              <CardActionArea>
                <CardContent>
                  <img
                    ref={e => {
                      this.fullLogoImg = e;
                    }}
                    alt={`DSC ${this.state.name} Logo`}
                    src={this.state.fullLogoUrlVerticalOld}
                    style={{maxWidth: "100%"}}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={this.state.fullLogoUrlVerticalOld}
                  style={{ margin: "5px" }}
                  download={`DSC ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </div>
    );
  }

  bwImageHorizontal() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;

    this.logoScale = 1.36;

    const canvasWidth = Math.max(ctx.measureText("Developer Student Clubs").width, ctx.measureText(this.state.name).width) + this.dscLogo.width * this.logoScale + 600;
    const canvasHeight = this.dscLogo.height + 150;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 96px "Product Sans"`;
    ctx.fillStyle = "#fff";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width * this.logoScale, this.dscLogo.height* this.logoScale);

    ctx.fillText("Developer Student Clubs", this.dscLogo.width + 112, 132);

    ctx.font = `400 66px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 112, 243);

    this.setState({
      fullLogoUrl: this.logoCanvas.toDataURL()
    });
  }

  bwImageVertical() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    const ctx2 = this.logoCanvas.getContext("2d");
    ctx.font = `400 91px "Product Sans"`;
    ctx2.font = `400 62px "Product Sans"`;

    this.logoScale = 2.35;

    const canvasWidth = (Math.max(ctx.measureText("Developer Student Clubs").width, ctx2.measureText(name).width) + 1200 );
    const canvasHeight = this.dscLogo.height * this.logoScale + 100;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 94px "Product Sans"`;
    ctx.fillStyle = "#fff";

    ctx.drawImage(this.dscLogo, canvasWidth/2 - (this.dscLogo.width * this.logoScale)/2, -0.25 * this.dscLogo.height * this.logoScale, this.dscLogo.width * this.logoScale, this.dscLogo.height* this.logoScale);

    ctx.textBaseline = "bottom";
    // ctx.textAlign = "center";
    ctx.fillText(
      "Developer Student Clubs",
      canvasWidth/2 - (ctx.measureText("Developer Student Clubs").width / 2),
      this.dscLogo.height * this.logoScale + 10
    );

    ctx.font = `400 62px "Product Sans"`;
    ctx.textBaseline = "bottom";
    // ctx.textAlign = "center";
    ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), this.dscLogo.height * this.logoScale + 100);

    this.setState({
      fullLogoUrlVertical: this.logoCanvas.toDataURL()
    });
  }

  colorImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    const ctx2 = this.logoCanvas.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;
    ctx2.font = `400 66px "Product Sans"`;

    this.logoScale = 1.36;

    const canvasWidth = Math.max(ctx.measureText("Developer Student Clubs").width, ctx.measureText(this.state.name).width) + this.dscLogo.width * this.logoScale + 600;
    const canvasHeight = this.dscLogo.height + 150;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 96px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.dscLogo, 20, 0, this.dscLogo.width * this.logoScale, this.dscLogo.height* this.logoScale);

    ctx.fillText("Developer Student Clubs", this.dscLogo.width + 112, 132);

    ctx.font = `400 66px "Product Sans"`;
    ctx.fillText(name, this.dscLogo.width + 112, 243);

    this.setState({
      fullLogoUrlOld: this.logoCanvas.toDataURL()
    });
  }

  colorImageVertical() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    const ctx2 = this.logoCanvas.getContext("2d");
    ctx.font = `400 91px "Product Sans"`;
    ctx2.font = `400 62px "Product Sans"`;

    this.logoScale = 2.35;

    const canvasWidth = (Math.max(ctx.measureText("Developer Student Clubs").width, ctx2.measureText(name).width) + 1200 );
    const canvasHeight = this.dscLogo.height * this.logoScale + 100;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 91px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.dscLogo, canvasWidth/2 - (this.dscLogo.width * this.logoScale)/2, -0.25 * this.dscLogo.height * this.logoScale, this.dscLogo.width * this.logoScale, this.dscLogo.height* this.logoScale);

    ctx.textBaseline = "bottom";
    // ctx.textAlign = "center";
    ctx.fillText(
      "Developer Student Clubs",
      canvasWidth/2 - (ctx.measureText("Developer Student Clubs").width / 2),
      this.dscLogo.height * this.logoScale + 10
    );

    ctx.font = `400 62px "Product Sans"`;
    ctx.textBaseline = "bottom";
    // ctx.textAlign = "center";
    ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), this.dscLogo.height * this.logoScale + 100);

    this.setState({
      fullLogoUrlVerticalOld: this.logoCanvas.toDataURL()
    });
  }
}

const hidden = {
  display: "none"
};

export default DSCEditor;