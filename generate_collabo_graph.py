import bibtexparser
import json
from collections import defaultdict, Counter
import itertools

with open('_bibliography/papers.bib', encoding='utf-8') as bibfile:
    parser = bibtexparser.bparser.BibTexParser(common_strings=False)
    bib_database = bibtexparser.load(bibfile, parser=parser)

print("Generating collaboration graph...")

author_counter = Counter()
coauthor_counter = defaultdict(int)

for entry in bib_database.entries:
    if 'author' in entry:
        authors = [a.strip() for a in entry['author'].replace('\n', ' ').split(' and ')]
        for a in authors:
            author_counter[a] += 1
        for a1, a2 in itertools.combinations(sorted(authors), 2):
            coauthor_counter[(a1, a2)] += 1

nodes = [{"id": a, "group": 1, "value": author_counter[a]} for a in author_counter]
links = [{"source": a1, "target": a2, "value": v} for (a1, a2), v in coauthor_counter.items()]

with open('assets/json/collabo_graph.json', 'w', encoding='utf-8') as f:
    json.dump({"nodes": nodes, "links": links}, f, ensure_ascii=False, indent=2)