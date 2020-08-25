import React from 'react';

import { CreatePanel } from "./CreatePanel";
import { ForumPanel } from "./ForumPanel";

export function ForumSideBar(props) {
    const { forum } = props;
    return (
        <section>
            <CreatePanel/>
            <ForumPanel forum={forum}/>
        </section>
    );
}