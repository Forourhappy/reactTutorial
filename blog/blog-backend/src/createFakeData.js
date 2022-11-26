import Post from './model/post.js';

export default function createFakeData() {
	// 0, 1, ...39로 이루어진 배열을 생성한 후 포스트 데이터로 변환
	const posts = [...Array(40).keys()].map(i => ({
		title: `포스트 #${i}`,
		// https://www.lipsum.com/에서 복사한 200자 이상의 텍스트
		body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at et earum alias? Quasi fugit quo magni qui, vero eum id eveniet necessitatibus laborum vitae accusamus quas cumque recusandae quam.',
		tags: ['가짜', '데이터'],
	}));
	Post.insertMany(posts, (err, docs) => {
		console.log(docs);
	});
}
