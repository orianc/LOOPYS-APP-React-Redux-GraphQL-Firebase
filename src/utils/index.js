export const checkUserIsAdmin = (currentUser) => {
	if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

	const { userRoles } = currentUser;
	if (userRoles.includes('admin')) {
		//	console.log('admin true');
		return true;
	}

	// console.log('admin false');
	return false;
};

export const apiInstanceURL = {
	dev: 'http://localhost:4000/logs?q=metadata.emulator.name%3D%22functions%22',
	prod: 'https://us-central1-loopys-56e36.cloudfunctions.net/api',
};
