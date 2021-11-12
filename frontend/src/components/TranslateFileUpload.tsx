
import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';

class TranslateFileUpload extends Component {
    state = {
        selectedFile: null!
      };
    
    languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' }
    ]
      
      onFileChange = (event:any) => {
        this.setState({ selectedFile: event.target.files[0] });
      };


    onFileUpload = () => {
        const formData = new FormData();
      
        formData.append("file", this.state.selectedFile);
        formData.append("sourceLanguage", this.state.selectedFile);
        formData.append("selectedLanguage", this.state.selectedFile);
        formData.append("translatedAudio", "False")
      
        console.log(this.state.selectedFile);
        axios({
            method: "POST",
            headers: {
              Authorization: "Basic bHNlbGtpbnM6c1ZENF9WWkMzbks4=",
            },
            data: formData,
            url: "https://subgen.lselkins.com/translate_transcript/",
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
                                        {/* <Form.Group controlId="formFile">
                                            <Form.Control type="file" />
                                        </Form.Group> */}
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
                                        <Select options={this.languageOptions} />
                                    </div>
                                    <div className="col-6">
                                        <Select options={this.languageOptions} />
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <p className="main-module-text">
                                            3. Do you want a machine-generated audio file of the translation?
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
                                        />
                                        <Form.Check 
                                            inline
                                            defaultChecked
                                            type="radio"
                                            id="radio-2"
                                            name="Group1"
                                            label="No"
                                        />
                                    </div>
                                </div>
                                <div className="row pt-5">
                                    <div className="col-12">
                                        <button className="btn btn-primary" onClick={this.onFileUpload}>
                                            Get Translated Subtitles
                                        </button>
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
