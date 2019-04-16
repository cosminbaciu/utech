import * as React from "react";
import {Component} from "react";

class StreamComponent extends Component {


    click () {

        // Generate random room name if needed
        if (!window.location.hash) {
            window.location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        }
        const roomHash = window.location.hash.substring(1);

// TODO: Replace with your own channel ID
        const drone = new window.ScaleDrone('yiS12Ts5RdNhebyM');
// Room name needs to be prefixed with 'observable-'
        const roomName = 'observable-' + roomHash;
        const configuration = {
            iceServers: [{
                urls: 'stun:stun.l.google.com:19302'
            }]
        };
        let room;
        let pc;


        function onSuccess() {};
        function onError(error) {
            console.error(error);
        };



// Send signaling data via Scaledrone

        function sendMessage(message) {
            drone.publish({
                room: roomName,
                message
            });
        }

        function startWebRTC(isOfferer) {
            pc = new RTCPeerConnection(configuration);

            // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
            // message to the other peer through the signaling server
            pc.onicecandidate = event => {
                if (event.candidate) {
                    sendMessage({'candidate': event.candidate});
                }
            };

            // If user is offerer let the 'negotiationneeded' event create the offer
            if (isOfferer) {
                pc.onnegotiationneeded = () => {
                    pc.createOffer().then(localDescCreated).catch(onError);
                }
            }

            // When a remote stream arrives display it in the #remoteVideo element
            pc.ontrack = event => {
                const stream = event.streams[0];
                if (!window.remoteVideo.srcObject || window.remoteVideo.srcObject.id !== stream.id) {
                    window.remoteVideo.srcObject = stream;
                }
            };

            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            }).then(stream => {
                // Display your local video in #localVideo element
                window.localVideo.srcObject = stream;
                // Add your stream to be sent to the conneting peer
                stream.getTracks().forEach(track => pc.addTrack(track, stream));
            }, onError);

            // Listen to signaling data from Scaledrone
            room.on('data', (message, client) => {
                // Message was sent by us
                if (client.id === drone.clientId) {
                    return;
                }

                if (message.sdp) {
                    // This is called after receiving an offer or answer from another peer
                    pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                        // When receiving an offer lets answer it
                        if (pc.remoteDescription.type === 'offer') {
                            pc.createAnswer().then(localDescCreated).catch(onError);
                        }
                    }, onError);
                } else if (message.candidate) {
                    // Add the new ICE candidate to our connections remote description
                    pc.addIceCandidate(
                        new RTCIceCandidate(message.candidate), onSuccess, onError
                    );
                }
            });
        }

        function localDescCreated(desc) {
            pc.setLocalDescription(
                desc,
                () => sendMessage({'sdp': pc.localDescription}),
                onError
            );
        }
        drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            room = drone.subscribe(roomName);
            room.on('open', error => {
                if (error) {
                    onError(error);
                }
            });
            // We're connected to the room and received an array of 'members'
            // connected to the room (including us). Signaling server is ready.
            room.on('members', members => {
                console.log('MEMBERS', members);
                // If we are the second user to connect to the room we will be creating the offer
                const isOfferer = members.length === 2;
                startWebRTC(isOfferer);
            });
        });

    }



    render() {
        return (
            <div>
                <script type='text/javascript' src='https://cdn.scaledrone.com/scaledrone.min.js'/>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>

                <style
                    dangerouslySetInnerHTML={{__html: "\n     video {\n      max-width: calc(50% - 100px);\n      margin: 0 50px;\n      box-sizing: border-box;\n      border-radius: 2px;\n      padding: 0;\n      box-shadow: rgba(156, 172, 172, 0.2) 0px 2px 2px, rgba(156, 172, 172, 0.2) 0px 4px 4px, rgba(156, 172, 172, 0.2) 0px 8px 8px, rgba(156, 172, 172, 0.2) 0px 16px 16px, rgba(156, 172, 172, 0.2) 0px 32px 32px, rgba(156, 172, 172, 0.2) 0px 64px 64px;\n    }\n    .copy {\n      position: fixed;\n      top: 10px;\n      left: 50%;\n      transform: translateX(-50%);\n      font-size: 16px;\n      color: rgba(0, 0, 0, 0.5);\n    }\n  "}}/>
                <video id="localVideo" autoPlay muted/>
                <video id="remoteVideo" autoPlay/>
                <button onClick={this.click}>Aici</button>
            </div>
        );
    }
}

export default StreamComponent;