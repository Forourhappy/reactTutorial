import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';
import axios from 'axios';
import NewsList from 'components/NewsList';
import Categories from 'components/Categories';
import { Route, Routes } from 'react-router-dom';
import NewsPage from 'pages/NewsPage';

function App() {
	const [category, setCategory] = useState('all');
	const onSelect = useCallback(category => {
		setCategory(category);
	}, []);

	return (
		<Routes>
			<Route path='/' element={<NewsPage />} />
			<Route path='/:category' element={<NewsPage />} />
		</Routes>
	);
}

export default App;
