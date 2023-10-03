from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Resource,Api
from models import db

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///link_loop.db'

migrate=Migrate(app,db)

db.init_app(app)

api=Api(app)

class Index(Resource):
    def get(self):
        try:
            response_dict = {
                "index": "Welcome to the link loop RESTful API",
            }
            return make_response(jsonify(response_dict), 200)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred.{str(e)}"}
            return make_response(jsonify(response_dict), 500)

api.add_resource(Index, '/')


if __name__ == '__main__':
    app.run(port=5555,debug=True)