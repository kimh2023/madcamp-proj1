# madcamp-proj1


## Features

- 👀Create the three different Functioning Tabs.👀
- 📞 List View of Stored Contacts
- 📸 List View of Pics offered by Spotify (Thanks Spotify👍)
- 🔍 OCR camera && TTS Recognizer

## Development Environment
### Framework

> **React-Native-cli**

Why we choose to use? : 
- Have previous experience using it
- High Versatility & Various Modules 

### IDE
> **Android Studio**

### API
> Spotify Developer Api

###  

## App Introduction
- Project Name: 
- Project Duration: **2023.12.29 - 2023.01.03**
- Members:  **Hyuna, Kim** / **Seongmin, Lee**

## Member Introduction & Role
- **Hyuna, Kim** : (KAIST CS 22) 
	- WireFrame Design (feat. Figma)
	- Design Overall Structure, & Implemented **Tab1, Tab3**
- **Seongmin, Lee** : (KOREA CS 20)
	- MileStone managing (feat. Notion)
	- Implemented **Tab2**

## Description
### Tab 0. Splash View & BottomTabBar
- Splash Vie: Show Logo Image before App Activated
- BottomTabBar; StackNavigator, Move between Tab to Tab

### Tab 1. Contacts
- Interoperate with native App
- CRUD available: Can store and edit the contacts
- Share Function: Can share the contacts by native sharing function

***Abbreviated Structure Description***
|                |Contacts                         |
|----------------|-------------------------------|
|**Contacts**|**Contacts List;** RecyclerView()|
|**Contacts Detail**|Detail Info: {*phonenumber, email*}, Covenient Function(*edit, share,* ...) |
|**Contacts Edit**|Touchable Image, Description|

### Tab 2. Gallery feat. spotify
- Get the data from Spotify API
- Search available for Three Categories: Album, Artists, and Tracks
- Offer the FlatList View of Results

|                |Gallery                         |
|----------------|-------------------------------|
|**Search (Input)**|Search by Caetegory (Album, Artitists, Tracks)|
|**SearchBar (null)**|New Releases album|
|**Detail**|Touchable Image, Description|


### Tab 3.  MadVision
- Recognize the characters in the image through the camera in real time : using react-native-vision-camera module
- Text To Speech

|                |MadVision                        |
|----------------|-------------------------------|
|**Camera Screen**|Display the camera screen|
|**OCR**|Recognize the Text, Eng-Kor Translation|
|**TTS**|Recognize the speech|
|**OverLay**|Displayed the Recognized Infos|



## Demonstration



## Improvements
- Implement ScreenShot function of recognized Texts (Tab 3)
- Implement AutoComplete Search, Preferences Button and Screen of Collected Preferences (Tab2)



## References
- https://developer.spotify.com/documentation/web-api
- https://github.com/mrousavy/react-native-vision-camera
