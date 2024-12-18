from flask import Flask, request, jsonify
import pymysql

app = Flask(__name__)

# Configuración de la base de datos MySQL

db = pymysql.connect(
    host="localhost",
    user="root",
    password="14111994aA+",
    database="cancionero"
)

cursor = db.cursor()

cursor.execute("SELECT * FROM canciones")
rows = cursor.fetchall()

for row in rows:
    print(row)

db.close()

@app.route("/api/items", methods["GET"])
def get_items():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM items")
    rows = cursor.fetall()
    items = []
    for row in rows:
        item = {"id" : row[0], "name": row[1], "description": row[2]}
        items.append(item)
    return jsonify(items)

@app.route("api/items", methods=["POST"])
def add_item():
    data = request.get_json()
    name = data["name"]
    description = data["description"]
    cursor = db.cursor()
    cursor.execute("INSERT INTO items(name, description) VALUES (%s, %s)", (name, description))
    db.commit()
    return jsonify({"message: Item added successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True)