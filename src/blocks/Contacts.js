import React, { Component } from 'react';
import '../css/Contacts.css';

var environment = 'https://stage.skipio.com';

/*
 	As a user, I can view my contact list
	As a user, I can select a contact & send them an SMS message
*/

class Contacts extends Component {

	constructor(props) {
		super(props)
		this.state = {
			contacts: []
		};
	}

	componentDidMount() {

		//get Contacts
		var apiToken = this.props.apiToken
		if (apiToken) {
			var api = environment + `/api/v2/contacts?token=${apiToken}&page=0&per=100`
			fetch(api, { method: 'GET' }).then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Getting contact list: ' + response.statusText)
			}).then((json) => {
				this.setState({ contacts: json.data });
			}).catch((error) => {
				alert(error)
			})
		}

	}


	selectContact(contactId) {
		this.setState({ contactId: contactId });
	}


	cancelSMS(event) {
		this.setState({ contactId: undefined })
	}


	sendSMS(contactId, event) {

		var form = event.currentTarget.form

		console.log('event', form, form.message)

		var body = {
			recipients: [
				'contact-' + contactId
			],
			message: {
				'body': form.message.value
			}
		}

		var headers = new Headers();
		headers.append('Content-Type', 'application/json')
		var init = { method: 'POST',
			headers: headers,
			body: JSON.stringify(body)
		};

		var apiToken = this.props.apiToken
		var api = environment + `/api/v2/messages?token=${apiToken}`

		fetch(api, init).then((response) => {
			if (response.ok) {
				alert('Message sent successfully')
				return response
			}
			throw new Error('Sending SMS: ' + response.statusText)
		}).catch((error) => {
			alert(error)
		})

		this.setState({ contactId: undefined })
	}


	render() {
		return (
			<div className="Contacts">
				<h2>Contacts</h2>
				<ul>
				{
					this.state.contacts.map((contact) => {
						return <li key={contact.id} className={this.state.contactId === contact.id ? 'active' : ''}>
							<a onClick={this.selectContact.bind(this, contact.id)}>
								<img src={contact.avatar_url} alt={contact.full_name} />
								{contact.full_name}
							</a>
							{
								this.state.contactId === contact.id
								? <form>
									<header>Send SMS</header>
									<div>
										<textarea name="message"></textarea>
									</div>
									<footer>
										<button type="button" onClick={this.cancelSMS.bind(this)}>cancel</button>
										<button type="button" onClick={this.sendSMS.bind(this, contact.id)}>Send</button>
									</footer>
								</form>
								: false
							}
						</li>
					})
				}
				</ul>
			</div>
		);
	}
}

export default Contacts;
