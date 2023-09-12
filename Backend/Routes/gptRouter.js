const express = require("express");
const { codeConverter, codeDebugger, codeQualityChecker, codeExecutor } = require("../Controllers/gptController");

const router = express();

router.post("/convert",codeConverter);

router.post("/debug",codeDebugger);

router.post("/qualityCheck",codeQualityChecker);

router.post("/execute",codeExecutor)


module.exports = {router}