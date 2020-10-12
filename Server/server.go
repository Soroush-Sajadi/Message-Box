  
package main

import(
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"  // must be installed by "go get -u github.com/gorilla/mux"
	"github.com/rs/cors"      // must be installed by "go get github.com/rs/cors"
)


type Comment struct {
	Text      	string    `json:"text"`
	Date      	string    `json:"date"`
	ID        	string    `json:"id"`
	Replies   	[]Reply   `json:"replies"`
	Replied   	bool      `json:"replied"`
	ViewReplies bool      `json:"viewReplies"`
}

type Reply struct {
	Text      	string `json:"text"`
	Date      	string `json:"date"`
	CommentID   string `json:"commentId"`
	ReplyID		string `json:"replyId"`
}

var comments []Comment

func getbooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "appication/json")
	json.NewEncoder(w).Encode(comments)
}

func createcomment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var comment Comment
	
    err := json.NewDecoder(r.Body).Decode(&comment)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	comments = append(comments, comment)
	_ = json.NewDecoder(r.Body).Decode(&comment)
	json.NewEncoder(w).Encode("It is done")

}
func createcommentreply (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var reply Reply
	err := json.NewDecoder(r.Body).Decode(&reply)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	for i, item := range comments {
		if item.ID == reply.CommentID {
			comments[i].Replies = append(comments[i].Replies, reply)
			json.NewEncoder(w).Encode(comments)
			return
		}
	}
}

func deletecomment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range comments {
		if item.ID == params["id"] {
			comments = append(comments[:index], comments[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(params)
}

func deletecommentreply (w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, item := range comments {
		if item.ID == params["commentid"] {
			for index, item := range comments[i].Replies {
				if (item.ReplyID == params["replyid"]){
				comments[i].Replies = append(comments[i].Replies[:index], comments[i].Replies[index+1:]...)
				break
				}
			}
		}
	}
}

func main () {
	route := mux.NewRouter()

	comments = append(comments, Comment{Text: "What do you think about life?", Date:"20:29", ID:"1984212322", Replies:[]Reply{Reply{Text:"There are many answers to this question", Date:"14:15", CommentID:"1984212322", ReplyID:"132323"}}, Replied: false, ViewReplies:false})
	comments = append(comments, Comment{Text: "This song is the best", Date:"10:10", ID:"1984212321", Replies:[]Reply{Reply{Text:"right, best ever!", Date:"04:11", CommentID:"1984212321", ReplyID:"13232323"}}, Replied: false, ViewReplies:false})

	route.HandleFunc("/api/comments", getbooks).Methods("GET")
	route.HandleFunc("/api/comment/add", createcomment).Methods("POST")
	route.HandleFunc("/api/comment/reply/add", createcommentreply).Methods("POST")
	route.HandleFunc("/api/comment/delete/{id}", deletecomment).Methods("GET")
	route.HandleFunc("/api/comment/reply/delete/{commentid}/{replyid}", deletecommentreply).Methods("GET")
	handler := cors.Default().Handler(route)
	log.Fatal(http.ListenAndServe(":8000", handler))
}
