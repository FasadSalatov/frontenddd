from datetime import datetime
import json
from flask_cors import CORS
import requests

from app import app
# from app import admin
from app import db
from flask import request
from db.tasks import TasksAdminModel, TasksModel
from db.user import UserAdminModel, UserModel
from db.taskdone import TaskDoneModel

# Uncomment if you need admin views
# admin.add_view(UserAdminModel(UserModel, db.session, name='users'))
# admin.add_view(TasksAdminModel(TasksModel, db.session, name='tasks'))

# Enable CORS for all routes and origins
CORS(app)

TOKEN = '7481220673:AAHT4Uh2u36eR9bClxZ0ZVdEp5flecKMULo'
CHAT_ID = 0

def getUser(user_id):
    user = UserModel.query.filter(UserModel.user_id == user_id).first() 
    if not user:
        return False
    return user

def getTask(task_id):
    task = TasksModel.query.filter(TasksModel.id == task_id).first() 
    if not task:
        return False
    return task

def getAllTasks():
    task = TasksModel.query.all() 
    if not task:
        return False
    return task

def isTaskDone(task_id, user_id):
    task = TaskDoneModel.query.filter(TaskDoneModel.task_id == task_id, TaskDoneModel.user_id == user_id).first() 
    if not task:
        return False
    return True

def setDoneTask(userId, taskId):
    task = TaskDoneModel(task_id=taskId, user_id=userId)
    db.session.add(task)
    db.session.commit()

def isUserInChat(user_id):
    r = requests.get(f'https://api.telegram.org/bot{TOKEN}/getChatMember?chat_id={CHAT_ID}&user_id={user_id}')
    r = json.loads(r.content.decode('utf-8'))  # Use .content and decode
    if 'result' in r:
        if 'user' in r['result']:
            return True
    return False

@app.route('/api2/user/<user_id>', methods=['GET', 'POST'])  # get data of an user
def user(user_id):
    if request.method == 'GET':
        user = getUser(user_id)
        if not user:
            return ''
        if (datetime.now() - user.updated).seconds >= 24:
            user.coins_per_day = 2000
            user.updated = datetime.now()
        if user.boost_energy:
            if (datetime.now() - user.boost_energy).seconds < 24: 
                user.max_energy = 3000
            else:
                user.max_energy = 2000
        if user.stake > 0:
            stakeType = user.stake_type
            if (datetime.now() - user.stake_time).seconds >= stakeType:
                if stakeType == 7:
                    user.balance += user.stake * 1.2
                if stakeType == 14:
                    user.balance += user.stake * 1.5
                if stakeType == 21:
                    user.balance += user.stake * 1.8
        db.session.commit()
        return {"max_energy": user.max_energy, "user_id": user.user_id, "balance": user.balance, "coins_per_day": user.coins_per_day, "refferal_id": user.refferal_id, "wallet": user.wallet, "stake": user.stake, "stake_time": user.stake_time, "stake_flag": user.stake_flag, "tg_sub": user.tg_sub, "boost_energy": user.boost_energy, "boost_click": user.boost_click, "full_energy": user.full_energy, "day_claim": user.day_claim, "updated": user.updated}
    else:
        user = UserModel(user_id=request.json['chatId'], refferal_id=request.json['referralId'], day_claim=datetime.now(), updated=datetime.now())
        usersWithReferal = UserModel.query.filter(UserModel.refferal_id == request.json['referralId'])
        referalUser = UserModel.query.filter(UserModel.user_id == request.json['referralId']).first()
        isUserPremium = request.json['premium']
        if usersWithReferal:
            refLen = len(usersWithReferal.__dict__)
            if referalUser:  # If the referals are 15/30/60
                if refLen == 15:
                    referalUser.balance += 500 * 1.5 if isUserPremium else 500
                elif refLen == 30:
                    referalUser.balance += 1500 * 1.5 if isUserPremium else 1500
                elif refLen == 60:
                    referalUser.balance += 3500 * 1.5 if isUserPremium else 3500
                referalUser.balance += 200  # For one user
        db.session.add(user)
        db.session.commit()
        return ''

@app.route('/api2/user/click/<user_id>', methods=['GET'])  # user click button
def click(user_id):
    user = getUser(user_id)
    if not user:
        return ''
    add = 0
    if user.boost_click:
        if (datetime.now() - user.boost_click).seconds < 3:
            add = 1
    if user.coins_per_day == 0:  # if user has no more coins
        return ''
    user.coins_per_day -= 1
    user.balance += 1 + add
    db.session.commit()
    return 'updated'

@app.route('/api2/user/full-energy/<user_id>', methods=['GET'])  # full up the energy
def full_energy(user_id):
    price = 10
    user = getUser(user_id)
    if not user:
        return ''
    if user.balance < price:  # if user has not enough coins
        return ''
    user.balance -= price
    user.coins_per_day = user.max_energy
    db.session.commit()
    return 'updated'

@app.route('/api2/user/boost-energy/<user_id>', methods=['GET'])  # boost the energy
def boost_energy(user_id):
    price = 10
    user = getUser(user_id)
    if not user:
        return ''
    if user.balance < price:  # if user has not enough coins
        return ''
    user.balance -= price
    user.boost_energy = datetime.now()
    user.max_energy = 3000
    db.session.commit()
    return 'updated'

@app.route('/api2/user/boost-click/<user_id>', methods=['GET'])  # boost the click
def boost_click(user_id):
    price = 10
    user = getUser(user_id)
    if not user:
        return ''
    if user.balance < price:  # if user has not enough coins
        return ''
    user.balance -= price
    user.boost_click = datetime.now()
    db.session.commit()
    return 'updated'

@app.route('/api2/user/day-claim/<user_id>', methods=['GET'])
def day_claim(user_id):
    user = getUser(user_id)
    if not user:
        return ''
    if user.day_claim:
        if (datetime.now() - user.day_claim).seconds < 24:
            return ''
    user.balance += 500
    user.day_claim = datetime.now()
    db.session.commit()
    return 'Done'

@app.route('/api2/user/check-task/<user_id>/<task_id>', methods=['GET'])
def check_task(user_id, task_id):
    user = getUser(user_id)
    if not user:
        return ''
    if isTaskDone(task_id, user_id):
        return 'task already done'
    task = getTask(task_id)
    if not task:
        return ''
    specialTasks = [1]
    if task in specialTasks:  # if the task needs some check
        if isUserInChat(user_id):
            user.balance += task.cost
            setDoneTask(user_id, task_id)
            db.session.commit()
        else:
            return 'Not in channel'
    else:
        user.balance += task.cost
        setDoneTask(user_id, task_id)
        db.session.commit()
    return 'Done'



@app.route('/api2/user/set-stake/<user_id>/<stake_type>/<stake_value>', methods=['GET'])
def set_stake(user_id, stake_type, stake_value):
    user = getUser(user_id)
    if not user:
        return 'not user'
    if user.stake != 0:  # stake is set
        return 'stake already set'
    if user.balance < int(stake_value):  # not enough money
        return 'not money'
    if stake_type not in ['7', '14', '21']:
        return 'Wrong type'
    user.balance -= int(stake_value)
    user.stake = int(stake_value)
    user.stake_time = datetime.now()
    user.stake_type = stake_type
    db.session.commit()  # Add commit to save the changes
    return ''

# app.debug = True
app.run(debug=True)
