import sqlite3
conn = sqlite3.connect('comments.db')
c = conn.cursor()
c.execute("SELECT university, category, sentiment, text FROM comments_fts WHERE university LIKE '%BML%' LIMIT 5")
rows = c.fetchall()
print("BML rows:", rows)
c.execute("SELECT DISTINCT university FROM comments_fts LIMIT 20")
print("Universities:", c.fetchall())
conn.close()
