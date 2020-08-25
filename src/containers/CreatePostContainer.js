import React from 'react';

import { Redirect } from "react-router-dom";

import { Heading, Columns, Form, Tabs, Button} from "react-bulma-components";

import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
    mutation CreatePost(
            $title: String!, 
            $forum: String!, 
            $message: String, 
            $url: String,
            $type: String!
        ) {
        createPost(
            title: $title, 
            forum: $forum, 
            message: $message, 
            url: $url, 
            type: $type
        ) {
            id
        }
    }
`;

function onSubmitClicked(newPost, createPost, parent) {
    let missingFields = [];
    if (!newPost.title) missingFields.push('title');
    if (!newPost.forum) missingFields.push('forum');
    if (newPost.type === 'text' && !newPost.message) {
        missingFields.push('message');
    } else if (newPost.type === 'image' && !newPost.url) {
        missingFields.push('url');
    }

    if (missingFields.length < 1)
        createPost({ variables: newPost});
    else {
        parent.setState({missingFields: missingFields});
        console.log(parent.state.missingFields);
    }
}

function SubmitButton(props) {
    const {formData, parent} = props;
    const [createPost, { loading, error, data }] = useMutation(
        CREATE_POST, 
        { onError() {} }
    );

    if (loading) return <p>Loading...</p>;
    if (error) { return <p>Error: {error.message}</p>; }
    if (data) {
        const id = data.createPost.id;
        console.log(id);
        return <Redirect to={`/p/${id}`} />; 
    }

    const newPost = {
        title: formData.title,
        forum: formData.forum,
        message: formData.message,
        url: formData.url,
        type: formData.tab
    };

    return ( <Button 
        onClick={() => { onSubmitClicked(newPost, createPost, parent);}} 
        type="submit" 
        color="primary">Submit post</Button>);
}

export class CreatePostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            forum: '',
            message: '',
            url:'',
            tab: 'text',
            missingFields: []
        }
    }

    onChange = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
    }

    onClickTab = (tab) => {
        this.setState({ 
            tab: tab
        });
    }

    render() {
        const { message, title, forum, url } = this.state;

        let currentTab;

        switch (this.state.tab) {
            case 'text': {
                currentTab = (
                    <Form.Field>
                        <Form.Control>
                            <Form.Label>Message</Form.Label>
                            <Form.Textarea 
                                placeholder="Message..." 
                                onChange={this.onChange} 
                                name="message" 
                                value={message}
                                color={this.state.missingFields.includes('message') ? "danger" : null}
                            ></Form.Textarea>
                        </Form.Control>
                    </Form.Field>
                );
                break;
            }
            case 'image': {
                currentTab = (
                    <Form.Field>
                        <Form.Control>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Input 
                                type="url" 
                                placeholder="http://" 
                                onChange={this.onChange} 
                                name="url" 
                                value={url}
                                color={this.state.missingFields.includes('url') ? "danger" : null}/>
                        </Form.Control>
                    </Form.Field>
                );
                break;
            }
        }

        return (
                <Columns centered>
                    <Columns.Column size="one-third">
                    <Heading>Create a post</Heading>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Title</Form.Label>
                                <Form.Input 
                                    type="text" 
                                    placeholder="Title..." 
                                    onChange={this.onChange} 
                                    name="title" 
                                    value={title}
                                    color={this.state.missingFields.includes('title') ? 'danger' : null}/>
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Forum</Form.Label>
                                <Form.Input 
                                    type="text" 
                                    placeholder="Forum..." 
                                    onChange={this.onChange} 
                                    name="forum" 
                                    value={forum}
                                    color={this.state.missingFields.includes('forum') ? 'danger' : null}
                                    />
                            </Form.Control>
                        </Form.Field>
                        <Form.Label>Content Type</Form.Label>
                        <Tabs>
                            <Tabs.Tab onClick={() => { this.onClickTab('text') }} active={this.state.tab === 'text'}>
                                Text
                            </Tabs.Tab>
                            <Tabs.Tab onClick={() => { this.onClickTab('image') }} active={this.state.tab === 'image'}>
                                Image
                            </Tabs.Tab>
                        </Tabs>
                        {currentTab}
                        <SubmitButton formData={this.state} parent={this}/>
                    </Columns.Column>
                </Columns>
        );
    }
}