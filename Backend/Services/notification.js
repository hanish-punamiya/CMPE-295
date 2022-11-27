import mongoose from "mongoose";
import { sendEmail } from "../Utilities/email.js";

export const buildNewsItemHTML = async (news) => {
  let displayText = "NA";
  let sourceName = "NA";
  let sourceUrl = "NA";
  let breaking = false;
  let category = "NA";
  let tweetUrl = "NA";
  let urls = "NA";

  if (news.text) displayText = news.text;
  if (news.sourceName) sourceName = news.sourceName;
  if (news.sourceUrl)
    sourceUrl = "<a href=" + news.sourceUrl + ">" + news.sourceUrl + "</a>";
  if (news.category) category = news.category.name;
  if (news.breaking) breaking = news.breaking;
  if (news.tweetUrl)
    tweetUrl = "<a href=" + news.tweetUrl + ">" + news.tweetUrl + "</a>";
  if (news.urls) {
    if (news.urls.length) urls = news.urls;
  }

  const moreInfo = () => {
    if (urls != "NA") {
      let str = "";
      for (let i = 0; i < urls.length; i++) {
        let st = "<a href=" + urls[i] + ">" + urls[i] + "</a>";
        if (i != urls.length - 1) st += ",";
        str += st;
      }
      return str;
    } else return "NA";
  };
  const newsHTML = `
  <div>
    <p>${displayText}</p>
  </div>
  <br/>
  <div>
    <span><b>Author name:  </b>${sourceName}</span>
  </div>
  <div>
    <span><b>Author url:  </b>${sourceUrl}</span>
  </div>
  <div>
    <span><b>Tweet url:  </b>${tweetUrl}</span>
  </div>
  <div>
    <span><b>Category:  </b>${category}</span>
  </div>
  <div>
    <span><b>More Info:  </b>${moreInfo()}</span>
  </div>
  `;
  return newsHTML;
};


export const notifyEmail = async (messageBody, email) => {
  const msg = {
    to: email,
    from: "hanish.punamiya@sjsu.edu",
    subject: "Emergency News Array",
    text: "Test",
    html: messageBody
  };
  console.log(await sendEmail(msg));
};

export const buildEmailHTML = async (newsArray) => {
  try {
    let messageBody = "";

    for (let i = 0; i < newsArray.length; i++) {
      messageBody += await buildNewsItemHTML(newsArray[i]);
      if (i != newsArray.length - 1) messageBody += "<hr/>\n<br/>";
    }
    return messageBody;
  } catch (error) {
    console.log(error);
  }
};
