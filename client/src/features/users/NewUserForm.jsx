import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import SaveIcon from "@mui/icons-material/Save"
import IconButton from "@mui/material/IconButton"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

export const NewUserForm = () => {
	const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()

	const navigate = useNavigate()

	const [username, setUsername] = useState("")
	const [validUsername, setValidUsername] = useState(false)
	const [password, setPassword] = useState("")
	const [validPassword, setValidPassword] = useState(false)
	const [roles, setRoles] = useState(["Employee"])

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username))
	}, [username])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password))
	}, [password])

	useEffect(() => {
		if (isSuccess) {
			setUsername("")
			setPassword("")
			setRoles([])
			navigate("/dash/users")
		}
	}, [isSuccess, navigate])

	const onUsernameChanged = (e) => setUsername(e.target.value)
	const onPasswordChanged = (e) => setPassword(e.target.value)

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions, //HTMLCollection
			(option) => option.value
		)
		setRoles(values)
	}

	const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

	const onSaveUserClicked = async (e) => {
		e.preventDefault()
		if (canSave) {
			await addNewUser({ username, password, roles })
		}
	}

	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role}>
				{" "}
				{role}
			</option>
		)
	})

	const errClass = isError ? "errmsg" : "offscreen"
	const validUserClass = !validUsername ? "form__input--incomplete" : ""
	const validPwdClass = !validPassword ? "form__input--incomplete" : ""
	const validRolesClass = !roles.length ? "form__input--incomplete" : ""

	return (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<form className='form' onSubmit={onSaveUserClicked}>
				<div className='form__title-row'>
					<h2>New User</h2>
					<div className='form__action-buttons'>
						<IconButton
							type='submit'
							disableRipple
							aria-label='save'
							className='icon-button'
							title='Save'
							disabled={!canSave}
						>
							<SaveIcon color='primary' sx={{ fontSize: 40 }} />
						</IconButton>
					</div>
				</div>
				<label className='form__label' htmlFor='username'>
					Username: <span className='nowrap'>[3-20 letters]</span>
				</label>
				<input
					className={`form__input ${validUserClass}`}
					id='username'
					name='username'
					type='text'
					autoComplete='off'
					value={username}
					onChange={onUsernameChanged}
				/>

				<label className='form__label' htmlFor='password'>
					Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
				</label>
				<input
					className={`form__input ${validPwdClass}`}
					id='password'
					name='password'
					type='password'
					value={password}
					onChange={onPasswordChanged}
				/>

				<label className='form__label' htmlFor='roles'>
					ASSIGNED ROLES:
				</label>
				<select
					id='roles'
					name='roles'
					className={`form__select ${validRolesClass}`}
					multiple={true}
					size='3'
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</form>
		</>
	)
}
