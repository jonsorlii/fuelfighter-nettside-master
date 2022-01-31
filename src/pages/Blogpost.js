import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Helmet from 'react-helmet';

// import '../index.css'

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import Format from '../_helpers/format';
import { Title, Description, FrontImage, Section, MainSection, Meta, DescMetaSection, MetaKey, MetaValue } from '../components/blog.style';
import { PopupMessage } from '../components/general.style';
import blogService from '../_services/blog.services';
import shareIcon from '../assets/icon/share-24px.svg';

export default function Blogpost({ history, id }) {

	const [blogpost, setBlogpost] = useState({});
	const [showCopyPopup, setShowCopyPopup] = useState(false);

	console.log(id);

	useEffect(() => {
		if (id === undefined) {
			history.push('/blog');
		}
		blogService.blogpost(id)
			.then(res => {
				if (res === false) {
					window.history.back();
				} else {
					setBlogpost(res);
				}
			})
			.catch((ex) => {
				console.log('parsing failed', ex);
				setBlogpost({ exeption: 'failed to laod' });
			});
	}, [history, id]);

	const copyToClipboard = (e) => {
		var tempInput = document.createElement("input");
		tempInput.style = "position: absolute; left: -1000px; top: -1000px";
		tempInput.value = `http://www.fuelfighter.no/share.php?type=blog&id=${blogpost.id}`;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);
		
		// alert('Link copied');
		setShowCopyPopup(true);
	}

	// default content
	var content = (
		<div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', height: '100vh' }} >
			<ReactLoading type="spin" color="#000000" height={30} width={30} />
		</div>
	)

	if (blogpost.exeption !== undefined) {
		content = (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }} >
				{blogpost.exeption}
			</div>
		)
	} else if (blogpost.id !== undefined) {
		content = (
			<div style={{maxWidth: '1500px'}} > 
				<Helmet>
					<title>{'DNV GL FUEL FIGHTER: ' + blogpost.title}</title>
				</Helmet>
				<Section>
					<Title>{blogpost.title}</Title>
				</Section>
				<FrontImage src={blogpost.bannerImage} />
				<DescMetaSection>
					<Description>{blogpost.description}</Description>
					<Meta>
						<MetaKey>Published: </MetaKey><MetaValue>{Format.date(blogpost.date)}</MetaValue><br />
						<MetaKey>Author: </MetaKey><MetaValue>{blogpost.author !== null ? blogpost.author : 'Unknown'}</MetaValue>
						<MetaKey style={{display: 'block', marginTop: '10px'}}>
							<span dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.fuelfighter.no%2Fshare.php%3Ftype%3Dblog%26id%3D${blogpost.id}&width=450&layout=button_count&action=like&size=large&share=true&height=35&appId" width="150" height="35" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>` }}></span>
							{ showCopyPopup ? <PopupMessage message="Sharable link copied" time={4000} onRemove={() => setShowCopyPopup(false)} /> : '' }
							<span style={{cursor: 'pointer'}} onClick={copyToClipboard} ><img alt="share" style={{verticalAlign: 'top', marginTop: '3px'}} src={shareIcon} /></span>
						</MetaKey>
					</Meta>
				</DescMetaSection>
				<MainSection>
					<div className={"ck-content ck-blogpost"} dangerouslySetInnerHTML={{ __html: blogpost.content }} />
				</MainSection>
			</div>
		)
	}
	return (
		<>
			<Header />
			{content}
			<Footer />
		</>
	);
}