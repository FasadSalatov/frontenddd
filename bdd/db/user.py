from app import db
from db.MyModel import MyModelView


class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    balance = db.Column(db.Integer, default=0)
    coins_per_day = db.Column(db.Integer, default=2000)
    refferal_id = db.Column(db.Integer)
    wallet = db.Column(db.Text)
    stake = db.Column(db.Integer, default=0)
    stake_time = db.Column(db.DateTime)
    stake_flag = db.Column(db.Boolean)
    stake_type = db.Column(db.Integer)
    tg_sub = db.Column(db.Boolean, default=False)
    boost_energy = db.Column(db.DateTime)
    boost_click = db.Column(db.DateTime)
    full_energy = db.Column(db.DateTime)
    day_claim = db.Column(db.DateTime)
    updated = db.Column(db.DateTime)
    max_energy = db.Column(db.Integer, default = 2000)
    
class UserAdminModel(MyModelView):

    column_searchable_list = ['user_id']
    column_labels = {
        "id": "id",
        "user_id": "telegram user id",
        "balance": 'user balance',
        "coins_per_day": 'last coins per day',
        "refferal_id": "refferal id(id tg user)",
        "wallet": "wallet",
        "stake": "is stake value",
        "stake_time": "when stake is active",
        "stake_flag": "is stake active",
        "stake_type": "which is stake type(7,14,21)",
        "tg_sub": "is user sub in tg channel?",
        "boost_energy": "when boost energy is active(+1000)",
        "boost_click": "when double click is active",
        "full_energy": "when buy full energy", # not needed
        "day_claim": "is day claimed",
        "updated": "when is updated"
    }

