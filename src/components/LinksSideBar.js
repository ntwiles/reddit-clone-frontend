import React from 'react';
import { Link } from "react-router-dom";
import { Panel, Menu, Content } from "react-bulma-components";
import { useQuery, gql } from '@apollo/client';

const FORUMS = gql`
    query GetForums {
        forums {
            name
        }
    }
`;

export function LinksSideBar(props) {
    const {currentForum} = props;
    const { loading, error, data } = useQuery(FORUMS);

    if (loading) return <Content>Loading...</Content>;
    if (error) return <Content>Error: {error.networkError.message}</Content>

    const forums = data.forums.map(f => (
            <Menu.List.Item 
                to={`/f/${f.name}`} 
                renderAs={Link} 
                active={f.name === currentForum}
            >{f.name}</Menu.List.Item>
        )
    );

    if (data) {
        return (
            <section>
                <Panel>
                    <Panel.Header>My Forums</Panel.Header>
                    <Menu>
                        <Menu.List>
                            {forums}
                        </Menu.List>
                    </Menu>
                </Panel>
                <Panel>
                    <Panel.Header>Popular Forums</Panel.Header>
                    <Menu>
                        <Menu.List>
                            {forums}
                        </Menu.List>
                    </Menu>
                </Panel>
            </section>
        )
    }
}