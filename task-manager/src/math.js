const calculateTip = (total, tip) => {
    return total + tip;
}

const FahrenheitToCelcius = (temp) => {
    return (temp - 32) / 1.8;
}
const CelciusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
}

const Add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject("Numbers should be non-negative")
            }
            resolve(a + b)
        }, 2000)
    })

}
module.exports = { calculateTip, FahrenheitToCelcius, CelciusToFahrenheit, Add }