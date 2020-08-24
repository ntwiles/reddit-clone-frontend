import React from 'react';

import { Link } from "react-router-dom";
import { Panel, Menu } from "react-bulma-components";

import './LinksSideBar.scss';

import { useQuery, gql } from '@apollo/client';

const FORUMS = gql`
    query GetForums {
        forums {
            name
        }
    }
`;

function ForumLinks(props) {
    const {currentForum} = props;
    const { loading, error, data } = useQuery(FORUMS, { errorPolicy: 'all'});

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.networkError.message);
        return <p>Error: {error.networkError.message}</p>;
    }

    return data.forums.map(f => <Menu.List.Item to={`/f/${f.name}`} renderAs={Link} active={f.name === currentForum}>{f.name}</Menu.List.Item>);
}

export class LinksSideBar extends React.Component {
    render() {
        return (
            <section>
            <Panel>
                <Panel.Header>My Forums</Panel.Header>
                <Menu>
                    <Menu.List>
                        <ForumLinks currentForum={this.props.currentForum}/>
                    </Menu.List>
                </Menu>
            </Panel>
            <Panel>
                <Panel.Header>Popular Forums</Panel.Header>
                <Menu>
                    <Menu.List>
                        <ForumLinks currentForum={this.props.currentForum}/>
                    </Menu.List>
                </Menu>
            </Panel>
            </section>
        );
    }
}