import axios from "axios";
import { Component} from 'react';
import { UserContext } from "../context/UserContext";

class AudioDubUpload extends Component {
    // Retrieve user context from AuthNavbar
    static contextType = UserContext;
    
    state = {
        audioFile: null!,
        videoFile: null!,
    };

    onAudioFileChange = (event:any) => {
        this.setState({ audioFile: event.target.files[0] });
    };

    onVideoFileChange = (event:any) => {
        this.setState({ videoFile: event.target.files[0] });
    };

    //   Post request to overwrite audio endpoint.
    //   Send user an email containing the new video
    onFileUpload = () => {
        alert("Files uploaded. Please check your email");
        const formData = new FormData();
      
        formData.append("audioFile", this.state.audioFile);
        formData.append("videoFile", this.state.videoFile);
        if (this.context.user && this.context.user.email) {
            formData.append("emailAddress", this.context.user?.email);
          }
      
        axios({
            method: "POST",
            auth: {
                username: 'lselkins',
                password: 'sVD4_VZC3nK8'
            },
            data: formData,
            url: "https://subgen.lselkins.com/overwrite_audio/",
          })
      };

    render() {
        return (
            <>
                <div className="pb-5"></div>
                <div className="container-fluid">
                    <div className='row pb-5 pt-3'>
                        <div className='col-11 col-lg-8 main-module p-5'>
                            <h4 className="pb-4" style={{ color:"#28A745"}}>Audio Dub Tool - Replace Video Audio</h4>
                            <div className="container-fluid">
                                <div className="row py-4" style={{borderBottom: "1px solid rgb(180, 180, 180)", borderTop: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-12">
                                        <p className="main-module-text pb-2">
                                            1. Upload the new audio file:
                                        </p>
                                        <input type="file" onChange={this.onAudioFileChange} />
                                    </div>
                                </div>
                                <div className="row py-4" style={{borderBottom: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-12">
                                        <p className="main-module-text pb-2">
                                            2. Upload the video file that will have its audio overwritten:
                                        </p>
                                        <input type="file" onChange={this.onVideoFileChange} />
                                    </div>
                                </div>
                                
                                <div className="row pt-5"> 
                                    <div className="col-12">
                                        {/* Disable button if user is not signed in or if either file is empty */}
                                        <button className="btn btn-primary" onClick={this.onFileUpload} disabled={(!this.context.user?.email) || (this.state.audioFile == undefined) || (this.state.videoFile == undefined)}>
                                            Overwrite Audio
                                        </button>
                                        <p className='text-center pt-3' style={{ color: "rgb(214, 52, 52)"}}>
                                            { this.context.user?.email
                                                ? ""
                                                : "Please Sign In" }
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
      
}

export default AudioDubUpload;
