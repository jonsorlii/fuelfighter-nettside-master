// packages
import React, { useState, useEffect } from 'react'

// components
import '../_styles/blog.css'
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import PostPreview from '../_templates/PostPreview'
import blogService from '../_services/blog.services'

export default function Blog() {

	const [loading, setLoading] = useState(false)
	const [endOfTable, setEndOfTable] = useState(false)
	const [posts, setPosts] = useState([])
	const [loadCounter, setLoadCounter] = useState(0)
	const loadAmout = 9

	const loadMore = () => {
		setLoading(true)
		blogService.lazyBlogposts(loadCounter * loadAmout, loadAmout)
			.then(json => {
				if (json?.exist) {
					setLoadCounter(loadCounter + 1)
					setPosts([...posts, ...json?.data])
					setLoading(false)
				} else {
					setEndOfTable(true)
				}
			})
	}

	useEffect(loadMore, [])

	return (
		<>
			<Header />
			<section id="blog-page">
				<div className="grid">
					<div className="two-thirds">
						<h2>Welcome to the blog</h2>
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
					{endOfTable
						? <p><i>You have reached the end</i></p>
						: <button className="suggested-action small-button" onClick={loadMore} disabled={loading}>Load more</button>
					}
				</div>
			</section>
			<Footer />
		</>
	)
}