import { useHistory } from "react-router";
// Below is needed to ignore href requirement for <a> tags -> we use history.push for routing
/* eslint-disable jsx-a11y/anchor-is-valid */ 

export const ToolMenu = () => {
    const history = useHistory();
    return (
        <>
            <div className="pb-5"></div>
                <div className="container-fluid">
                    <div className='row pb-5 pt-3'>
                    <div className='col-11 col-lg-8 main-module'>
                        <h3 className="px-5 py-4" style={{ color: "#33b953" }}>Select A Tool To Begin </h3>
                        {/* Note: for all items - Strange href value is to prevent a npm linting warning. Routing is done via history.push */}
                        <div className='py-3 tool-select-div' style={{ borderTop: "1px solid rgb(180, 180, 180)"}}>
                            <a onClick={() => { history.push('/app-transcribe'); }} className="tool-menu">
                                Get Subtitle File From Video/Audio
                            </a>
                        </div>
                        <div className='py-3 tool-select-div'>
                            <a onClick={() => { history.push('/app-translate'); }} style={{cursor: "pointer"}} className="tool-menu">
                                Translate Subtitle File
                            </a>
                        </div>
                        <div className='py-3 tool-select-div'>
                            <a onClick={() => { history.push('/app-dub-audio'); }} className="tool-menu">
                                Overwrite Audio With Translated Dub
                            </a>
                        </div>
                        <div className='py-3 tool-select-div'>
                            <a onClick={() => { history.push('/app-burn-subtitles'); }} className="tool-menu">
                                Burn Subtitles Into Video File
                            </a>
                        </div>
                        <div className="py-3"></div>
                    </div>
                </div>
            </div>
        </>
    )
};