import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

questions = {}

@app.route('/get_data')
@cross_origin()
def get_data():
    if request.method == 'GET':
        try:
            return jsonify(questions)

        except Exception as e:
            return jsonify({"error": "Invalid request method"}), 500
        
    return jsonify({"error": "Request not GET"}), 500
        
@app.route('/create_poll')
@cross_origin()
def create_poll():
    if request.method == "POST":
        try:
            question = request.args.get('question')
            questions[question] = (0, 0)
        except Exception as e:
            return jsonify({"error": "Invalid request method"}), 500
    else:
        return jsonify({"error": "Request not POST"}), 500
    
@app.route('/vote')
@cross_origin()
def vote():
    if request.method == "GET":
        try:
            question = request.args.get('question')
            vote = request.args.get('vote')
            yes, no = questions[question]
            if vote == True:
                
                yes += 1
            else:
                no += 1
            
            questions[question] = (yes, no)

        except Exception as e:
            return jsonify({"error": "Invalid request method"}), 500
        
    else:
        return jsonify({"error": "Request not GET"}), 500
    
if __name__ == '__main__':
    app.run(debug=True)