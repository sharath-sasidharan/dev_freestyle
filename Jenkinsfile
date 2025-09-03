pipeline {
  agent {
    docker {
        image 'mcr.microsoft.com/playwright:v1.55.0-jammy'
        args '-u root:root -v $WORKSPACE:/home/jenkins/workspace'
    }
}


    environment {
        NODE_ENV = 'ci'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/sharath-sasidharan/dev_freestyle.git',
                    credentialsId: '710ca798-6437-4640-a4a4-d91750b4b425'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

    
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            // Generate Allure report even if tests fail
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}





// pipeline {
//     agent any

//     tools {
//         nodejs "NodeJS_18" // Make sure NodeJS_18 is configured in Jenkins Global Tool Configuration
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'master', 
//                     url: 'https://github.com/sharath-sasidharan/dev_freestyle.git', 
//                     credentialsId: '710ca798-6437-4640-a4a4-d91750b4b425'
//             }
//         }

//         stage('Install NPM Packages') {
//             steps {
//                 bat 'npm install'
//             }
//         }

//         stage('Install Playwright Browsers') {
//             steps {
//                 bat 'npx playwright install'
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 bat 'npm test'
//             }
//         }

//         stage('Generate Allure Report') {
//             steps {
//                 bat 'npm run allure:generate'
//             }
//         }
//     }

//     post {
//         always {
//             // Generate Allure report even if tests fail
//             allure([
//                 includeProperties: false, 
//                 jdk: '', 
//                 results: [[path: 'allure-results']]
//             ])
//         }
//     }
// }
