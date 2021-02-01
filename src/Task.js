import Button from './Button'

export class Task {

    constructor(task, onComplete, onDelete, onInfoClick) {
        this.task = task
        this.onComplete = onComplete
        this.onDelete = onDelete
        this.onInfoClick = onInfoClick
    }

    render() {

        const container = document.createElement('div')
        const p = document.createElement('p')
        const deleteButton = new Button('Delete', this.onDelete)
        const infoButton = new Button('Info', this.onInfoClick)

        p.innerText = this.task.text

        container.style.display = 'flex'
        container.style.justifyContent = 'space-between'
        container.style.padding = '4px'
        container.style.marginBottom = '4px'
        container.style.borderRadius = '4px'

        container.style.backgroundColor = 'rgba(0, 0, 0, 0.025)'

        if (this.task.isCompleted === true) {
            p.style.textDecoration = 'line-through'
        }
        p.style.margin = '4px'
        p.style.width = '100%'
        p.style.fontFamily = 'sans-serif'
        p.style.fontSize = '14px'

        p.addEventListener(
            'click',
            () => this.onComplete()
        )

        container.appendChild(p)
        container.appendChild(infoButton.render())
        container.appendChild(deleteButton.render())

        return container

    }

}

export default Task
