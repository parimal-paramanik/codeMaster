//Importing the dependencies
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

//Configurartion of OpenAi API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller for converting the code from one programming language to another porgramming language
const codeConverter = async (req, res) => {
  try {
    const { code, language } = req.body;
    // conversationHistory.push({ role: "user", content: `Hello please provide me a good poetry on ${prompt} in ${language}` })
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role:"system",
          content:`You are a code converter which converts the code in ${language} language`
        }
        ,{
          role: "user",
          content: `
          ${code} `,
        },
      ],
    });

    const reply = response.data.choices[0].message.content

    if (reply) {
      res.status(200).send({ data: reply, error: false });
    } else {
      res
        .status(400)
        .send({
          msg: "Something went wrong please try again after some time",
          error: true,
        });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message, error: true });
  }
};

// controller for execution of code
const codeExecutor = async(req,res) =>{
  try {
    const { code } = req.body;
    // conversationHistory.push({ role: "user", content: `Hello please provide me a good poetry on ${prompt} in ${language}` })
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are using the code execution service.

          Please provide the following information:
          
          Code to execute:
          ${code}
          
          Now, execute the code and return the output.
          `,
        },
      ],
    });

    const reply = response.data.choices[0].message.content
      
    if (reply) {
      res.status(200).send({ data: reply, error: false });
    } else {
      res
        .status(400)
        .send({
          msg: "Something went wrong please try again after some time",
          error: true,
        });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message, error: true });
  }
}

// Controller for debugging the code for any possible bugs or errors
const codeDebugger = async (req, res) => {
  try {
    const { code } = req.body;
    // conversationHistory.push({ role: "user", content: `Hello please provide me a good poetry on ${prompt} in ${language}` })
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are using the code debugging service.
          Please provide the following information:
          
          Input code (in the programming language):
          ${code}
          
          Now, please debug the code and explain the bugs/errors in the code.
          `,
        },
      ],
    });

    const reply = response.data.choices[0].message.content
      
    if (reply) {
      res.status(200).send({ data: reply, error: false });
    } else {
      res
        .status(400)
        .send({
          msg: "Something went wrong please try again after some time",
          error: true,
        });
    }
  } catch (error) {
    res.status(500).send({msg:error.message,error:true})
  }
};

// Controller for checking the quality of the code provided
const codeQualityChecker = async (req, res) => {
  try {
    const { code} = req.body;
    // conversationHistory.push({ role: "user", content: `Hello please provide me a good poetry on ${prompt} in ${language}` })
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are using the code efficiency analysis service.
          Please provide the following information:
          
          Input code (in the programming language):
          ${code}
          
          Now, please analyze the code and provide the following details in breif and in percentage:
          
          1. Correctness: 
          2. Readability: 
          3. Maintainibility: 
          4. Effeciency:
          5. Consistency:
          6. Documentation:
          7. Testing:
          8. Error Handling:
          9. Security:
          10. Scalability:
          11. Code Duplication:

          
          `,
        },
      ],
    });

    const reply = response.data.choices[0].message.content
    if (reply) {
      res.status(200).send({ data: reply, error: false });
    } else {
      res
        .status(400)
        .send({
          msg: "Something went wrong please try again after some time",
          error: true,
        });
    }
  } catch (error) {
    res.status(500).send({msg:error.message,error:true})
  }
};

module.exports = { codeConverter, codeDebugger, codeQualityChecker,codeExecutor };
