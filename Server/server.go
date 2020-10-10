  
package main

import(
	// "fmt"
	"encoding/json"
	"log"
	"net/http"
	// "math/rand"
	// "strconv"
	"github.com/gorilla/mux"  // must be installed by "go get -u github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Comment struct {
	Text      string `json:"text"`
	Date      string `json:"date"`
	ID        string `json:"id"`
	Replay    string `json:"replay"`
	// Isbn      string `json:"isbn"`
	// Title     string `json:"title"`
	// Replay    *Replay `json:"replay"`
}

// type Replay struct {
// 	// Firstname    string `json:"firstname"`
// 	// Lastname     string `json:"lastname"`
// 	Text      string `json:"text"`
// 	Date      string `json:"date"`
// 	ID        string `json:"id"`
// }

var comments []Comment

// func getbooks(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "appication/json")
// 	json.NewEncoder(w).Encode(books)
// }
// func getbook(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r); //Get id
// 	for _, item := range books {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			return
// 		}
// 	}
// 	json.NewEncoder(w).Encode(&Book{})
// }
func createcomment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var comment Comment
	// _ = json.NewDecoder(r.Body).Decode(&book)
	// book.ID = strconv.Itoa(rand.Intn(1000000000))
	// books = append(books, book)
	// json.NewEncoder(w).Encode(book)

    // Try to decode the request body into the struct. If there is an error,
    // respond to the client with the error message and a 400 status code.
    err := json.NewDecoder(r.Body).Decode(&comment)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
	_ = json.NewDecoder(r.Body).Decode(&comment)
	json.NewEncoder(w).Encode(comment)
    // Do something with the Person struct...
    // fmt.Fprintf(w, "Person: %+v", comment)

}
// func updatebook(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for index, item := range books {
// 		if item.ID == params["id"] {
// 			books = append(books[:index], books[index+1:]...)
// 			var book Book
// 			_ = json.NewDecoder(r.Body).Decode(&book)
// 			book.ID = strconv.Itoa(rand.Intn(1000000000))
// 			books = append(books, book)
// 			json.NewEncoder(w).Encode(book)
// 		}
// 	}
// 	json.NewEncoder(w).Encode(books)
// }

func deletecomment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	// for index, item := range books {
	// 	if item.ID == params["id"] {
	// 		books = append(books[:index], books[index+1:]...)
	// 		break
	// 	}
	// }
	json.NewEncoder(w).Encode(params)
}

func main () {
	route := mux.NewRouter()

	// books = append(books, Book{ID: "1", Isbn:"44232", Title:"1984", Author: &Author{Firstname:"Goerge", Lastname:"Orvel"}})
	// books = append(books, Book{ID: "2", Isbn:"41232", Title:"Jungle", Author: &Author{Firstname:"Tom", Lastname:"Sea"}})
	// books = append(books, Book{ID: "3", Isbn:"44122", Title:"Winston", Author: &Author{Firstname:"Jack", Lastname:"Nail"}})

	// route.HandleFunc("/api/books", getbooks).Methods("GET")
	// route.HandleFunc("/api/book/{id}", getbook).Methods("GET")
	route.HandleFunc("/api/comment/add", createcomment).Methods("POST")
	// route.HandleFunc("/api/book/update/{id}", updatebook).Methods("PUT")
	route.HandleFunc("/api/comment/delete/{id}", deletecomment).Methods("GET")
	handler := cors.Default().Handler(route)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
