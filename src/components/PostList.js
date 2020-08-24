import React from 'react';
import moment from 'moment';

import { Box, Media, Heading, Image, Content } from "react-bulma-components";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const POSTS = gql`
    query GetPosts($forumName: String, $sortMethod: String) {
        posts(forum: $forumName sortMethod: $sortMethod) {
            id
            title
            timePosted
            message
            numComments
            forum
        }
    }
`;

function PostItems(props) {
    const { forumName } = useParams();
    const sortMethod = props.sortMethod;

    const { loading, error, data } = useQuery(POSTS, {
        variables: { forumName, sortMethod }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return data.posts.map(p => (
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
    ));
}

export class PostList extends React.Component {
    render() {
        return (
            <Box>
                <PostItems sortMethod={this.props.sortMethod}/>
            </Box>
        );
    }
}