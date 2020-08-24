import React from 'react';

import CreatePanel from "./CreatePanel";
import { ForumPanel } from "./ForumPanel";

export class ForumSideBar extends React.Component {
    render() {
        return (
            <section>
                <CreatePanel/>
                <ForumPanel forumName={this.props.forumName}/>
            </section>
        );
    }
}