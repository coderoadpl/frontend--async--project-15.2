import { signUp } from '../../auth'

import Button from './Button'
import Input from './Input'
import Loader from './Loader'
import Message from './Message'

export class RegistrationForm {

    constructor(props) {
        const {
            setLoggedIn,
        } = props

        this.container = null

        this.setLoggedIn = setLoggedIn

        this.focusedInput = 'email'
        this.email = ''
        this.password = ''
        this.retypePassword = ''

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
    
    setRetypePassword(newRetypePassword) {
        this.retypePassword = newRetypePassword
        this.focusedInput = 'retype-password'
        this.render()
    }

    onRegisterClick() {
        if(this.password !== this.retypePassword) {
            this.setErrorMessage('Passwords did not match!')
            return Promise.reject('Passwords did not match!')
        }

        this.setIsLoading(true)
        return signUp(this.email, this.password)
            .then(() => {
                return this.setLoggedIn(true)
            })
            .catch((error) => {
                if(error.data.error.message === 'EMAIL_EXISTS'){
                    this.setErrorMessage('This account seems to be already registered!')
                } else if (error.data.error.message === 'WEAK_PASSWORD : Password should be at least 6 characters') {
                    this.setErrorMessage('Password should be at least 6 characters!')
                } else if (error.data.error.message === 'INVALID_EMAIL') {
                    this.setErrorMessage('Please type valid email!')
                } else {
                    this.setErrorMessage('Registration error ocurred!')
                }
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
        const retypePasswordInputElement = new Input({
            text: this.retypePassword,
            onChange: this.setRetypePassword.bind(this),
            placeholder: 'Retype password',
            type: 'password',
            isFocused: this.focusedInput === 'retype-password'
        })

        const buttonElement = new Button('Register account', this.onRegisterClick.bind(this))
        
        this.container.appendChild(emailInputElement.render())
        this.container.appendChild(passwordInputElement.render())
        this.container.appendChild(retypePasswordInputElement.render())
        this.container.appendChild(buttonElement.render())
        if(this.errorMessage) {
            const errorMessageElement = new Message(this.errorMessage)
            this.container.appendChild(errorMessageElement.render())
        }

        return this.container
    }

}

export default RegistrationForm
