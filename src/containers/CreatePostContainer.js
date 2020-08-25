import React from 'react';
import { Columns } from "react-bulma-components";
import { CreatePostForm } from '../components/create-post/CreatePostForm'
import { CreatePostSubmitButton } from '../components/create-post/CreatePostSubmitButton';

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

        this.onSubmitClicked = this.onSubmitClicked.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onClickTab = this.onClickTab.bind(this);
    }

    onSubmitClicked(createPost) {
        let missingFields = [];

        if (!this.state.title) missingFields.push('title');
        if (!this.state.forum) missingFields.push('forum');

        if (this.state.tab === 'text' && !this.state.message) {
            missingFields.push('message');
        } 
        else if (this.state.tab === 'image' && !this.state.url) {
            missingFields.push('url');
        }

        let newPost = {
            title: this.state.title,
            forum: this.state.forum,
            message: this.state.message,
            url: this.state.url,
            type: this.state.tab
        }
    
        if (missingFields.length < 1)
            createPost({ variables: newPost});
        else {
            this.setState({missingFields: missingFields});
        }
    }

    onInputChanged(evt) {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        const field = evt.target.name;

        if (value && this.state.missingFields.includes(field)) {
            const newMissingFields = this.state.missingFields.filter(f => f !== field);
            this.setState({ missingFields: newMissingFields});
        }

        this.setState({
          [evt.target.name]: value,
        });
    }

    onClickTab(tab) {
        this.setState({ 
            tab: tab
        });
    }

    render() {
        const { message, title, forum, url, missingFields } = this.state;

        return (
                <Columns centered>
                    <Columns.Column size="one-third">
                        <CreatePostForm
                            title={title}
                            forum={forum}
                            message={message}
                            url={url}
                            missingFields={missingFields}
                            onClickTab={this.onClickTab}
                            onInputChanged={this.onInputChanged}
                            currentTab={this.state.tab}
                        />
                        <CreatePostSubmitButton formData={this.state} onClick={this.onSubmitClicked}/>
                    </Columns.Column>
                </Columns>
        );
    }
}