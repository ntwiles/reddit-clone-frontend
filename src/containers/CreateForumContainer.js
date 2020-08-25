import React from 'react';

import { Columns} from "react-bulma-components";

import { CreateForumForm } from '../components/create-forum/CreateForumForm';
import { CreateForumSubmitButton } from '../components/create-forum/CreateForumSubmitButton';

export class CreateForumContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rules: '',
            missingFields: []
        }

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onSubmitClicked = this.onSubmitClicked.bind(this);
    }

    onSubmitClicked(createForum) {
        let missingFields = [];
    
        if (!this.state.name) missingFields.push('name');
        if (!this.state.rules) missingFields.push('rules');

        const newForum = {
            name: this.state.name,
            rules: this.state.rules
        }
    
        if (missingFields.length < 1)
            createForum({ variables: newForum });
        else {
            this.setState({ missingFields: missingFields });
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
            [field]: value,
        });
    }

    render() {
        return (
            <Columns centered>
                <Columns.Column size="one-third">
                    <CreateForumForm formData={this.state} onInputChanged={this.onInputChanged} missingFields={this.state.missingFields}/>
                    <CreateForumSubmitButton formData={this.state} onClick={this.onSubmitClicked}/>
                </Columns.Column>
            </Columns>
        );
    }
}