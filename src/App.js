import React from 'react';
import GDGEditor from './GDGEditor'
import DSCEditor from './DSCEditor'
import WTMEditor from './WTMEditor'
import { AppBar, BottomNavigation, Box, Container, Link, Tabs, Tab, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GitHubButton from 'react-github-btn';

function TabPanel(props) {
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

function a11yProps(index) {
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
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
}));

export default function ScrollableTabsButtonAuto() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
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