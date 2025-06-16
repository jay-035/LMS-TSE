FROM python:3.9-slim 

WORKDIR /app 

COPY . /app 

RUN apt-get update && apt-get install -y wget unzip && 
wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip && 
unzip chromedriver_linux64.zip && 
mv chromedriver /usr/local/bin/ && 
apt-get install -y chromium && 
pip install selenium 

CMD ["python", "test_lms.py"]
