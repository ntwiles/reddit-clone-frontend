import React from 'react';

import { Link } from "react-router-dom";
import { Panel, Menu } from "react-bulma-components";

import './ForumSideBar.scss';

import { useQuery, gql } from '@apollo/client';

const FORUMS = gql`
    query GetForums {
        forums {
            name
        }
    }
`;

function ForumLinks() {
    const { loading, error, data } = useQuery(FORUMS, { errorPolicy: 'all'});

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.networkError.message);
        return <p>Error: {error.networkError.message}</p>;
    }

    return data.forums.map(f => <Link to={`/f/${f.name}`}><Menu.List.Item>{f.name}</Menu.List.Item></Link>);
}

export class ForumSideBar extends React.Component {
    render() {
        return (
            <section>
            <Panel>
                <Panel.Header>My Forums</Panel.Header>
                <Menu>
                    <Menu.List>
                        <ForumLinks/>
                    </Menu.List>
                </Menu>
            </Panel>
            <Panel>
                <Panel.Header>Popular Forums</Panel.Header>
                <Menu>
                    <Menu.List>
                        <ForumLinks/>
                    </Menu.List>
                </Menu>
            </Panel>
            </section>
        );
    }
}