import React, { useState, useEffect, useRef } from "react";
import MainToolBar from './MainToolBar'

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function GDGEditor() {
  /*constructor(props) {
    super(props);
    this.state = {
      scale: 0.6,
      name: "City Name",
      darkMode: false
    };
  }*/
  const GDGLogo = useRef(null);
  const logoCanvas = useRef(null);
  const fullLogoImg = useRef(null)
  const [Scale, setScale] = useState(0.6);
  const [Name, setName] = useState("City Name");
  const [Mode, setMode] = useState(false);
  const [bwImageUrl, setbwImageUrl] = useState();
  const [colorImageUrl, setcolorImageUrl] = useState();

  let LogoScale = 2.35;

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:400", "Product Sans", "Product Sans:400"]
      },
      fontactive: (familyName, fvd) => {
        bwImage();
        colorImage();
      }
    });
  })

  const handleDarkMode = (mode) => {
    setMode(mode)
  };

  const bwImage = () => {
    const name = Name;
    const scale = Scale;
    const ctx = logoCanvas.current.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;
    LogoScale = 1.35;

    const canvasWidth = ctx.measureText("GDG").width + ctx.measureText(name).width + GDGLogo.current.width * LogoScale + 80;
    const canvasHeight = GDGLogo.current.height + 80;
    logoCanvas.current.setAttribute("width", canvasWidth * scale);
    logoCanvas.current.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    // ctx.fillStyle = "#000";
    ctx.font = `400 96px "Product Sans"`;
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#fff";

    ctx.drawImage(GDGLogo.current, 20, 0, GDGLogo.current.width * LogoScale, GDGLogo.current.height * LogoScale);

    ctx.fillText("GDG", GDGLogo.current.width * LogoScale + 50, 137);

    ctx.font = `400 96px "Product Sans"`;
    ctx.fillText(name, GDGLogo.current.width * LogoScale + ctx.measureText("GDG").width + 70, 137);

    setbwImageUrl(logoCanvas.current.toDataURL())
  }

  const colorImage = () => {
    const name = Name;
    const scale = Scale;
    const ctx = logoCanvas.current.getContext("2d");
    ctx.font = `400 96px "Product Sans"`;

    LogoScale = 1.35;

    const canvasWidth = ctx.measureText("GDG").width + ctx.measureText(name).width + GDGLogo.current.width * LogoScale + 80;
    const canvasHeight = GDGLogo.current.height + 60;

    logoCanvas.current.setAttribute("width", canvasWidth * scale);
    logoCanvas.current.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 96px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";

    ctx.drawImage(GDGLogo.current, 20, 0, GDGLogo.current.width * LogoScale, GDGLogo.current.height * LogoScale);

    ctx.fillText("GDG", GDGLogo.current.width * LogoScale + 50, 137);

    ctx.font = `400 96px "Product Sans"`;
    ctx.fillText(name, GDGLogo.current.width * LogoScale + ctx.measureText("GDG").width + 70, 137);

    setcolorImageUrl(logoCanvas.current.toDataURL())
  }


  return (
    <div className="main">
      <MainToolBar
        toDark={handleDarkMode}
        darkMode={Mode}
        id="GDGToolbar"
      />
      <div style={hidden}>
        {Mode ? (
          <img
            ref={
              GDGLogo
            }
            onLoad={() => {
              bwImage();
            }}
            src="assets/gdg/bw.svg"
            alt={`GDG Icon`}
          />
        ) : (
            <img
              ref={
                GDGLogo
              }
              onLoad={() => {
                colorImage();
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
        onChange={(e) => { setName(e.target.value) }}
      />
      <br />
      <canvas
        style={hidden}
        ref={
          logoCanvas
        }
      />

      {Mode ? (
        <Card style={{ width: "100%" }}>
          <CardActionArea style={{ background: "#000" }}>
            <CardContent>
              <img
                ref={fullLogoImg}
                alt={`GDG ${Name} Logo`}
                src={bwImageUrl}
                style={{ maxWidth: "100%" }}
              />
              <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is white. Please view downloaded logo against dark backgrounds.</Alert>

            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              href={bwImageUrl}
              style={{ margin: "5px" }}
              download={`GDG ${Name} Dark Horizontal-Logo.png`}
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
                  ref={
                    fullLogoImg
                  }
                  alt={`GDG ${Name} Logo`}
                  src={colorImageUrl}
                  style={{ maxWidth: "100%" }}
                />
                <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is black. Please view downloaded logo against light backgrounds.</Alert>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                href={colorImageUrl}
                style={{ margin: "5px" }}
                download={`GDG ${Name} Light Horizontal-Logo.png`}
              >
                DOWNLOAD
                </Button>
            </CardActions>

          </Card>

        )}
    </div>
  );
}

const hidden = {
  display: "none"
};

export default GDGEditor;