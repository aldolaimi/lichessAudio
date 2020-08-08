// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['installed'], function(data) {
    if(data.installed == true ){
      console.log("Script is already installed.");  

    } else {
      chrome.storage.sync.set({"installed" : true});
      console.log("Script has been installed now.");  
    }
  });
});

chrome.runtime.onStartup.addListener(function (){
  console.log("We have started!");
});

var audio_array = [
  new Audio('CountDown0.mp3'),
  new Audio('CountDown1.mp3'),
  new Audio('CountDown2.mp3'),
  new Audio('CountDown3.mp3'),
  new Audio('CountDown4.mp3'),
  new Audio('CountDown5.mp3'),
  new Audio('CountDown6.mp3'),
  new Audio('CountDown7.mp3'),
  new Audio('CountDown8.mp3'),
  new Audio('CountDown9.mp3'),
  new Audio('CountDown10.mp3')
] ;

chrome.runtime.onMessage.addListener(
  function(message, sender){
    if(message.type == "play"){
      audio_array[message.file].play();
    }
  }
);