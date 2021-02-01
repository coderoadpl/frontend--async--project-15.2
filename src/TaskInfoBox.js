export class TaskInfoBox {

    constructor(text, isCompleted, createdAt, authorEmail) {
        this.text = text
        this.isCompleted = isCompleted
        this.createdAt = createdAt
        this.authorEmail = authorEmail
    }

    render() {

        const div = document.createElement('div')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        const p3 = document.createElement('p')
        const p4 = document.createElement('p')

        div.style.width = '100%'
        div.style.height = '100%'
        div.style.position = 'absolute'
        div.style.left = 0
        div.style.top = 0
        div.style.display = 'flex'
        div.style.flexDirection = 'column'
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'
        div.style.zIndex = 1
        div.style.fontFamily = 'sans-serif'
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.65)' 

        p1.innerText = this.text
        p2.innerText = this.isCompleted
        p3.innerText = this.createdAt
        p4.innerText = this.authorEmail

        p1.style.fontSize = '10px'
        p1.style.margin = '4px'
        p2.style.fontSize = '10px'
        p2.style.margin = '4px'
        p3.style.fontSize = '10px'
        p3.style.margin = '4px'
        p4.style.fontSize = '10px'
        p4.style.margin = '4px'

        div.appendChild(p1)
        div.appendChild(p2)
        div.appendChild(p3)
        div.appendChild(p4)

        return div

    }

}

export default TaskInfoBox
