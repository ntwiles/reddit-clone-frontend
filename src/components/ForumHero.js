import React from 'react';

import { Hero, Heading } from "react-bulma-components";

export const ForumHero = (props) => {
    return (
        <Hero color="primary">
            <Hero.Body>
                <Heading>{props.forumName}</Heading>
            </Hero.Body>
        </Hero>
    );
}