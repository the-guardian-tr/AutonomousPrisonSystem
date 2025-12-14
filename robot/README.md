# 🤖 Autonomous Guard Robot

![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![ROS2](https://img.shields.io/badge/ROS2-Humble-22314E?style=for-the-badge&logo=ros&logoColor=white)

## 📌 Overview
The **Robot Module** controls the `GUARD-X` series autonomous patrol units. These robots patrol the facility 24/7, serving as mobile surveillance nodes that support human guards.

## ⚙️ Capabilities
- **SLAM Navigation**: Simultaneous Localization and Mapping for navigating dynamic prison environments.
- **Object Recognition**: Identifies inmates, staff, and contraband functionality.
- **Fleet Management**: Coordinative swarm behavior between multiple units.

## 🎮 Simulation
The `autonomous_patrol.py` script mimics the high-level decision logic of a patrol unit:
1.  **Navigation**: Uses A* pathfinding (simulated) to move between 'Zones'.
2.  **Vision**: Scans for anomalies upon arrival.
3.  **Power Management**: Auto-return to dock logic.

## 🔧 Hardware
- **Lidar**: Velodyne Puck VLP-16
- **Compute**: NVIDIA Jetson Orin Nano
- **Chassis**: Clearpath Jackal (Modified)

---
Part of the [Autonomous Prison System](../README.md) project.
