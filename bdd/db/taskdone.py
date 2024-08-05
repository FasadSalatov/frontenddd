from app import db


class TaskDoneModel(db.Model):
    __tablename__ = 'done_task'
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    task_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)

