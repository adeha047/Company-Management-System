const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("istanbul-reports");

const teamMembers = [];




function teamManager() {
    inquirer
        .prompt([

            //added prompts for each question/section needed in the readme.md file. 

            {
                type: 'input',
                name: 'managerName',
                message: 'What is the name of your Manager?',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one letter as an answer"
                }
            },
            {

                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },

            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const email = /\S+@\S+\.\S+/.test(answer)
                    if (email) {
                        return true;
                    }
                    return "Please enter a valid email address"
                }

            },

            {

                type: "input",
                name: "managerofficeNumber",
                message: "What is your manager's Office Number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },

        ]).then(answers => {
            console.log(answers)
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerofficeNumber);
            teamMembers.push(manager);
            generateFile(teamMembers)
            createTeam()
        });

}

function createEngineer() {
    inquirer
        .prompt([

            //added prompts for each question/section needed in the readme.md file. 

            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the name of your engineer?',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one letter as an answer"
                }
            },

            {

                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },

            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    const email = /\S+@\S+\.\S+/.test(answer);
                    if (email) {
                        return true;
                    }
                    return "Please enter a valid email address"
                }

            },

            {

                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's github account?",
                validate: answer => {
                    // /^(ftp|http|https):\/\/[^ "]+$/.test(url);
                    const github = /^(ftp|http|https):\/\/[^ "]+$/.test(answer);
                    if (github) {
                        return true;
                    }
                    return "Please enter a valid github account"
                }
            },

        ]).then(answers => {
            console.log(answers)
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            generateFile(teamMembers)
            //addTeam()
            createTeam();
        });

}

function createIntern() {
    //console.log("create an intern")
    inquirer
        .prompt([

            //added prompts for each question/section needed in the readme.md file. 

            {
                type: 'input',
                name: 'internName',
                message: 'What is the name of your intern?',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one letter as an answer"
                }
            },
            
            {

                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },

            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    const email = /\S+@\S+\.\S+/.test(answer);
                    if (email) {
                        return true;
                    }
                    return "Please enter a valid email address"
                }

            },

            {
                type: 'input',
                name: 'internSchool',
                message: 'What is the name of your school?',
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one letter as an answer"
                }
            },

        ]).then(answers => {
            console.log(answers)
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            generateFile(teamMembers)
            createTeam()

        });

    function addTeam() {
        inquirer
            .prompt([

                {
                    type: "confirm",
                    message: "Would you like to add a new team member?",
                    name: "addTeam",
                    choices: ["yes", "no",],

                }

            ]).then(answers => {

                switch (answers.addTeam) {
                    case "yes":
                        createTeam();
                        break;
                    case "no":
                        generateFile();
                        break;
                    default:
                        generateFile(teamMembers)
                        break;
                }
            })

    }

}

function createTeam() {
    inquirer
        .prompt([

            {
                type: "list",
                message: "Please select which employee you would like to add next?",
                name: "teamChoice",
                choices: ["Engineer", "Intern",],

            }

        ]).then(answers => {

            switch (answers.teamChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    generateFile(teamMembers)
                    break;
            }

        })

}

// function addTeam() {
//     inquirer
//     .prompt([

//         {
//             type: "confirm",
//             message: "Would you like to add a new team member?",
//             name: "addTeam",
//             choices: ["yes", "no",],

//         }

//     ]).then(answers => {

//         switch (answers.addTeam) {
//             case "yes":
//                 createTeam();
//                 break;
//             case "no":
//                 generateFile();
//                 break;
//             default:
//                 break;
//         }
//     })

// }

function generateFile(teamMembers) {
    const html = render(teamMembers);
    fs.writeFile(outputPath, html, (err) => {
        if (err) console.log(err)
    })

}

teamManager();





//need to add a function for each type of person in the team







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
