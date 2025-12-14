import random
import time
import json

class RiskEngine:
    def __init__(self, model_version="v2.5.1"):
        self.model_version = model_version
        print(f"🧠 AI Risk Engine Initialized (Model: {self.model_version})")

    def analyze_behavior(self, sensor_data):
        """
        Analyzes sensor data to predict risk probability.
        Simulates complex inference latency.
        """
        # Simulate processing time
        time.sleep(0.2)
        
        heart_rate = sensor_data.get("heart_rate", 70)
        movement_intensity = sensor_data.get("movement", 0)
        
        # Simple heuristic monitoring logic (placeholder for Random Forest)
        risk_score = 0.0
        
        if heart_rate > 100:
            risk_score += 0.4
        elif heart_rate < 50:
            risk_score += 0.1
            
        if movement_intensity > 8:
            risk_score += 0.5
            
        return min(risk_score, 1.0)

    def run_simulation(self):
        print("🚀 Starting Real-time Inmate Monitoring Loop...")
        inmates = ["A-101", "B-205", "C-309"]
        
        while True:
            for inmate in inmates:
                # Simulater sensor feed
                data = {
                    "heart_rate": random.randint(60, 120),
                    "movement": random.randint(0, 10),
                    "timestamp": time.time()
                }
                
                risk = self.analyze_behavior(data)
                
                if risk > 0.7:
                    alert = {
                        "level": "CRITICAL",
                        "inmate": inmate,
                        "risk_score": f"{risk:.2f}",
                        "action": "NOTIFY_GUARDS"
                    }
                    print(f"🚨 ALERT: {json.dumps(alert)}")
                else:
                    print(f"✅ Normal behavior detected for {inmate} (Risk: {risk:.2f})")
            
            time.sleep(1.5)

if __name__ == "__main__":
    engine = RiskEngine()
    try:
        engine.run_simulation()
    except KeyboardInterrupt:
        print("\n🛑 AI Engine stopping...")
