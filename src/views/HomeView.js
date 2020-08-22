import React from 'react';

import { Columns, Container } from "react-bulma-components";

import { ForumSideBar } from '../components/ForumSideBar';
import { PostList } from '../components/PostList';
import { CreateSideBar } from '../components/CreateSideBar';

export class HomeView extends React.Component {

    render() {
        let sortMethod = this.props.match.params.sortMethod;
        if (!sortMethod) { sortMethod = 'hot' };

        return (
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <ForumSideBar />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostList key={`sort-${sortMethod}`} sortMethod={sortMethod}/>
                    </Columns.Column>
                    <Columns.Column>
                        <CreateSideBar />
                    </Columns.Column>
                </Columns>
            </Container>
        );
    }
}