import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SubInfoWrapper = styled.div`
	${props =>
		props.hasMarginTop &&
		css`
			margin-top: 1rem;
		`}

	color: ${palette.gray[6]};

	/* span 사이에 가운뎃점 문자 보여 주기 */
	span + span:before {
		color: ${palette.gray[4]};
		padding-left: 0.25em;
		padding-right: 0.25rem;
		content: '\\B7';
	}
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
	return (
		<SubInfoWrapper hasMarginTop={hasMarginTop}>
			<span>
				<b>
					<Link to={`/@${username}`}>{username}</Link>
				</b>
			</span>
			<span>{new Date(publishedDate).toLocaleDateString()}</span>
		</SubInfoWrapper>
	);
};

export default SubInfo;
