import { useContext } from 'react';
import ColorContext from '../contexts/color';

const colors = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'indigo',
	'violet',
	'whiteSmoke',
];

const SelectColors = () => {
	const { actions } = useContext(ColorContext);
	return (
		<div>
			<h2>색상을 선택하세요</h2>
			<div style={{ display: 'flex' }}>
				{colors.map(i => (
					<div
						key={i}
						style={{
							background: i,
							width: '24px',
							height: '24px',
							cursor: 'pointer',
						}}
						onClick={() => actions.setColor(i)}
						onContextMenu={e => {
							e.preventDefault();
							actions.setSubColor(i);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default SelectColors;
