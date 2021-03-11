<h1 id="Create a server to connect a Webflow CMS to an API">Create a server to connect a Webflow CMS to an API</h1>


<p>This explains how to set up a server with a script that gathers data from an API (in this case   <a href="https://spacelaunchnow.me/">Space Launch Now</a> ) and writes it to your webflow CMS. </p>


<p>The goal of this tutorial is to give you a working project as a template and to explain the tools needed to modify it to your heart’s content. I’m happy answer questions.</p>


<h3 id="HOW THIS WORKS:">HOW THIS WORKS:</h3>
<p>The script uses Node.js to call the spacelaunchnow api to retrieve spacecrafts data. It then calls your CMS collection using the webflow API to see if the items exist in the collection. If they do exist it will update the data. If an item is missing it will create it. It then publishes the results which will appear on the Webflow page.</p>
<p>The script is pushed to GitHub and runs on Heroku.</p>

<ul><li>Request data from spacelunachnow API
</li><li>Post data to the Webflow API
</li><li>If data exists
</li><li>Update the data
</li><li>If not
</li><li>create the data
</li><li>Webflow Updates the UI
</li></ul>

<p>There will be a server, dependencies, a build, and some muddy  waters but should be ok for beginners with a little code experience.</p>


<p><b>PREREQUISITS:</b></p>
<ul><li>Familiarity with Github and git commands.
</li><li>Familiarity with Webflow.
</li><li>Familiarity the Node ecosystem. 
</li><li>A Heroku account.
</li></ul>


<p>Here is the end result: </p>
<p> <a href="https://ondines-space-project-b7af6c657a1f9e414.webflow.io/?68df6a91_page=19&a96fc93c_page=9">Ondine’s Space Project</a> </p>
<p>To see it in action you will have to clone the Webflow project and delete all the items in the collection. Then publish and reload the site. </p>
<p> <a href="https://webflow.com/design/ondines-space-project-b7af6c657a1f9e414">Webflow Space Project</a> </p>


<h3 id="WHAT HAPPENS:">WHAT HAPPENS:</h3>
<p>At the click of a button on the webpage, a  call is made to a script hosted on Heroku. Heroku runs this node/express script that calls a space API with a list of spacecrafts parameters returned as JSON. The JSON gets written to your webflow page CMS using the Webflow api and published.</p>
<p>You then reload the page to see the results appear.</p>
<p>You can delete all the items in your collection and they will be repopulated by the script.</p>


<p><img src='images/604a9fbb0c841da4f0e816a3_Diagram-min.png'></p>


<p>This is a step up from Tania Roscoe’s tutorial  and Gautam’s Webflow page but still straightforward</p>
<p>Tania’s   <a href="https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/">How to Connect to an API with JavaScript | Tania Rascia</a> </p>
<p>Gautam’s  <a href="https://gts-webflow-playground.webflow.io/samples/fetch-data-from-external-api-to-webflow">Fetch data from external API to Webflow | Webflow Development</a> </p>


<h3 id="Project Resources">Project Resources</h3>


<p>The Webflow page to clone</p>
<p> <a href="https://webflow.com/design/ondines-space-project-b7af6c657a1f9e414">Webflow - RobotMermaidSpaceProject</a> </p>


<p>The Github code to clone</p>
<p> <a href="https://github.com/RobotMermaid/WebflowSpaceApi">GitHub - RobotMermaid/WebflowSpaceApi</a> </p>


<h3 id="DEPENDENCIES and TOOLS:">DEPENDENCIES and TOOLS:</h3>


<p><b>Terminal</b></p>

<p>On a Mac hit  command space and type in terminal</p>
<p>This will open up a terminal window</p>
<p> <a href="https://dev.to/kymiddleton/reference-guide-common-commands-for-terminal-6no">Terminal Commands: Reference Guide: Common Commands for Terminal - DEV Community</a> </p>
<p>We will be using it to push to GitHub and heroku and to install dependencies.</p>


<p>*Npm *</p>

<p>NPM – or “Node Package Manager” – is the default package manager for JavaScript’s runtime Node.js.</p>
<p>It’s a CLI (command-line interface) tool for publishing and downloading packages, and it’s an  online repository that hosts JavaScript packages.</p>
<p>It is a simple way of getting all the code Node needs to work.</p>
<p>The package.json will list what we need and  when we run the command </p>
<p>npm install  it will get everything set up the way we need it.</p>


<p>*Node *</p>

<p> <a href="https://nodejs.org/en/about/">About | Node.js</a> </p>
<p>It’s a JavaScript runtime environment which allows the infrastructure to build and run an application.</p>
<p>Node makes it really fast to build real-time, high-traffic apps. It makes it possible to code in JavaScript for both the client and server side.</p>


<p><b>CORS</b></p>

<p> <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">Cross-Origin Resource Sharing (CORS) - HTTP | MDN</a> </p>
<p>Cross-Origin Resource Sharing is an  HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. </p>
<p>Heroku will have issues with our script without this.</p>
<p>We have an API calling another API and this requires a security policy set on the server.</p>


<p>The good news is express will take care of this for us with this simple line</p>
<p>app.use(cors())</p>


<p>This allows anyone to make a request to this server from a webpage. More careful consideration should be taken when opening up an API for anything more serious than a learning project.</p>


<p><b>Express</b></p>

<p>is a   <a href="https://en.wikipedia.org/wiki/Front_end_and_back_end">back end</a>     <a href="https://en.wikipedia.org/wiki/Web_application_framework">web application framework</a>   for   <a href="https://en.wikipedia.org/wiki/Node.js">Node.js</a>  ,  <a href="https://en.wikipedia.org/wiki/Express.js">Express.js - Wikipedia</a> </p>
<p>Express, is ubiquitous and fully documented  Node.js web server. It is designed for building  web applications and  APIs. It simply helps to organize your web application and takes care of things such as CORS for you.</p>


<p><b>Isomorphic fetch</b></p>

<p>is just to make the api calls  <a href="https://github.com/matthew-andrews/isomorphic-fetch">GitHub - matthew-andrews/isomorphic-fetch: Isomorphic WHATWG Fetch API, for Node & Browserify</a> </p>


<p><b>Webflow API</b></p>

<p>Webflow’s very own API including clean examples in Javascript and curl as well as their usual cheeky educational videos.</p>
<p>Will be added by the npm install since it’s in our package.json</p>
<p> <a href="https://developers.webflow.com/">https://developers.webflow.com/</a> </p>



<p><b>XMLHttpRequest</b></p>

<p>We will use this in our webflow page to trigger the Heroku script.</p>
<p>The ‘Refresh Data’ button in Webflow has to have an Id of ‘refresh’ which the embed code refers to.</p>
<p><img src='images/604aa3728b5cab7d11cfdd38_embed-min.png'></p>
<p>There needs to be an embed to your page with this in it:</p>
<p><img src='images/604aa3f8a4aa8eed48c89a28_embedWF-min.png'></p>
<p><script></p>
<p>      var request = new XMLHttpRequest()</p>
<p>      document.getElementById(‘BUTTON_ID’).onclick = e => {</p>
<p>           request.open(‘GET’, ‘<a href="https://spacecraft-webflow.herokuapp.com/%E2%80%98">https://spacecraft-webflow.herokuapp.com/‘</a>, true)</p>
<p>           request.send();</p>
<p>        } </p>
<p></script></p>


<p><b>.gitignore</b></p>

<p>There are some things you simply don’t need to add to your GitHub or heroku repositories since everyone gets them through the npm install or they are secret.</p>
<p>This is a very simple file name .gitgnore that just lists which files to ignore</p>
<p>/node_modules</p>
<p>npm-debug.log</p>
<p>.DS_Store</p>
<p>/*.env</p>


<p><b>Environment Variables</b></p>

<p>You shouldn’t expose certain data so we have ways to keep you high security info in such as your access token.</p>
<p>These are:</p>
<p>TOKEN, DOMAINS, SITEID, and COLLECTIONID</p>
<p>In the next section GETTING YOUR SITE DATA we will look at how to get these ids.</p>


<p><b>Config Vars - Heroku</b></p>
<p>You will need to add these secret variables to heroku</p>
<p>In server.js Heroku will know to use this info where you have process.env.TOKEN</p>
<p>It will also be setting the PORT variable for you.</p>


<p>To set Heroku’s config variables:</p>
<p>In your dashboard go to settings</p>
<p>By the config vars click reveal config vars </p>
<p>Add TOKEN in key field and the API key in the value field (no quotes)</p>

<p><img src='images/604aa018bce5696077296ed2_configVarsHeroku-min.png'></p>


<p>TOKEN=‘yourapikey’</p>
<p>DOMAINS=‘<a href="http://your-space-project-1234.webflow.io">your-space-project-1234.webflow.io</a>’</p>
<p>SITEID=‘1otherreallylongnumber9’</p>
<p>COLLECTIONID=‘1morereallylongnumber9’</p>
<p>.env for Node</p>
<p>You will only need this to run your script locally.</p>


<p>TOKEN=‘1reallylongnumber9’</p>
<p>DOMAINS=‘<a href="http://your-space-project-1234.webflow.io">your-space-project-1234.webflow.io</a>’</p>
<p>SITEID=‘1otherreallylongnumber9’</p>
<p>COLLECTIONID=‘1morereallylongnumber9’</p>
<p>You will also need to add the dotenv module with </p>
<p>npm install dotenv</p>


<p>And uncomment require(‘dotenv’).config()  in server.js.</p>




<h3 id="GETTING YOUR SITE DATA">GETTING YOUR SITE DATA</h3>


<p>Once you have cloned the Webflow repo you will need to update server.js with your own ids.</p>


<p><b>GET WEBFLOW SITE IDS:</b></p>


<p><b>API key</b></p>
<p>You will need to get your own API token from your webflow page.</p>
<p>Generating an api key to access your WebfLow CMS</p>
<p> <a href="https://university.webflow.com/lesson/intro-to-the-webflow-api#generating-an-api-access-token">Intro to the Webflow API | Webflow University</a> </p>


<p>Get domain name site id and collection id</p>
<p>You can paste these directly in your browser’s address bar and you will get a JSON response.</p>
<p>To get your SITEID</p>
<p><a href="https://api.webflow.com/sites?access_token=YOUR_API_TOKEN&api_version=1.0.0">https://api.webflow.com/sites?access_token=YOUR_API_TOKEN&api_version=1.0.0</a></p>
<p>To get your COLLECTIONID</p>
<p><a href="https://api.webflow.com/sites/YOUR_SITE_ID/collections?access_token=YOUR_API_TOKEN&api_version=1.0.0">https://api.webflow.com/sites/YOUR_SITE_ID/collections?access_token=YOUR_API_TOKEN&api_version=1.0.0</a></p>
<p>To get you DOMAINS</p>
<p>Your domain will be what is in the subdomain field under General Settings in webflow ‘ <a href="http://ondines-space-project-b7af6c657a1f9e414.webflow.io/">ondines-space-project-b7af6c657a1f9e414.webflow.io</a> ’</p>


<p>You will need to have a Webflow site with a collection that includes all the fields you will be using.</p>
<p>The names must match your script. To see the names used in the collection item call the webflow api.</p>
<p>To get the field names used in your collection paste this in your browser’s address bar</p>
<p><a href="https://api.webflow.com/sites/YOUR_SITE_ID/collections/collectionId/items?access_token=YOUR_API_TOKEN&api_version=1.0.0">https://api.webflow.com/sites/YOUR_SITE_ID/collections/collectionId/items?access_token=YOUR_API_TOKEN&api_version=1.0.0</a></p>


<h3 id="Get the code from Github">Get the code from Github</h3>


<p><b>Git fork</b></p>
<p>you can fork by signing in on   <a href="http://github.com/">github.com</a>  </p>
<p>and hitting “Fork” on the repository you want to fork. (Top right corner)</p>
<p><img src='images/604aa14c25fb0f00774e4d4b_GithubFork-min.png'></p>


<p>This will create an identical copy of the WebflowSpaceApi in your GitHub .</p>
<p><b>To fork a repo:</b></p>
<ol start="1"><li>Navigate to the repo page that you wish to fork :
</li></ol>
<p> <a href="https://github.com/RobotMermaid/WebflowSpaceApi">https://github.com/RobotMermaid/WebflowSpaceApi</a> </p>
<ol start="1"><li>On that page, you will see a button in the UPPER RIGHT hand corner that says Fork.
</li><li>Click on the Fork button and select your user account when it asks you where you want to fork the repo.
</li><li>Once you have forked the repo, you will have a copy of it in your account. Navigate to your repo page. The url should look something like this:
</li></ol>


<ul><li> <a href="https://github.com/your-user-name/WebflowSpaceApi">https://github.com/your-user-name/WebflowSpaceApi</a> 
</li></ul>


<ol start="1"><li>Run the following commands in the terminal to download the project to your computer
</li></ol>


<p>git clone  <a href="https://github.com/your-username/WebflowSpaceApi.git">https://github.com/your-username/WebflowSpaceApi.git</a></p>
<p>cd WebflowSpaceApi/  </p>
<p>  </p>
<p>Now you have your own version of the project on your computer and you are in the WebflowSpaceApi folder</p>
<p>git remote -v</p>
<p>shows what repo your are connected to - should show your github version of the space api</p>
<p>git status</p>
<p>shows what files have the changes you have made</p>
<p>git add .</p>
<p>adds everything you will want to upload to your GitHub repo</p>
<p>git commit -m “message that describes what you are adding to your repo so you will remember later what you mean”</p>
<p>git push origin main</p>
<p>pushes those changed files from the local copy of a repository to the cloud.</p>



<p><b>Helpful git instructions:</b></p>
<p> <a href="https://www.earthdatascience.org/workshops/intro-version-control-git/basic-git-commands/">First steps with git: clone, add, commit, push | Earth Data Science - Earth Lab</a> </p>




<h3 id="Setup your script locally">Setup your script locally</h3>


<p>Once you have the scrip locally you will need to install the decencies</p>
<p>npm install</p>
<p>Test your code locally with command</p>
<p>Node server.js</p>
<p>This will run your code on your computer and should write the data to your webflow CMS without having sent anything to heroku</p>


<p><b>Push to git host on heroku</b></p>


<p>Connection GitHub to Heroku is super easy.</p>
<p>In your dashboard under Deploy there is a Deployment Method section where you can simply click to connect to Github.</p>
<p> <a href="https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/">How to deploy a NodeJS app to Heroku from Github (without installing Heroku on your machine)</a> </p>
<p>I</p>
<p> <a href="https://devcenter.heroku.com/articles/github-integration">GitHub Integration (Heroku GitHub Deploys) | Heroku Dev Center</a> </p>
<p><img src='images/604a9e850eb9604fe908839c_HerokuSetup-min.png'></p>

<p>‍</p>

