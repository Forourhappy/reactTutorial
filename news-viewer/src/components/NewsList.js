import styled from 'styled-components';
import NewsItem from 'components/NewsItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePromise } from 'lib/usePromise';

const NewsListBlock = styled.div`
	box-sizing: border-box;
	padding-bottom: 3rem;
	width: 768px;
	margin: 0 auto;
	margin-top: 2rem;
	@media screen and (max-width: 768px) {
		width: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
	}
`;

const sampleArticle = {
	title: '제목',
	description: '내용',
	url: 'https://google.com',
	urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = ({ category }) => {
	const [loading, response, error] = usePromise(() => {
		const query = category === 'all' ? '' : `&category=${category}`;
		return axios.get(
			`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=17e9e0484fd94797b2c9227cf2da2b69`
		);
	}, [category]);

	if (loading) {
		return <NewsListBlock>대기 중...</NewsListBlock>;
	}

	if (!response) {
		return null;
	}

	if (error) {
		return <NewsListBlock>에러 발생!</NewsListBlock>;
	}

	// response 값이 유효할 때
	const { articles } = response.data;
	return (
		<NewsListBlock>
			{articles.map(article => (
				<NewsItem key={article.url} article={article} />
			))}
		</NewsListBlock>
	);
};

export default NewsList;
