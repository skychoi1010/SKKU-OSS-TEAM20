# SKKU-OSS-TEAM20
# project name : Appointment Helper

-   Opensource Software Project
-   Team 20

![image](imgurl)

## Intro

We provide many information for your appointemnt, such as weather, duration of arrival and nerby cafe & restaurant.

Also, fancy recommendation; suitable outfit and playlist to hear on your way are given according to such information. 

Before going out, use our site, get those things and enjoy your appointment!

## Demo 

?

## Prerequisites

- nothing

## How to use/run our service

1. access our website: skychoi1010.github.com/SKKU-OSS-TEAM20/

2. input your start and dest and Press Button

3. Get results

   1. travel time by public transportation: In main page`(main page-> press here!)`, `scroll down` to see the tab that shows how long it takes to get to the destination.
  
   2. weather at destination: In main page`(main page-> press here!)`, `scroll down or click 'Weather' navbar item` to see the tab that shows weather information ( temparature - current, sensible, highest, lowest / the current sky condition ) at the destination.
  
   3. outfit : In main page`(main page-> press here!)`, `scroll down or click 'Outfit' navbar item` to see the tab that shows outfit recommendation ( overcoats / tops / bottoms ) based on current temparature.
  
   4. Restaurant : In main page`(main page-> press here!)`, `scroll down or click 'Place' navbar item`, and `check radio button ( restaurant / cafe )` to see the tab that shows the map that can get place information.
    
   5. playlist: At bottom page In main page`(main page-> press here! -> click spotify icon)` and follow steps ( login ) that makes playlist to you and Spotify page is pop-uped.

## Implementation of Main Function

### Travel time

### Weather at destination

### Outfit
An algorithm was written in JavaScript to recommend outfits according to the temparature information obtained from 'Weather at destination' function.
It categorizes temperatures into eight ranges and recommends overcoats, tops, and bottoms for each range. 

### Restaurant
Kakao OpenApi provide KakaoMap Api. So we easily search restaurants or cafes nerby destnation and show them.

### List of genres that can be recommended by weather
Spotify API provide track recommendation generated by the seeds infomation which is combination of several genre, tracks and artists. So, we make playlist in user's spotify account according to recommendation.

***However, this API has limitation in small project. (public request procedure is very complicated. ;() Before use this function, we must enroll your email in our Spotify API dashboard. If not, it makes useless Oauth access code. So, before the use, plz contact awzs159@gmail.com.***

## How to extend our work

You can fork our repository and create pull request. Drafts are provided in our repository. ~~~

## Bug fix issue tracker ~~

Currently, there is a bug in which the server stops when trying to search outside index.html. If anyone can solve it, I would appreciate it if you could help us ~~~
A bug that first playlist genereation is not work correctly. So user must re-click button.

## License

[MIT](link)
