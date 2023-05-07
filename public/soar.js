window.addEventListener('DOMContentLoaded', () => {
    document.getElementsByTagName("body")[0].classList.add("test")
    var style = document.createElement('style');
    style.classList.add("style-custom-el-wagyl")
    style.innerHTML =
        `
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

    
    
    `



    // Get the first script tag
    var ref = document.getElementsByTagName('head')[0];

    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);

    let int = setInterval(() => {
        if (document.getElementsByClassName("no-entries")[0]) {
            document.getElementsByClassName("no-entries")[0].innerHTML = "Welcome to the XSOAR playground, start playing..."
            clearInterval(int)
        } else {
            clearInterval(int)
        }
    }, 100);

})