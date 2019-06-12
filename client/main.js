import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  const template = Template.instance();
  template.feed = new ReactiveVar();
  template.comment = new ReactiveVar();
  template.token = new ReactiveVar();
  template.num = new ReactiveVar();
});

Template.hello.helpers({
  feed() {
    const template = Template.instance();
    return template.feed.get();
  },
  "No": function (index) {
      index++
      return index
  },
  comment() {
    const template = Template.instance();
    return template.comment.get();
  },
  num(){
    const template = Template.instance();
    return template.num.get();
  }
});

Template.hello.events({
    'change #getGroup'(event, template) {
    event.preventDefault();
    let currentTarget = event.currentTarget;
        let token = currentTarget.token.value;
        template.token.set(token)
    console.log("token", token);
    const groupId = $(template.find('select#group')).val();
    console.log("group Id", groupId);
    const info ={
      token,
      groupId
    }
    Meteor.call("Getfeed", info, function(err, feed) {
      console.log('feed',feed)
      _.map(feed,(item)=>{
        item.created_time = ConvertTime(item.created_time)
      })
      template.feed.set(feed);
    });
  },
  'click .pointer'(event,template){
    event.preventDefault()
    let token = template.token.get()
    const objID = event.target.id
    const info ={
      token,
      objID
    }
    Meteor.call("Getcomment", info, function(err, comment) {
      console.log('comment',comment.length)
      _.map(comment,(item)=>{
        item.created_time = ConvertTime(item.created_time)
      })
      template.comment.set(comment);
      template.num.set(comment.length===0)
    });
  }
});
function ConvertTime(time) {
  var createdtime = moment(time).format("DD/MM/YYYY HH:mm:ss");
  return createdtime;
}