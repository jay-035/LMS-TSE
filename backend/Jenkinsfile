pipeline { 
  agent any 
  stages { 
    stage('Code Linting') { 
      steps { 
        sh 'npm install' 
        sh 'npm run lint' 
      } 
    } 
    stage('Code Build') {
      steps {
        sh 'npm run build'
      }
    } 
    stage('Unit Testing') {
      steps { 
        sh 'npm test' 
      } 
    } 
    stage('Containerized Deployment') { 
      steps {
        sh 'docker build -t lms-app .' 
        sh 'docker run -d -p 80:3000 lms-app' 
      } 
    }
    stage('Selenium Testing') {
      steps { 
        sh 'docker run lms-selenium-test' 
      }
    }
  }
}
