import React from 'react';

import { Heading, Columns, Form, Tabs, Button} from "react-bulma-components";

export class CreatePostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            forum: '',
            message: '',
            tab: 'text'
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
                            <Form.Textarea placeholder="Message..." onChange={this.onChange} name="message" value={message}></Form.Textarea>
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
                            <Form.Input type="url" placeholder="http://" onChange={this.onChange} name="url" value={url}/>
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
                                <Form.Input type="text" placeholder="Title..." onChange={this.onChange} name="title" value={title}/>
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Forum</Form.Label>
                                <Form.Input type="text" placeholder="Forum..." onChange={this.onChange} name="forum" value={forum}/>
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
                        <Button color="primary">Submit post</Button>
                    </Columns.Column>
                </Columns>
        );
    }
}