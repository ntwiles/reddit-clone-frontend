import React from 'react';

import { Hero, Heading, Columns, Container } from "react-bulma-components";

import { LinksSideBar } from '../components/LinksSideBar';
import { PostList } from '../components/PostList';
import { ForumSideBar } from '../components/ForumSideBar';

export class ForumContainer extends React.Component {

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
                        <LinksSideBar currentForum={forumName} />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <PostList key={`forum-${forumName}`} forumName={forumName}/>
                    </Columns.Column>
                    <Columns.Column>
                        <ForumSideBar forumName={forumName}/>
                    </Columns.Column>
                </Columns>
            </Container>
            </div>
        );
    }
}