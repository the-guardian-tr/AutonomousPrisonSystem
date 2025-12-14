import time
import random
import json

class AutonomousPatrol:
    def __init__(self, bot_id="GUARD-X9"):
        self.bot_id = bot_id
        self.battery = 100
        self.status = "CHARGING"
        self.location = "DOCK_STATION"
        print(f"🤖 {self.bot_id} Online. System initialized.")

    def navigate_to(self, zone):
        print(f"📍 Navigating to {zone}...")
        self.status = "MOVING"
        self.consume_battery(5)
        time.sleep(1) # Simulate travel time
        self.location = zone
        self.status = "PATROLLING"
        print(f"🏁 Arrived at {zone}.")

    def scan_area(self):
        print(f"🔍 Scanning {self.location}...")
        self.consume_battery(2)
        # Simulate visual recognition
        found_entities = random.choice([
            "Empty Hallway", "Inmate #402 (Authorized)", "Unknown Object", "Guard Personnel"
        ])
        
        report = {
            "timestamp": time.time(),
            "bot_id": self.bot_id,
            "location": self.location,
            "visual_scan": found_entities,
            "battery": f"{self.battery}%"
        }
        
        if "Unknown" in found_entities:
            print(f"⚠️ ANOMALY DETECTED: {found_entities}")
            report["alert"] = "HIGH"
        else:
            print(f"✅ Area Check: Nominal ({found_entities})")
            
        return report

    def consume_battery(self, amount):
        self.battery -= amount
        if self.battery < 20:
            print("🔋 Low Battery! Returning to Dock.")
            self.status = "RETURNING"

    def patrol_routine(self):
        zones = ["Cell Block A", "Cafeteria", "Yard", "Isolation Ward"]
        print("🚀 Starting Patrol Routine...")
        
        while self.battery > 20:
            target = random.choice(zones)
            self.navigate_to(target)
            self.scan_area()
            time.sleep(1.5)
            
        print("💤 Patrol ended. Charging.")

if __name__ == "__main__":
    bot = AutonomousPatrol()
    try:
        bot.patrol_routine()
    except KeyboardInterrupt:
        print("\n🛑 Patrol Aborted.")
