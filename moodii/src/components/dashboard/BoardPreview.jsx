export default function BoardPreview({ board }) {
	return (
		<div className="preview" style={{ background: board.background }}>
			{(board.pins ?? []).map((pin) => (
				<img
					key={pin.id}
					src={pin.src}
					alt=""
					draggable={false}
					style={{
						left: `${pin.x * 100}%`,
						top: `${pin.y * 100}%`,
						width: `${pin.w * 100}%`,
					}}
				/>
			))}
		</div>
	);
}
