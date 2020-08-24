import React from 'react';

import { Redirect } from "react-router-dom";

import { Heading, Columns, Form, Tabs, Button} from "react-bulma-components";

import { useMutation, gql } from '@apollo/client';

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

function onSubmitClicked(newForum, createForum, parent) {
    let missingFields = [];
    if (!newForum.name) missingFields.push('name');
    if (!newForum.rules) missingFields.push('rules');

    if (missingFields.length < 1)
        createForum({ variables: newForum});
    else {
        parent.setState({missingFields: missingFields});
        console.log(parent.state.missingFields);
    }
}

function SubmitButton(props) {
    const {formData, parent} = props;
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
        name: formData.name,
        rules: formData.rules,
    };

    return ( <Button 
        onClick={() => { onSubmitClicked(newForum, createForum, parent);}} 
        type="submit" 
        color="primary">Create forum</Button>);
}

export class CreateForumView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rules: '',
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
        const { name, rules} = this.state;

        return (
                <Columns centered>
                    <Columns.Column size="one-third">
                    <Heading>Create a forum</Heading>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Name</Form.Label>
                                <Form.Input 
                                    type="text" 
                                    placeholder="Name..." 
                                    onChange={this.onChange} 
                                    name="name" 
                                    value={name}
                                    color={this.state.missingFields.includes('name') ? 'danger' : null}/>
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Rules</Form.Label>
                                <Form.Textarea
                                    placeholder="Rules..."
                                    onChange={this.onChange}
                                    name="rules"
                                    value={rules}
                                    color={this.state.missingFields.includes('rules') ? 'danger' : null}
                                ></Form.Textarea>
                            </Form.Control>
                        </Form.Field>
                        <Form.Label>Content Type</Form.Label>
                        <SubmitButton formData={this.state} parent={this}/>
                    </Columns.Column>
                </Columns>
        );
    }
}