pipeline {
    agent any

    environment {
        NODE_ENV = 'ci'
        DOCKER_VOLUME = 'playwright_workspace' // Docker volume to store workspace
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
                REM Create Docker volume if it doesn't exist
                docker volume inspect %DOCKER_VOLUME% >nul 2>&1 || docker volume create %DOCKER_VOLUME%

                REM Run Playwright tests inside Docker volume
                docker run --rm -v %DOCKER_VOLUME%:/home/jenkins/workspace -w /home/jenkins/workspace mcr.microsoft.com/playwright:v1.55.0-jammy bash -c "
                    cp -r /workspace/* /home/jenkins/workspace/ &&
                    npm install &&
                    npm test &&
                    npm run allure:generate
                "
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
