let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

// Création d'un get pour voir le afficher le fichier html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// On écoute les clients qui se connecte et déconnecte. on = j'écoute / emit = j'envoie
io.on("connection", function (socket) {
  console.log("Un utilisateur s'est connecté");
  socket.on("disconnect", function () {
    console.log("Un utilisateur s'est déconnecté");
  });
  socket.on("canvas draw", function (draw) {
    console.log("data reçu : " + draw);
    // On renvoie la donnée de socket pour que les données s'échange de façon bidirectionnel je reçois je renvoie etc..
    io.emit("canvas draw", draw);
  });
});

//Lancement du serveur
http.listen(3000, function () {
  console.log("Server connecté sur le port 3000");
});
