// import React, { Component } from "react";
import React, { useState, useEffect, useRef } from "react";

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField } from '@material-ui/core';

import "./Editor.sass";

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function WTMEditor() {

  // constructor(props) {
  //   super(props);
  //   state = {
  //     scale: 0.5,
  //     name: "City Name",
  //   };
  const wtmLogo = useRef(null);
  const logoCanvas = useRef(null);
  const fullLogoImg = useRef(null);
  const [canvasScale, setScale] = useState<number>(0.5);
  const [cityName, setName] = useState<string>("City Name");
  const [fullLogoUrl, setFullLogoUrl] = useState();
  const [fullLogoUrlVertical, setFullLogoUrlVertical] = useState();
  const [fullLogoUrlOld, setFullLogoUrlOld] = useState();
  const [fullLogoUrlVerticalOld, setFullLogoUrlVerticalOld] = useState();

  let logoScale= 2.35;

  useEffect(() => {
    
    WebFont.load({
          google: {
            families: ["Roboto:400", "Product Sans", "Product Sans:400"]
          },
          fontactive: (familyName, fvd) => {
            colorImage();
            colorImageVertical();
          }
        });
  },[]);

  useEffect(() => {
    colorImage();
    colorImageVertical();
 }, [cityName]);

  
  const colorImage=()=> {
    const name = cityName;
    const scale = canvasScale;
    const ctx = logoCanvas.current.getContext("2d");
    const ctx2 = logoCanvas.current.getContext("2d");
    ctx.font = `400 84px "Product Sans"`;
    ctx2.font = `400 42px "Product Sans"`;

    logoScale = 0.25;

    const canvasWidth = Math.max(ctx.measureText("Women Techmakers").width, ctx.measureText(name).width) + wtmLogo.current.width * logoScale + 450;
    const canvasHeight = wtmLogo.current.height * logoScale + 50;

    logoCanvas.current.setAttribute("width", canvasWidth * scale);
    logoCanvas.current.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 84px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(wtmLogo.current, 20, 0, wtmLogo.current.width * logoScale, wtmLogo.current.height* logoScale);

    ctx.fillText("Women Techmakers", wtmLogo.current.width * logoScale + 60, 85);

    ctx.font = `400 42px "Product Sans"`;
    ctx.fillText(name, wtmLogo.current.width * logoScale + 60, wtmLogo.current.height * logoScale + 25);

    // setState({
    //   fullLogoUrlOld: logoCanvas.toDataURL()
    // });
    setFullLogoUrlOld(logoCanvas.current.toDataURL());
  }

  const colorImageVertical=()=> {
    const name = cityName;
    const scale = canvasScale;
    const ctx = logoCanvas.current.getContext("2d");
    const ctx2 = logoCanvas.current.getContext("2d");
    ctx.font = `400 84px "Product Sans"`;
    ctx2.font = `400 42px "Product Sans"`;

    logoScale = 0.5;

    const canvasWidth = (Math.max(ctx.measureText("Women Techmakers").width, ctx2.measureText(name).width) + 1500 );
    const canvasHeight = wtmLogo.current.height * logoScale + 230;

    logoCanvas.current.setAttribute("width", canvasWidth * scale);
    logoCanvas.current.setAttribute("height", canvasHeight * scale);

    ctx.scale(scale, scale);
    ctx.font = `400 84px "Product Sans"`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

    ctx.drawImage(wtmLogo.current, canvasWidth/2 - (wtmLogo.current.width * logoScale)/2, 20, wtmLogo.current.width * logoScale, wtmLogo.current.height* logoScale);

    ctx.textBaseline = "bottom";
    ctx.fillText(
      "Women Techmakers",
      canvasWidth/2 - (ctx.measureText("Women Techmakers").width / 2),
      wtmLogo.current.height * logoScale + 150
    );

    ctx.font = `400 42px "Product Sans"`;
    ctx.textBaseline = "bottom";
    ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), wtmLogo.current.height * logoScale + 215);

    // setState({
    //   fullLogoUrlVerticalOld: logoCanvas.toDataURL()
    // });
    setFullLogoUrlVerticalOld(logoCanvas.current.toDataURL());
  }



  return (
      <div className="main">
        <div style={hidden}>
          <img
            ref={wtmLogo}
            onLoad={() => {
              colorImage();
              colorImageVertical();
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
            setName(e.target.value)
          }}
        />
        <br />
        <canvas
          style={hidden}
          ref={logoCanvas}
        />
        <Card style={{width: "100%"}}>
          <CardActionArea>
            <CardContent>
              <img
                ref={fullLogoImg}
                alt={`WTM ${name} Logo`}
                src={fullLogoUrlOld}
                style={{maxWidth: "100%"}}
              />
              <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is black. Please view downloaded logo against light backgrounds.</Alert>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              href={fullLogoUrlOld}
              style={{ margin: "5px" }}
              download={`WTM ${name} Light Horizontal-Logo.png`}
            >
              DOWNLOAD
            </Button>
          </CardActions>
        </Card>
        <Card style={{width: "100%", marginTop: "1rem"}}>
          <CardActionArea>
            <CardContent>
              <img
                ref={fullLogoImg}
                alt={`WTM ${name} Logo`}
                src={fullLogoUrlVerticalOld}
                style={{maxWidth: "100%"}}
              />
              <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is black. Please view downloaded logo against light backgrounds.</Alert>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              href={fullLogoUrlVerticalOld}
              style={{ margin: "5px" }}
              download={`WTM ${name} Light Vertical-Logo.png`}
            >
              DOWNLOAD
            </Button>
          </CardActions>
        </Card>

      </div>
  );
  

  
}

const hidden = {
  display: "none"
};

export default WTMEditor;