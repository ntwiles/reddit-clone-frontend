import React from 'react';

import { Heading, Columns, Form, Tabs} from "react-bulma-components";

export class CreatePostView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            forum: '',
            message: '',
            tab: 'Text'
        }
    }

    onChange = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
    }

    onClickTab = (evt) => {
        this.setState({ 
            tab: evt.target.text
        });
    }

    render() {
        const { title, forum, message } = this.state;
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
                        <Tabs>
                            <Tabs.Tab onClick={this.onClickTab} active={this.state.tab === 'Text'}>
                                Text
                            </Tabs.Tab>
                            <Tabs.Tab onClick={this.onClickTab} active={this.state.tab === 'Image/Video'}>
                                Image/Video
                            </Tabs.Tab>
                        </Tabs>
                        <Form.Field>
                            <Form.Control>
                                <Form.Label>Message</Form.Label>
                                <Form.Textarea placeholder="Message..." onChange={this.onChange} name="message" value={message}></Form.Textarea>
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                </Columns>
        );
    }
}