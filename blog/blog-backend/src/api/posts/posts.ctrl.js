import Joi from 'joi';
import mongoose from 'mongoose';
import Post from '../../model/post.js';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
	const { id } = ctx.params;
	if (!ObjectId.isValid(id)) {
		ctx.status = 400;
		return;
	}
	try {
		const post = await Post.findById(id);
		// 포스트가 존재하지 않을 때
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.state.post = post;
		return next();
	} catch (e) {
		ctx.throw(500, e);
	}
	return next();
};

// posts 배열 초기 데이터
const posts = [
	{
		id: 1,
		title: '제목',
		body: '내용',
	},
];

// 포스트 작성
// POST /api/posts
// {
// 	title: '제목',
// 	body: '내용',
// 	tags: ['태그1', '태그2']
// }

export const write = async ctx => {
	const schema = Joi.object().keys({
		// 객체가 다음 필드를 가지고 있음을 검증
		title: Joi.string().required(), // required()가 있으면 필수
		body: Joi.string().required(),
		// 문자열로 이루어진 배열
		tags: Joi.array().items(Joi.string()).required(),
	});

	// 검증하고서 검증 실패인 경우 에러 처리
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	// REST API의 Request Body는 ctx.request.body에서 조회 가능
	const { title, body, tags } = ctx.request.body;

	const post = new Post({
		title,
		body,
		tags,
		user: ctx.state.user,
	});
	try {
		await post.save();
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// 포스트 목록 조회
// GET /api/posts

export const list = async ctx => {
	// query는 문자열이기 때문에 숫자로 변환해 주어야 한다
	// 값이 주어지지 않았다면 1을 기본으로 사용
	const page = parseInt(ctx.query.page || '1', 10);

	if (page < 1) {
		ctx.status = 400;
		return;
	}

	const { tag, username } = ctx.query;
	// tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
	const query = {
		...(username ? { 'user.username': username } : {}),
		...(tag ? { tags: tag } : {}),
	};

	try {
		const posts = await Post.find(query)
			.sort({ _id: -1 })
			.limit(10)
			.skip((page - 1) * 10)
			.exec();
		const postCount = await Post.countDocuments(query).exec();
		ctx.set('Last-Page', Math.ceil(postCount / 10));
		ctx.body = posts
			.map(post => post.toJSON())
			.map(post => ({
				...post,
				body:
					post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
			}));
	} catch (e) {
		ctx.throw(500, e);
	}
};

// 특정 포스트 조회
// GET /api/posts/:id

export const read = async ctx => {
	ctx.body = ctx.state.post;
};

// 특정 포스트 제거
// DELETE /api/posts/:id

export const remove = async ctx => {
	const { id } = ctx.params;

	try {
		await Post.findByIdAndRemove(id).exec();
		ctx.status = 204;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// 포스트 수정(교체)
// PUT /api/posts/:id
// { title, body }

// export const replace = ctx => {
// 	// PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용
// 	const { id } = ctx.params;
// 	// 해당 id를 가진 post가 몇 번째인지 확인
// 	const index = posts.findIndex(p => p.id.toString() === id);
// 	//포스트가 없으면 오류를 반환
// 	if (index === -1) {
// 		ctx.status = 404;
// 		ctx.body = {
// 			message: '포스트가 존재하지 않습니다',
// 		};
// 		return;
// 	}
// 	// 전체 객체를 덮어 씌운다
// 	// 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만든다
// 	posts[index] = {
// 		id,
// 		...ctx.request.body,
// 	};
// 	ctx.body = posts[index];
// };

// 포스트 수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }

export const update = async ctx => {
	const schema = Joi.object().keys({
		title: Joi.string(),
		body: Joi.string(),
		tags: Joi.array().items(Joi.string()),
	});

	// 검증하고서 검증 실패인 경우 에러 처리
	const result = schema.validate(ctx.request.body);
	if (result.error) {
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { id } = ctx.params;
	try {
		const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			// 이 값을 설정하면 업데이트된 데이터를 반환
			// false일 때는 업데이트 되기 전의 데이터를 반환
			new: true,
		}).exec();
		if (!post) {
			ctx.status = 404;
			return;
		}
		ctx.body = post;
	} catch (e) {
		ctx.throw(500, e);
	}
};

export const checkOwnPost = (ctx, next) => {
	const { user, post } = ctx.state;
	if (post.user._id.toString() !== user._id) {
		ctx.status = 403;
		return;
	}
	return next();
};
