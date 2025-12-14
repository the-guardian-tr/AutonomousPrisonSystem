FROM python:3.9-slim

WORKDIR /app

# Install system deps if needed
# RUN apt-get update && apt-get install -y ...

# Install python deps
# COPY requirements.txt .
# RUN pip install -r requirements.txt

COPY . .

CMD ["python", "risk_engine.py"]
