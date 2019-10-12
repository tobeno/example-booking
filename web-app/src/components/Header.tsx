import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(1)
	},
	logo: {
		height: '48px',
		width: '48px'
	}
}));

type Props = {
	className?: string;
};

const Header: React.FC<Props> = ({ className = '' }) => {
	const classes = useStyles();

	return (
		<header className={[ classes.root, className ].join(' ')}>
			<AppBar position="sticky">
				<Toolbar>
					<Logo className={classes.logo} />
					<Typography variant="h4" className={classes.title} title="Bookster">
						ookster
					</Typography>
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
