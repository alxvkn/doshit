function getTasks() {
    const tasks = []

    for (let i = 0; i < 20; i++) {
        tasks.push({ id: i, content: `task ${i}` })
    }

    return tasks
}

const appRoot = document.getElementById('app')

let openTaskId

function openTask(task, previousNode) {
    openTaskId = task.id

    const div = document.createElement('div')

    div.style.height = '100dvh'
    div.style.display = 'flex'
    div.style.alignItems = 'center'

    const h1 = document.createElement('h1')

    previousNode.style.viewTransitionName = 'task-hero'
    h1.style.viewTransitionName = 'task-hero'

    h1.innerText = task.content

    h1.addEventListener('click', () => {
        renderTasksList(task.id)
    })

    div.appendChild(h1)

    document.startViewTransition(() => {
        appRoot.replaceChildren(div)
    })
}

function renderTasksList(heroTaskId) {
    const div = document.createElement('div')

    div.style.height = '100%'
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'

    const taskList = document.createElement('ul')

    let heroSpan

    taskList.append(...getTasks().map(task => {
        const liElement = document.createElement('li')
        const span = document.createElement('span')

        liElement.appendChild(span)

        liElement.className = 'task-item'
        liElement.addEventListener('click', () => openTask(task, span))

        span.innerText = task.content

        if (task.id == heroTaskId) {
            heroSpan = span
        }

        return liElement
    }))

    div.appendChild(taskList)

    // first render
    if (!heroSpan) {
        appRoot.replaceChildren(div)
        return
    }

    heroSpan.style.viewTransitionName = 'task-hero'

    const transition = document.startViewTransition(() => appRoot.replaceChildren(div))
    transition.finished.finally(() => {
        heroSpan.style.viewTransitionName = ''
    })
}

renderTasksList()

document.addEventListener('keydown', (e) => {
    if (e.code != 'Escape') return

    renderTasksList(openTaskId)

    openTaskId = undefined
})

const notice = document.createElement('span')
notice.onclick = () => {
    alert(`${document.URL}`)
}

notice.style.position = 'fixed'
notice.style.bottom = 0
notice.style.right = 0

notice.style.fontSize = '.5rem'

notice.innerText = 'secure context'

if (!window.isSecureContext) {
    const negation = document.createElement('b')

    negation.innerText = 'not'
    negation.style.fontWeight = 'bold'
    negation.style.color = 'red'

    notice.insertAdjacentText('afterbegin', ' a ')
    notice.insertAdjacentElement('afterbegin', negation)
}

document.body.appendChild(notice)
