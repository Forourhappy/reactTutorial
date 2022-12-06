import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxWrapper = styled.div`
	width: 100%;
	border-top: 1px solid ${palette.gray[2]};
	padding-top: 2rem;

	h4 {
		color: ${palette.gray[8]};
		margin-top: 0;
		margin-bottom: 0.5rem;
	}
`;

const TagForm = styled.form`
	border-radius: 4px;
	overflow: hidden;
	display: flex;
	width: 256px;
	border: 1px solid ${palette.gray[9]};

	input,
	button {
		outline: none;
		border: none;
		font-size: 1rem;
	}

	input {
		padding: 0.5rem;
		flex: 1;
		min-width: 0;
	}

	button {
		cursor: pointer;
		padding-right: 1rem;
		padding-left: 1rem;
		border: none;
		background-color: ${palette.gray[8]};
		color: white;
		font-weight: bold;
		&:hover {
			background-color: ${palette.gray[6]};
		}
	}
`;

const Tag = styled.div`
	margin-right: 0.5rem;
	color: ${palette.gray[6]};
	cursor: pointer;
	&:hover {
		opacity: 0.5;
	}
`;

const TagListWrapper = styled.div`
	display: flex;
	margin-top: 0.5rem;
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
	<Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
	<TagListWrapper>
		{tags.map(tag => (
			<TagItem key={tag} tag={tag} onRemove={onRemove} />
		))}
	</TagListWrapper>
));

const TagBox = ({ tags, onChangeTags }) => {
	const [input, setInput] = useState('');
	const [localTags, setLocalTags] = useState([]);

	const insertTag = useCallback(
		tag => {
			if (!tag) return;
			if (localTags.includes(tag)) return;
			const nextTags = [...localTags, tag];
			setLocalTags([...localTags, tag]);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags]
	);

	const onRemove = useCallback(
		tag => {
			const nextTags = localTags.filter(t => t !== tag);
			setLocalTags(nextTags);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags]
	);

	const onChange = useCallback(e => {
		setInput(e.target.value);
	}, []);

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			insertTag(input.trim());
			setInput('');
		},
		[insertTag, input]
	);

	// tags 값이 바뀔 때
	useEffect(() => {
		setLocalTags(tags);
	}, [tags]);

	return (
		<TagBoxWrapper>
			<h4>태그</h4>
			<TagForm onSubmit={onSubmit}>
				<input
					placeholder='태그를 입력하세요'
					value={input}
					onChange={onChange}
				/>
				<button type='submit'>추가</button>
			</TagForm>
			<TagList tags={localTags} onRemove={onRemove} />
		</TagBoxWrapper>
	);
};

export default TagBox;
