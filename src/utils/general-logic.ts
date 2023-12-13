type settingsType = {
    delay: number,
    draw_speed: number,
    waitOnUser: boolean
}

let settings: settingsType = {
    delay: 700,
    draw_speed: .08,
    waitOnUser: false
}

export const setSettings = (newSettings: settingsType) => {
    settings.delay = newSettings.delay
    settings.waitOnUser = newSettings.waitOnUser
}

export const waitOnUser = (): Promise<void> => {
    const continueButton = document.querySelector('.continue')!
    return new Promise((resolve, reject) => {
        continueButton.addEventListener('click', () => {
            resolve()
        }, {once: true})
    })
}

export const getSettings = () => settings