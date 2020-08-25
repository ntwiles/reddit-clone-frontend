import React from 'react';

import { Heading, Form } from "react-bulma-components";

export function CreateForumForm(props) {
    const { formData, onInputChanged, missingFields } = props;

    return (
        <div>
            <Heading>Create a forum</Heading>
            <Form.Field>
                <Form.Control>
                    <Form.Label>Name</Form.Label>
                    <Form.Input 
                        type="text" 
                        placeholder="Name..." 
                        onChange={onInputChanged} 
                        name="name" 
                        value={formData.name}
                        color={missingFields.includes('name') ? 'danger' : null}/>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Control>
                    <Form.Label>Rules</Form.Label>
                    <Form.Textarea
                        placeholder="Rules..."
                        onChange={onInputChanged}
                        name="rules"
                        value={formData.rules}
                        color={missingFields.includes('rules') ? 'danger' : null}
                    ></Form.Textarea>
                </Form.Control>
            </Form.Field>
        </div>
    );
}

