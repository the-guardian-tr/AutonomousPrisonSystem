/*
 * Autonomous Prison System - IoT Sensor Node
 * Platform: ESP32 / Arduino
 * Version: 1.0.3
 */

#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <chrono>

// Mocking Arduino/Hardware libraries for simulation purposes
class Sensor {
public:
    std::string type;
    int id;

    Sensor(std::string t, int i) : type(t), id(i) {}

    float read() {
        // Return dummy values
        if (type == "TEMPERATURE") return 20.0 + (rand() % 10);
        if (type == "HEART_RATE") return 60 + (rand() % 40);
        if (type == "MOTION") return rand() % 2; // 0 or 1
        return 0.0;
    }
};

void transmit_data(std::string payload) {
    std::cout << "[WIFI] Transmitting: " << payload << " -> Gateway: 192.168.1.1" << std::endl;
}

int main() {
    std::cout << "--- IoT Sensor Node Booting ---" << std::endl;
    std::cout << "Initializing sensors..." << std::endl;

    Sensor tempSensor("TEMPERATURE", 101);
    Sensor motionSensor("MOTION", 102);

    while (true) {
        float temp = tempSensor.read();
        float motion = motionSensor.read();

        // Check for anomalies
        if (motion > 0) {
            std::string payload = "{ \"sensor_id\": 102, \"type\": \"MOTION\", \"val\": 1 }";
            transmit_data(payload);
        }

        // Periodic heartbeat
        std::cout << "System Status: NORMAL | Temp: " << temp << "C" << std::endl;

        // Sleep for 2 seconds
        std::this_thread::sleep_for(std::chrono::seconds(2));
    }

    return 0;
}
