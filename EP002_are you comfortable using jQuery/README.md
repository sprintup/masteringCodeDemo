- [ ] practice traditional AJAX requests with fetch API, promises, old xml http request method
    - [ ] be comfortable with jQuery's access to these features
- included full jQuery for AJAX stuff
- just figured out that EP001 did not map to the first episode and the files for that episode were in yesterday's directory
- I'm just going to keep everything in a flat directory structure to avoid complications with relative directory bugs
- had to adjust the relative directory of the ajax call and include the scripts file in the html
- getting cors error on embedded jquery package, I was trying to use slim version of jQuery that has some things removed
- still getting cors error, had to research [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)
- The error is 
 - Access to XMLHttpRequest at '*local path to data file*' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
 - So it seems that I have to put the data file on a server in order to use the https protocol
 - further research unveils changes to the cors policy by [firefox](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp) 
 - chrome on [cross-origin xmlhttprequest](https://developer.chrome.com/extensions/xhr)
 - also came across [The Web Origin Concept](https://tools.ietf.org/html/rfc6454)
 - [3 ways to fix the cors error and how access control allow origin works](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)
 - [cross-origin requests are only supported for http error when loading a local Stack Overflow](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local)
 - Ok so I initilized a new npm project with [express](http://expressjs.com/en/starter/hello-world.html) in the root directory to use the server throughout the rest of the challenges
- using snippet from article to [set up proxy](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)
- I moved data out of project into root directory so as to not duplicate data across challenges
- [ ] figure out how to run debugger in vscode