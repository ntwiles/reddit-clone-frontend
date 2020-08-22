import React from 'react';

import { Panel, Button, Container } from "react-bulma-components";

export class CreateSideBar extends React.Component {

    render() {
        return (
            <Panel>
                <Panel.Header>Create Something</Panel.Header>
                <Container fluid className="pt-1 pb-1">
                    <Button fullwidth={true} color="info">Create a link post</Button>
                    <Button fullwidth={true} color="info" className="mt-1">Create a text post</Button>
                    <Button fullwidth={true} className="mt-1">Create a forum</Button>
                </Container>
            </Panel>
        );
    }
}