import React from 'react';
import moment from 'moment';

import { Box, Media, Heading, Image, Content } from "react-bulma-components";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const POSTS = gql`
    query GetPosts($forumName: String) {
        posts(forum: $forumName) {
            title
            timePosted
            message
            numComments
            forum
        }
    }
`;

function PostItems() {

    const { forumName } = useParams();

    const { loading, error, data } = useQuery(POSTS, {
        variables: { forumName }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return data.posts.map(p => (
        <Media>
            <Media.Item position="left">
                <Image src="https://via.placeholder.com/96" alt="post-image" size={96} />
            </Media.Item>
            <Media.Item>
                <Content>
                    <Heading subtitle size={5}><Link to={`/post/${p._id}`}>{p.title}</Link></Heading>
                    <p>Posted {moment(p.timePosted).fromNow()} in {p.forum}</p>
                    <p>{p.numComments} comment(s)</p>
                </Content>
            </Media.Item>
        </Media>
    ));
}

export class PostList extends React.Component {
    render() {
        return (
            <Box>
                <PostItems/>
            </Box>
        );
    }
}