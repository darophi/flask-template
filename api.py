import os


from application import app

# if os.getenv('APPLICATION_STAGE') == "DEV":
app.run(debug=True, host="0.0.0.0")




