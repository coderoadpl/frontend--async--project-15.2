import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Button from './Button'

export class LoginForms {

    constructor(props) {
        const {
            setLoggedIn,
        } = props

        this.container = null

        this.setLoggedIn = setLoggedIn

        this.view = 'login'
    }

    setView(newView) {
        this.view = newView
        this.render()
    }

    toggleView() {
        if (this.view === 'login') {
            this.setView('registration')
        } else {
            this.setView('login')
        }
    }

    render() {
        if (!this.container) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        if (this.view === 'login') {
            const loginFormElement = new LoginForm({
                setLoggedIn: this.setLoggedIn,
            })
            this.container.appendChild(loginFormElement.render())
        }

        if (this.view === 'registration') {
            const registrationFormElement = new RegistrationForm({
                setLoggedIn: this.setLoggedIn,
            })
            this.container.appendChild(registrationFormElement.render())
        }

        const buttonElement = new Button(
            this.view === 'login' ? 'Go to registration' : 'Go to log in',
            this.toggleView.bind(this)
        )

        this.container.appendChild(buttonElement.render())

        return this.container
    }

}

export default LoginForms
