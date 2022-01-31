import React from 'react'
import { A } from 'hookrouter'

import '../_styles/blog.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({id, title, description, author, date, image, featured}) => {
    
    const formatDate = (milliseconds) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Descember"];
        var date = new Date(+milliseconds);
        return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    return (
        <A href={`/blog/${id}`} className={`post_preview ${featured ? 'featured' : ''}`}>
            <div>
                <img alt={title} src={image} />
                <header>
                    <h4>{title}</h4>
                    <h5 className="author">{author}</h5>
                    <time dateTime={date}>{formatDate(date)}</time>
                    <p className="post_preview-description">{description}</p>
                    <p className="text-left" >
                        <span className="read-more">Read</span>
                    </p>
                </header>
            </div>
        </A>
    )
}