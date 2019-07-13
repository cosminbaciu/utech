import React, { Component } from 'react';
import '../app/App.css';
import CountDown from 'ant-design-pro/lib/CountDown';



import Messages from "./Messages";
import InputMessage from "./InputMessage";
import Tabs from "antd/es/tabs";
import {Button, Icon, notification} from "antd";
import {
    addLessonPhoto,
    addTutoringFiles,
    getProfilePicture,
    getScheduledLessons, getTutoringFiles,
    getUserPrincipal
} from "../util/APIUtils";
import Modal from "antd/es/modal";
import Upload from "antd/es/upload";
import {Link} from "react-router-dom";

const { TabPane } = Tabs;

function randomName() {
    const adjectives = [
        "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
        "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
        "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
        "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
        "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
        "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
        "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
        "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
        "ancient", "purple", "lively", "nameless"
    ];
    const nouns = [
        "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
        "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
        "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
        "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
        "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
        "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
        "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
        "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
        "smoke", "star"
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class StreamComponent extends Component {


    constructor() {
        super();
        this.state = {
            messagesChat: [],
            memberChat: {
                username: randomName(),
                color: randomColor(),
            },
            fileList: [],
            uploading: false,
            scheduledLessons: [],
            lesson: {},
            myId: null,
            otherId: null,
            receivedFiles: [],

        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLoadFiles=this.handleLoadFiles.bind(this);



        this.droneChat = new window.Scaledrone("GkFOGe2cf6ht9lgH", {
            data: this.state.memberChat
        });
        this.droneChat.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.memberChat};
            member.id = this.droneChat.clientId;
            this.setState({memberChat: member});
        });
        const room = this.droneChat.subscribe("observable-room");
        room.on('data', (data, member) => {
            const messages = this.state.messagesChat;
            console.log("In room.on");
            console.log(messages);
            messages.push({member: member, text: data});
            console.log(messages);
            this.setState({messagesChat: messages});
        });
    }

    componentWillMount(): void {

        getScheduledLessons()
            .then(response => {
                this.setState({
                    scheduledLessons : response
                });
            });

        this.getLesson();

        getUserPrincipal()
            .then(response => {
                    this.setState({
                        myId: response.id
                    });
            });

        this.getOtherId();


    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getOtherId(){

        await this.sleep(2000);

        if(this.state.myId === this.state.lesson.mentorId)
            this.setState({
                otherId: this.state.lesson.menteeId
            });
        else this.setState({
            otherId: this.state.lesson.mentorId
        });

        console.log(this.state.myId);
        console.log(this.state.otherId);

    }

    async getLesson(){

        await this.sleep(2000);

        console.log(this.state.scheduledLessons.length);

        for(let i =0; i< this.state.scheduledLessons.length; i++)
        {

            if(Math.round((((new Date(this.state.scheduledLessons[i].scheduletAt).getMinutes() - new Date().getMinutes())) % 86400000) % 3600000) / 60000 <60)
            {
                this.setState({
                    lesson :this.state.scheduledLessons[i]
            });
            }

        }
        await this.sleep(2000);
        console.log(this.state.lesson);

    }


    click () {

        if (!window.location.hash) {
            window.location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        }
        const roomHash = window.location.hash.substring(1);
        const drone = new window.ScaleDrone('yiS12Ts5RdNhebyM');
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

        function sendMessage(message) {
            drone.publish({
                room: roomName,
                message
            });
        }

        function startWebRTC(isOfferer) {
            pc = new RTCPeerConnection(configuration);

            pc.onicecandidate = event => {
                if (event.candidate) {
                    sendMessage({'candidate': event.candidate});
                }
            };

            if (isOfferer) {
                pc.onnegotiationneeded = () => {
                    pc.createOffer().then(localDescCreated).catch(onError);
                }
            }

            pc.ontrack = event => {
                const stream = event.streams[0];
                if (!window.remoteVideo.srcObject
                    || window.remoteVideo.srcObject.id !== stream.id) {
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
            room.on('members', members => {
                console.log('MEMBERS', members);
                const isOfferer = members.length === 2;
                startWebRTC(isOfferer);
            });
        });

        function stop() {
            drone.close();

        }

    }


    handleSubmit(){
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
            formData.append('name', this.state.lesson.name);
            formData.append('other', this.state.otherId);
        });

        this.setState({
            uploading: true,
        });

        addTutoringFiles(formData)
            .then(response => {
                notification.success({
                    message: 'UTech',
                    description: "Thank you! Your lesson was succesfully saved",
                });
            }).catch(error => {
            notification.error({
                message: 'UTech',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    handleLoadFiles(){

        const formData = new FormData();
        console.log(this.state.lesson.name);

        formData.append('name', this.state.lesson.name);

        getTutoringFiles(formData)
            .then(response => {
                    this.setState({
                        receivedFiles: response
                    });
                    console.log(response);
            });

    }



    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div className="App">
                <div className="App-header">
                    <div>
                        <script type='text/javascript' src='https://cdn.scaledrone.com/scaledrone.min.js'/>

                        <meta charSet="utf-8"/>
                        <meta name="viewport" content="width=device-width"/>

                        <style
                            dangerouslySetInnerHTML={{__html: "\n     video {\n      max-width: calc(50% - 100px);\n      margin: 0 50px;\n      box-sizing: border-box;\n      border-radius: 2px;\n      padding: 0;\n      box-shadow: rgba(156, 172, 172, 0.2) 0px 2px 2px, rgba(156, 172, 172, 0.2) 0px 4px 4px, rgba(156, 172, 172, 0.2) 0px 8px 8px, rgba(156, 172, 172, 0.2) 0px 16px 16px, rgba(156, 172, 172, 0.2) 0px 32px 32px, rgba(156, 172, 172, 0.2) 0px 64px 64px;\n    }\n    .copy {\n      position: fixed;\n      top: 10px;\n      left: 50%;\n      transform: translateX(-50%);\n      font-size: 16px;\n      color: rgba(0, 0, 0, 0.5);\n    }\n  "}}/>
                        <video id="localVideo" autoPlay muted/>
                        <video id="remoteVideo" autoPlay/>
                        <Button
                            type="primary"
                            onClick={this.click}
                            style={{ marginTop: 16 }}
                        >Call
                        </Button>
                        <Link to="/review">Finish</Link>
                        {/*<CountDown style={{ fontSize: 20 }} target={targetTime} />*/}

                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Chat" key="1">
                        <Messages
                            messages={this.state.messagesChat}
                            currentMember={this.state.memberChat}
                        />
                        <InputMessage
                            placeholder = "Insert your message here"
                            onSendMessage={this.onSendMessage}
                        />
                    </TabPane>
                    <TabPane tab="Send files" key="2">

                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Select File
                            </Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </TabPane>
                    <TabPane tab="Receive files" key="3">

                        <Button
                            type="primary"
                            onClick={this.handleLoadFiles}
                            style={{ marginTop: 16 }}
                        >
                        </Button>

                    </TabPane>


                </Tabs>

            </div>
        );
    }

    onSendMessage = (message) => {
        this.droneChat.publish({
            room: "observable-room",
            message
        });
    }

}
export default StreamComponent;
