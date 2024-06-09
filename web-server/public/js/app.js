console.log("Client side javascript file has loaded!")
const getPhones = async () => {
    const phones = await fetch("https://api.restful-api.dev/objects");
    const jsonData = await phones.json();
    const onePhone = jsonData[0].name;
    return onePhone;

}
console.log(getPhones())
// const weatherForm = document.querySelector('form');
// weatherForm.addEventListener('submit', () => {
//     console.log(getPhones());
// })