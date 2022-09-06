import React from 'react'
import * as DOMPurify from 'dompurify';
import {Button, Card,CardBody, CardImg,CardText} from 'reactstrap'
function PostCard({post={title:"this is default post title", description:"this is default description",image:"default image"}}) {
  
  return (
    
    <Card className='border-0 shadow-xl mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            {/* <CardImg
                            className=""
                            src={post?.image}
                            alt=""
                          /> */}
            <CardText dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.description)}}>
                {/* {post.description.substring(0,60)}... */}
            </CardText>
            <div>
                <Button>Read More...</Button>
            </div>
        </CardBody>
    </Card>
  )
}

export default PostCard