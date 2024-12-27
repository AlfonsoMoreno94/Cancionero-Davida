from flask import Flask, request, jsonify, make_response
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# Configuración de la base de datos MySQL

db = pymysql.connect(
    host="localhost",
    user="root",
    password="14111994aA+",
    database="cancionero",
)

# Buscador de inicio

@app.route("/api/buscar", methods=["GET"])
def get_items():
    tipo = request.args.get("type")
    valor = request.args.get("valor")
    
    print(tipo, valor)
    if not tipo or not valor:
        return jsonify({"Error": "Faltan parámetros"}), 401
    try:

        with db.cursor() as cursor:
            
            query = f"SELECT * FROM canciones WHERE {tipo} = %s"
            cursor.execute(query, (valor,))
            rows = cursor.fetchall()
            print(f"rows: {rows}")
            items=[]
            for row in rows:
                item = {"id": row[0], "nombre": row[1], "autor": row[2], "letra": row[3]}
                items.append(item)
        
        return jsonify(items)
    except Exception as e:
        print(e)
        return jsonify({"Error": "No se ha podido completar la búsqueda"}), 501

# Buscador de favoritos

@app.route("/api/conseguirfavoritos", methods=["GET"])
def get_favs():
    try:
        userEmail = request.args.get("userEmail")

        if not userEmail:
            return jsonify({"Error": "Falta parámetro userEmail"}), 400
        
        with db.cursor() as cursor:
            query = "SELECT id FROM usuarios WHERE email = %s"
            cursor.execute(query, (userEmail,))
            user_id_result = cursor.fetchone()

            if not user_id_result:
                return jsonify({"Error": "Usuario no encontrado"}), 404

            user_id = user_id_result[0]
            query= f"SELECT * FROM canciones JOIN favoritos ON canciones.id = favoritos.cancion_id WHERE usuario_id = %s"
            cursor.execute(query, (user_id,))
            rows = cursor.fetchall()
            items = []
            if not rows:
                return(items)
            for row in rows:
                item = {"id": row[0], "nombre" : row[1], "autor": row[2]}
                items.append(item)

        return jsonify(items), 200
    except Exception as e:
        print(e)
        return jsonify({"Error": "No se ha podido hacer la lista de favoritos"}), 501


# Buscador de listas

@app.route("/api/conseguirlistas", methods=["GET"])
def get_listas():
    try:
        user_email = request.args.get("userEmail")

        with db.cursor() as cursor:
            query = f"SELECT id FROM usuarios WHERE email = %s"
            cursor.execute(query, (user_email,))
            user_id = cursor.fetchone()

            

            query = f"SELECT * FROM listas WHERE usuario_id = %s";
            cursor.execute(query, (user_id,))
            rows = cursor.fetchall()
            items=[]
            for row in rows:
                item = {"id": row[0], "nombre": row[1]}
                items.append(item)
        return jsonify(items)
    except Exception as e:
        print(e)
        return jsonify({"Error:", "No se ha podido hacer la operacion"}), 501

# Buscador de canción

@app.route("/api/cancion", methods=["GET"])
def get_item():
    nombre = request.args.get("nombre")
    with db.cursor() as cursor:
        query = f"SELECT * FROM canciones WHERE nombre = %s"
        cursor.execute(query, (nombre,))
        rows = cursor.fetchall()
        items=[]
        for row in rows:
            item = {"id": row[0], "nombre": row[1], "autor": row[2], "letra": row[3]}
            items.append(item)
    return jsonify(items)

# Crear y comprobar que hay perfil

@app.route("/api/usuario", methods=["POST"])
def post_usuario():
    try:
        data = request.get_json()
        nombre = data.get("nombre")
        email = data.get("email")
        
        with db.cursor() as cursor:
            query= f"SELECT * FROM usuarios WHERE email = %s"
            cursor.execute(query, (email,))
            data = cursor.fetchone()
            if data == None:
                query = "INSERT INTO usuarios (nombre, email) VALUES (%s, %s)"
                cursor.execute(query,(nombre, email))
                db.commit()
                query= f"SELECT * FROM usuarios WHERE email = %s"
                cursor.execute(query, (email,))
                data = cursor.fetchone()
                user = ({"id": data[0], "nombre": data[1], "email": data[2]})
                return jsonify(user)

            user = ({"id": data[0], "nombre": data[1], "email": data[2]})
        return jsonify(user)
    except Exception as e:
        print("Error:", e)


    # FAVORITOS

@app.route("/api/favoritos", methods=["POST"])
def marcar_favorito():
    try:
        data = request.get_json()
        user_email = data.get("email")
        song_id = data.get("songID")

        with db.cursor() as cursor:
            query = "SELECT id FROM usuarios WHERE email = %s"
            user_id = cursor.execute(query, (user_email))
                
            cursor = db.cursor()
            query = "INSERT INTO favoritos (usuario_id, cancion_id) VALUES (%s, %s)"
            cursor.execute(query, (user_id, song_id))

            db.commit()
        return jsonify({"message": "Favorito desmarcado con éxito"}), 200
            
    except Exception as e:
        error_message = jsonify({"error": str(e)})
        print("Error:", e)
        return error_message, 500


@app.route("/api/favoritos", methods=["DELETE"])
def desmarcar_favorito():
    try:
        data = request.get_json()
        user_email = data.get("email")
        song_id = data.get("songID")

        with db.cursor() as cursor:
            query = "SELECT id FROM usuarios WHERE email = %s"
            user_id = cursor.execute(query, (user_email))
                
            query= "DELETE FROM favoritos WHERE usuario_id = %s AND cancion_id = %s"
            cursor.execute(query, (user_id, song_id))
            db.commit()
        return jsonify({"message": "Favorito desmarcado con éxito"}), 200
            
    except Exception as e:
        error_message = jsonify({"error": str(e)})
        print("Error:", e)
        return error_message, 500
    

    # Crear lista

@app.route("/api/listas", methods=["POST"])
def crear_lista():
    try:
        data = request.get_json()
        user_email = data.get("userEmail")
        nombre_lista = data.get("nombreLista")

        with db.cursor() as cursor:
            query = f"SELECT id FROM usuarios WHERE email = %s"
            cursor.execute(query, (user_email))
            user_id = cursor.fetchone()

            
            query = f"INSERT INTO listas (nombre, usuario_id) VALUES (%s, %s)"
            cursor.execute(query,(nombre_lista, user_id))
            db.commit()
        return jsonify({"message": "Lista creada con éxito"}), 200
    except Exception as e:
        error_message = jsonify({"error": str(e)})
        print("Error:", e)
        return error_message, 500
    
    # BORRAR LISTA

@app.route("/api/listas", methods=["DELETE"])
def borrar_lista():
    try:
        data = request.get_json()
        listaID = data.get("listaID")

        with db.cursor() as cursor:
            query = f"DELETE FROM listas WHERE id = %s"
            cursor.execute(query, (listaID,))
            db.commit()
        return jsonify({"Lista removida con éxito": listaID})
    except Exception as e:
        return jsonify ({"error": str(e)})
    
    # CONSEGUIR LISTA DE CANCIONES

@app.route("/api/listacanciones", methods=["GET"])
def get_lista_canciones():
    try:
        lista_nombre = request.args.get("listanNombre")
        user_email = request.args.get("userEmail")

        with db.cursor() as cursor:
            query = "SELECT id FROM usuarios WHERE email = %s"
            cursor.execute(query, (user_email))
            user_id = cursor.fetchone()
            
            query = """SELECT * FROM canciones JOIN listas ON canciones.id = listas.cancion_id
            WHERE listas.usuario_id = %s AND listas.nombre = %s"""
            cursor.execute(query, (user_id, lista_nombre))
            rows = cursor.fetchall()
            items=[]
            for row in rows:
                item = {"id": row[0], "nombre": row[1], "autor": row[2], "letra": row[3]}
                items.append(item)
        return jsonify(items)
    except Exception as e:
        print(e)
        return jsonify({"Error": "No se ha podido conseguir ninguna lista de canciones"})

        



if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")