import React from 'react';

import { Panel, Content, Container } from "react-bulma-components";

export function ForumPanel(props) {
    const { forum } = props;

    return (
        <Panel>
            <Panel.Header>Forum Info</Panel.Header>
            <Container fluid className="pt-1 pb-1">
                <Content>{forum.rules}</Content>
            </Container>
        </Panel>
    );
}