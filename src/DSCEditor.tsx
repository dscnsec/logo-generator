import React , {useState, useRef, useEffect, Props} from "react";
import MainToolBar from './MainToolBar'

import WebFont from "webfontloader";

import { Button, Card, CardContent, CardActions, CardActionArea, TextField, ComponentsPropsList } from '@material-ui/core';

import "./Editor.sass";

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DSCEditor = function () {
  const dscLogo = useRef(null);
  const logoCanvas = useRef(null);
  const fullLogoImg = useRef(null)
   const [canvasScale , setScale] = useState<number>(0.5);
   const [logoName, setName] = useState<string>("School Name");
   const [darkMode, setMode] = useState(false);
   const [fullLogoUrl, setFullLogoUrl] = useState();
   const [fullLogoUrlVertical, setFullLogoUrlVertical] = useState();
   const [fullLogoUrlOld, setFullLogoUrlOld] = useState();
   const [fullLogoUrlVerticalOld, setFullLogoUrlVerticalOld] = useState();

  let LogoScale = 2.35;

  useEffect(() => {
    
    WebFont.load({
          google: {
            families: ["Roboto:400", "Product Sans", "Product Sans:400"]
          },
          fontactive: (familyName, fvd) => {
           bwImageHorizontal();
            colorImage();
            colorImageVertical();
            bwImageVertical();
          }
        });
  },[]);

  useEffect(() => {
    bwImageHorizontal();
    colorImage();
    bwImageVertical();
    colorImageVertical();
 }, [logoName]);


const handleDarkMode = (mode:any) =>{
  setMode(mode);
};

const bwImageHorizontal =()=> {
  const name = logoName;
  const scale = canvasScale;
  const ctx = logoCanvas.current.getContext("2d");
  ctx.font = `400 96px "Product Sans"`;
  LogoScale = 1.36;

  const canvasWidth = Math.max(ctx.measureText("Developer Student Clubs").width, ctx.measureText(name).width) + dscLogo.current.width * LogoScale + 600;
  const canvasHeight = dscLogo.current.height + 150;

  logoCanvas.current.setAttribute("width", canvasWidth * scale);
  logoCanvas.current.setAttribute("height", canvasHeight * scale);

  ctx.scale(scale, scale);
  ctx.font = `400 96px "Product Sans"`;
  ctx.fillStyle = "#fff";

  ctx.drawImage(dscLogo.current, 20, 0, dscLogo.current.width * LogoScale, dscLogo.current.height* LogoScale);

  ctx.fillText("Developer Student Clubs", dscLogo.current.width + 112, 132);

  ctx.font = `400 66px "Product Sans"`;
  ctx.fillText(name, dscLogo.current.width + 112, 243);

  setFullLogoUrl(logoCanvas.current.toDataURL())
}

const bwImageVertical =()=>{
  const name = logoName;
  const scale = canvasScale;
  const ctx = logoCanvas.current.getContext("2d");
  const ctx2 = logoCanvas.current.getContext("2d");
  ctx.font = `400 91px "Product Sans"`;
  ctx2.font = `400 62px "Product Sans"`;

  LogoScale = 2.35;

  const canvasWidth = (Math.max(ctx.measureText("Developer Student Clubs").width, ctx2.measureText(name).width) + 1200 );
  const canvasHeight = dscLogo.current.height * LogoScale + 100;

  logoCanvas.current.setAttribute("width", canvasWidth * scale);
  logoCanvas.current.setAttribute("height", canvasHeight * scale);

  ctx.scale(scale, scale);
  ctx.font = `400 94px "Product Sans"`;
  ctx.fillStyle = "#fff";

  ctx.drawImage(dscLogo.current, canvasWidth/2 - (dscLogo.current.width * LogoScale)/2, -0.25 * dscLogo.current.height * LogoScale, dscLogo.current.width * LogoScale, dscLogo.current.height* LogoScale);

  ctx.textBaseline = "bottom";
  // ctx.textAlign = "center";
  ctx.fillText(
    "Developer Student Clubs",
    canvasWidth/2 - (ctx.measureText("Developer Student Clubs").width / 2),
    dscLogo.current.height * LogoScale + 10
  );

  ctx.font = `400 62px "Product Sans"`;
  ctx.textBaseline = "bottom";
  // ctx.textAlign = "center";
  ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), dscLogo.current.height * LogoScale + 100);

  setFullLogoUrlVertical(logoCanvas.current.toDataURL())
}

const colorImage =()=>{
  const name = logoName;
  const scale = canvasScale;
  const ctx = logoCanvas.current.getContext("2d");
  const ctx2 = logoCanvas.current.getContext("2d");
  ctx.font = `400 96px "Product Sans"`;
  ctx2.font = `400 66px "Product Sans"`;

  LogoScale = 1.36;

  const canvasWidth = Math.max(ctx.measureText("Developer Student Clubs").width, ctx.measureText(name).width) + dscLogo.current.width * LogoScale + 600;
  const canvasHeight = dscLogo.current.height + 150;

  logoCanvas.current.setAttribute("width", canvasWidth * scale);
  logoCanvas.current.setAttribute("height", canvasHeight * scale);

  ctx.scale(scale, scale);
  ctx.font = `400 96px "Product Sans"`;
  ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

  ctx.drawImage(dscLogo.current, 20, 0, dscLogo.current.width * LogoScale, dscLogo.current.height* LogoScale);

  ctx.fillText("Developer Student Clubs", dscLogo.current.width + 112, 132);

  ctx.font = `400 66px "Product Sans"`;
  ctx.fillText(name, dscLogo.current.width + 112, 243);
  
  setFullLogoUrlOld(logoCanvas.current.toDataURL())
}

const colorImageVertical=()=> {
  const name = logoName;
  const scale = canvasScale;
  const ctx = logoCanvas.current.getContext("2d");
  const ctx2 = logoCanvas.current.getContext("2d");
  ctx.font = `400 91px "Product Sans"`;
  ctx2.font = `400 62px "Product Sans"`;

  LogoScale = 2.35;

  const canvasWidth = (Math.max(ctx.measureText("Developer Student Clubs").width, ctx2.measureText(name).width) + 1200 );
  const canvasHeight = dscLogo.current.height * LogoScale + 100;

  logoCanvas.current.setAttribute("width", canvasWidth * scale);
  logoCanvas.current.setAttribute("height", canvasHeight * scale);

  ctx.scale(scale, scale);
  ctx.font = `400 91px "Product Sans"`;
  ctx.fillStyle = "rgba(0, 0, 0, 0.54)";

  ctx.drawImage(dscLogo.current, canvasWidth/2 - (dscLogo.current.width * LogoScale)/2, -0.25 * dscLogo.current.height * LogoScale, dscLogo.current.width * LogoScale, dscLogo.current.height* LogoScale);

  ctx.textBaseline = "bottom";
  // ctx.textAlign = "center";
  ctx.fillText(
    "Developer Student Clubs",
    canvasWidth/2 - (ctx.measureText("Developer Student Clubs").width / 2),
    dscLogo.current.height * LogoScale + 10
  );

  ctx.font = `400 62px "Product Sans"`;
  ctx.textBaseline = "bottom";
  ctx.fillText(name, canvasWidth/2 - (ctx.measureText(name).width / 2), dscLogo.current.height * LogoScale + 100);

  setFullLogoUrlVerticalOld(logoCanvas.current.toDataURL())
}
  
    return (
      <div className="main">
        <MainToolBar
          toDark={handleDarkMode}
          darkMode={darkMode}
          id="DSCToolbar"
          />
        <div style={hidden}>
          {darkMode ? (
            <img
              ref={dscLogo}
              onLoad={() => {
                bwImageHorizontal();
                bwImageVertical();
              }}
              src="assets/dsc/bw.svg"
              alt={`DSC Icon`}
            />
          ) : (
            <img
              ref={dscLogo}
              onLoad={() => {
                colorImage();
                colorImageVertical();
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
            setName(e.target.value)
          }}
        />
        <br />
        <canvas
          style={hidden}
          ref={logoCanvas}
        />

        {darkMode ? (
          <>
            <Card style={{width: "100%"}}>
              <CardActionArea style={{background: "#000"}}>
                <CardContent>
                  <img
                    ref={fullLogoImg}
                    alt={`DSC ${name} Logo`}
                    src={fullLogoUrl}
                    style={{maxWidth: "100%"}}
                  />
                  <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is white. Please view downloaded logo against dark backgrounds.</Alert>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={fullLogoUrl}
                  style={{ margin: "5px" }}
                  download={`DSC ${logoName} Dark Horizontal-Logo.png`}
                >
                  DOWNLOAD
                </Button>
              </CardActions>
            </Card>
            <Card style={{width: "100%", marginTop: "1rem"}}>
              <CardActionArea style={{background: "#000"}}>
                <CardContent>
                  <img
                    ref={fullLogoImg}
                    alt={`DSC ${logoName} Logo`}
                    src={fullLogoUrlVertical}
                    style={{maxWidth: "100%"}}
                  />
                  <Alert severity="info" style={{ padding: "0 1rem", background: "#5c5c5c" }}>The text in the logo is white. Please view downloaded logo against dark backgrounds.</Alert>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={fullLogoUrlVertical}
                  style={{ margin: "5px" }}
                  download={`DSC ${logoName} Dark Vertical-Logo.png`}
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
                    ref={fullLogoImg}
                    alt={`DSC ${logoName} Logo`}
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
                  download={`DSC ${logoName} Light Horizontal-Logo.png`}
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
                    alt={`DSC ${logoName} Logo`}
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
                  download={`DSC ${logoName} Light Vertical-Logo.png`}
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

const hidden = {
  display: "none"
};

export default DSCEditor;