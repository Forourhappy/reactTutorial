import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const { form, auth, authError } = useSelector(({ auth }) => ({
		form: auth.register,
		auth: auth.auth,
		authError: auth.authError
	}));

	// 인풋 변경 이벤트 핸들러
	const onChange = e => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'register',
				key: name,
				value,
			})
		);
	};


	// 폼 등록 이벤트 핸들러
	const onSubmit = e => {
		e.preventDefault();
		const { username, password, passwordConfirm } = form
		if (password !== passwordConfirm) {
			// TODO: 오류 처리
			return
		}
		dispatch(register({ username, password }))
	};

	// 컴포넌트가 처음 렌더링될 때 form을 초기화
	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			console.log('오류 발생');
			console.log(authError);
			return
		}
		if (auth) {
			console.log('회원가입 성공');
			console.log(auth);
		}
	}, [auth, authError])

	return (
		<AuthForm
			type='register'
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default RegisterForm;
