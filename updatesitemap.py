import xml.etree.ElementTree as ET
import time
from xml.dom import minidom
import requests
import bs4
import re
ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")

D_CHANGEFREQ = "always"
D_PRIORITY = "1.0"

def create_xml_element(url):
    e = ET.Element("url")
    loc = ET.SubElement(e, "loc")
    loc.text = url
    lastmod = ET.SubElement(e, "lastmod")
    lastmod.text = time.strftime("%Y-%m-%dT%H:%M:%S+00:00")
    changefreq = ET.SubElement(e, "changefreq")
    changefreq.text = D_CHANGEFREQ
    priority = ET.SubElement(e, "priority")
    priority.text = D_PRIORITY
    return e

def insert_new_element(elem, myXML):
    """myXML: an xml file """
    doc = ET.parse(myXML)
    root = doc.getroot()
    for child in root:
        num = root.getchildren().index(child)
    root.insert(num+1,elem)
    with open("sitemap.xml",'w') as sitemap:
         sitemap.write(minidom.parseString(ET.tostring(root)).toprettyxml())
    # return minidom.parseString(ET.tostring(root)).toprettyxml()
    '''Add code to push to XML file'''

def list_of_sites(myXML):
    listsite = []
    doc = ET.parse(myXML)
    root = doc.getroot()
    for child in root:
        listsite.append(child[0].text)
    return listsite
def new_links(website,sitemap):
    """Specific to FOSSASIA.org
        website: web page to crawl
    """
    newlinks = []
    page = requests.get(website)
    mySoup = bs4.BeautifulSoup((page.content),"html.parser")
    links = mySoup("a")
    links = mySoup.find_all(href=re.compile('^(https?:\/\/)?(([-a-zA-Z0-9:%_+.~#?&//=]{2,10})\.)?fossasia\.org([-a-zA-Z0-9:%_\+.~?&//=]*)'),recursive=True)
    for link in set(links):
        if not str(link['href']).strip('/') in [x.strip('/') for x in list_of_sites(sitemap)]:
            newlinks.append(str(link['href']))
    return set(newlinks)

if __name__ == "__main__":
    for link in new_links("http://fossasia.org","sitemap.xml"):
        newelem = create_xml_element(link)
        insert_new_element(newelem,"sitemap.xml")

    with open('SitemapCache.xml','w+') as cache:
        with open('sitemap.xml','r+') as sitemap:
            for line in sitemap:
                if not line.isspace():
                    cache.write(line)
            # sitemap.seek(0,0)
            # cache.seek(0,0)
            # sitemap.write(cache.read())
