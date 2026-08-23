import json
d = json.load(open('public/university_sentiment_scores.json', encoding='utf-8'))
check = [
    'IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'BITS Goa', 'BITS Hyderabad',
    'DTU Delhi', 'Anna University', 'Alliance University', 'Graphic Era University',
    'VIT Vellore', 'Amity University', 'Lovely Professional University', 'Chandigarh University'
]
print("University | Score | Category Scores")
print("-" * 90)
for u in check:
    if u in d:
        print(f"{u:30} | {d[u]['overallScore']:.1f}/10 | {d[u]['categoryScores']}")
    else:
        print(f"{u:30} | NOT FOUND")
