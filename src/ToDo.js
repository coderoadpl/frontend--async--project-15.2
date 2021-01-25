import Task from './Task'
import Form from './Form'
import Loader from './Loader'

import { readAll, create, update, remove } from './api'

export class ToDo {

    constructor(storageKey) {
        this.storageKey = storageKey || 'todo'
        this.container = null

        this.tasks = []

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

    renderTasks() {
        if (!Array.isArray(this.tasks)) return

        this.tasks.forEach((taskData) => {
            const task = new Task(
                taskData,
                () => this.toggleComplete(taskData),
                () => this.deleteTask(taskData)
            )
            this.container.appendChild(task.render())
        })
    }

    render() {

        if (this.container === null) {
            this.container = document.createElement('div')
            this.container.style.position = 'relative'
        }

        this.container.innerHTML = ''

        if (this.hasError) {
            const errorMessage = new Loader('Error ocurred!')
            this.container.appendChild(errorMessage.render())
        }

        if (this.isLoading) {
            const loader = new Loader()
            this.container.appendChild(loader.render())
        }

        const form = new Form('', (value) => this.addTask(value))

        this.container.appendChild(form.render())

        this.renderTasks()

        return this.container

    }

}

export default ToDo
