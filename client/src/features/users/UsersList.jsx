import { useGetUsersQuery } from "./usersApiSlice";
import { User } from "./User";

export const UsersList = () => {
	const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

	if (isLoading) return <p>Loading...</p>;

	if (isError) {
		return <p className='errmsg'>{error?.data?.message}</p>;
	}
  console.log(users)

	if (isSuccess) {
		const { ids } = users;

		const tableContent = ids?.length ? ids.map((userId) => <User key={userId} userId={userId} />) : null;

		return (
			<table className='table table--users'>
				<thead className='table__thead'>
					<tr>
						<th scope='col' className='table__th user__username'>
							Username
						</th>
						<th scope='col' className='table__th user__roles'>
							Roles
						</th>
						<th scope='col' className='table__th user__edit'>
							Edit
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}
};
