import requests
import json
import os

def fetch_orcid_works(orcid_id="0000-0002-7733-2498"):
    headers = {'Accept': 'application/json'}
    url = f"https://pub.orcid.org/v3.0/{orcid_id}/works"
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()
        groups = data.get('group', [])
        
        pubs = []
        for group in groups[:10]:
            work = group.get('work-summary', [{}])[0]
            title = work.get('title', {}).get('title', {}).get('value', 'Untitled')
            year = work.get('publication-date', {}).get('year', {}).get('value', 'N/A')
            journal = work.get('journal-title', {}).get('value', 'Unknown Journal')
            doi = ""
            for eid in work.get('external-ids', {}).get('external-id', []):
                if eid.get('external-id-type') == 'doi':
                    doi = eid.get('external-id-value')
            pubs.append({"year": year, "title": title, "journal": journal, "doi": doi})
        return pubs
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    # 核心修正：获取脚本所在的绝对路径
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # 无论你在那运行，都会锁定到脚本同级的 public 文件夹
    target_dir = os.path.join(BASE_DIR, 'public')
    target_file = os.path.join(target_dir, 'publications.json')

    print(f"Targeting: {target_file}")
    
    new_data = fetch_orcid_works()
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)
    
    print("Done: publications.json updated.")