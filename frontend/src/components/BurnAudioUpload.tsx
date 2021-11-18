import axios from "axios";
import { Component} from 'react';
import { UserContext } from "../context/UserContext";

class BurnAudioUpload extends Component {
    // Retrieve user context from AuthNavbar
    static contextType = UserContext;
    
    state = {
        videoFile: null!,
        subtitleFile: null!,
    };

    onVideoFileChange = (event:any) => {
        this.setState({ videoFile: event.target.files[0] });
    };

    onSubtitleFileChange = (event:any) => {
        this.setState({ subtitleFile: event.target.files[0] });
    };

    //   Post request to burn captions endpoint.
    //   Send user an email containing the new video
    onFileUpload = () => {
        alert("Files uploaded. Please check your email");
        const formData = new FormData();
        
        formData.append("videoFile", this.state.videoFile);
        formData.append("subtitleFile", this.state.subtitleFile);
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
            url: "https://subgen.lselkins.com/burn_captions/",
          })
      };

    render() {
        return (
            <>
                <div className="pb-5"></div>
                <div className="container-fluid">
                    <div className='row pb-5 pt-3'>
                        <div className='col-11 col-lg-8 main-module p-5'>
                            <h4 className="pb-4" style={{ color:"#28A745"}}>Burn Subtitles Into a Video File</h4>
                            <div className="container-fluid">
                                <div className="row py-4" style={{borderBottom: "1px solid rgb(180, 180, 180)", borderTop: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-12">
                                        <p className="main-module-text pb-2">
                                            1. Upload the video file:
                                        </p>
                                        <input type="file" onChange={this.onVideoFileChange} />
                                    </div>
                                </div>
                                <div className="row py-4" style={{borderBottom: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-12">
                                        <p className="main-module-text pb-2">
                                            2. Upload the subtitle file:
                                        </p>
                                        <input type="file" onChange={this.onSubtitleFileChange} />
                                    </div>
                                </div>
                                
                                <div className="row pt-5"> 
                                    <div className="col-12">
                                        {/* Disable button if user is not signed in or if either file is empty */}
                                        <button className="btn btn-primary" onClick={this.onFileUpload} disabled={(!this.context.user?.email) || (this.state.videoFile == undefined) || (this.state.subtitleFile == undefined)}>
                                            Burn Subtitles Into Video
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

export default BurnAudioUpload;
