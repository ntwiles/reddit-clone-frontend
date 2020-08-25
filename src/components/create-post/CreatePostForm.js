import React from 'react';
import { Heading, Form, Tabs } from "react-bulma-components";

export function CreatePostForm(props) {
    const { title, forum, message, url, missingFields, currentTab, onInputChanged, onClickTab } = props;

    let currentTabEl;

    switch (currentTab) {
        case 'text': {
            currentTabEl = (
                <Form.Field>
                    <Form.Control>
                        <Form.Label>Message</Form.Label>
                        <Form.Textarea 
                            placeholder="Message..." 
                            onChange={onInputChanged} 
                            name="message" 
                            value={message}
                            color={missingFields.includes('message') ? "danger" : null}
                        ></Form.Textarea>
                    </Form.Control>
                </Form.Field>
            );
            break;
        }
        case 'image': {
            currentTabEl = (
                <Form.Field>
                    <Form.Control>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Input 
                            type="url" 
                            placeholder="http://" 
                            onChange={onInputChanged} 
                            name="url" 
                            value={url}
                            color={missingFields.includes('url') ? "danger" : null}/>
                    </Form.Control>
                </Form.Field>
            );
            break;
        }
    }

    return (
        <div>
            <Heading>Create a post</Heading>
            <Form.Field>
                <Form.Control>
                    <Form.Label>Title</Form.Label>
                    <Form.Input 
                        type="text" 
                        placeholder="Title..." 
                        onChange={onInputChanged} 
                        name="title" 
                        value={title}
                        color={missingFields.includes('title') ? 'danger' : null}/>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Control>
                    <Form.Label>Forum</Form.Label>
                    <Form.Input 
                        type="text" 
                        placeholder="Forum..." 
                        onChange={onInputChanged} 
                        name="forum" 
                        value={forum}
                        color={missingFields.includes('forum') ? 'danger' : null}
                        />
                </Form.Control>
            </Form.Field>
            <Form.Label>Content Type</Form.Label>
            <Tabs>
                <Tabs.Tab onClick={() => { onClickTab('text') }} active={currentTab === 'text'}>
                    Text
                </Tabs.Tab>
                <Tabs.Tab onClick={() => { onClickTab('image') }} active={currentTab === 'image'}>
                    Image
                </Tabs.Tab>
            </Tabs>
            {currentTabEl}
        </div>
    );
}