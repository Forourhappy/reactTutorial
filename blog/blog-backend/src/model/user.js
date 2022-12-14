import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
	username: String,
	hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
	const hash = await bcrypt.hash(password, 10);
	this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
	const result = await bcrypt.compare(password, this.hashedPassword);
	// true / false
	return result;
};

UserSchema.methods.serialize = async function () {
	const data = this.toJSON();
	delete data.hashedPassword;
	return data;
};

/** check username */
UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		// 첫 번재 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다
		{
			_id: this.id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		}
	);
	return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
