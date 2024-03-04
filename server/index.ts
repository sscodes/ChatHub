const { Server } = require('socket.io');

const io = new Server(8000, {
  cors: true,
});

io.on('connection', (socket: any) => {
  console.log(`Socket Connected`, socket.id);
  socket.on('room:join', (data: any) => {
    console.log(data);

    const { roomid } = data;
    io.to(roomid).emit('user:joined', { id: socket.id });
    socket.join(roomid);
    io.to(socket.id).emit('room:join', data);
  });

  socket.on('user:call', ({ to, offer }: { to: string; offer: any }) => {
    io.to(to).emit('incomming:call', { from: socket.id, offer });
  });

  socket.on('call:accepted', ({ to, ans }: { to: string; ans: any }) => {
    io.to(to).emit('call:accepted', { from: socket.id, ans });
  });

    socket.on("peer:nego:needed", ({ to, offer }: { to: string; offer: any }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }: { to: string; ans: any }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});
