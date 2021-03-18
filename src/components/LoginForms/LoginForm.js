import { signIn } from '../../auth'

import Button from './Button'
import Input from './Input'
import Loader from './Loader'
import Message from './Message'

export class LoginForm {

    constructor(props) {
        const {
            setLoggedIn,
        } = props

        this.container = null

        this.setLoggedIn = setLoggedIn

        this.focusedInput = 'email'
        this.email = ''
        this.password = ''

        this.isLoading = false
        this.errorMessage = null
    }

    setIsLoading(newIsLoading) {
        this.isLoading = newIsLoading
        this.render()
    }

    setErrorMessage(newErrorMessage) {
        this.errorMessage = newErrorMessage
        this.render()
    }

    setEmail(newEmail) {
        this.email = newEmail
        this.focusedInput = 'email'
        this.render()
    }

    setPassword(newPassword) {
        this.password = newPassword
        this.focusedInput = 'password'
        this.render()
    }

    onLogInClick() {
        this.setIsLoading(true)
        return signIn(this.email, this.password)
            .then(() => {
                return this.setLoggedIn(true)
            })
            .catch((error) => {
                this.setErrorMessage('Login error ocurred!')
            })
            .finally(() => {
                this.setIsLoading(false)
            })
    }

    render() {
        if (!this.container) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        if (this.isLoading) {
            const elementLoader = new Loader()
            this.container.appendChild(elementLoader.render())
        }

        const emailInputElement = new Input({
            text: this.email,
            onChange: this.setEmail.bind(this),
            placeholder: 'E-mail',
            isFocused: this.focusedInput === 'email'
        })
        const passwordInputElement = new Input({
            text: this.password,
            onChange: this.setPassword.bind(this),
            placeholder: 'Password',
            type: 'password',
            isFocused: this.focusedInput === 'password'
        })

        const buttonElement = new Button('Log in', this.onLogInClick.bind(this))
        
        this.container.appendChild(emailInputElement.render())
        this.container.appendChild(passwordInputElement.render())
        this.container.appendChild(buttonElement.render())
        if(this.errorMessage) {
            const errorMessageElement = new Message(this.errorMessage)
            this.container.appendChild(errorMessageElement.render())
        }

        return this.container
    }

}

export default LoginForm
