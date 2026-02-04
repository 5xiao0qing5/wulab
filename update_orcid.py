import requests
import json
import os

ORCID_ID = "0000-0002-7733-2498"
# 公开 API 地址
API_URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"

def fetch_orcid_works():
    headers = {'Accept': 'application/json'}
    response = requests.get(API_URL, headers=headers)
    if response.status_code != 200:
        return []
    
    data = response.json()
    works = data.get('group', [])
    processed_works = []
    
    for group in works[:10]: # 只取前10篇
        work_summary = group['work-summary'][0]
        title = work_summary.get('title', {}).get('title', {}).get('value')
        year = work_summary.get('publication-date', {}).get('year', {}).get('value', 'N/A')
        journal = work_summary.get('journal-title', {}).get('value', 'Unknown Journal')
        
        doi = ""
        external_ids = work_summary.get('external-ids', {}).get('external-id', [])
        for eid in external_ids:
            if eid.get('external-id-type') == 'doi':
                doi = eid.get('external-id-value')
        
        processed_works.append({
            "year": year,
            "title": title,
            "journal": journal,
            "doi": doi
        })
    return processed_works

if __name__ == "__main__":
    new_pubs = fetch_orcid_works()
    with open('public/publications.json', 'w', encoding='utf-8') as f:
        json.dump(new_pubs, f, ensure_ascii=False, indent=2)