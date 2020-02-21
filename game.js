let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let refreshButton = document.querySelector('#replay-button')

var Worldurl;

function randomized(countryArrays){

    let random = countryArrays[Math.floor(Math.random() * countryArrays.length)]

    let country_names = random['name']
    let country_code = random['alpha-2']
    Worldurl = `https://api.worldbank.org/v2/country/${country_code}?format=json`
    randomCountryElement.innerHTML = country_names
    console.log('from function')
    //return country_names
}

randomized(countriesAndCodes)

submitButton.addEventListener('click',() =>{

    
    var countryNames = randomCountryElement.innerHTML

    // console.log(`from the button ${randomCountryElement.innerHTML}`)

    var letters = /^[A-Za-z]+$/;
    var userAnswer = userAnswerElement.value.trim();
    
    var correctCity;

    // var levenshtein = levenshtein.require('fast-levenshtein');




    if(!userAnswer){
        userAnswerElement.value = ''
        alert('Please enter your input')
        
    } else if (!userAnswer.match(letters)){
 
        userAnswerElement.value = ''
        alert('Please enter letters only!')

    }else{

        fetch(Worldurl)
            .then( res => res.json())
            .then( countryData => {

                countryData[1].forEach( (elements) => {
                    // ! Macao has no capital city 
                    correctCity = elements.capitalCity
                    // console.log(correctCity)
                })
                // var distance = levenshtein.get(userAnswer, correctCity)

                // console.log(`this is the distance ${distance}`)
                if(userAnswer.toLowerCase() === correctCity.toLowerCase()){
                    // alert('this is same')
                    resultTextElement.innerHTML = `Correct! The capital of ${countryNames} is ${correctCity}`

                }else{
                    // alert('this is not same')
                    resultTextElement.innerHTML = `Wrong - the capital of ${countryNames} is not ${userAnswer}, it is ${correctCity}`
                }
                

            })
            .catch( err=> {
                alert(`There is an error. Here is the error message ${err}`)
            })
    }
    

})

// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 

refreshButton.addEventListener('click', () => {
    userAnswerElement.value =' '

    resultTextElement.innerHTML = ''
    // var countryNames = randomized(countriesAndCodes)
    randomized(countriesAndCodes)
    console.log('press the refresh')


} )






// -TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, 
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

// console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

// countriesAndCodes.forEach( (elements)=> {
//     let countryName = elements['name']
// })

// -TODO when the page loads, select an element at random from the countriesAndCodes array
// console.log('here is the random')
//this randomly picked an object 

// -TODO add a click event handler to the submitButton.  When the user clicks the button,
//  read the text from the userAnswerElement 
//  Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  If the API call was successful, extract the capital city from the World Bank API response.
//  Compare it to the user's answer. 
//     You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//       If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"