// packages
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { A } from 'hookrouter'

// components
import '../_styles/home.css'
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import PostPreview from '../_templates/PostPreview'

// assets
import landingImage from '../assets/car_render_transparent_crop1.png';
import carRaceImage from '../assets/bil_speed.jpg'
import logoImage from '../assets/logo_black.png'
import blogService from '../_services/blog.services'

export default function Home() {

	const [videoVisible, setVideoVisible] = useState(true)
	const onVideoEnd = () => setVideoVisible(false)

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		blogService.blogposts(3)
			.then(json => setPosts(json))
	}, [])

	return (
		<>
			<Header floating />
			<section id="landing" className="section">
				<img alt="Car from behind" className="background-image" src={landingImage} />
				<div className={`background-video ${!videoVisible && 'video-hidden'}`}>
					<ReactPlayer
						url='videos/promotion_cut.mp4'
						width="100vw"
						height="56.25vw"
						style={{ minHeight: '500px', minWidth: '888px' }}
						controls={false}
						playing={true}
						onEnded={onVideoEnd}
						muted
					/>
				</div>
				<div className="grid">
					<h1 id="title">DNV Fuel Fighter</h1>
					<h4>Inspire a sustainable future</h4>
				</div>
			</section>
			<section id="blog" style={{ background: '#fafafa' }}>
				<div className="grid">
					<div className="two-thirds">
						<h2>Latest updates</h2>
						<p>We at DNV Fuel Fighter want to share our experience with our friends, family and anyone else interested in what we do. Our blog is the best way for anyone interested to get an in depth view of what we do both socially and as a technical student organization.</p>
					</div>
					<div className="row-center">
						{posts?.map(post => (
							<PostPreview
								key={post.id}
								id={post.id}
								title={post.title}
								description={post.description}
								author={post.author}
								date={post.date}
								image={post.image}
							/>
						))}
					</div>
					<A href="/blog" className="read-more">Visit blog</A>
				</div>
			</section>
			<section style={{backgroundColor: '#10213D'}}>
				<div className="grid">
					<div className="two-thirds">
						<h2 style={{color: 'rgb(221, 221, 221)'}}>What we do</h2>
						<p style={{color: 'rgb(221, 221, 221)'}}>In short we build a energy efficient car. And what happends when we in the end of the year have a finished car? Well then we compete with other student organizations around the world which also strive for the best possible car! To learn more about what we do...</p>
						<A className="read-more" href="./about">Visit about page</A>
					</div>
				</div>
				<img className="image-full_width" src={carRaceImage} alt="Our car at Shell Eco Marathon in high speed" />
			</section>
			<section style={{ background: '#fafafa' }}>
				<div className="grid">
					<div className="two-thirds">
						<img alt="DNV GL Fuel Fighter logo" src={logoImage} width="64" />
						<h2>Apply for DNV Fuel Fighter</h2>
						<p>DNV Fuel Fighter is a technical student organization at NTNU working with the goal of making the world’s most energy efficient electric car.</p>
						<A className="button suggested-action" href="./join">Apply now</A>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}