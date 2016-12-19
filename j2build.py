from jinja2 import Template
from bs4 import BeautifulSoup
import requests
import os
import time

LMtime = time.strftime("%Y-%m-%dT%H:%M:%S+00:00")
sites = []
#change this to directory that has files
directory = os.path.abspath(os.path.dirname(__file__))
for path,subdirs,files in os.walk(directory):
    for filename in files:
        if filename.endswith('.html'):
            f = str(os.path.join(path, filename)).replace(directory,"")
            sites.append("http://fossasia.org"+f)
            
class Site():
    def __init__(self,url):
        self.url=url
        self.title= BeautifulSoup(requests.get(url).content,'html5lib').title.string
        self.name=((url.replace('http://fossasia.org/','')).replace('.html','').replace('index',''))
sites =[Site(s) for s in sites]
sites =[s for s in sites if s.name!='']

# for xml sitemap
with open("sitemap.xml.template") as temp:
    xmltemp=Template(temp.read())
    newxml = xmltemp.render(sites=sites,time=LMtime)
with open("sitemap.xml",'w') as sitemap:
    sitemap.write(newxml)


# for html sitemap
with open("sitemapTemplate.html.template") as temp:
    htmltemp=Template(temp.read())
    newhtml = htmltemp.render(sites=sites)
with open("sitemap.html",'w') as sitemap:
    sitemap.write(newhtml)
    
print("Successfully built sitemap.xml & sitemap.html")

