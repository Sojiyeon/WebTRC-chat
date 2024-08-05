const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 정적 파일 제공 설정
app.use(express.static(__dirname));

// 클라이언트 연결 처리
io.on("connection", (socket) => {
  console.log("새로운 클라이언트 연결됨");

  socket.on("signal", (data) => {
    socket.broadcast.emit("signal", data); // 다른 클라이언트에게 신호 전송
  });

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 해제됨");
  });
});

// 서버 실행
server.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
});
