import unittest
from risk_engine import RiskEngine

class TestRiskEngine(unittest.TestCase):
    def setUp(self):
        self.engine = RiskEngine()

    def test_low_risk(self):
        """Test normal biometric data"""
        data = {"heart_rate": 70, "movement": 2}
        risk = self.engine.analyze_behavior(data)
        self.assertLess(risk, 0.4, "Normal data should yield low risk")

    def test_high_risk(self):
        """Test anomaly biometric data"""
        data = {"heart_rate": 140, "movement": 9}
        risk = self.engine.analyze_behavior(data)
        self.assertGreater(risk, 0.6, "High heart rate + movement should yield high risk")

    def test_max_score(self):
        """Ensure risk score is capped at 1.0"""
        data = {"heart_rate": 200, "movement": 100}
        risk = self.engine.analyze_behavior(data)
        self.assertEqual(risk, 1.0, "Risk score should not exceed 1.0")

if __name__ == '__main__':
    unittest.main()
