import React from 'react';

import { useParams } from 'react-router-dom';

import { Columns, Container } from "react-bulma-components";

import { LinksSideBar } from '../components/LinksSideBar';
import { PostList } from '../components/PostList';
import { CreateSideBar } from '../components/CreateSideBar';

function PostListContainer() {
    let { sortMethod } = useParams();
    if (!sortMethod) { sortMethod = 'hot' };

    return <PostList key={`sort-${sortMethod}`} sortMethod={sortMethod}/>
}

export class HomeView extends React.Component {

    render() {
        return (
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <LinksSideBar />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostListContainer />
                    </Columns.Column>
                    <Columns.Column>
                        <CreateSideBar />
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}