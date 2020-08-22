import React from 'react';

import { Hero, Heading, Columns, Container } from "react-bulma-components";

import { ForumSideBar } from '../components/ForumSideBar';
import { PostList } from '../components/PostList';
import { CreateSideBar } from '../components/CreateSideBar';

export class ForumView extends React.Component {

    render() {
        let { forumName } = this.props.match.params;

        return (
            <div>
            <Hero color="primary">
                <Hero.Body>
                    <Heading>{forumName}</Heading>
                </Hero.Body>
            </Hero>
            <Container fluid className="mt-1">
                <Columns>
                    <Columns.Column>
                        <ForumSideBar />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostList key={`forum-${forumName}`} forumName={forumName}/>
                    </Columns.Column>
                    <Columns.Column>
                        <CreateSideBar />
                    </Columns.Column>
                </Columns>
            </Container>
            </div>
        );
    }
}