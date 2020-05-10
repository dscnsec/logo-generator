import React, { Component } from "react";

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

class WTMEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.5,
      name: "City Name",
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        this.colorImage();
        this.colorImageVertical();
      }
    });
  }

  render() {
    return (
      <div className="main">
        <div style={hidden}>
          <img
            ref={e => {
              this.wtmLogo = e;
            }}
            onLoad={() => {
              this.colorImage();
              this.colorImageVertical();
            }}
            src="assets/wtm/color.svg"
            alt={`WTM Icon`}
          />
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
                this.colorImage();
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
        <Card style={{width: "100%"}}>
          <CardActionArea>
            <CardContent>
              <img
                ref={e => {
                  this.fullLogoImg = e;
                }}
                alt={`WTM ${this.state.name} Logo`}
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
              download={`WTM ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
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
                alt={`WTM ${this.state.name} Logo`}
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
              download={`WTM ${this.state.name} Dark X-Logo x${this.state.scale}.png`}
            >
              DOWNLOAD
            </Button>
          </CardActions>
        </Card>

      </div>
    );
  }

  colorImage() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    const ctx2 = this.logoCanvas.getContext("2d");
    ctx.font = `400 84px "Product Sans"`;
    ctx2.font = `400 42px "Product Sans"`;

    this.logoScale = 0.25;

    const canvasWidth = Math.max(ctx.measureText("Women Techmakers").width, ctx.measureText(this.state.name).width) + this.wtmLogo.width * this.logoScale + 450;
    const canvasHeight = this.wtmLogo.height * this.logoScale + 50;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 84px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.wtmLogo, 20, 0, this.wtmLogo.width * this.logoScale, this.wtmLogo.height* this.logoScale);

    ctx.fillText("Women Techmakers", this.wtmLogo.width * this.logoScale + 60, 85);

    ctx.font = `400 42px "Product Sans"`;
    ctx.fillText(name, this.wtmLogo.width * this.logoScale + 60, this.wtmLogo.height * this.logoScale + 25);

    this.setState({
      fullLogoUrlOld: this.logoCanvas.toDataURL()
    });
  }

  colorImageVertical() {
    const name = this.state.name;
    const scale = this.state.scale;
    const ctx = this.logoCanvas.getContext("2d");
    const ctx2 = this.logoCanvas.getContext("2d");
    ctx.font = `400 84px "Product Sans"`;
    ctx2.font = `400 42px "Product Sans"`;

    this.logoScale = 0.5;

    const canvasWidth = (Math.max(ctx.measureText("Women Techmakers").width, ctx2.measureText(name).width) + 1500 );
    const canvasHeight = this.wtmLogo.height * this.logoScale + 230;

    this.logoCanvas.setAttribute("width", canvasWidth * scale);
    this.logoCanvas.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 84px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(this.wtmLogo, canvasWidth/2 - (this.wtmLogo.width * this.logoScale)/2, 20, this.wtmLogo.width * this.logoScale, this.wtmLogo.height* this.logoScale);

    ctx.textBaseline = "bottom";
    ctx.fillText(
      "Women Techmakers",
      canvasWidth/2 - (ctx.measureText("Women Techmakers").width / 2),
      this.wtmLogo.height * this.logoScale + 150
    );

    ctx.font = `400 42px "Product Sans"`;
    ctx.textBaseline = "bottom";
    ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), this.wtmLogo.height * this.logoScale + 215);

    this.setState({
      fullLogoUrlVerticalOld: this.logoCanvas.toDataURL()
    });
  }
}

const hidden = {
  display: "none"
};

export default WTMEditor;