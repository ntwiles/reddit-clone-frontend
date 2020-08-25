import React from 'react';
import { Redirect } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
import { Button, Form } from "react-bulma-components";

const CREATE_FORUM = gql`
    mutation CreateForum(
            $name: String!, 
            $rules: String!, 
        ) {
        createForum(
            name: $name, 
            rules: $rules, 
        ) {
            name
        }
    }
`;

export function CreateForumSubmitButton(props) {
    const {name, rules, parent, onClick} = props;

    const [createForum, { loading, error, data }] = useMutation(
        CREATE_FORUM, 
        { onError() {} }
    );

    if (loading) return <p>Loading...</p>;
    if (error) { return <p>Error: {error.message}</p>; }
    if (data) {
        const name = data.createForum.name;
        return <Redirect to={`/f/${name}`} />; 
    }

    const newForum = {
        name: name,
        rules: rules,
    };

    return (
        <Form.Field>
            <Button 
            onClick={() => { onClick(createForum);}} 
            type="submit" 
            color="primary">Create forum</Button>
        </Form.Field> 
    );
}