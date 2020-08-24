import React from 'react';

import { Panel, Content, Container } from "react-bulma-components";

import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const FORUM = gql`
    query GetForum($forumName: String!) {
        forum(name: $forumName) {
            name
            rules
        }
    }
`;

function ForumRules(props) {
    const { forumName } = props;

    const { loading, error, data } = useQuery(FORUM,{
        variables: { forumName }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Content>{data.forum.rules}</Content>
    );
}

export class ForumPanel extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Header>Forum Info</Panel.Header>
                <Container fluid className="pt-1 pb-1">
                    <ForumRules forumName={this.props.forumName}/>
                </Container>
            </Panel>
        );
    }
}