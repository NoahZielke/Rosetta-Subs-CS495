# Description
* This will be a Django project that allows a user to upload a video file 
* The app will then process the video to generate a subtitle file (in any number of languages ?)
* The subtitle file can then be downloaded

# Development Requirements
Note: Install the requirements in the order that they appear below
## A Linux command line
There are many ways to get this on a Windows machine: 
  - Install the Ubuntu app from the microsoft store 
  - Install Virtualbox and create a linux machine

## The latest version of python (3.8)
On your linux machine (assuming you are using Ubuntu/bash) do:
  ```
  sudo apt update
  sudo apt install software-properties-common
  sudo apt install python3
  ```
  If running `python --version` shows python2, run: 
  ```
  sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
  ```
## The latest version of Pip (20.0)
Enter:
  ```
  sudo apt install python3-pip
  ```
## Virtualenv for python
After creating and entering a project directory with `mkdir myDirectoryName`, `cd myDirectoryName` enter:
  ```
  python3 -m venv venv
  source venv/bin/activate
  ```
## The latest version of Django (3.2.6)
Now that your virtualenv is active, we will install the python library requirements for this project via this comman:
  ```
  python -m pip install -r requirements.txt
  ```
This will install django within your virtual environment. From here, we will prepare the application for deployment. To begin, cd into the project directory:

  ```
  cd subgen/
  ```

## Preparing the application 
This creates the database file (db.sqllite3) and creates any required tables
  ```
  python manage.py migrate
  ```
You should see a list of database migrations, all with green 'OK' next to each entry. At this point, we now need to configure the AWS user account. This configuration guide can be found here: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html


## Running the application
Now that the environment variables are setup and the database migations are completed, we are ready to run the server.

There are two settings files: dev and prod. The primary differences are the DEBUG settings and the fact that the django secret is stored in the dev file, whereas the production file pulls from the environment. See below for different instrucitons depending on where this is being deployed and in what manner

### Local Development Server
Ensure you are in the directory for the application
To run the application on your local machine, run the following command:
  ```
  python manage.py runserver --settings subgen.settings.dev
  ```
You can now access the application by going to this URL on your local machine: http://127.0.0.1:8000

If needed, you can change the port that the server runs on:
  ```
  python manage.py runserver 127.0.0.1:<port_number> --settings subgen.settings.dev
  ```

### Production Server
Ensure you are in the directory for the application
To run the application on a server on your local network/an external server such as a Linode VPS, run the following command:
  ```
  python manage.py runserver 0.0.0.0:8000 --setting subgen.settings.prod
  ```
You can now access the application by going to the following URL: http://<ip address of machine>:8000
If you cannot access the application, ensure your server can accept incoming connections on port 8000.

If needed, you can change the port that the server runs on:
  ```
  python manage.py runserver 0.0.0.0:<port_number> --settings subgen.settings.prod
  ```

# Running Tests
To run the Pytest unit tests, make sure that the requirements are installed, and run:  
*(assuming you are in Subtitle-Generator-cs495/)*
  ```
  cd subgen/testing/
  pytest
  ```
To increase the verbosity (how detailed) the test responses are, you can run:
  ```
  pytest -v (add more v's for more verbosity)
  ```