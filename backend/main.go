package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// Response standard API response structure
type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func main() {
	// Router setup
	mux := http.NewServeMux()

	// Endpoints
	mux.HandleFunc("/api/health", healthCheckHandler)
	mux.HandleFunc("/api/inmates", getInmatesHandler)
	mux.HandleFunc("/api/alerts", getAlertsHandler)

	// Server config
	port := ":8080"
	server := &http.Server{
		Addr:         port,
		Handler:      loggingMiddleware(mux),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Printf("🚀 Backend Service running on http://localhost%s\n", port)
	log.Fatal(server.ListenAndServe())
}

// Middleware
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.RequestURI, time.Since(start))
	})
}

// Handlers
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, http.StatusOK, "System Operational", nil)
}

func getInmatesHandler(w http.ResponseWriter, r *http.Request) {
	// Mock data
	inmates := []map[string]interface{}{
		{"id": "A-102", "risk_level": "High", "heart_rate": 85, "location": "Cell Block C"},
		{"id": "B-405", "risk_level": "Low", "heart_rate": 72, "location": "Cafeteria"},
	}
	jsonResponse(w, http.StatusOK, "Inmate data retrieved", inmates)
}

func getAlertsHandler(w http.ResponseWriter, r *http.Request) {
	// Mock alerts
	alerts := []map[string]interface{}{
		{"timestamp": time.Now().String(), "severity": "CRITICAL", "message": "Unauthorized motion in Sector 4"},
	}
	jsonResponse(w, http.StatusOK, "Active alerts retrieved", alerts)
}

// Helper
func jsonResponse(w http.ResponseWriter, code int, message string, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(Response{
		Status:  http.StatusText(code),
		Message: message,
		Data:    data,
	})
}
