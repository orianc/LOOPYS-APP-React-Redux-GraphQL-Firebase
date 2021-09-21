export const checkUserIsAdmin = (currentUser) => {
	if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

	const { userRoles } = currentUser;
	if (userRoles.includes('admin')) {
		console.log('admin true');
		return true;
	}

	console.log('admin false');
	return false;
};
