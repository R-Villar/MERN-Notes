import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PropTypes } from "prop-types";

export const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const { roles } = useAuth();

	return roles.some((role) => allowedRoles.includes(role)) ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

RequireAuth.propTypes = {
	allowedRoles: PropTypes.array,
};
