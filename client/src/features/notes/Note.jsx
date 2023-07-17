import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { PropTypes } from "prop-types";
import { memo } from "react";

export const Note = memo(function Note({ noteId }) {
	const { note } = useGetNotesQuery("notesList", {
		selectFromResult: ({ data }) => ({
			note: data?.entities[noteId],
		}),
	});

	const navigate = useNavigate();

	if (note) {
		const created = new Date(note.createdAt).toLocaleString("en-US", { day: "numeric", month: "long" });

		const updated = new Date(note.updatedAt).toLocaleString("en-US", { day: "numeric", month: "long" });

		const handleEdit = () => navigate(`/dash/notes/${noteId}`);

		return (
			<tr className='table__row'>
				<td className='table__cell note__status'>
					{note.completed ? (
						<span className='note__status--completed'>Completed</span>
					) : (
						<span className='note__status--open'>Open</span>
					)}
				</td>
				<td className='table__cell note__created'>{created}</td>
				<td className='table__cell note__updated'>{updated}</td>
				<td className='table__cell note__title'>{note.title}</td>
				<td className='table__cell note__username'>{note.username}</td>

				<td className='table__cell'>
					<IconButton
						disableRipple
						size='large'
						title='edit'
						aria-label='edit'
						className='icon-button table__button'
						onClick={handleEdit}
					>
						<EditIcon fontSize='inherit' />
					</IconButton>
				</td>
			</tr>
		);
	} else return null;
});

Note.propTypes = {
	noteId: PropTypes.string,
};
