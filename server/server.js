const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingInterval: 1000, // Kalp atışı aralığı (1 saniye)
  pingTimeout: 5000, // Kalp atışı zaman aşımı (5 saniye)
});

const onlineUsers = {};
const gameData = {};

io.on("connection", (socket) => {
  console.log(`Yeni bağlantı: ${socket.id}`); // Bağlantı logu

  socket.on("setUsername", (username) => {
    if (Object.values(onlineUsers).some((user) => user.username === username)) {
      socket.emit("usernameError", "Bu kullanıcı adı zaten kullanılıyor.");
    } else {
      onlineUsers[socket.id] = { status: "online", username: username };
      socket.emit("usernameSet", username);
      io.emit("updateUsers", onlineUsers);
    }
  });

  io.emit("updateUsers", onlineUsers);

  socket.on("invite", (targetId) => {
    if (onlineUsers[targetId] && onlineUsers[targetId].status === "online") {
      io.to(targetId).emit("inviteReceived", { inviterId: socket.id, inviterName: onlineUsers[socket.id].username });
    } else {
      socket.emit("inviteError", onlineUsers[targetId] ? "Oyuncu şu anda oyunda." : "Oyuncu çevrimiçi değil.");
    }
  });

  socket.on("acceptInvite", (data) => {
    const roomId = data.inviterId + socket.id; // Oda ID'sini tutarlı oluştur
    socket.join(roomId);
    io.sockets.sockets.get(data.inviterId).join(roomId);

    onlineUsers[socket.id].status = "oyunda";
    onlineUsers[data.inviterId].status = "oyunda";
    io.emit("updateUsers", onlineUsers);

    gameData[roomId] = { counter: 0, player1: data.inviterId, player2: socket.id, details: "Oyun Başladı!", currentTurn: data.inviterId };
    io.to(roomId).emit("gameStarted", roomId, gameData[roomId]);

    console.log(`Oyun başladı. Oda ID: ${roomId}, gameData:`, gameData[roomId]);
  });

  socket.on("incrementCounter", (roomId) => {
    if (gameData[roomId] && gameData[roomId].currentTurn === socket.id) {
      // Sıra kontrolü
      gameData[roomId].counter++;
      gameData[roomId].details = "Sayaç Artırıldı!";
      gameData[roomId].currentTurn = gameData[roomId].player1 === socket.id ? gameData[roomId].player2 : gameData[roomId].player1; // Sırayı değiştir
      io.to(roomId).emit("updateGame", gameData[roomId]);
      console.log(`Oda ${roomId} için sayaç güncellendi:`, gameData[roomId]);
    } else {
      socket.emit("notYourTurn", "Şu anda senin sıran değil."); // Sıra değilse mesaj gönder
    }
  });

  socket.on("decrementCounter", (roomId) => {
    if (gameData[roomId] && gameData[roomId].currentTurn === socket.id) {
      // Sıra kontrolü
      gameData[roomId].counter--;
      gameData[roomId].details = "Sayaç Azaltıldı!";
      gameData[roomId].currentTurn = gameData[roomId].player1 === socket.id ? gameData[roomId].player2 : gameData[roomId].player1; // Sırayı değiştir
      io.to(roomId).emit("updateGame", gameData[roomId]);
      console.log(`Oda ${roomId} için sayaç güncellendi:`, gameData[roomId]);
    } else {
      socket.emit("notYourTurn", "Şu anda senin sıran değil."); // Sıra değilse mesaj gönder
    }
  });

  socket.on("leaveGame", (roomId) => {
    if (gameData[roomId]) {
      const otherPlayer = gameData[roomId].player1 === socket.id ? gameData[roomId].player2 : gameData[roomId].player1;
      io.to(otherPlayer).emit("opponentLeft");
      onlineUsers[gameData[roomId].player1].status = "online";
      onlineUsers[gameData[roomId].player2].status = "online";
      io.emit("updateUsers", onlineUsers);
      delete gameData[roomId];
      socket.leave(roomId);
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} bağlantısı koptu.`);
    const roomsToRemove = []; // Silinecek odaları burada tutuyoruz
    for (const roomId in gameData) {
      const roomData = { ...gameData[roomId] }; // Oda bilgisini KOPYALA!
      if (roomData.player1 === socket.id || roomData.player2 === socket.id) {
        const otherPlayer = roomData.player1 === socket.id ? roomData.player2 : roomData.player1;

        if (io.sockets.sockets.get(otherPlayer)) {
          io.to(otherPlayer).emit("opponentDisconnected");
        }

        onlineUsers[roomData.player1].status = "online";
        onlineUsers[roomData.player2].status = "online";
        io.emit("updateUsers", onlineUsers);
        roomsToRemove.push(roomId); // Silinecek odaları listeye ekle
        break; //Odayı bulduktan sonra döngüden çık
      }
    }
    // Döngü bittikten sonra odaları sil
    for (const roomId of roomsToRemove) {
      delete gameData[roomId];
    }
    delete onlineUsers[socket.id];
    io.emit("updateUsers", onlineUsers);
  });
});

console.log("Server Başlatıldı");
