import React from "react";

class ImageBlock extends React.Component {
	render() {
		return <img src={this.props.src} alt={this.props.alt} />;
	}
}

export { ImageBlock };
