#encoding:utf-8
import json
import sys
import codecs,csv
import subprocess

HA_Attachment2={
            'type': "FeatureCollection",
            'features': []}
def loadFont():
    with codecs.open("ha_attachment.json","r") as f:
    	new_dact = json.loads(f.read())
    	for feature in new_dact['features']:
    		dict_ch={
    		'type': "Feature",
            
            'geometry': {
                 'type': "Point",
                  'coordinates': [feature['geometry']['x'],feature['geometry']['y']]
              },
            'properties':{}
            }
    		
    		if feature['attributes']['AttachedTy'] in [1,2]:
    			dict_ch['properties']=feature['attributes']
    			HA_Attachment2['features'].append(dict_ch)
#路灯64201001
#红绿灯64201003、64201005			
loadFont()    	
with codecs.open("ha_attachment1.json","w") as f:
	f.write(json.dumps(HA_Attachment2))