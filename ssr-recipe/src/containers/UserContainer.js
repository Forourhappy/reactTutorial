import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { Preloader, usePreloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();

	usePreloader(() => dispatch(getUser(id)));
	useEffect(() => {
		if (user && user.id === parseInt(id, 10)) return;
		dispatch(getUser(id));
	}, [dispatch, id, user]);

	// 컨테이너 유효성 검사 후 return null을 해야 하는 경우
	// null 대신 Preloader 반환
	if (!user) {
		return null;
	}
	return <User user={user} />;
};

export default UserContainer;
