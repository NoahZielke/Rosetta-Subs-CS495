import { NonAuthNavbar } from "../components/NonAuthNavbar";

const LandingPage = () => {
  return (
    <div>
      <NonAuthNavbar active='home'/>

      <div className="pb-5"></div>

      <div className="container-fluid">
        <div className='row pb-5 pt-4'>
          <div className='col-lg-8 col-11 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              Rosetta-Subs is an app designed to make adding subtitles to a video
              in any language easy
            </p>
            <p className='main-module-text pb-3'>
              This browser-based application requires no setup on the part of the
              user:
            </p>
            <div className='pb-4'>
              <a href='/app-home' className='btn btn-success app-button'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-translate'
                  viewBox='0 0 16 16'>
                  <path d='M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z' />
                  <path d='M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z' />
                </svg>
                {/* icon source https://icons.getbootstrap.com/icons/translate/ */}
                {"\u00A0"} Go to the Web App
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row pb-5 pt-3'>
          <div className='col-11 col-lg-8 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              To view source code and instructions for running this app on your own
              server, visit our public Github page:
            </p>
            <div className='pb-4'>
              <a
                href='https://github.com/NoahZielke/Subtitle-Generator-cs495'
                target='_blank'
                rel='noreferrer'
                className='btn btn-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-github'
                  viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/github/ */}
                {"\u00A0"} Our Github Project
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row pt-3 pb-5'>
          <div className='col-11 col-lg-8 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              View a video demonstrating the app's functionality:
            </p>
            <div className="pb-4">
              <a
                href='https://www.youtube.com/watch?v=zkiebh9p5mE&ab_channel=NoahZielke'
                target='_blank'
                rel='noreferrer'
                className='btn btn-dark'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-youtube" 
                  viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/youtube/ */}
                {"\u00A0"} Video Tour of App 
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row pt-3 pb-5'>
          <div className='col-11 col-lg-8 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              View our individual sprint progress (UA box credentials required):
            </p>
            <div className='pb-4'>
              <a
                href='https://alabama.app.box.com/folder/146606344889'
                target='_blank'
                rel='noreferrer'
                className='btn btn-secondary'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-arrow-up-right-square" 
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/arrow-up-right-square/ */}
                {"\u00A0"} Sprint 1 Deliverables
              </a>
            </div>
            <div className="pb-4">
              <a
                href='https://alabama.app.box.com/folder/146234329999'
                target='_blank'
                rel='noreferrer'
                className='btn btn-danger'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-arrow-up-right-square" 
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/arrow-up-right-square/ */}
                {"\u00A0"} Sprint 2 Deliverables
              </a>
            </div>
            <div className="pb-4">
              <a
                href='https://alabama.app.box.com/folder/149946856697'
                target='_blank'
                rel='noreferrer'
                className='btn btn-info'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-arrow-up-right-square" 
                  viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/arrow-up-right-square/ */}
                {"\u00A0"} Sprint 3 Deliverables
              </a>
            </div>
          </div>
        </div>
      </div>
      

      <footer></footer>

      <div className='py-2 px-3 attribution'>
        App logo made by{" "}
        <a href='https://www.freepik.com' title='Freepik'>
          Freepik
        </a>{" "}
        from{" "}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
