const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const templateQuestion = require("../models/savedTemplateQuestion");

// process.env.SECRET_KEY = "secret";

router.post("/savedTemplateQuestions", (req, res, next) => {
  debugger;
  var testData = req.body.testUserData;
  //console.log(req.body.testUserData);
  //const savedTemplateData = new templateQuestion();

  // const savedTemplateData = new templateQuestion({
  //   savedSection_id: req.body.section_id,
  //   section_name: req.body.section_name,
  //   q_Id: req.body.q_Id,
  //   q_desc: req.body.q_desc
  // });
  // for (let i = 0; i < req.body.testUserData.length; i++) {
  //   var obj = req.body.testUserData[i];
  //   console.log(obj);
  //   savedTemplateData.push({
  //     savedSection_id: obj.section_id,
  //     section_name: obj.section_name,
  //     q_Id: obj.q_Id,
  //     q_desc: obj.q_desc
  //   });
  // }
  console.log(testData);
  templateQuestion
    .insertMany(testData)
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "saved!"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(201).json({
        message: "saved!"
      });
    });
  savedTemplateData.insertMany(req.body.testUserData);
  // savedTemplateData.create(req.body.testUserData, function(err, templateQuestion){})
  // savedTemplateData
  //   .save()
  //   .then(result => {
  //     console.log(result);
  //     res.status(201).json({
  //       message: "saved!"
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
  // const savedTemplateData = new templateQuestion({
  //   savedSection_id: req.body.testUserData.section_id[i],
  //   section_name: req.body.testUserData.section_name[i],
  //   q_Id: req.body.testUserData.q_Id[i],
  //   q_desc: req.body.testUserData.q_desc[i]
  // });

  // savedTemplateData
  //   .save()
  //   .then(result => {
  //     console.log(result);
  //     res.status(201).json({
  //       message: "saved!"
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});
router.get("/getSectionInformationWithParams", (req, res, next) => {
  var section_name = req.body.section_name;
  var section_id = req.body.section_id;
  section
    .find(section_id)
    .exec()
    .then(sectionData => {
      //console.log(sectionData);
      return res.status(200).json({
        message: "successful",
        sectionLocalData: sectionData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.get("/getSelectedQuestions", (req, res, next) => {
  var sec_ID = req.query.sec_ID;
  templateQuestion
    .find({ savedSection_id: sec_ID })
    .exec()
    .then(questions => {
      //console.log(questions);
      return res.status(200).json({
        message: "successful",
        templateLocalData: questions
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
