type settingsType = {
    delay: number,
    draw_speed: number
}

let settings: settingsType = {
    delay: 700,
    draw_speed: .08
}

export const setSettings = (newSettings: settingsType) => {
    settings.delay = newSettings.delay
}

export const getSettings = () => settings