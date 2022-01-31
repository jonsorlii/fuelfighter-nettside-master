import React, { useState, useEffect } from 'react';

// components
import { Option, Options, Content, StyledLink, BackButton } from '../../components/admin.style.js';
import reroute from '../../_helpers/reroute';
import blogService from '../../_services/blogAdmin.service';

export default function BlogMenu({ history, location }) {

  const [ blogposts, setBlogposts ] = useState([]);

  useEffect(() => {
    blogService.getBlogposts()
      .then((data) => {
        setBlogposts(data)
      })
  }, []);

  const newBlogpost = () => {
    blogService.newBlog()
      .then(id => {
        history.push(`/admin/editblog?id=${id}`);
      })
  }

  return (
    <Content>
      <BackButton onClick={() => reroute.toParent(history, location)} >Back</BackButton>
      <Options>
        <Option onClick={newBlogpost} style={{textAlign: 'center'}} >+</Option>
        {blogposts.map(post => ( <StyledLink key={post.id} to={`/admin/editblog?id=${post.id}`} ><Option private={ +post.status === 0 ? true : false} >{post.title}</Option></StyledLink> ))}
      </Options>
    </Content>
  )
}