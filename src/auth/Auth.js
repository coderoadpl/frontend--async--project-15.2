import { checkIfUserIsLoggedIn } from './checkIfUserIsLoggedIn'

export class Auth {

    constructor(props) {
        const {
            componentNotLoggedIn: ComponentNotLoggedIn,
            componentLoggedIn: ComponentLoggedIn,
            componentLoader: ComponentLoader,
        } = props

        this.ComponentNotLoggedIn = ComponentNotLoggedIn
        this.ComponentLoggedIn = ComponentLoggedIn
        this.ComponentLoader = ComponentLoader

        this.container = null
        this.isLoggedIn = false
        this.isLoading = true

        this.init()
    }

    init() {
        this.checkIfUserIsLoggedInThenChangeLoggedInState()
    }

    setLoggedIn(newLoggedIn) {
        this.isLoggedIn = newLoggedIn
        this.render()
    }

    setIsLoading(newLoading) {
        this.isLoading = newLoading
        this.render()
    }

    checkIfUserIsLoggedInThenChangeLoggedInState() {
        return checkIfUserIsLoggedIn()
            .then((isLoggedIn) => {
                this.setLoggedIn(isLoggedIn)
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
            const elementLoader = new this.ComponentLoader()
            this.container.appendChild(elementLoader.render())
        }

        const checkIfUserIsLoggedInThenChangeLoggedInState = this.checkIfUserIsLoggedInThenChangeLoggedInState.bind(this)
        const setLoggedIn = this.setLoggedIn.bind(this)
        const setIsLoading = this.setIsLoading.bind(this)
        const componentProps = {
            checkIfUserIsLoggedInThenChangeLoggedInState,
            setLoggedIn,
            setIsLoading
        }

        if (!this.isLoggedIn) {
            const elementNotLoggedIn = new this.ComponentNotLoggedIn(componentProps)
            this.container.appendChild(elementNotLoggedIn.render())
            return this.container
        }

        const elementLoggedIn = new this.ComponentLoggedIn(componentProps)
        this.container.appendChild(elementLoggedIn.render())
        return this.container
    }

}

export default Auth
