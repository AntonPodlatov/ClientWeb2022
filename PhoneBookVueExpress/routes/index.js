const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index", {title: "Express"});
});

let currentRecordId = 1;
let records = [];

router.get("/api/getRecords", (req, res) => {
    const term = (req.query.term || "").toLowerCase();

    const result = term.length === 0 ? records : records.filter(function (x) {
        return x.name.toLowerCase().includes(term) ||
            x.surname.toLowerCase().includes(term) ||
            x.phone.toLowerCase().includes(term);
    });

    res.send(result);
});

router.post("/api/removeRecord", (req, res) => {
    var idArray = req.body.idArray;
    console.log(idArray);

    records = records.filter(function (x) {
        return idArray.indexOf(x.id) === -1;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createRecord", (req, res) => {
    const reqData = req.body;

    const errorArray = [];
    let isError = false;

    if (!reqData.name) {
        isError = true;
        errorArray.push("Name is required.");
    }

    if (!reqData.surname) {
        isError = true;
        errorArray.push("Surname is required.");
    }

    if (!reqData.phone) {
        isError = true;
        errorArray.push("Phone is required.");
    }

    if (records.some(function (record) {
        return record.phone === reqData.phone;
    })) {
        isError = true;
        errorArray.push("Phone is a duplicate.");
    }

    if (isError) {
        res.send({
            success: false,
            messageArray: errorArray
        });
        return;
    }

    currentRecordId++;

    const record = {
        id: currentRecordId,
        name: reqData.name,
        surname: reqData.surname,
        phone: reqData.phone
    };

    records.push(record);

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;