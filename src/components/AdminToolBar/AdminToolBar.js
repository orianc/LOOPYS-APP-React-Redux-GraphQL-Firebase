import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../utils';
import './admintoolbal.scss';

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AdminToolBar = (props) => {
	const { currentUser } = useSelector(mapState);
	const isAdmin = checkUserIsAdmin(currentUser);
	if (!isAdmin) return null;
	return (
		<div className="adminToolBar">
			<ul>
				<li>
					<Link to="/admin">Admin dashboard</Link>
				</li>
			</ul>
		</div>
	);
};

export default AdminToolBar;
