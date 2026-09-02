from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

# ── CHANGE THIS COMMENT BELOW ──────────────────────────
comment = "not bad at all"
# ───────────────────────────────────────────────────────

scores = analyzer.polarity_scores(comment)
compound = scores['compound']

if compound >= 0.05:
    label = "POSITIVE 😊"
elif compound <= -0.05:
    label = "NEGATIVE 😟"
else:
    label = "NEUTRAL 😐"

score_out_of_10 = round((compound + 1) / 2 * 10, 2)

print("=" * 50)
print(f"Comment  : {comment}")
print("=" * 50)
print(f"Positive : {scores['pos']}")
print(f"Neutral  : {scores['neu']}")
print(f"Negative : {scores['neg']}")
print(f"Compound : {compound}  (range: -1 to +1)")
print("-" * 50)
print(f"Score/10 : {score_out_of_10}")
print(f"Result   : {label}")
print("=" * 50)
print("Rule: compound >= +0.05 → Positive")
print("      compound <= -0.05 → Negative")
print("      in between        → Neutral")
