# Connect React + Django Full Setup Guide

This project contains:
- Backend: Django
- Frontend: React

Follow the steps below to run the project on your local machine.

---

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Suhail-106/connectreactdjango.git
cd connectreactdjango

```
## 2️⃣ Create and activate Python virtual environment
```bash
python -m venv venv

```
## Windows
```bash
venv\Scripts\activate

```
## Mac/Linux
```bash
source venv/bin/activate

```
##3️⃣ Backend setup (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

