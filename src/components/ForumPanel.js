import React from 'react';

import { Panel, Content, Container } from "react-bulma-components";

export class ForumPanel extends React.Component {
    render() {
        return (
            <Panel>
                <Panel.Header>Forum Info</Panel.Header>
                <Container fluid className="pt-1 pb-1">
                    <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Content>
                </Container>
            </Panel>
        );
    }
}