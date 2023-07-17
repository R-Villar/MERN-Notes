import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DashFooter = () => {
	const { username, status } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onGoHomeClicked = () => navigate("/dash");

	let goHomeButton = null;
	if (pathname !== "/dash") {
		goHomeButton = (
			<IconButton
				sx={{
					color: "#fff",
					"&:hover": { transform: "scale(1.2)" },
					backgroundColor: "transparent",
				}}
				title='Home'
				onClick={onGoHomeClicked}
			>
				<HomeIcon fontSize='1rem' />
			</IconButton>
		);
	}

	return (
		<Box>
			<Divider color='#fff' />
			<Box
				component='footer'
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					flexFlow: "row",
					flexWrap: "nowrap",
					position: "sticky",
					gap: "1em",
					fontSize: "1rem",
					padding: "0.5em",
					zIndex: 1,
					bottom: 0,
				}}
			>
				{goHomeButton}
				<Typography variant='body1'>Current User: {username}</Typography>
				<Typography variant='body1'>Status: {status}</Typography>
			</Box>
		</Box>
	);
};
