from flask_sqlalchemy import SQLAlchemy

from flask import Flask, render_template, request, jsonify, send_from_directory, Response, stream_with_context, redirect, url_for

app = Flask(__name__, static_folder='static', template_folder='templates', static_url_path='/api2/download')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///main.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['BABEL_DEFAULT_LOCALE'] = 'ru'
app.config['STORAGE'] = './static/storage'
app.config['SECRET_KEY'] = 'scr'
app.config['FLASK_ADMIN_SWATCH'] = 'cosmo'
db = SQLAlchemy(app)




# class AnyPageView(BaseView):
#     @expose('/')
#     def any_page(self):
#         return self.render('admin/any_page/index.html')

# class DashBoardView(AdminIndexView):
#     @expose('/')
#     def add_data_db(self):
#         return self.render('admin/dashboard_index.html')
# @app.route('/api2/auth-admin', methods=['GET', 'POST'])
# def login():
# #     return redirect(url_for('admin.index'))
# admin = Admin(
#      app,
#      name="FlaskApp",
#      index_view=DashBoardView(name="Статистика", url='/api2/admin'),
#      template_mode="bootstrap3",
#      url='/api2'
#  )