import React from 'react';
import { Redirect } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
import { Button, Form } from "react-bulma-components";

const CREATE_POST = gql`
    mutation CreatePost(
            $title: String!, 
            $forum: String!, 
            $message: String, 
            $url: String,
            $tab: String!
        ) {
        createPost(
            title: $title, 
            forum: $forum, 
            message: $message, 
            url: $url, 
            type: $tab
        ) {
            id
        }
    }
`;

export function CreatePostSubmitButton(props) {
    const { formData, onClick } = props;
    const { title, forum, message, url, tab } = formData;

    console.log(formData);

    const [createPost, { loading, error, data }] = useMutation(
        CREATE_POST, 
        { onError() {} }
    );

    if (loading) return <p>Loading...</p>;
    if (error) { return <p>Error: {error.message}</p>; }
    if (data) {
        const id = data.createPost.id;
        return <Redirect to={`/p/${id}`} />; 
    }

    return (
        <Form.Field>
            <Button 
                onClick={() => { onClick(createPost);}} 
                type="submit" 
                color="primary">Submit post</Button>
        </Form.Field> );
}