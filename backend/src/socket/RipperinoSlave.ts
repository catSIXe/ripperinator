import { Socket, Server } from 'socket.io';
import * as OBS from 'obs-websocket-js'

export default class RipperinoSlave {
    private OBS: OBS = new OBS();
    private client: Socket;
    public id: string;
    public time: number = -1;
    public duration: number = -1;
    public state: string = 'unknown';
    public fileTitle: string;

    constructor (client: Socket) {
        this.id = client.id
        this.client = client
        this.OBS.connect({
            address: `${ client.id }:4444`,
            // password: '123',
        })
        .then(() => {
            console.log('connected')
            this.OBS.send('StopRecording').catch(() => console.log('not recording'))
        })
    }
    getPublicStrucure() {
        const progress = this.time / this.duration
        return {
            id: this.id,
            time: this.time,
            duration: this.duration,
            progress,
            state: this.state,
            fileTitle: this.fileTitle,
        }
    }
    onTitle (message) {
        this.OBS.send('SetFilenameFormatting', {
            'filename-formatting': message.fileTitle,
        }).catch(console.error)
        this.fileTitle = message.fileTitle
    }
    onTime (message) {
        this.time = message[0]
        this.duration = message[1]
    }
    onStart (message) {
        console.log(this.id, 'start', message)
        this.state = 'recording'
        this.OBS.send('StartRecording').catch(console.error)
    }
    onResume (message) {
        console.log(this.id, 'resume', message)
        this.state = 'recording'
        this.OBS.send('ResumeRecording').catch(console.error)
    }
    onPaused (message) {
        console.log(this.id, 'paused', message)
        this.state = 'paused'
        this.OBS.send('PauseRecording').catch(console.error)
    }
    onEnded (message) {
        console.log(this.id, 'ended', message)
        this.state = 'stopped'
        this.OBS.send('StopRecording').catch(console.error)
    }
}