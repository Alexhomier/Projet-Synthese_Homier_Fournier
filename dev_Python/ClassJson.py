import json

## Classes d'objets sérialisables pour la Traduction entre Python et JSON ##

class CaseJson:
    def __init__(self, row, col, type):
        self.id = [row, col]
        self.state = type
        self.category = None 

class IndividuJson:
    def __init__(self, row, col, id):
        self.id = id
        self.x = row
        self.y = col

class FramesJson:
    def __init__(self, row, col, id, is_done):
        self.id = id
        self.x = row
        self.y = col
        self.isOut = is_done

    def to_json_frames(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)