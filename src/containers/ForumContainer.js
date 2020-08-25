import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Columns, Container } from "react-bulma-components";

import { ForumHero } from '../components/ForumHero';
import { LinksSideBar } from '../components/LinksSideBar';
import { PostList } from '../components/PostList';
import { ForumSideBar } from '../components/ForumSideBar';

import { gql, useQuery } from '@apollo/client';

const FORUM = gql`
    query GetForum($forumName: String!) {
        forum(name: $forumName) {
            name
            rules
        }
    }
`;

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

export function ForumContainer() {
    const { forumName } = useParams();

    const { loading: loadingForum, error: errorForum, data: dataForum } = useQuery(FORUM, { variables: { forumName } });
    const { loading: loadingPosts, error: errorPosts, data: dataPosts } = useQuery(POSTS, { variables: { forumName } });

    if (errorPosts) { console.log(errorPosts); return null;}
    if (errorForum) { console.log(errorForum); return null;}
    
    if (dataForum && dataPosts) {
        const forum = dataForum.forum;
        const posts = dataPosts.posts;

        return (
        <div>
            <ForumHero forumName={forum.name}/>
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <LinksSideBar currentForum={forum.name} />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostList key={`forum-${forum.name}`} posts={posts}/>
                    </Columns.Column>
                    <Columns.Column>
                        <ForumSideBar forum={forum}/>
                    </Columns.Column>
                </Columns>
            </Container>
        </div>
        )
    }

    return null;
}