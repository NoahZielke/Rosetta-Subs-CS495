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
Now that your virtualenv is active, enter:
  ```
  python -m pip install Django
  ```
