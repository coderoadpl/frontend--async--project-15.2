import Button from './components/LoginForms/Button'
import Task from './components/Task'
import Form from './components/Form'
import Loader from './components/Loader'
import TaskInfoBox from './components/TaskInfoBox'

import { logOut } from './auth'

import { readOne, readAll, create, update, remove } from './api'

export class ToDo {

    constructor(props) {
        const {
            storageKey,
            checkIfUserIsLoggedInThenChangeLoggedInState,
            setLoggedIn,
            setIsLoading,
            userData,
        } = props

        this.checkIfUserIsLoggedInThenChangeLoggedInState = checkIfUserIsLoggedInThenChangeLoggedInState
        this.setLoggedIn = setLoggedIn
        this.setIsLoading = setIsLoading
        this.storageKey = (userData && userData.localId) || 'todo'
        this.userData = userData
        this.container = null

        this.tasks = []
        this.task = null

        this.isLoading = true
        this.hasError = false

        this.loadTasks()
    }

    setLoading(newLoading) {
        this.isLoading = newLoading
        this.render()
    }

    setError(newError) {
        this.hasError = newError
        this.render()
    }

    loadTasks() {
        this.setLoading(true)
        this.setError(false)
        return readAll(this.storageKey)
            .then((data) => {
                if (Array.isArray(data) || data === null) {
                    this.tasks = data || []
                } else {
                    this.setError(true)
                }
                this.render()
            })
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    loadTask(taskData) {
        const taskKey = taskData.key

        this.setLoading(true)
        this.setError(false)

        return readOne(this.storageKey, taskKey)
            .then((data) => {
                if (data) {
                    this.task = data
                } else {
                    this.setError(true)
                }
                this.render()
            })
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    deleteTask(taskData) {
        const taskKey = taskData.key

        this.setLoading(true)
        this.setError(false)

        return remove(this.storageKey, taskKey)
            .then(() => this.loadTasks())
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    addTask(text) {
        const newTaskData = {
            text: text,
            isCompleted: false,
            createdAt: (new Date()).toISOString(),
            authorEmail: this.userData && this.userData.email
        }

        this.setLoading(true)
        this.setError(false)

        return create(this.storageKey, newTaskData)
            .then(() => this.loadTasks())
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    toggleComplete(taskData) {
        const dataToUpdate = { isCompleted: !taskData.isCompleted }
        const taskKey = taskData.key

        this.setLoading(true)
        this.setError(false)

        return update(this.storageKey, taskKey, dataToUpdate)
            .then(() => this.loadTasks())
            .catch(() => this.setError(true))
            .finally(() => this.setLoading(false))
    }

    closeTaskInfoBox() {
        this.task = null
        this.render()
    }

    renderTasks() {
        if (!Array.isArray(this.tasks)) return

        this.tasks.forEach((taskData) => {
            const task = new Task(
                taskData,
                () => this.toggleComplete(taskData),
                () => this.deleteTask(taskData),
                () => this.loadTask(taskData),
            )
            this.container.appendChild(task.render())
        })
    }

    render() {

        if (this.container === null) {
            this.container = document.createElement('div')
            this.container.style.position = 'relative'
            this.container.style.minHeight = '120px'
        }

        this.container.innerHTML = ''

        const buttonElement = new Button('Log out', () => {
            logOut().then(() => this.setLoggedIn(false))
        })
        this.container.appendChild(buttonElement.render())

        if (this.hasError) {
            const errorMessage = new Loader('Error ocurred!')
            this.container.appendChild(errorMessage.render())
        }

        if (this.isLoading) {
            const loader = new Loader()
            this.container.appendChild(loader.render())
        }

        if (this.task !== null) {
            const taskInfoBox = new TaskInfoBox(
                this.task.text,
                this.task.isCompleted,
                this.task.createdAt,
                this.task.authorEmail,
                () => this.closeTaskInfoBox()
            )
            this.container.appendChild(taskInfoBox.render())
        }

        const form = new Form('', (value) => this.addTask(value))

        this.container.appendChild(form.render())

        this.renderTasks()

        return this.container

    }

}

export default ToDo
