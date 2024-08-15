# Flask Imports
from flask import Flask, redirect, render_template, request, url_for

# Configure application
app = Flask(__name__)

# Routes
@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route("/play")
def play():
    return render_template("play.html")

@app.errorhandler(404)
def page_not_found(_event):
    return error("Page not found, It's nowhere to be seen", 404)


def error(text, statuscode = 400):
    req = {"text": text, "statuscode": statuscode}
    return render_template("error.html", req=req)

if __name__ == "__main__":
    app.run(debug = True, port=2727)