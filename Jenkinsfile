pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/sharath-sasidharan/dev_freestyle.git', 
                    credentialsId: '710ca798-6437-4640-a4a4-d91750b4b425'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-docker .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat '''
                docker run --rm ^
                    -v %CD%/allure-results:/tmp/test-results ^
                    -w /app ^
                    playwright-docker ^
                    npx playwright test --output=/tmp/test-results --reporter=line,allure-playwright
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat '''
                docker run --rm ^
                    -v %CD%/allure-results:/tmp/test-results ^
                    -w /app ^
                    playwright-docker ^
                    npx allure generate /tmp/test-results --clean -o /tmp/allure-report
                '''
                bat 'xcopy /E /I /Y /Q /H /K /R /C /D /S /tmp/allure-report %CD%\\allure-report'
            }
        }
    }

    post {
        always {
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
