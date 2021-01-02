/*
WARNING!!!!!
This file checks your work. If you make changes to this file, then the tests might not work.
*/

/*
TEMPLATE GUIDE
Remove this comment after you've made changes to a new exercise.

A recommended pattern is to create functions for each requirement.  
*/

/**
 * Writes a result message to the DOM
 * @param {number} questionIndex - DOM index for this question
 * @param {string} result - message to be written
 * @param {boolean} success - whether the test passed
 */
const writeResult = (questionIndex, result, success) => {
    const resultElement = document.querySelectorAll('.problem-container > .question')[questionIndex].querySelector('.result');
    const textNode = document.createTextNode(result);
    resultElement.appendChild(textNode);

    resultElement.classList.toggle('pass', success);
}

/**
 * Main function. Runs validation on all provided questions.
 * @param {Object[]} questions - Array of questions
 */
const runValidation = (questions) => {
    questions.forEach((question, index) => {
        question.validate();

        writeResult(index, question.message, question.passed);
    });
}

/**
 * Creates a question object.
 * @param {function} validator - function that returns a boolean based on this question passing
 * @param {string} success - message if result passes validation
 * @param {string} failure  - message if result fails validation
 * 
 * @returns {Object} - question object
 */
const question = (validator) => {
    return {
        validate: function () {
            try {
                const { passed, message } = validator();
                this.message = message;
                this.passed = passed;
            }
            catch (e) {
                if (e.name === 'ReferenceError') {
                    this.message = 'Your code has an error at or before this question. Open up your console to see more information.'
                    this.passed = false;
                }
            }
        }
    }
}

/**
 * 
 * @param {boolean} passed - Whether the requirement was met
 * @param {string} message - message to display
 * @returns {object} - Result Object
 */
const resultObject = (passed, message) => ({ passed, message })

/*
***********************************************************************************
*************************************IMPORTANT*************************************
***********************************************************************************
Everything below can be safely removed from the template. You MIGHT want to keep the 
getTypeMessage function, depending on the problems that you have in mind. Perhaps 
additional helper methods will be added later. This template will be updated accordingly.
There is a short example of what validation functions might look like, as well as an
example of triggering validation.
***********************************************************************************
***********************************************************************************
*/


/**
 * A guard clause that returns a message depending on the success or issue.
 * @param {*} variable - The variable being changed for this requirement
 * @param {string} type - Data type that this variable should be
 * @returns {string} - "success" if the type matches, otherwise a message to be displayed to the user
 */
const getTypeMessage = (variable, type) => {
    let message = 'success';
    if (variable === null) {
        message = 'Did you make a change yet? If so, make sure you saved your file and refreshed this page!'
    }
    else if (typeof variable !== type) {
        message = `We were expecting a string, but you entered a ${typeof variable}.`;
    }
    return message;
}

const validateIchthyologistFocus = () => {
    let message = getTypeMessage(ichthyologistFocus, 'string');
    if (message === 'success') {
        if(ichthyologistFocus == 'fish') {
            message = 'Correct! Ichthyologists study fish';
        }
        else {
            message = `Not quite, Ichthyologists don't study ${ichthyologistFocus}. Do a quick google search and try again!`;
        }
        return resultObject(true, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateHawaiianStateFish = () => {
    let message = getTypeMessage(hawaiianStateFish, 'string');
    if (message === 'success') {
        let fish = hawaiianStateFish.toLowerCase().replace("'",).replace('ā', 'a');
        switch (fish) {
            case 'humuhumunukunukuapuaa':
            case 'humuhumu':
                return resultObject(true, "Ae! The Humuhumunukunukuapua'a is Hawaii's state fish. Try saying that 10 times.");
            case 'reef triggerfish':
                return resultObject(false, "You're technically right, but Reef Triggerfish isn't as fun to say as its other name.");
            default:
                return resultObject(false, `Mahalo, but no, we were looking for humuhumunukunukuapua'a, not ${hawaiianStateFish}.`)

        }
    }
    else {
        return resultObject(false, message);
    }
}

//NOTE: The order of questions in this array must match the order of requirements on the DOM and in the index.js file.
const questions = [
    question(validateIchthyologistFocus),
    question(validateHawaiianStateFish)
]

runValidation(questions);