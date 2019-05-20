const entry = require('../models/entry');
var express = require('express');

class communication {
    static newEntry(data, res) {       
        console.log(data);
         
        const newEntry = new entry({
            user: data.userId,
            title: data.title,
            startTime: data.startTime,
            endTime: data.endTime,
            elapse: data.elapse,
            isPomodoro: data.isPomodoro
        })
        newEntry.save((error) => {
            if (error) {
              console.log(`Error has occurred: ${error}`);
              return res.json({message: error});
            }
            console.log('Document is successfully saved.');
            res.json({message: 'finish'});
        });
    }
    static findByID(user, res) {        
        var quary = entry.find({user: user});
        return quary.exec(function (error, result) {
            if(error) {
              return console.log(`Error has occurred: ${error}`);
            }
            res.json(result);
        })
    }
}

module.exports = communication;
