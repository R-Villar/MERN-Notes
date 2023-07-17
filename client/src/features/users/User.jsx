import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { PropTypes } from "prop-types";
import { memo } from "react";

export const User = memo(function User({ userId }) {
	const { user } = useGetUsersQuery("usersList", {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userId],
		}),
	});

	const navigate = useNavigate();

	if (user) {
		const handleEdit = () => navigate(`/dash/users/${userId}`);

		const userRolesString = user.roles.toString().replaceAll(",", ", ");

		const cellStatus = user.active ? "" : "table-cell--inactive";

		return (
			<tr className='table__row user'>
				<td className={`table__cell ${cellStatus}`}>{user.username}</td>
				<td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
				<td className={`table__cell ${cellStatus}`}>
					<IconButton
						disableRipple
						size='large'
						title='edit'
						aria-label='edit'
						className='icon-button table__button'
						onClick={handleEdit}
					>
						<EditIcon fontSize='inherit'  />
					</IconButton>
				</td>
			</tr>
		);
	} else return null;
});

User.propTypes = {
	userId: PropTypes.string,
};
