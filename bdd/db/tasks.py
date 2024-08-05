from app import db
from db.MyModel import MyModelView


class TasksModel(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text)
    name = db.Column(db.Text)
    text = db.Column(db.Text)
    cost = db.Column(db.Integer)


class TasksAdminModel(MyModelView):
    column_labels = {
        "img": "task img",
        "name": "task name",
        "text": "task description",
        "cost": "task coins value"

    }