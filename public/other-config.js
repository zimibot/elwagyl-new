window.localStorage.setItem("xdrActiveTheme", "dark")


console.log("before", new Date())


window.addEventListener('DOMContentLoaded', () => {
  console.log("after", new Date())


  if (document.getElementsByClassName("form-header")[0]) {
    document.getElementsByClassName("form-header")[0].innerHTML = "Sign To XDR EL WAGYL";
  }

  let path = window.location.href
  var text = path?.split("/")[3]?.split("?")[0]

  let textPath = path?.split("/")[2]

  if (textPath === "live.paloaltonetworks.com") {
    document.getElementsByTagName("body")[0].append(`
      <div style="position: fixed; left: 0; top: 0; height: 100%; display: flex; align-items: center; justify-content: center;">
        <button style="background-color: #00D8FF!; padding: 5px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        <button>
      </div>
    `)
  } else {
    document.getElementsByTagName("body")[0].style.backgroundColor = "transparent"
    document.getElementsByTagName("html")[0].style.backgroundColor = "transparent"
  }

  if (text === "logout") {
    window.location.href = "https://sockari.xdr.sg.paloaltonetworks.com"
  }

  if (document.getElementsByClassName("form-header")[0]) {
    let text = document.getElementsByClassName("form-header")[0].textContent

    if (text === "Page Expired") {
      window.location.href = "https://galadriel.xdr.sg.paloaltonetworks.com/dashboard"
    }
  }

  // // Get the first script tag
  // var ref = document.getElementsByTagName('head')[0];

  // // Insert our new styles before the first script tag
  // ref.parentNode.insertBefore(style, ref);

  let int = setInterval(() => {
    if (document.getElementsByClassName("no-entries")[0]) {
      document.getElementsByClassName("no-entries")[0].innerHTML = "Welcome to the XSOAR playground, start playing..."
      clearInterval(int)
    } else {
      clearInterval(int)
    }
  }, 100);

  const fontLink = document.createElement('link');
  fontLink.setAttribute('rel', 'stylesheet');
  fontLink.setAttribute('type', 'text/css');
  fontLink.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
  document.head.appendChild(fontLink);

  var style = document.createElement('style');
  const hostname = window.location.hostname;



  style.classList.add("style-custom-el-wagyl")

  style.innerHTML =
    `

      #fawkes-root.loading.prisma:after, #fawkes-root.prisma .sparky-logo {
        display: none!important;
      }
      
      .spk-load-container {
          display: none!important;
      }
      
      #fawkes-root.loading:before {
          display: none!important;
      }
  
      body,a,div,button,span,p {
        font-family: 'Rajdhani', sans-serif!important;
      }
      .amber-footer, .navigation-header, .orangebox {
        display:none!important;
      }
      .backgroundbg {
          color: white!important;
          background: #1414143b!important;
      }
      
      label.form-header {
          color: white!important;
      }
      
      .page-content {
          margin-top: 12rem;
      }

      .load_fixed {
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

      
  ::-webkit-scrollbar-track {
    height: 8px!important;
    border-radius: 8px!important;
    background-color: rgb(22, 47, 58)!important;
  }

  ::-webkit-scrollbar {
    height: 8px!important;
    width: 8px!important;
    background-color: rgb(22, 47, 58)!important;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px!important;
    background-color: #00D8FF!important;
  }


  .loader {
    --loader-color: #2eb69c;
    --loader-shadow-color: #2eb69c;
    --loader-part-size: 24px;
    --loader-size: calc(var(--loader-part-size) * 3);
    position: relative;
    width: var(--loader-size);
    height: var(--loader-size);
  }

  .loader.hidden {
    display: none;
  }

  .loader span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--loader-part-size);
    height: var(--loader-part-size);
    background-color: var(--loader-color);
    box-shadow: 0 0 6px var(--loader-shadow-color);
    transform-origin: center center;
    -webkit-animation: main 6s ease infinite, fading 6s ease infinite;
    animation: main 6s ease infinite, fading 6s ease infinite;
  }


  button.help {
    display: none!Important;
}

  .loader span:nth-child(1) {
    --translationValue: calc(var(--loader-part-size) / 4),
      calc(var(--loader-part-size) / 4);
    --translationValueWhenAssebled: var(--loader-part-size), 0px;
    --translationBeforeDisassembling: calc(var(--loader-part-size) / 4),
      calc(var(--loader-part-size) / 4 * -1);
    top: 0;
    left: var(--loader-part-size);
    -webkit-animation-delay: 0s, 0.2s;
    animation-delay: 0s, 0.2s;
  }

  .loader span:nth-child(2) {
    --translationValue: calc(var(--loader-part-size) / 4),
      calc(var(--loader-part-size) / 4 * -1);
    --translationValueWhenAssebled: 0px, calc(var(--loader-part-size) * -1);
    --translationBeforeDisassembling: calc(var(--loader-part-size) / 4 * -1),
      calc(var(--loader-part-size) / 4 * -1);
    top: var(--loader-part-size);
    left: 0;
  }

  .loader span:nth-child(3) {
    --translationValue: calc(var(--loader-part-size) / 4 * -1),
      calc(var(--loader-part-size) / 4);
    --translationValueWhenAssebled: 0px, var(--loader-part-size);
    --translationBeforeDisassembling: calc(var(--loader-part-size) / 4),
      calc(var(--loader-part-size) / 4);
    top: var(--loader-part-size);
    right: 0;
    -webkit-animation-delay: 0s, 0.4s;
    animation-delay: 0s, 0.4s;
  }

  .loader span:nth-child(4) {
    --translationValue: calc(var(--loader-part-size) / 4 * -1),
      calc(var(--loader-part-size) / 4 * -1);
    --translationValueWhenAssebled: calc(var(--loader-part-size) * -1), 0px;
    --translationBeforeDisassembling: calc(var(--loader-part-size) / 4 * -1),
      calc(var(--loader-part-size) / 4);
    bottom: 0;
    left: var(--loader-part-size);
    -webkit-animation-delay: 0s, 0.6s;
    animation-delay: 0s, 0.6s;
  }

      
    h2.header-title {
      color: white;
    }

    span.legend-label {
      color: white;
    }

  @-webkit-keyframes fading {
    0% {
      opacity: 1;
    }

    8% {
      opacity: 0.2;
    }

    16.6%,
    33.2% {
      opacity: 1;
    }

    41.6% {
      opacity: 0.2;
    }

    50%,
    66.6% {
      opacity: 1;
    }

    74.9% {
      opacity: 0.2;
    }

    83.2%,
    100% {
      opacity: 1;
    }
  }

  @keyframes fading {
    0% {
      opacity: 1;
    }

    8% {
      opacity: 0.2;
    }

    16.6%,
    33.2% {
      opacity: 1;
    }

    41.6% {
      opacity: 0.2;
    }

    50%,
    66.6% {
      opacity: 1;
    }

    74.9% {
      opacity: 0.2;
    }

    83.2%,
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes main {

    0%,
    25% {
      transform: rotate(0) translate(0, 0);
    }

    33.3%,
    58.3% {
      transform: rotate(45deg) translate(var(--translationValue));
    }

    62.45% {
      transform: rotate(90deg) translate(var(--translationValueWhenAssebled));
    }

    66.6%,
    91.6% {
      transform: rotate(135deg) translate(var(--translationBeforeDisassembling));
    }

    100% {
      transform: rotate(180deg) translate(0, 0);
    }
  }

  @keyframes main {

    0%,
    25% {
      transform: rotate(0) translate(0, 0);
    }

    33.3%,
    58.3% {
      transform: rotate(45deg) translate(var(--translationValue));
    }

    62.45% {
      transform: rotate(90deg) translate(var(--translationValueWhenAssebled));
    }

    66.6%,
    91.6% {
      transform: rotate(135deg) translate(var(--translationBeforeDisassembling));
    }

    100% {
      transform: rotate(180deg) translate(0, 0);
    }
  }

    header.dashboard-header {
        background: transparent!Important;
    }
    a.table-widget__tr {
        background-color: transparent!important;
    }
    .widget-container-wrapper, .aggrid-container.dark[_ngcontent-wkl-c187] .mailbox-aside[_ngcontent-wkl-c187] >.grid-container .ag-root .ag-header, .aggrid-container.dark[_ngcontent-wkl-c187] .mailbox-aside[_ngcontent-wkl-c187] >.grid-container .ag-root .ag-body-viewport, .grid-header, .pretty-ag-grid.ag-theme-fresh, .pretty-ag-grid.ag-theme-fresh .ag-root-wrapper, .xdr-widget-library, .native-wrapper, .general-overview-container, .incident-executions {
        background: rgba(22, 47, 58, 0.7)!important;
    }

    .widget {
        background: transparent!important;
        border: 0!important;
    }

    .widget-body {
        background: transparent!important;
    }

    .highcharts-background {
        fill: transparent;
    }

    .dashboard-selector {
        border: 0!important;
        background: #00000061;
        padding: 3px!important;
    }

    html {
      background: transparent;
  }
  
  header.dashboard-header {
      background: transparent!Important;
  }
  

  .widget {
      background: transparent!important;
      border: 0!important;
  }
  
  .widget-body {
      background: transparent!important;
  }
  
  .highcharts-background {
      fill: transparent;
  }
  
  .dashboard-selector {
      border: 0!important;
      background: #00000061;
      padding: 3px!important;
  }
  
  xdr-left-nav-shell {
      background: #00879F!important;
  }
  
  .nav-menu-top-divider {
      background: white!important;
  }
  
  .footer-divider {
      background: white!important;
  }
  
  input.navbar-search__input {
      color: white!important;
  }
  
  xdr-left-nav-footer {
      border-color: white!important;
  }
  
  secdo-ddl.dashboard-selector {
      background: #0000006b!important;
      color: white!important;
  }
  
  secdo-ddl.dashboard-selector::placeholder {
      color: white!important;
  }
  
  span.selected-item-text {
      color: white!important;
  }
  
  input.navbar-search__input::placeholder {
      color: white!important;
  }

      
  .track {
    display: none!important;
}
  
  .user-menu-container ul.menu-shell-menu-container li:last-child {
      display: none!important;
  }
  
  
  button.menu-shell-main-button.buttonClass.menu-displayed {
      background: #288b96ab!important;
      padding: 2px;
  }
  
  .aggrid-container.xdr-grid.light.histogram-hidden {
      background: transparent!important;
  }

  .aggrid-container.xdr-grid {
    background: transparent!important;
}


.ag-panw-theme {
    background: transparent!important;
}

.pretty-ag-grid.ag-theme-fresh, .pretty-ag-grid.ag-theme-fresh .ag-root-wrapper {
    border: 0;
}
a.header-link {
  display: none!important;
}

.nav-menu-top-divider {
  display: none;
}
.content-container {
  background: transparent;
}

.p-component .ag-body-viewport, .p-component input .ag-body-viewport, .p-component select .ag-body-viewport, .p-component textarea .ag-body-viewport, .p-component button .ag-body-viewport, .ag-dnd-host .ag-body-viewport, .ag-theme-fresh .ag-body-viewport {
    background: transparent;
}



xdr-icon.icon-decorative {
    opacity: 0.6;
}


button.toggle-btn {
  display: none!important;
}

.popover-body > ul > li:nth-child(2) {
  display: none;
}

.okta-sign-in-header.auth-header {
  display: none;
}

main#okta-sign-in {
  background: #152A36!important;
  border: 0!important;
}

#okta-sign-in.auth-container .okta-form-subtitle {
  color: white!important;
}

#okta-sign-in.auth-container.main-container {
  box-shadow: 0 0!important
}

#okta-sign-in.auth-container h2, #okta-sign-in.auth-container h3 {
  color: white!important;
}

#okta-sign-in a, #okta-sign-in abbr, #okta-sign-in acronym, #okta-sign-in address, #okta-sign-in applet, #okta-sign-in b, #okta-sign-in big, #okta-sign-in blockquote, #okta-sign-in body, #okta-sign-in caption, #okta-sign-in center, #okta-sign-in cite, #okta-sign-in code, #okta-sign-in dd, #okta-sign-in del, #okta-sign-in dfn, #okta-sign-in div, #okta-sign-in dl, #okta-sign-in dt, #okta-sign-in em, #okta-sign-in fieldset, #okta-sign-in form, #okta-sign-in h1, #okta-sign-in h2, #okta-sign-in h3, #okta-sign-in h4, #okta-sign-in h5, #okta-sign-in h6, #okta-sign-in html, #okta-sign-in i, #okta-sign-in iframe, #okta-sign-in img, #okta-sign-in ins, #okta-sign-in kbd, #okta-sign-in label, #okta-sign-in legend, #okta-sign-in li, #okta-sign-in object, #okta-sign-in ol, #okta-sign-in p, #okta-sign-in pre, #okta-sign-in q, #okta-sign-in s, #okta-sign-in samp, #okta-sign-in small, #okta-sign-in span, #okta-sign-in strike, #okta-sign-in strong, #okta-sign-in sub, #okta-sign-in sup, #okta-sign-in table, #okta-sign-in tbody, #okta-sign-in td, #okta-sign-in tfoot, #okta-sign-in th, #okta-sign-in thead, #okta-sign-in tr, #okta-sign-in tt, #okta-sign-in u, #okta-sign-in ul, #okta-sign-in var {
  color: white!important;
}

#okta-sign-in.auth-container .button {
  background: transparent!important;
  border: 1px solid #00cdfb!important;
}

ul.list-content > li:nth-child(1), ul.list-content > li:nth-child(2) {
  display: none!important;
}

ul.list-content > li {
  margin: 0!important;
}

#okta-sign-in .ajax-form-editor .infobox, #okta-sign-in .edit-form .infobox, #okta-sign-in .form-content-wrap .infobox, #okta-sign-in .m-form .infobox, #okta-sign-in .o-form .infobox, #okta-sign-in .read-only-form .infobox, #okta-sign-in .v-form .infobox {
  background: transparent!important;
  border: 1px solid #212529!important;
}

#okta-sign-in .o-form .input-fix input[type=number], #okta-sign-in .o-form .input-fix input[type=password], #okta-sign-in .o-form .input-fix input[type=tel], #okta-sign-in .o-form .input-fix input[type=text], #okta-sign-in .o-form .input-fix input[type=textbox] {
  color: white;
}

#okta-sign-in.auth-container .okta-form-input-field {
  background: #5e5e5e!important;
  border: 0px solid #00a1ff!important;
}

  img.demisto-logo {
      display: none;
  }


  .custom-logo-container {
      display: none!important;
  }

  .two-parts-logo-container {
      display: none!important;
  }

  .investigation-menu {
      top: 0!important;
      margin: 0!Important;
  }

  [data-test-id="marketplace-menu-item"] {
      display: none!important;
  }

  .search-tips > span > a {
      display: none;
  }

  .search-tips > span > span:nth-child(6) {
      display: none;
  }


  a.empty-state-subTitle-link {
      display: none;
  }

  span.demisto-logo-mini {
      display: none!important;
  }


.backgroundbg {
  background: transparent!important;
}

#okta-sign-in.auth-container input[type=submit] {
  color: white!important;
  background: #343a40!important;
  border: 0!important;
}

body.ext-webkit.ext-chrome {
  background: transparent!important;
}

.login_fields > img {
  display: none!important;
}

.login_fields {
  background: #022c34!important;
  border: 0!important;
  margin: auto!important;
  position: absolute!important;
}

.login_fields:before {
  content: none!important;
}


#formdiv #taLogin input[type='text'], #formdiv #taLogin input[type='password'] {
  padding: 10px!important;
  background: #117a8b!important;
  border: 0!important;
  color: white!important;
  height: 50px!important;
  font-size: 15px!important;
}

#formdiv #taLogin input[type='text']::placeholder, #formdiv #taLogin input[type='password']::placeholder {
  color: white!Important;
}

div#trLoginBtn > input {
  width: 100%;
  border-radius: 0!important;
  font-size: 1.3rem;
  text-transform: uppercase;
  height: auto!important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px!important;
  margin: 0;
}

.buttonFixed[disabled] {
  background: #495057!important;
}

div#taLogin {
  position: absolute!important;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center!important;
}
    
div#dError {
  padding: 10px!important;
  background: #d94949!important;
  color: white!important;
  position: absolute!important;
  width: 100%!important;
  left: 0!important;
}

.login-container .login-cover {
  display: none!important;
}

.login-container {
  background: transparent!important;
}

div#notfound {
  background: transparent!important;
}
.notfound .notfound-404 h1 {
  font-family: montserrat,sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  font-size: 224px;
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -12px;
  color: #141414;
  text-transform: uppercase;
  text-shadow: -1px -1px 0 #ff0000, 1px 1px 0 #00cdfb;
  letter-spacing: -20px;
}
    `

  // Get the first script tag
  var ref = document.getElementsByTagName('head')[0];


  var styleSoar = document.createElement('style');



  style.classList.add("style-custom-el-wagyl")

  if (hostname === "10.22.24.2") {

    styleSoar.innerHTML = `
    body {
      background: transparent!important
    }
  `
  }


  // Insert our new styles before the first script tag

  ref.parentNode.insertBefore(styleSoar, ref.nextSibling.nextSibling)
  ref.parentNode.insertBefore(style, ref.nextSibling.nextSibling)


  awaitForm()

  let element404 = document.getElementsByClassName("notfound-404")
  let elementBtn = document.getElementsByClassName("notfound")
  if (elementBtn) {
    elementBtn = elementBtn[0]
    let link = elementBtn.getElementsByTagName("a")[0]
    link.remove()
  }
  if (element404) {
    element404 = element404[0]
    let h1 = element404.getElementsByTagName("h1")[0]
    let h2 = element404.getElementsByTagName("h2")[0]

    h1.innerText = "ERROR"
    h2.innerText = 'Sase is not yet integrated'
  }

})

function awaitForm() {
  var loading = document.createElement('div');
  let div = document.createElement("div")
  loading.classList.add("load_fixed")
  div.classList.add("loader")
  for (let index = 0; index < 4; index++) {
    let span = document.createElement("span")
    div.append(span)
  }
  loading.append(div)
  // var ref = document.getElementsByTagName('body')[0];

  // ref.parentNode.insertBefore(loading, ref);

  if (document.getElementsByClassName("form-control")[0]) {

    // document.getElementsByClassName("form-control")[0].value = "haris.munahar@aray.ma"
    // document.getElementsByTagName("form")[0].submit()
  }
  if (document.getElementById("divpassword")?.querySelectorAll("input")[0]) {
    // ref.parentNode.insertBefore(loading, ref);
    // var x = document.getElementById("divpassword").querySelectorAll("input");
    // x[0].value = "Z6#!zJLXeXQ-TzD"
    // document.getElementsByTagName("form")[0].submit()
  } else {
    setInterval(() => {
      var a = document.getElementsByTagName("body")[0].querySelectorAll("a");
      a.forEach(d => {
        d.removeAttribute("target")
      })
    }, 500);
  }

}