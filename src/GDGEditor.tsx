import React, { useState, useEffect, useRef } from "react";
import MainToolBar from './MainToolBar'

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useAuth } from './context/AuthContext';

function Alert(props: AlertProps ) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function GDGEditor() {
  const GDGLogo = useRef<HTMLCanvasElement | any>(null);
  const logoCanvas = useRef<HTMLCanvasElement | any>(null);
  const fullLogoImg = useRef<HTMLCanvasElement | any>(null);
  const [Scale, setScale] = useState<number>(0.6);
  const [Name, setName] = useState<string>("City Name");
  const [Mode, setMode] = useState<boolean>(false);
  const [bwImageUrl, setbwImageUrl] = useState<any | null | undefined | string>();
  const [colorImageUrl, setcolorImageUrl] = useState<any | null | string>();
  const { currentUser }:any = useAuth();
  const [error, setError] = useState('');
  

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
  },[Name])


  const handleDarkMode = (mode:boolean) => {
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
        onChange={(event: any) => (setName(event.target.value))}
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
          { currentUser ? 
                <Button
                 variant="contained"
                 color="primary"
                 href={bwImageUrl}
                 style={{ margin: "5px" }}
                 download={`GDG ${Name} Dark Horizontal-Logo.png`}
                >
                 DOWNLOAD
                </Button> :
                
                <Button
                  variant="contained"
                  color="primary"
                  href={bwImageUrl}
                  style={{ margin: "5px" }}
                  onClick={(e:any) => setError('Login to download the logo')}
                >
                  DOWNLOAD
                </Button>
          }              
                {error && <Alert severity="error" variant="outlined">{error}</Alert>}
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
              { currentUser ? 
                <Button
                 variant="contained"
                 color="primary"
                 href={colorImageUrl}
                 style={{ margin: "5px" }}
                 download={`GDG ${Name} Light Horizontal-Logo.png`}
                >
                 DOWNLOAD
                </Button> :
                
                <Button
                  variant="contained"
                  color="primary"
                  href={colorImageUrl}
                  style={{ margin: "5px" }}
                  onClick={(e:any) => setError('Login to download the logo')}
                >
                  DOWNLOAD
                </Button>
              }              
                {error && <Alert severity="error" variant="outlined">{error}</Alert>}

                             
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
