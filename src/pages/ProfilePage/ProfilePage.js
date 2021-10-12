import React from 'react';
import { useParams } from 'react-router';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './profilepage.scss';

const ProfilePage = (props) => {
	const { userID } = useParams();

	return (
		<div>
			<ProfileCard userID={userID} />
		</div>
	);
};

export default ProfilePage;
