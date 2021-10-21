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

# Backend Deployment Instructions

## Required Code Changes
We must change some settings in the dev.py and prod.py settings to ensure that your application works as exepcted.

- In subgen/settings/dev.py
    1. Change the ALLOWED_HOSTS list to include any IP addresses/domains that you will be testing your application from
    2. The EMAIL_PASSWORD variable to either include the email password (not recommended) or the correct directory to a file containing the password
- In subgen/settings/prod.py
    1. Step 1 as above, except you will change it to be the domain that your application will be served from
    2. Step 2 as above
    3. Change the SECRET_KEY variable to either be an environment variable or point to a text file containing the secret. You can generate one [here](https://djecrety.ir/).
    4. If using a database other than the default sqlite file, you will want to update the DATABASES setting to match what you want to use.
    5. Remove the CORS_ALLOW_ALL_ORIGINS line and add CORS_ALLOWED_ORIGINS that contains a list of any domains or IP addresses that might send POST requests to this server, specifically where your React frontend is hosted.
- In subgen/backend/utils.py
    1. Change any mention of ``` sender_email ``` to be that of the email address you will use to send notifications to users
- Make an empty folder called uploads in the subgen/media folder. This is excluded from the repo by default as all files within this directory are ignored.


## Preparing the application 
This creates the database file (db.sqllite3) and creates the required tables
  ```
  python manage.py migrate --settings subgen.settings.prod
  ```
You should see a list of database migrations, all with green 'OK' next to each entry. 

## AWS Configuration

### Server-side Configuration
At this point, we now need to configure the AWS user account on the machine that is hosting the django server. This configuration guide can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

### AWS-Side Configuration

- Make an S3 bucket called ``` subgenstoragebucket ```
    1. Within this bucket, make three folders: ``` subgen_input ```, ``` subgen_output ```, and ``` vocab ```.
- AWS EventBridge Configuration
    1. Create a new rule called ``` Transribe_Complete ```
    2. The pattern will be an event pattern with the following configuration:
        - Pre-defined pattern by service
        - Service provider: AWS
        - Service name: Transcribe
        - Event Type: Transcribe Job State Change
        - Specific status: COMPLETED
    3. Use the default AWS event bridge
    4. Select Targets Config:
        - Target: API Destination
        - Create a new API Destination:
            - Enter a name
            - API destination endpoint: ``` [ip_address]:[port_number]/completed_job/ ``` or ``` [domain_name_of_backend]/completed_job/ ```
            - Select correct HTTP method
        - Create a new connection with the correct authorization type
    5. Click create

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

#### Using ``` manage.py ``` to run the application
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
### Using ``` gunicorn ``` to run the application (preffered)
**Note: These instructions are for an Ubuntu system and you must have a sudo user account**

Install gunicorn in your virtualenv

``` 
pip install gunicorn
```

Now, we want to create the systemmd file that is going to be running the application. Run the following command to start building the systemd file required to run the server as a service:

```
sudo nano /etc/systemd/system/gunicorn.service
```

This opens a nano window. Copy the following code and make the changes required as denoted by the [].

```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=[username]
Group=www-data
WorkingDirectory=[path_to_subgen_folder]
ExecStart=[path_to_virtualenv_folder]/bin/gunicorn --access-logfile - --workers 3 [path_to_subgen_folder]/subgen.wsgi

[Install]
WantedBy=multi-user.target

```

Ctrl-X and save the file. Now, you should be able to successfully run the server with the command:

```
sudo systemctl start gunicorn.service
```

You can check the status of the server:
```
sudo systemctl status gunicorn.service