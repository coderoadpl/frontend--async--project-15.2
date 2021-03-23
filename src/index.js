import Auth from './auth'

import LoginForms from './components/LoginForms'
import Loader from './components/Loader'

import ToDo from './ToDo'

const toDo1 = new Auth({
    componentNotLoggedIn: LoginForms,
    componentLoggedIn: ToDo,
    componentLoader: Loader,
})

document.querySelector('.todo-1').appendChild(toDo1.render())
