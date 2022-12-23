import { config } from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';

config();

const { PORT, url } = process.env;
const __dirname = path.resolve();

mongoose
	.connect(url)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(err => console.error(err));

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
	// Not Found이고, 주소가 /api로 시작하지 않는 경우
	if (ctx.status === 404 && ctx.path.indexOf('./api') !== 0) {
		// index.html 내용을 반환
		await send(ctx, 'index..html', { root: buildDirectory });
	}
});
const port = PORT || 4000;
app.listen(port, () => {
	console.log('Listening to port %d', port);
});
