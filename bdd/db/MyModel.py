from flask import redirect
from flask_admin.contrib.sqla import ModelView


class MyModelView(ModelView):
    """Only admin can see"""
    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            # return self.render('login.html')
            return redirect('/api2/auth-admin')
