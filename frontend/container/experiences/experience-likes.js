import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLikes } from '../../actions/action-likes';
import LikesImage from './likes-image';
import LikesCounter from './likes-counter';
import axios from 'axios'


class Likes extends Component {
	constructor(props){
		super(props)

		this.state = { likes: []}
			
		this.likesCounter = this.likesCounter.bind(this)
		this.addLikes = this.addLikes.bind(this);
		this.deleteLikes = this.deleteLikes.bind(this);
	}

	componentWillMount(){
		let { fetchLikes } = this.props
		let id = this.props.id
		
		fetchLikes(id)
 	}

 	likesCounter() {
 		let { likes } = this.props;
		let counter = likes.length

		return (
			<div>
			{counter}
			</div>
		)
 	}

 	addLikes(experienceId,userId) {
		let ROOT_URL = `/api/likes/`
		
		axios.post(`${ROOT_URL}${experienceId}/${userId}`)
		.then((data) => { 
			this.props.fetchLikes(this.props.id)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	deleteLikes(experienceId,userId) {
		let ROOT_URL = `/api/likes/`

		axios.delete(`${ROOT_URL}${experienceId}/${userId}`)
		.then((data) => {
			this.props.fetchLikes(this.props.id)
		})
		.catch((error) => {
			console.log(error)
		})
	}

 	render(){
	let { likes } = this.props;

 		return (
 		 	<div>
 				<LikesCounter likesCounter={this.likesCounter.bind(this)} />
 				<LikesImage 
	 				likes={this.state.likes}
	 				addLikes={this.addLikes.bind(this)} 
	 				deleteLikes={this.deleteLikes.bind(this)}
					experienceId={this.props.id}
					userId={4}
	 				 />
 			</div>
		)
 	}
}

function mapStateToProps(state) {
	return { likes: state.likes.likes }
}

function mapDispatchtoProps(dispatch) {
	return bindActionCreators({ fetchLikes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchtoProps)(Likes);