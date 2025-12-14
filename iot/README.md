# 📡 IoT Sensor Network

![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)

## 📌 Overview
The **IoT Module** manages the fleet of sensors deployed throughout the prison facility. These nodes collect environmental and biometric data and transmit it to the backend via secure Wi-Fi or LoRaWAN protocols.

## 🔌 Hardware Specs
- **Controller**: ESP32 / STM32
- **Biometrics**: MAX30102 Pulse Oximeter
- **Environment**: DHT22 (Temp/Hum), PIR Motion Sensors

## 💻 Firmware
The `sensor_node.cpp` provides the core logic for:
1.  Sensor initialization.
2.  Data acquisition loop.
3.  Anomaly detection (e.g., sudden motion in restricted zones).
4.  Data transmission to the Gateway.

---
Part of the [Autonomous Prison System](../README.md) project.
