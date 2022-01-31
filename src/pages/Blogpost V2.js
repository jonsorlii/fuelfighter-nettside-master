// packages
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { A } from 'hookrouter'

// components
import '../_styles/blogpost.css'
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import blogService from '../_services/blog.services'

// assets
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

export default function Blogpost({ id }) {

	const [blogpost, setBlogpost] = useState();
	const shareLink = `https://www.fuelfighter.no/share.php?type=blog&id=${blogpost?.id}`

	const formatDate = (milliseconds) => {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Descember"];
		var date = new Date(+milliseconds);
		return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
	}

	const returnBack = () => window.history.back()

	useEffect(() => {
		blogService.blogpost(id)
			.then(res => {
				if (res === false) {
					returnBack()
				} else {
					setBlogpost(res)
				}
			})
	}, [id])

	return (
		<>
			<Header />
			<section id="blogpost">
				{!blogpost
				? <div className="grid">
						<div className="row-center">
							<div className="spinner"/>
						</div>
					</div>
				: <>
					<article>
						<header>
							<p><button className="small-button" onClick={returnBack}>Return</button></p>
							<h1 className="heavy">{blogpost.title}</h1>
							<h5>{blogpost.author}</h5>
							<time dateTime={blogpost.date}>{formatDate(blogpost.date)}</time>
							<p><b>{blogpost.description}</b></p>
							<figure>
								<img alt="banner" src={blogpost.bannerImage} />
							</figure>
						</header>
						<section dangerouslySetInnerHTML={{ __html: blogpost.content }} />
					</article>
					<hr />
					<div className="grid">
						<div className="two-thirds">
							<h2>Thank you for reading</h2>
							<p>We want to thank you for your interest in the blog. You can find more articles like this on our <A href="/blog">blog</A></p>
							<h3>Share</h3>
							<a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank" rel="noopener noreferrer" className="blogpost-share" title="facebook"><FontAwesomeIcon icon={faFacebook} /></a>
							<CopyToClipboard text={shareLink}>
								<span className="blogpost-share" title="copy"><FontAwesomeIcon icon={faCopy} /></span>
							</CopyToClipboard>
						</div>
						<div className="two-thirds">
						<A href="/blog" className="return">Return to blog</A>
						</div>
					</div>
					</>
				}
			</section>
			<Footer />
		</>
	)
}