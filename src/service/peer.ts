class PeerService {
  constructor() {
    // @ts-ignore
    if (!this.peer) {
      // @ts-ignore
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      });
    }
  }

  async getAnswer(offer: any) {
    // @ts-ignore
    if (this.peer) {
      // @ts-ignore
      await this.peer.setRemoteDescription(offer);
      // @ts-ignore
      const ans = await this.peer.createAnswer();
      // @ts-ignore
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async setLocalDescription(ans: any) {
    // @ts-ignore
    if (this.peer) {
      // @ts-ignore
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    // @ts-ignore
    if (this.peer) {
      // @ts-ignore
      const offer = await this.peer.createOffer();
      // @ts-ignore
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}

export default new PeerService();
