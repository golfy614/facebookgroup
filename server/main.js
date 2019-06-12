import { Meteor } from 'meteor/meteor';
var request = require("request");
Meteor.startup(() => {
  Meteor.methods({
    Getfeed: async function(info) {
      return new Promise(async (resolve, reject) => {
        try {
          item = await searchFeed(info);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    },
    Getcomment: async function(info) {
      return new Promise(async (resolve, reject) => {
        try {
          item = await searchComment(info);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
});

function searchComment(info){
  return new Promise(async (resolve,reject)=>{
    var options = { method: 'GET',
    url: 'https://graph.facebook.com/v3.3/'+info.objID+'/comments',
    qs: { access_token: info.token }}
    // headers: 
    //  { 'postman-token': '7c1b5f2f-ad18-a788-3d11-1060c506200f',
    //    'cache-control': 'no-cache' } };
  
  request(options, function (error, response, body) {
    if (error) reject(error)
      const res = JSON.parse(body)
    console.log('comment',res.data);
  resolve(res.data)
  });
  })
}

function searchFeed(info){
return new Promise(async (resolve,reject)=>{
  var options = { method: 'GET',
  url: 'https://graph.facebook.com/v3.3/'+info.groupId+'/feed?fields=from,message,id,created_time,story',
  qs: { access_token: info.token }}
  // headers: 
  //  { 'postman-token': '7c1b5f2f-ad18-a788-3d11-1060c506200f',
  //    'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) reject(error)
    const res = JSON.parse(body)
  console.log('data',res.data);
resolve(res.data)
});
})
}