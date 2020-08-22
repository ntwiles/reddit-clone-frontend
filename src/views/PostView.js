import React from 'react';

import { Columns, Container, Heading } from "react-bulma-components";

import { ForumSideBar } from '../components/ForumSideBar';
import { CreateSideBar } from '../components/CreateSideBar';

import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

const POST = gql`
    query GetPost($postId: String!) {
        post(id: $postId) {
            title
            timePosted
            message
            numComments
            forum
        }
    }
`;

function PostDetails() {
    const { postId } = useParams();

    const { loading, error, data } = useQuery(POST, {
        variables: { postId}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Heading size={4}>{data.post.title}</Heading>
            <p>{data.post.message}</p>
        </div>
    );
}

export class PostView extends React.Component {
    render() {
        return (
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <ForumSideBar />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostDetails/>
                    </Columns.Column>
                    <Columns.Column>
                        <CreateSideBar />
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}