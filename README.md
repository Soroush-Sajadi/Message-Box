# Message-Box
Here is my code for a comments box.<br>
In this web app user is abled to write and reply comments.<br>
User is also abled to remove and view comments.<br>
<br>
How to run the app?<br>
After app is cloned you need to change direction to Client -> msgbox.<br>
When you are in msgbox directory use command npm install and when its done run command npm start.<br>
...\Message-Box\Client\msgbox>npm install<br>
...\Message-Box\Client\msgbox>npm start<br>
After installation open a new terminal and go back to Message-Box directory and change directory to Server.<br>
Then use two commands, go get -u github.com/gorilla/mux and go get github.com/rs/cors to install server dependencies.<br>
...\Message-Box\Server>go get -u github.com/gorilla/mux<br>
...\Message-Box\Server>go get -u github.com/rs/cors<br>
When it is done use command go run server.go to run the server.<br>
...\Message-Box\Server\go run server.go<br>
The app is serving on port http://localhost:3000. To make sure everything is fine reload the page <br>

