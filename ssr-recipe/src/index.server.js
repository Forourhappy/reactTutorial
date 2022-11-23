import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';

import App from './App';
import path from 'path';
import fs from 'fs';
import { applyMiddleware, legacy_createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import PreloadContext from './lib/PreloadContext';
import createSagaMiddleware from 'redux-saga';
import { END } from 'redux-saga';

const manifest = JSON.parse(
	fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

function createPage(root, stateScript) {
	return `<!DOCTYPE html>
  <html lang='en'>
    <head>
      <meta charset='utf-8'/>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta 
        name='viewport' 
        content='width=device-width, initial-scale=1, shrink-to-fit=no'/>
      <meta name='theme-color' content='#000000'/>
      <title>React App</title>
      <link rel="stylesheet" href="${manifest.files['main.css']}" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app</noscript>
      <div id="root">${root}</div>
      ${stateScript}
      <script src="${manifest.files['main.js']}"></script>
    </body>
  </html>`;
}

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
	// 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 준다.

	const context = {};
	const sagaMiddleware = createSagaMiddleware();
	const store = legacy_createStore(
		rootReducer,
		applyMiddleware(thunk, sagaMiddleware)
	);

	const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

	const preloadContext = {
		done: false,
		promises: [],
	};

	const jsx = (
		<PreloadContext.Provider value={preloadContext}>
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		</PreloadContext.Provider>
	);

	ReactDOMServer.renderToStaticMarkup(jsx);
	// redux-saga의 END 액션을 발생시키면 액션을 모니터링 하는 사가들이 모두 종료
	store.dispatch(END);
	try {
		// 기존에 진행 중이던 사가들이 모두 끝날 때까지 대기
		await sagaPromise;
		await Promise.all(preloadContext.promises);
	} catch (e) {
		return res.status(500);
	}
	preloadContext.done = true;
	const root = ReactDOMServer.renderToString(jsx);
	const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
	const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

	res.send(createPage(root, stateScript));
};

const serve = express.static(path.resolve('./build'), {
	index: false,
});

app.use(serve);
app.use(serverRender);

// 5000 포트로 서버 가동
app.listen(5000, () => {
	console.log('5000포트로 서버 연결');
});
