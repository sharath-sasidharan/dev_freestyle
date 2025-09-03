pipeline {
    agent any

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

        stage('Run Tests in Docker') {
            steps {
                bat """
                REM Pull the Playwright Docker image
                docker pull mcr.microsoft.com/playwright:v1.55.0-jammy

                REM Run container with mounted workspace
                docker run --rm -u root:root -v %WORKSPACE%:/home/jenkins/workspace -w /home/jenkins/workspace mcr.microsoft.com/playwright:v1.55.0-jammy bash -c "npm install && npm test && npm run allure:generate"
                """
            }
        }
    }

    post {
        always {
            // Publish Allure report even if tests fail
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
