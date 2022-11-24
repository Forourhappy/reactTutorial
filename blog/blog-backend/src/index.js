import { config } from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { _MongoClient } from 'mongodb';

import api from './api';

const { PORT, url } = process.env;

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

_MongoClient
	.connect(url)
	.then(client => {
		console.log('mongo connected');
		console.log(client);
	})
	.then(
		app.listen(PORT, () => {
			console.log('4000 port on');
		})
	)
	.catch(err => console.log(err));
