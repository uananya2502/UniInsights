import json

d = json.load(open('public/university_sentiment_scores.json', encoding='utf-8'))
sorted_unis = sorted(d.items(), key=lambda x: x[1]['overallScore'], reverse=True)

# Define expectations
tier_1_2 = [
    'iit', 'iim', 'bits', 'nit', 'iiit', 'dtu', 'nsut', 'delhi technological', 
    'netaji subhas', 'jnu', 'jawaharlal nehru', 'delhi university', 'university of delhi',
    'jadavpur', 'anna university', 'bits pilani', 'bits goa', 'bits hyderabad', 
    'indian institute of science', 'ashoka university', 'savitribai phule', 'pune university',
    'birla institute of technology mesra', 'mumbai university'
]

anomalies = []

print("Running sanity check on all scores...")
print("=" * 80)

for name, data in sorted_unis:
    score = data['overallScore']
    comments = data['totalComments']
    lower_name = name.lower()
    
    is_premier = any(x in lower_name for x in tier_1_2)
    if 'kiit' in lower_name or 'kalinga' in lower_name:
        is_premier = False
        
    # Condition 1: A premier college with high comments should not score below 7.7
    if is_premier and comments >= 1500 and score < 7.7:
        anomalies.append((name, score, f"Premier college score too low ({comments:,} comments)"))
        
    # Condition 2: A private/mid-tier college (not in tier_1_2) should not score above 8.2
    if not is_premier and score > 8.2:
        anomalies.append((name, score, "Private/non-premier college score too high"))

print(f"Total universities analyzed: {len(sorted_unis)}")
print(f"Total anomalies found: {len(anomalies)}")
print("-" * 80)
if anomalies:
    for name, score, reason in anomalies:
        print(f"  - {name:35} | Score: {score:.1f} | Reason: {reason}")
else:
    print("SUCCESS: All university scores are perfectly aligned and realistic!")
