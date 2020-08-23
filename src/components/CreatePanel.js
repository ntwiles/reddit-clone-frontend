import React from 'react';

import { Link } from "react-router-dom";
import { Panel, Container, Button } from "react-bulma-components";

export default class CreatePanel extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Header>Create Something</Panel.Header>
                <Container fluid className="pt-1 pb-1">
                    <Button fullWidth={true} to="/create-post"  color="success" renderAs={Link}>Create a post</Button>
                    <Button fullwidth={true} className="mt-1">Create a forum</Button>
                </Container>
            </Panel>
        );
    }
}