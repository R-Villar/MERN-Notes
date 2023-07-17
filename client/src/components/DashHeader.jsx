import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useAuth } from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from "@mui/icons-material/Logout";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export const DashHeader = () => {
	const { isManager, isAdmin } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate("/");
	}, [isSuccess, navigate]);

	const onNewNoteClicked = () => navigate("/dash/notes/new");
	const onNewUserClicked = () => navigate("/dash/users/new");
	const onNotesClicked = () => navigate("/dash/notes");
	const onUsersClicked = () => navigate("/dash/users");

	let dashClass = null;
	if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
		dashClass = "dash-header__container--small";
	}

	let newNoteButton = null;
	if (NOTES_REGEX.test(pathname)) {
		newNoteButton = (
			<IconButton
				sx={{
					color: "#fff",
					"&:hover": { transform: "scale(1.2)" },
					backgroundColor: "transparent",
				}}
				title='New Note'
				onClick={onNewNoteClicked}
			>
				<NoteAddIcon sx={{ fontSize: 40 }} />
			</IconButton>
		);
	}

	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<IconButton
				sx={{
					color: "#fff",
					"&:hover": { transform: "scale(1.2)" },
					backgroundColor: "transparent",
				}}
				title='New User'
				onClick={onNewUserClicked}
			>
				<PersonAddIcon sx={{ fontSize: 40 }} />
			</IconButton>
		);
	}

	let userButton = null;
	if (isManager || isAdmin) {
		if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
			userButton = (
				<IconButton
					sx={{
						color: "#fff",
						"&:hover": { transform: "scale(1.2)" },
						backgroundColor: "transparent",
					}}
					title='Users'
					onClick={onUsersClicked}
				>
					<ManageAccountsIcon sx={{ fontSize: 40 }} />
				</IconButton>
			);
		}
	}

	let notesButton = null;
	if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
		notesButton = (
			<IconButton
				sx={{
					color: "#fff",
					"&:hover": { transform: "scale(1.2)" },
					backgroundColor: "transparent",
				}}
				title='Notes'
				onClick={onNotesClicked}
			>
				<EditNoteIcon sx={{ fontSize: 40 }} />
			</IconButton>
		);
	}

	const logoutButton = (
		<button className='icon-button' title='Logout' onClick={sendLogout}>
			<LogoutIcon sx={{ fontSize: 40 }} />
		</button>
	);

	const errClass = isError ? "errmsg" : "offscreen";

	let buttonContent;
	if (isLoading) {
		buttonContent = <CircularProgress color='inherit' />;
	} else {
		buttonContent = (
			<>
				{newNoteButton}
				{newUserButton}
				{notesButton}
				{userButton}
				{logoutButton}
			</>
		);
	}

	return (
		<>
			<Typography className={errClass}> {error?.data?.message}</Typography>

			<header className='dash-header'>
				<div className={`dash-header__container ${dashClass}`}>
					<Link to='/dash'>
						<h1 className='dash-header__title'>TechNotes</h1>
					</Link>
					<nav className='dash-header__nav'>{buttonContent}</nav>
				</div>
			</header>
			<Divider color='#fff' />
		</>
	);
};
