from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

from flask import request, jsonify
import logging

app.logger = logging.getLogger(__name__)

@app.route("/api/esfavorito", methods=["GET"])
def es_fav():
    try:
        # Get 'lista' and 'cancionID' from query parameters
        lista_str = request.args.get("lista", "")
        cancion = request.args.get("cancionID", "")

        # Assuming 'lista' is passed as a JSON string, parse it
        import json
        lista = json.loads(lista_str) if lista_str else []

        app.logger.info(f"Lista check: {lista}, CancionID: {cancion}")

        if not lista:
            app.logger.info("EsFav: false (Empty list)")
            return jsonify({"isFavorite": False})

        # Check if 'cancionID' matches any 'id' in the dictionaries within 'lista'
        for item in lista:
            if item.get('id') == cancion:
                app.logger.info("EsFav: true")
                return jsonify({"isFavorite": True})

        app.logger.info("EsFav: false")
        return jsonify({"isFavorite": False})

    except json.JSONDecodeError:
        app.logger.error("Error parsing JSON for 'lista'")
        return jsonify({"Error": "Invalid JSON for 'lista'"}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error in es_fav: {str(e)}")
        return jsonify({"Error": "No se ha podido ver la lista de favoritos"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")