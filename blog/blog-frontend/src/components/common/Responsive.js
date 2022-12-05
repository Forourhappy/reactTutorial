import styled from 'styled-components';

const ResponsiveWrapper = styled.div`
	padding-left: 1rem;
	padding-right: 1rem;
	width: 1024px;
	margin: 0 auto;

	@media (min-width: 1024px) {
		width: 768px;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Responsive = ({ children, ...rest }) => {
	// style, className, onClick, onMousemove 등의 props를 사용할 수 있도록
	// ...rest를 사용하여 ResponsiveWrapper에 전달
	return <ResponsiveWrapper {...rest}>{children}</ResponsiveWrapper>;
};

export default Responsive;
