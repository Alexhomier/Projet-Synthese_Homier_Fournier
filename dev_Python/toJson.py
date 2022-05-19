from Case import *

## Méthodes retournant une string JSON pour les différentes information ##

def toJsonGrid(grid):
    first = True
    jsonString = ''
    jsonString += '{ "grille": ['
    for x in range(len(grid)):
        for y in range(len(grid)):
            if first:
                jsonString += grid[x][y].to_json()
                first = False
            else:
                jsonString = jsonString + ", " + grid[x][y].to_json()
    jsonString += ']}'
    return jsonString

def toJsonIndividu(grid):
    first = True
    jsonString = ''
    jsonString += '{ "individus": ['
    for individu in grid:
        if first:
            jsonString += individu.to_json_individu()
            first = False
        else:
            jsonString = jsonString + ", " + individu.to_json_individu()
    jsonString += ']}'
    return jsonString

def toJsonFrames(grid):
    first = True
    jsonString = ""
    jsonString += '{ "Frames": ['
    for frames in grid:
        for individu in frames:
            if first:
                jsonString += individu.to_json_frames()
                first = False
            else:
                jsonString = jsonString + ", " + individu.to_json_frames()
    jsonString += ']}'
    return jsonString

def toJsonBlocked(grid):
    first = True
    jsonString = ''
    jsonString += '{ "Blocked": ['
    for individu in grid:
        if first:
            jsonString += individu.to_json_individu()
            first = False
        else:
            jsonString = jsonString + ", " + individu.to_json_individu()
    jsonString += ']}'
    return jsonString

## Méthodes qui transforme les case (objet non séralisable), en objet pouvant être séraliser et moduler de la manière désirer ##

def caseToJson(frames_temp):
    jsonObjects = []
    for individu in frames_temp:
        if individu.type == "End":
            temp = FramesJson(individu.row, individu.col,
                              individu.iden, True)  # IsOut
        else:
            temp = FramesJson(individu.row, individu.col,
                              individu.iden, False)  # not IsOut
        jsonObjects.append(temp)

    return jsonObjects