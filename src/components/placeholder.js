
function Placeholder({ title }) {
	const style = {
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center',
		color          : 'rgba(0, 150, 230, 0.5)',
		border         : '2px dashed rgba(0, 150, 230, 0.5)',
		margin         : '15px',
		height         : '90vh'
	}
	return <div style={style}> <h2>{title}</h2> </div>
}

export default Placeholder;