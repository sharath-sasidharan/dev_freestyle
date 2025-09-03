pipeline {
    agent any
    tools {
        nodejs "NodeJS_18"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/sharath-sasidharan/dev_freestyle.git', credentialsId: '710ca798-6437-4640-a4a4-d91750b4b425'
            }
        }
        stage('Install') {
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
            allure([ includeProperties: false, jdk: '', results: [[path: 'allure-results']] ])
        }
    }
}
