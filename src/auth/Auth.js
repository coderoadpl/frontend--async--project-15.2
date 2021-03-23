import { checkIfUserIsLoggedIn } from './checkIfUserIsLoggedIn'
import { getUserData } from './getUserData'

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
        this.userData = null

        this.init()
    }

    init() {
        this.checkIfUserIsLoggedInThenChangeLoggedInState()
    }

    fetchUserData() {
        this.setIsLoading(true)
        return getUserData()
            .then((data) => this.setUserData(data))
            .catch(() => this.setUserData(null))
            .finally(() => this.setIsLoading(false))
    }

    setUserData(newUserData) {
        console.log(newUserData)
        this.userData = newUserData
        this.render()
    }

    setLoggedIn(newLoggedIn) {
        this.isLoggedIn = newLoggedIn
        return this.fetchUserData()
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
    }

    render() {
        if (!this.container) {
            this.container = document.createElement('div')
        }

        this.container.innerHTML = ''

        if (this.isLoading) {
            const elementLoader = new this.ComponentLoader()
            this.container.appendChild(elementLoader.render())
            return this.container
        }

        const checkIfUserIsLoggedInThenChangeLoggedInState = this.checkIfUserIsLoggedInThenChangeLoggedInState.bind(this)
        const setLoggedIn = this.setLoggedIn.bind(this)
        const setIsLoading = this.setIsLoading.bind(this)
        const userData = this.userData
        const componentProps = {
            checkIfUserIsLoggedInThenChangeLoggedInState,
            setLoggedIn,
            setIsLoading,
            userData
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
