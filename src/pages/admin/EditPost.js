import React, { useState, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import BaloonEditor from '@ckeditor/ckeditor5-build-balloon-block';
import queryString from 'query-string';
import DatePicker from "react-datepicker";
import Resizer from 'react-image-file-resizer';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import "react-datepicker/dist/react-datepicker.css";

// components
import blogService from '../../_services/blogAdmin.service';
import Format from '../../_helpers/format';
import reroute from '../../_helpers/reroute';
import { BlogpostCard, Meta, MetaKey, MetaValue, TitleEdit, DescriptionEdit, DescMetaSection, Section, MainSection, FrontImage, BackButton } from '../../components/blog.style';

export default function EditPost({ location, history }) {

  const [blogpost, setBlogpost] = useState();

  console.log(blogpost?.content);

  useEffect(() => {
    var url = location.search;
    var params = queryString.parse(url);
    var id = params['id'];
    if (id === undefined) {
      history.push('/admin');
    } else {
      blogService.getBlogpost(id)
        .then(data => setBlogpost(data))
    }
  }, [location, history]);

  const handleSelectedFile = (e, where) => {
    e.preventDefault();

    // default values for image upload
    var maxWidth = 1000;
    var maxHeight = 1000;
    var minWidth = 0;
    var minHeight = 0;
    var quality = 80;

    if (where === 'card') {
      maxWidth = 350;
      maxHeight = 300;
      minWidth = 350;
      minHeight = 300;
    } else if (where === 'banner') {
      maxWidth = 1920;
      maxHeight = 1000;
      quality = 60;
    }

    Resizer.imageFileResizer(
      e.target.files[0],
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      'JPEG',
      quality,
      0,
      uri => {
        console.log(uri);
        if (where === 'card') {
          updateField({ cardImage: uri });
        } else if (where === 'banner') {
          updateField({ bannerImage: uri });
        }
      },
      'base64'
    );
  }

  const updateField = data => {
    setBlogpost({ ...blogpost, ...data });
  }

  const handleBlogpostDelete = () => {
    if (window.confirm('Are you shure you want to delete?')) {
      blogService.deleteBlog(blogpost.id)
        .then(val => {
          if (val.success) {
            history.push('/admin');
          }
        })
        .catch((ex) => {
          console.log('parsing failed', ex);
        })
    }
  }

  const wordCountColor = (str) => {
    const wordLength = (str || '').split(' ').length;
    if (wordLength > 100) {
      return '#F44336'
    } else if (wordLength > 50) {
      return '#FFC107'
    }
    return '#38f20f'
  }

  if (typeof blogpost !== 'undefined') {
    return (
      <>
        <BackButton onClick={() => reroute.to(history, '/admin/blogs')} >Back</BackButton>
        <Section>
          <TitleEdit rows="1" wrap="soft" placeholder="Insert title" value={blogpost.title || ''} onChange={(e) => updateField({ title: e.target.value })} />
          <input type="file" accept="image/x-png,image/gif,image/jpeg" name="" onChange={e => handleSelectedFile(e, 'banner')} />
        </Section>
        <FrontImage src={blogpost.bannerImage} />
        <DescMetaSection>
          <DescriptionEdit placeholder="Insert description" value={blogpost.description || ''} onChange={(e) => updateField({ description: e.target.value })} wrap="soft" />
          <Meta>
            <MetaKey>Published:</MetaKey><MetaValue>{Format.date(blogpost.date)}</MetaValue><DatePicker selected={blogpost.date} onChange={val => updateField({ date: Date.parse(val) })} /><br />
            <MetaKey>Author:</MetaKey><MetaValue><input type="text" value={blogpost.author || ''} onChange={(e) => updateField({ author: e.target.value })} /></MetaValue>
          </Meta>
          <span style={{color: wordCountColor(blogpost.description) }} >Introduction word count: { (blogpost.description || '').split(' ').length }</span>
        </DescMetaSection>
        <MainSection>
          <CKEditor
            editor={BaloonEditor}
            data={blogpost.content}
            config={{ placeholder: 'Insert blog post her..' }}
            onChange={(_, editor) => updateField({ content: editor.getData() })}
          />
        </MainSection>
        <Section style={{ marginTop: '100px' }}>
          <h1>Blogpost card</h1>
          <input type="file" accept="image/x-png,image/gif,image/jpeg" name="" onChange={e => handleSelectedFile(e, 'card')} />
          <BlogpostCard image={blogpost.cardImage} title={blogpost.title} author={blogpost.author} description={blogpost.description} date={blogpost.date} style={{ marginTop: '60px' }} />
        </Section>
        <Section>
          <Toggle defaultChecked={+blogpost.status === 1 ? true : false} onChange={e => updateField({ status: e.target.checked ? 1 : 0 })} />
          <span>Public</span><br />
          <input type="button" value="Update blogpost" onClick={() => blogService.updateBlog(blogpost)} />
          <input type="button" value="Delete blogpost" style={{ backgroundColor: 'red' }} onClick={handleBlogpostDelete} />
        </Section>
      </>
    )
  }
  return null;
}