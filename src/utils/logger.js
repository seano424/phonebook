export const info = (...params) => {
    console.log(...params)
}

export const error = (...params) => {
    console.error(...params)
}

const exports = { info, error }

export default exports
