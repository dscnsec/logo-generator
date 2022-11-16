import React from 'react';
import GDGEditor from './GDGEditor';
import DSCEditor from './DSCEditor';
import WTMEditor from './WTMEditor';
import { AppBar, BottomNavigation, Box, Container, Link, Tabs, Tab, Typography, Toolbar, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn';
import Button from '@material-ui/core/Button';
import Login from './Login';
import SignUp from './Signup';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import { AuthProvider } from './context/AuthContext'
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


interface Props{
	props: any,
	index:number,
	mode:any
}
  
  function getModalStyle() {
	const top= 50;
	const left=50;
  
	return {
	  top: `${top}%`,
	  left: `${left}%`,
	  transform: `translate(-${top}%, -${left}%)`,
	};
  }
  

function TabPanel(props:any) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Container maxWidth="md">
						{children}
					</Container>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index:number) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		
	},

	menuButton: {
		marginRight: theme.spacing(2),
	  },
	  title: {
		flexGrow: 1,
	  },
	
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
	// stickToTop: {
	// 	width: '100%',
	// 	position: 'fixed',
	// 	top:0,
	// }
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	  },


}));


export default function ScrollableTabsButtonAuto() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [modalStyle] = React.useState(getModalStyle);
	const [openLogin, setOpenLogin] = React.useState(false);
	const [openSignUp, setOpenSignUp] = React.useState(false);
	const { currentUser, logout }:any= useAuth();
	const [error, setError] = React.useState('');
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


	const handleChange = (event:any, newValue:any) => {
		setValue(newValue);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	  };

	  const handleMenuClose = () => {
		setAnchorEl(null);
	  };

	async function handleLogout(){
		setError("")
		setAnchorEl(null)

		try{
			await logout();
			navigate('/');
		}catch {
			setError('Failed to log out')
		}
	}

	const handleOpen = () => {
		setOpenLogin(true);
	};
	
	const handleClose = () => {
		setOpenLogin(false);
	};

	const LoginBody = (
		<div style={modalStyle} className={classes.paper}>
		  <Login loginOpen={(value1:boolean, value2:boolean)=> {setOpenLogin(value1)
		   setOpenSignUp(value2)} }/>
		</div>
	);

	const signUpBody = (
		<div style={modalStyle} className={classes.paper}>
		  <SignUp signupOpen={(value1:boolean, value2:boolean)=> {setOpenSignUp(value1)
		   setOpenLogin(value2)}}/>
	    </div>
	);
	

	return (
		<div className={classes.root}>
            {/* <AppBar position="sticky" color="default">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                     <MenuIcon />
                      </IconButton>
                    <Typography variant="h6" className={classes.title}>
                         Logo-Generator
                    </Typography>
                     <Button color="inherit">Login</Button>
					 <Button color="inherit">SignUp</Button>

                </Toolbar>
            </AppBar> */}

			<AppBar position="static" color="default">
			    <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title}>
                        Logo-Generator
                    </Typography>
	
				    {currentUser ?  <>
					                 <Button onClick={handleMenuClick}>{currentUser.displayName}
                                      <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                                     </Button>
									  <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                      >
                                       <MenuItem onClick={handleMenuClose}>My Logos</MenuItem>
                                       <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                       </Menu>
									</> 
							     : 
					                <>
                                      <Button color="inherit" onClick={handleOpen}>Login</Button>
					                    <Modal
                                         open={openLogin}
                                          onClose={handleClose}
                                        >
                                          {LoginBody}
                                        </Modal>

				                       <Button color="inherit" onClick={() => setOpenSignUp(true)}>SignUp</Button>
				                        <Modal
                                         open={openSignUp}
                                         onClose={() => setOpenSignUp(false)}
                                        >
                                         {signUpBody}
                                        </Modal>
					                </>
                    } 
                </Toolbar>

				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
				>
					<Tab label="GDG" {...a11yProps(0)} />
					<Tab label="DSC" {...a11yProps(1)} />
					<Tab label="WTM" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<GDGEditor />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DSCEditor />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<WTMEditor />
			</TabPanel>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<BottomNavigation className={classes.stickToBottom}>
			<GitHubButton href="https://github.com/dscnsec/logo-generator" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star dscnsec/logo-generator on GitHub">Star</GitHubButton>
				
				<Typography>
				&nbsp;&middot;&nbsp;Created by&nbsp;
					<Link href="https://xprilion.com" target="_blank">
						@xprilion
					</Link>
				</Typography>
			</BottomNavigation>
		</div>
	);
}