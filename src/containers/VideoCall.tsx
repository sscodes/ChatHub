import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { SocketContext } from '../context/socketContext';
import { stateType, userType } from '../types/types';
import ReactPlayer from 'react-player';
import { Alert, Box, Grid, Slide, SlideProps, Snackbar } from '@mui/material';
import { ChatContext } from '../context/chatContext';
import peer from '../service/peer';

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='up' />;
};

const VideoCall = () => {
  const [myStream, setMyStream] = useState<MediaStream>();
  const [userEntered, setUserEntered] = useState<boolean>(false);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [remoteStream, setRemoteStream] = useState();
  const { receiver, roomid } = useParams();

  // @ts-ignore
  const { currentUser }: userType = useContext(AuthContext);
  // @ts-ignore
  const { data }: { data: stateType } = useContext(ChatContext);
  const socket = useContext(SocketContext);

  const handleUserJoined = useCallback(({ id }: { id: string }) => {
    setUserEntered(true);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    // @ts-ignore
    socket.emit('user:call', { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { from: string; offer: any }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      // @ts-ignore
      socket.emit('call:accepted', { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream?.getTracks())
      for (const track of myStream?.getTracks()) {
        // @ts-ignore
        peer.peer.addTrack(track, myStream);
      }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: any }) => {
      peer.setLocalDescription(ans);
      console.log('Call Accepted!');
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    // @ts-ignore
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: string; offer: any }) => {
      const ans = await peer.getAnswer(offer);
      // @ts-ignore
      socket.emit('peer:nego:done', { to: from, ans });
    },
    [socket]
  );

  useEffect(() => {
    // @ts-ignore
    peer.peer.addEventListener('track', async (ev: any) => {
      console.log('GOT TRACKS!!');
      setRemoteStream(ev.streams[0]);
    });
  }, []);

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: any }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    // @ts-ignore
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      // @ts-ignore
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    // @ts-ignore
    socket.emit('room:join', { roomid });
    handleCallUser();
  }, [roomid, socket]);

  useEffect(() => {
    // @ts-ignore
    socket.on('user:joined', handleUserJoined);
    // @ts-ignore
    socket.on('incomming:call', handleIncommingCall);
    // @ts-ignore
    socket.on('call:accepted', handleCallAccepted);
    // @ts-ignore
    socket.on('peer:nego:needed', handleNegoNeedIncomming);
    // @ts-ignore
    socket.on('peer:nego:final', handleNegoNeedFinal);

    return () => {
      // @ts-ignore
      socket.off('user:joined', handleUserJoined);
      // @ts-ignore
      socket.off('incomming:call', handleIncommingCall);
      // @ts-ignore
      socket.off('call:accepted', handleCallAccepted);
      // @ts-ignore
      socket.off('peer:nego:needed', handleNegoNeedIncomming);
      // @ts-ignore
      socket.off('peer:nego:final', handleNegoNeedFinal);
    };
  }, [socket]);

  return (
    <>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Grid container>
          <Grid item xs={6}>
            <ReactPlayer playing muted url={myStream} />
          </Grid>
          <Grid item xs={6}>
            <ReactPlayer playing muted url={remoteStream} />
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={userEntered}
        autoHideDuration={5000}
        onClose={() => setUserEntered(false)}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={() => setUserEntered(false)}
          variant='filled'
          style={{
            width: '100%',
            backgroundColor: 'rgb(178, 182, 255)',
            color: 'indigo',
          }}
        >
          {`${receiver} joined`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VideoCall;
