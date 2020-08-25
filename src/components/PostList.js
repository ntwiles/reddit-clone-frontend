import React from 'react';
import moment from 'moment';

import { Box, Media, Heading, Image, Content } from "react-bulma-components";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';

export function PostList(props) {
    const { posts } = props;

    const postEls = posts.map(p => 
        (
            <Media>
                <Media.Item position="left">
                    <Image src="https://via.placeholder.com/128" alt="post-image" size={128} />
                </Media.Item>
                <Media.Item>
                    <Content>
                        <Heading subtitle size={5}><Link to={`/p/${p.id}`}>{p.title}</Link></Heading>
                        <p>Posted {moment(p.timePosted).fromNow()} in {p.forum}</p>
                        <p>{p.numComments} comment(s)</p>
                    </Content>
                </Media.Item>
            </Media> 
        )
    );

    return (
        <Box>
            {postEls}
        </Box>
    );
}