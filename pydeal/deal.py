# encoding:utf-8
import codecs
import json
HA_Attachment1 = {
    'type': "FeatureCollection",
    'features': []}
HA_Attachment2 = {
    'type': "FeatureCollection",
    'features': []}
POI_bus = {
    'type': "FeatureCollection",
    'features': []}


def loadFont():
    with codecs.open("ha_attachment.json", "r") as f:
        new_dact = json.loads(f.read())
        for feature in new_dact['features']:
            dict_ch = {
                'type': "Feature",

                'geometry': {
                    'type': "Point",
                    'coordinates': [feature['geometry']['x'], feature['geometry']['y']]
                },
                'properties': {}
            }

            if feature['attributes']['AttachedTy'] == 1:
                dict_ch['properties'] = feature['attributes']
                HA_Attachment1['features'].append(dict_ch)
            if feature['attributes']['AttachedTy'] == 2:
                dict_ch['properties'] = feature['attributes']
                HA_Attachment2['features'].append(dict_ch)


def loadFont_poi():
    with codecs.open("tree3d.json", "r") as f:
        new_dact = json.loads(f.read())
        i=0
        for feature in new_dact['features']:
            i+=1
            feature['attributes']['Attachment'] = i

            dict_ch = {
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [feature['geometry']['x'], feature['geometry']['y']]
                },

                'properties': feature['attributes']
            }
            dict_ch['properties']['Angle'] = 90
            POI_bus['features'].append(dict_ch)


# 路灯64201001
# 红绿灯64201003、64201005
loadFont_poi()
with codecs.open("three_3d.json", "w") as f:
    f.write(json.dumps([POI_bus]))
# loadFont_poi()
# with codecs.open("bus_poi1.json", "w") as f:
#     f.write(json.dumps(POI_bus))
