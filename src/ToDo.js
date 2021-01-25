import Task from './Task'
import Form from './Form'
import Loader from './Loader'

import { readAll } from './api/read'
import { makeApiUrl } from './api/makeApiUrl'

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
                console.log(data)
                if(Array.isArray(data) || data === null){
                    this.tasks = data || []
                } else {
                    this.setError(true)
                }
                this.render()
            })
            .finally(() => this.setLoading(false))
    }

    setTasks(newTasks) {
        this.setLoading(true)
        return fetch(
            makeApiUrl(this.storageKey),
            {
                method: 'PUT',
                body: JSON.stringify(newTasks)
            }
        )
            .then((response) => response.json())
            .then((tasksSavedInDb) => {
                this.tasks = tasksSavedInDb
                this.render()
            })
            .finally(() => this.setLoading(false))
    }

    deleteTask(indexToDelete) {
        const newTasks = this.tasks.filter((taskData, index) => {
            return index !== indexToDelete
        })
        this.setTasks(newTasks)
    }

    addTask(text) {
        const newTaskData = {
            text: text,
            isCompleted: false,
        }
        const newTasks = this.tasks.concat(newTaskData)
        this.setTasks(newTasks)
    }

    toggleComplete(indexToComplete) {
        const newTasks = this.tasks.map((taskData, index) => {
            if (index !== indexToComplete) return taskData
            return {
                text: taskData.text,
                isCompleted: !taskData.isCompleted
            }
        })
        this.setTasks(newTasks)
    }

    renderTasks() {
        if (!Array.isArray(this.tasks)) return

        this.tasks.forEach((taskData, index) => {
            const task = new Task(
                taskData,
                () => this.toggleComplete(index),
                () => this.deleteTask(index)
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
