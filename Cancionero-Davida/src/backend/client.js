import { createClient } from "@libsql/client";
import { use } from "react";

export const turso = createClient({
  url: "libsql://cancionero-alfonsomoreno94.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzY1NTUxNzksImlkIjoiMGM5OTRhMDYtZWViZi00YzNiLWIwMTItYjlmMDEyZDNjNTk2IiwicmlkIjoiYTE1N2E1NWEtY2QwZS00NjM1LWEwZDUtZThmZDY2MGRhOWM0In0.4ZST1dY_sa4BVxzPbmqFhfBmvN4juSzXVDhkLOhh-U__6hJVpTWYz09ALF6xc0W2CElo341k95pw-jn88zfFAg"
});


    // CONSEGUIR LISTA EN BÚSQUEDA

export const getLista = async (tipo, valor) => {
    try {
        const query = `SELECT * FROM canciones WHERE ${tipo} = ?`;
        const { rows } = await turso.execute(query, [valor]);
        console.log("getLista:", rows)
        return rows;
    } catch (error) {
        console.error('Error al obtener la lista de canciones:', error);
        throw error; 
    }
};

    // CONSEGUIR DATOS DE UNA CANCION

export const getCancion = async (nombre) => {
    try {
        const query = `SELECT * FROM canciones WHERE nombre = ?`;
        const { rows } = await turso.execute(query, [nombre]);
        console.log("getCancion:", rows)
        return rows;
    } catch (error) {
        console.error('Error al obtener cancion:', error);
        throw error; 
    }
};

    // CONSEGUIR LISTA DE FAVORITOS

    export const getFavoritos = async (email) => {
        try {
            // Query to get user_id from email
            let query = "SELECT id FROM usuarios WHERE email = ?";
            const userResult = await turso.execute(query, [email]);
            
            // Check if a user was found
            if (userResult.length === 0) {
                console.log("No user found with this email");
                return [];
            }
    
            // Extract user_id from the result
            const user_id = userResult.rows[0].id;
    
            // Query to get favorite songs
            query = "SELECT * FROM canciones JOIN favoritos ON canciones.id = favoritos.cancion_id WHERE favoritos.usuario_id = ?";
            const result = await turso.execute(query, [user_id]);
            
            // Assuming the result has a method or property named 'rows'
            const rows = result.rows || result; // Adjust based on actual return structure
            console.log("getFavoritos:", rows);
            return rows;
    
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            throw error;
        }
    };

        // MARCAR FAVORITO

        export const postFavoritos = async (email, songID) => {
            try {
                // Get user ID from email
                let query = "SELECT id FROM usuarios WHERE email = ?";
                const userResults = await turso.execute(query, [email]);
                console.log("UserResults:", userResults)
                
                // Check if user exists
                if (userResults.length === 0) {
                    console.log("No user found with this email");
                    return null; // or throw an error, depending on how you want to handle this case
                }
        
                const user_id = userResults.rows[0].id;
        
                // Insert song into favorites
                query = "INSERT INTO favoritos (usuario_id, cancion_id) VALUES (?, ?)";
                const result = await turso.execute(query, [user_id, songID]);
        
                // Log the result - note that 'rows' might not be applicable for INSERT
                console.log("postFavoritos:", result);
        
                // Return something meaningful, like the last inserted ID if available
                return result.lastID || result; // Adjust based on what 'turso' returns for inserts
        
            } catch (error) {
                console.error('Error al marcar como favorito:', error);
                throw error; 
            }
        };

        // DESMARCAR FAVORITO

        export const deleteFavoritos = async (email, songID) => {
            try {
                // Get user ID from email
                let query = "SELECT id FROM usuarios WHERE email = ?";
                const userResults = await turso.execute(query, [email]);
                
                // Check if user exists
                if (userResults.length === 0) {
                    console.log("No user found with this email");
                    return false; // or throw an error, depending on your preference
                }
        
                const user_id = userResults.rows[0].id;
        
                // Delete from favorites
                query = "DELETE FROM favoritos WHERE usuario_id = ? AND cancion_id = ?";
                const result = await turso.execute(query, [user_id, songID]);
        
                console.log("Cancion desmarcada con éxito");
                // Return something to indicate success or failure
                return { success: true, affectedRows: result.affectedRows || 1 };
        
            } catch (error) {
                console.error('Error al desmarcar como favorito:', error);
                throw error; 
            }
        };

        // CONSEGUIR LISTAS

        export const getListas = async (email) => {
            try {
                let query = "SELECT id FROM usuarios WHERE email = ?";
                const userResult = await turso.execute(query, [email]);
                
                // Check if user exists
                if (userResult.rows.length === 0) {
                    console.log("No user found with this email");
                    return []; // or throw an error, depending on how you want to handle this case
                }
        
                // Extract user_id from the result
                const user_id = userResult.rows[0].id;
        
                // Query for lists associated with this user
                query = "SELECT * FROM listas WHERE usuario_id = ?";
                const { rows } = await turso.execute(query, [user_id]);
                
                console.log("getListas:", rows);
                return rows;
        
            } catch (error) {
                console.error('Error al obtener listas:', error);
                throw error; 
            }
        };

    // CREAR LISTA

    export const postLista = async (email, nombreLista) => {
        try {
            // Get user ID from email
            let query = "SELECT id FROM usuarios WHERE email = ?";
            const userResults = await turso.execute(query, [email]);
            
            // Check if user exists
            if (userResults.length === 0) {
                console.log("No user found with this email");
                return { success: false, message: "Usuario no encontrado" };
            }
            console.log("ID:", userResults.rows[0].id)
            const user_id = userResults.rows[0].id;
    
            // Insert new list
            console.log("nombreLista:", nombreLista)
            query = "INSERT INTO listas (nombre, usuario_id) VALUES (?, ?)";
            const result = await turso.execute(query, [nombreLista, user_id]);
            
            console.log("Lista creada con éxito");
            // Return something to indicate success or failure
            return { success: true, message: "Lista creada con éxito", insertId: result.lastID || null };
    
        } catch (error) {
            console.error('Error al crear lista:', error);
            throw error; 
        }
    };


    // BORRAR LISTA

    export const deleteLista = async (listaID) => {
        try {
            const query = "DELETE FROM listas WHERE id = ?";
            await turso.execute(query, [listaID]);
            
            console.log("Lista eliminada con éxito");
            // Return something to indicate success
            return { success: true, message: "Lista eliminada con éxito" };
        } catch (error) {
            console.error('Error al borrar lista:', error);
            throw error; 
        }
    };

    // CONSEGUIR CANCIONES EN LISTA

    export const getCancionesLista = async (listaNombre, email) => {
        try {
            // Query to get user_id from email
            let query = "SELECT id FROM usuarios WHERE email = ?";
            const userResults = await turso.execute(query, [email]);
            
            // Check if user exists
            if (userResults.length === 0) {
                console.log("No user found with this email");
                return []; // or return an error message, depending on how you handle this case
            }
    
            const user_id = userResults.rows[0].id;
    
            // Query to get songs from a specific list for the user
            query = `
                SELECT * 
                FROM canciones 
                JOIN listas_canciones ON canciones.id = listas_canciones.cancion_id
                JOIN listas ON listas.id = listas_canciones.lista_id 
                WHERE listas.usuario_id = ? AND listas.nombre = ?
            `;
            
            const { rows } = await turso.execute(query, [user_id, listaNombre]);
            
            console.log("getCancionesLista:", rows);
            return rows;
    
        } catch (error) {
            console.error('Error al conseguir las canciones de la lista:', error);
            throw error; 
        }
    };

    // AÑADIR CANCIONES A LISTA

    export const postCancionesLista = async (listaID, songID) => {
        console.log("ListaID:", listaID)
        console.log("songID:", songID)
        
        try {
            const query = "INSERT INTO listas_canciones (lista_id, cancion_id) VALUES (?, ?)";
            const result = await turso.execute(query, [listaID, songID]);
            
            console.log("Canciones agregadas con éxito");
            // Return something to indicate success or failure
            return { success: true, message: "Canciones agregadas con éxito", insertId: result.lastID || null };
    
        } catch (error) {
            console.error('Error al añadir canciones a la lista:', error);
            throw error; 
        }
    };

    // BORRAR CANCIONES DE LA LISTA

    export const deleteCancionesLista = async (listaNombre, songID, email) => {
        try{ 
            let query = "SELECT id FROM usuarios WHERE email = ?"
            const user_id = await turso.execute(query, [email])

            query = `SELECT id FROM listas WHERE usuario_id = ? AND nombre = ?`
            const listaID = await turso.execute(query, [user_id.rows[0].id, listaNombre])
            
            query = `DELETE FROM listas_canciones WHERE lista_id = ? AND cancion_id = ?`;
            await turso.execute(query, [listaID.rows[0].id, songID]);
            return
        } catch (error) {
            console.error('Error al borrar lista:', error);
            throw error; 
        }
    }; 


    export const postUsuario = async (nombre, email) => {
        try {
            // Check if the email already exists
            let query = "SELECT * FROM usuarios WHERE email = ?";
            const { rows } = await turso.execute(query, [email]);
            console.log(rows); // Logging the response for debugging
    
            if (rows.length === 0) {
                // If no user found with this email, insert new user
                query = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
                const insertResult = await turso.execute(query, [nombre, email]);
                
                console.log("Usuario creado con éxito");
                // Return something to indicate success
                return { success: true, message: "Usuario creado con éxito", insertId: insertResult.lastID || null };
            } else {
                console.log("El usuario ya existe");
                // Return something to indicate the user already exists
                return { success: false, message: "El usuario ya existe" };
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error; // Re-throw the error for the caller to handle
        }
    };