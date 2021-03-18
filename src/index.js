import Auth from './auth'

import LoginForms from './components/LoginForms'
import Loader from './components/Loader'

import ToDo from './ToDo'

const makeToDo = (storageKey) => {
    return class ToDoWrapper {
        constructor(props) {
            this.props = props
        }

        render() {
            const todo1 = new ToDo({
                storageKey,
                ...this.props
            })

            return todo1.render()
        }

    }
}

const authElement = new Auth({
    componentNotLoggedIn: LoginForms,
    componentLoggedIn: makeToDo('todo-1'),
    componentLoader: Loader,
})

document.querySelector('.todo-1').appendChild(authElement.render())