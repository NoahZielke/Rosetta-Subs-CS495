import axios, { AxiosResponse } from "axios";
import { Component, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { UserContext } from "../context/UserContext";
import downloadjs from "downloadjs";

class TranslateFileUpload extends Component {
    // Retrieve user context from AuthNavbar
    static contextType = UserContext;
    
    state = {
        selectedFile: null!,
        sourceLanguage: "English",
        targetLanguage: "English",
        translatedAudio: "False",
    };

    onFileChange = (event:any) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onSourceLangChange = (event:any) => {
        this.setState({ sourceLanguage: event.target.value });
    };

    onTargetLangChange = (event:any) => {
        this.setState({ targetLanguage: event.target.value });
    };

    onTranslatedAudioChange = (event:any) => { 
        this.setState({ translatedAudio: event.target.value });
    };

    //   Post request to translation endpoint.
    //   If the user selected the audio file option, send an email alert. If not, download the SRT file.
    //   This was done because downloadjs cannot deal with zips
    onFileUpload = () => {
        if(this.state.translatedAudio === "True") {
            alert("File uploaded. Please check your email");
        } else {
            alert("File uploaded. Click OK and wait for download");
        }
        
        const formData = new FormData();
      
        formData.append("file", this.state.selectedFile);
        formData.append("sourceLanguage", this.state.sourceLanguage);
        formData.append("targetLanguage", this.state.targetLanguage);
        formData.append("translatedAudio", this.state.translatedAudio);
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
            url: "https://subgen.lselkins.com/translate_transcript/",
          })
          .then(async (resp: AxiosResponse<any>) => {
                if(this.state.translatedAudio === "False") {
                    downloadjs(resp.data, "translatedSubtitles.srt", "text/plain");
                }
              })
      
      };

    render() {
        return (
            <>
                <div className="pb-5"></div>
                <div className="container-fluid">
                    <div className='row pb-5 pt-3'>
                        <div className='col-11 col-lg-8 main-module p-5'>
                            <h4 className="pb-4" style={{ color:"#28A745"}}>Generate A Subtitle File In Any Language</h4>
                            <div className="container-fluid">
                                <div className="row py-4" style={{borderBottom: "1px solid rgb(180, 180, 180)", borderTop: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-12">
                                        <p className="main-module-text pb-2">
                                            1. Upload the JSON file that you received in the email from the transcription tool:
                                        </p>
                                        <input type="file" onChange={this.onFileChange} />
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <p className="main-module-text">
                                            2. Enter language options:
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className="main-module-text">
                                            Original language of the video:
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="main-module-text">
                                            Target language after translation:
                                        </p>
                                    </div>
                                </div>
                                <div className="row pb-5" style={{borderBottom: "1px solid rgb(180, 180, 180)"}}>
                                    <div className="col-6">
                                        <Form.Control
                                            as="select"
                                            onChange={this.onSourceLangChange.bind(this)}
                                        >
                                            <option value="English">English</option>
                                            <option value="Arabic">Arabic</option>
                                            {/* <option value="Chinese (Simplified)">Chinese</option> */}
                                            <option value="Danish">Danish</option>
                                            <option value="Dutch">Dutch</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Icelandic">Icelandic</option>
                                            <option value="Italian">Italian</option>
                                            {/* <option value="Japanese">Japanese</option> */}
                                            <option value="Korean">Korean</option>
                                            <option value="Norwegian">Norwegian</option>
                                            <option value="Polish">Polish</option>
                                            <option value="Portuguese">Portuguese</option>
                                            <option value="Romanian">Romanian</option>
                                            <option value="Russian">Russian</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Swedish">Swedish</option>
                                            <option value="Turkish">Turkish</option>
                                            <option value="Welsh">Welsh</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-6">
                                        <Form.Control
                                            as="select"
                                            onChange={this.onTargetLangChange.bind(this)}
                                        >
                                            <option value="English">English</option>
                                            <option value="Arabic">Arabic</option>
                                            {/* <option value="Chinese (Simplified)">Chinese</option> */}
                                            <option value="Danish">Danish</option>
                                            <option value="Dutch">Dutch</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Icelandic">Icelandic</option>
                                            <option value="Italian">Italian</option>
                                            {/* <option value="Japanese">Japanese</option> */}
                                            <option value="Korean">Korean</option>
                                            <option value="Norwegian">Norwegian</option>
                                            <option value="Polish">Polish</option>
                                            <option value="Portuguese">Portuguese</option>
                                            <option value="Romanian">Romanian</option>
                                            <option value="Russian">Russian</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="Swedish">Swedish</option>
                                            <option value="Turkish">Turkish</option>
                                            <option value="Welsh">Welsh</option>
                                        </Form.Control>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <p className="main-module-text">
                                            3. Do you want a machine-generated audio file speaking the translation?
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Form.Check 
                                            inline
                                            type="radio"
                                            id="radio-1"
                                            name="Group1"
                                            label="Yes"
                                            value="True"
                                            onChange={this.onTranslatedAudioChange}
                                        />
                                        <Form.Check 
                                            inline
                                            defaultChecked
                                            type="radio"
                                            id="radio-2"
                                            name="Group1"
                                            value="False"
                                            label="No"
                                            onChange={this.onTranslatedAudioChange}
                                        />
                                    </div>
                                </div>
                                <div className="row pt-5"> 
                                    <div className="col-12">
                                        {/* Disable button if user is not signed in or if file is empty */}
                                        <button className="btn btn-primary" onClick={this.onFileUpload} disabled={(!this.context.user?.email) || (this.state.selectedFile == undefined)}>
                                            Get Translated Subtitles
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

export default TranslateFileUpload;
