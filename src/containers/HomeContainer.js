import React from 'react';

import { useParams } from 'react-router-dom';

import { Columns, Container } from "react-bulma-components";

import { LinksSideBar } from '../components/LinksSideBar';
import { PostList } from '../components/PostList';
import { CreateSideBar } from '../components/CreateSideBar';

import { gql, useQuery } from '@apollo/client';

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


export function HomeContainer() {
    let { sortMethod } = useParams();
    if (!sortMethod) { sortMethod = 'hot' };

    const { loading, error, data } = useQuery(POSTS, { variables: { sortMethod } });

    if (data) {
        const posts = data.posts;

        return (
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <LinksSideBar/>
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostList key={`sort-${sortMethod}`} posts={posts}/>
                    </Columns.Column>
                    <Columns.Column>
                        <CreateSideBar />
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }

    return null;
}
