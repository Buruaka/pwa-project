const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Définition du dossier contenant les fichiers statiques
app.use(express.static("public"));

// Route pour la page HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// On écoute les connexions des clients
io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Écoute de l'événement "canvas draw"
  socket.on("canvas draw", (data) => {
    console.log("Données reçues : ", data);

    // Envoi des données à tous les clients, y compris l'émetteur
    io.emit("canvas draw", data);
  });

  socket.on("canvas reset", () => {
    socket.broadcast.emit("canvas reset");
  });


  // Écoute de la déconnexion du client
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

// Lancement du serveur
http.listen(3000, () => {
  console.log("Le serveur est lancé sur le port 3000");
});