const { Add, calculateTip, CelciusToFahrenheit, FahrenheitToCelcius } = require('../src/math.js');

test("Should calculate tip with the total bill", () => {
    const totalBill = calculateTip(500, 200)
    // if (totalBill != 700) { throw new Error("Total tip should be 700 got " + totalBill) }
    expect(totalBill).toBe(700)
})

test("Should convert 0 deg celcius to 32 deg fahrenheit", () => {
    const conversion = CelciusToFahrenheit(0);
    expect(conversion).toBe(32)
})

test("Should convert 32 deg fahrenheit to 0 deg celcius", () => {
    const conversion = FahrenheitToCelcius(32);
    expect(conversion).toBe(0)
})

test("Async test", (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
    }, 2000)
    done();
})

test("Should add two numbers", (done) => {
    Add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    })

})

test("Should add two numbers async/await", async () => {

    const sum = await Add(10, 20)
    expect(sum).toBe(30);
})

