var props = PropertiesService.getScriptProperties();

function onInstall(e) {
  onOpen(e);
}

// initialize global objects
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showMainMenu')
      .addToUi();
  props.setProperty("skills", "[]");
  props.setProperty("portfolio", "[]");
  props.setProperty("header", "{\"fname\":\"\",\"lname\":\"\",\"email\":\"\",\"phone\":\"\",\"lkacc\":\"\",\"porturl\":\"\"}");
  props.setProperty("workExperience","[]");
  props.setProperty("education","[]");
  props.setProperty("honor","[]");
  props.setProperty("sections","[]");
  props.setProperty("currTemplate","");
}

// display main menu
function showMainMenu() {
  var ui = HtmlService.createHtmlOutputFromFile('MainMenu')
      .setTitle('Resume Builder');
  DocumentApp.getUi().showSidebar(ui);
}

// delete entire document
function removeAll(){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.setText("");
}

// template 1 format
function insertTemplate1(){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  var table = body.appendTable();
  table.setBorderColor("#ffffff");
  // row 1
  var row1 = table.appendTableRow();

// cell 1

  var header = JSON.parse(getHeader());
  var cell1 = row1.appendTableCell();
  var heading1 = cell1.appendParagraph(header.fname+" "+ header.lname);
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#ccccff").setLineSpacing(0);

  // cell 2

  var cell2 = row1.appendTableCell();

  // display all of header
  var content2p1 = cell2.appendParagraph("email:" + header.email );
  content2p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p2 = cell2.appendParagraph("phone:" + header.phone);
  content2p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p3 = cell2.appendParagraph("linkedin:" + header.lkacc);
  content2p3.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p4 = cell2.appendParagraph("portfolio:" + header.porturl);
  content2p4.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

  // row2
  var row2 = table.appendTableRow();

  // ------------------------------- education -----------------------------

  //cell 3
  var cell3 = row2.appendTableCell();
  var eduList = JSON.parse(getEducation());

  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  // cell 4
  var cell4 = row2.appendTableCell();

  // display each education
  for (var i = 0; i < eduList.length; i++) {
    var edu = eduList[i];
    var content3p1 = cell3.appendParagraph("School: " + edu.school);
    content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p2 = cell3.appendParagraph("Department: " + edu.major);
    content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p3 = cell3.appendParagraph("GPA: " + edu.GPA);
    content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p4 = cell3.appendParagraph("Classification: " + edu.affiliation);
    content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    cell3.appendParagraph("");

    var content4 = cell4.appendParagraph(edu.startm + " - " + edu.starty + " - " + edu.endm + " - " + edu.endy);
    content4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 4; j++)
      cell4.appendParagraph("");
  }

  // row 3
  var row3 = table.appendTableRow();

  // ------------------------- experience ----------------------------

  // cell 5
  var expList = JSON.parse(getExperience());
  var cell5 = row3.appendTableCell();
  var heading5 = cell5.appendParagraph("Experience");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  var cell6 = row3.appendTableCell();

  // display all experiences
  for (var i = 0; i < expList.length; i++) {
    var exp = expList[i];
    var content5p1 = cell5.appendParagraph(exp.company);
    content5p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p2 = cell5.appendParagraph("Position: " + exp.position);
    content5p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p3 = cell5.appendParagraph("Department: " + exp.department);
    content5p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p4 = cell5.appendParagraph("Supervisor: " + exp.supervisor);
    content5p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content5p5 = cell5.appendParagraph("Contact Supervisor: " + exp.contactEmail);
    content5p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content5p6 = cell5.appendParagraph(exp.description);
    content5p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    cell5.appendParagraph("");

    // cell 6
    var content6 = cell6.appendParagraph(exp.startDate + " - " + exp.endDate);
    content6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 5; j++) {
      cell6.appendParagraph("");
    }
  }

  // -------------------------- skills -----------------------

  // row 4
  var row4 = table.appendTableRow();

  // display all skills
  var skills = JSON.parse(getAllSkills());
  var cell7 = row4.appendTableCell();
  var heading7 = cell7.appendParagraph("Skills");
  heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);
  for (var i = 0; i < skills.length; i++) {
    var content7 = cell7.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content7.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  }

  // cell 8
  var cell8 = row4.appendTableCell();
  var content8 = cell8.appendParagraph("#monSkl1 #yearSkl1 - #monSkl2 #yearSkl2");
  content8.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);


  // row 5
  var row5 = table.appendTableRow();

  // ---------------------- honors ---------------------

  // cell 9
  var cell9 = row5.appendTableCell();
  var heading9 = cell9.appendParagraph("Honors");
  heading9.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  // cell 10
  var cell10 = row5.appendTableCell();

  // display all honors
  var honorsList = JSON.parse(getHonor());
  for (var i = 0; i < honorsList.length; i++) {
    var honorInfo = honorsList[i];

    var content9p1 = cell9.appendParagraph("Honor: "+ honorInfo.awardedHonor);
    content9p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content9p2 = cell9.appendParagraph("Awarded Institution: " + honorInfo.awardedBy);

    content9p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content9p3 = cell9.appendParagraph("Overview: " + honorInfo.description);
    content9p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content9p5 = cell9.appendParagraph(honorInfo.awardedType);

    content9p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    cell9.appendParagraph("");

    var content10 = cell10.appendParagraph(honorInfo.awardedYear);
    content10.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 4; j++) {
      cell10.appendParagraph("");
    }
  }
  
  
  var row6 = table.appendTableRow();
  var cell11 = row6.appendTableCell();
  var sectionList = JSON.parse(getSections());
  for (var i = 0; i < sectionList.length; i++){
    var sectionInfo = sectionList[i];
    var heading11 = cell11.appendParagraph(sectionInfo.name);
    var content11p1 = cell11.appendParagraph(sectionInfo.content);
    heading11.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);
    content11p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    cell11.appendParagraph("");
  }
  
  addImagesToDoc();
}

function insertTemplate2() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var table = body.appendTable();
  table.setBorderColor("#ffffff");

  // row 1
  var row1 = table.appendTableRow();
  var cell1 = row1.appendTableCell();
  var headerInfo = JSON.parse(getHeader());

  var heading1 = cell1.appendParagraph(headerInfo.fname + " " + headerInfo.lname);

  // display header
  var content1p1 = cell1.appendParagraph(headerInfo.email + " | " + headerInfo.phone + " | " + headerInfo.lkacc); //("#header-email | #header-phone | #header-linkedin");
  var content1p2 = cell1.appendParagraph("| "+headerInfo.porturl+" |");
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#5c5c8a").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p1.setFontFamily("Consolas").setFontSize(10).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p2.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);

  // ------------- education --------------------

  var row2 = table.appendTableRow();
  var cell3 = row2.appendTableCell();
  var eduList = JSON.parse(getEducation());

  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);

  // display all education
  for (var i = 0; i < eduList.length; i++) {
    var edu = eduList[i];
    var content3p1 = cell3.appendParagraph("School: " + edu.school);
    content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
    var content3p2 = cell3.appendParagraph("Department: " + edu.major);
    content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
    var content3p3 = cell3.appendParagraph("GPA: " + edu.GPA);
    content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
    var content3p4 = cell3.appendParagraph("Classification: " + edu.affiliation);
    content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
  }


  var row4 = table.appendTableRow();
  var cell4 = row4.appendTableCell();

  // -------------- experience ---------------------

  // display all experience
  var expList = JSON.parse(getExperience());
  for (var i = 0; i < expList.length; i++) {
    var exper = expList[i];
    var heading4 = cell4.appendParagraph("Experience");
    heading4.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p1 = cell4.appendParagraph(exper.company);
    content4p1.setFontFamily("Consolas").setFontSize(16).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p2 = cell4.appendParagraph("Position: " + exper.position);
    content4p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p3 = cell4.appendParagraph("Department: "+ exper.department);
    content4p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p4 = cell4.appendParagraph("Supervisor: " + exper.supervisor);
    content4p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p5 = cell4.appendParagraph("Contact Supervisor: " + exper.contactEmail);
    content4p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content4p6 = cell4.appendParagraph("Overview: " + exper.description);
    content4p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    //cell4.appendParagraph("");
  }

  // ----------------- skills

  var row5 = table.appendTableRow();
  var cell5 = row5.appendTableCell();
  var skills = JSON.parse(getAllSkills());
  var heading5 = cell5.appendParagraph("Skills");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
 
  // display all skills
  for (var i = 0; i < skills.length; i++) {
    var content5 = cell5.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
  }

  // ----------------------------- honors ----------------------------

  var row6 = table.appendTableRow();
  var cell6 = row6.appendTableCell();
  var honorList = JSON.parse(getHonor());
  var heading6 = cell6.appendParagraph("Honor & Awards");
  heading6.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
  
  // display all honors
  for (var i = 0; i < honorList.length; i++) {
    var honorInfo = honorList[i];
    var content6p1 = cell6.appendParagraph("Honor Title: " + honorInfo.awardedHonor);
    content6p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content6p2 = cell6.appendParagraph("Institution: " + honorInfo.awardedBy);
    content6p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content6p3 = cell6.appendParagraph("Overview: " + honorInfo.description);
    content6p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    var content6p5 = cell6.appendParagraph(honorInfo.awardedType + "  |  " + honorInfo.awardedYear);
    content6p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
  }
  
  var row7 = table.appendTableRow();
  var cell7 = row7.appendTableCell();
  var sectionList = JSON.parse(getSections());
  for (var i = 0; i < sectionList.length; i++){
    var sectionInfo = sectionList[i];
    var heading7 = cell7.appendParagraph(sectionInfo.name);
    var content7p1 = cell7.appendParagraph(sectionInfo.content);
    if (i % 2 == 0){
      heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
      content7p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setLineSpacing(0);
    }
    else{
      heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
      content7p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#888888").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setLineSpacing(0);
    }
    
  }
  
  addImagesToDoc();
  
}

// template 3
function insertTemplate3() {
  
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var table = body.appendTable();
  table.setBorderColor("#ffffff");

  // row 1
  var row1 = table.appendTableRow();
  var cell1 = row1.appendTableCell();
  var headerInfo = JSON.parse(getHeader());

  var heading1 = cell1.appendParagraph(headerInfo.fname + " " + headerInfo.lname);

  //var content1p1 = cell1.appendParagraph("");
  var content1p1 = cell1.appendParagraph(headerInfo.email + " | " + headerInfo.phone + " | " + headerInfo.lkacc); //("#header-email | #header-phone | #header-linkedin");
  var content1p2 = cell1.appendParagraph("| "+headerInfo.porturl+" |");
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#008080").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p1.setFontFamily("Consolas").setFontSize(10).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p2.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);

  // ------------- education --------------------

  var row2 = table.appendTableRow();
  var cell3 = row2.appendTableCell();
  var eduList = JSON.parse(getEducation());

  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);

  // display all education
  for (var i = 0; i < eduList.length; i++) {
    var edu = eduList[i];
    var content3p1 = cell3.appendParagraph("School: " + edu.school);
    content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p2 = cell3.appendParagraph("Department: " + edu.major);
    content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p3 = cell3.appendParagraph("GPA: " + edu.GPA);
    content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p4 = cell3.appendParagraph("Classification: " + edu.affiliation);
    content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell3.appendParagraph("");
  }


  var row4 = table.appendTableRow();
  var cell4 = row4.appendTableCell();

  // -------------- experience ---------------------

  // display all experience
  var expList = JSON.parse(getExperience());
  for (var i = 0; i < expList.length; i++) {
    var exper = expList[i];
    var heading4 = cell4.appendParagraph("Experience");
    heading4.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p1 = cell4.appendParagraph(exper.company);
    content4p1.setFontFamily("Consolas").setFontSize(16).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p2 = cell4.appendParagraph("Position: " + exper.position);
    content4p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p3 = cell4.appendParagraph("Department: "+ exper.department);
    content4p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p4 = cell4.appendParagraph("Supervisor: " + exper.supervisor);
    content4p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p5 = cell4.appendParagraph("Contact Supervisor: " + exper.contactEmail);
    content4p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p6 = cell4.appendParagraph("Overview: " + exper.description);
    content4p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell4.appendParagraph("");
  }

  // ----------------- skills

  var row5 = table.appendTableRow();
  var cell5 = row5.appendTableCell();
  var skills = JSON.parse(getAllSkills());
  var heading5 = cell5.appendParagraph("Skills");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
 
  // display all skills
  for (var i = 0; i < skills.length; i++) {
    var content5 = cell5.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  }

  // ----------------------------- honors ----------------------------

  var row6 = table.appendTableRow();
  var cell6 = row6.appendTableCell();
  var honorList = JSON.parse(getHonor());
  var heading6 = cell6.appendParagraph("Honor & Awards");
  heading6.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  
  // display all honors
  for (var i = 0; i < honorList.length; i++) {
    var honorInfo = honorList[i];
    var content6p1 = cell6.appendParagraph("Honor Title: " + honorInfo.awardedHonor);
    content6p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p2 = cell6.appendParagraph("Institution: " + honorInfo.awardedBy);
    content6p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p3 = cell6.appendParagraph("Overview: " + honorInfo.description);
    content6p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p5 = cell6.appendParagraph(honorInfo.awardedType + "  |  " + honorInfo.awardedYear);
    content6p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell6.appendParagraph("");
  }
  
  var row7 = table.appendTableRow();
  var cell7 = row7.appendTableCell();
  var sectionList = JSON.parse(getSections());
  for (var i = 0; i < sectionList.length; i++){
    var sectionInfo = sectionList[i];
    var heading7 = cell7.appendParagraph(sectionInfo.name);
    var content7p1 = cell7.appendParagraph(sectionInfo.content);
    heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    content7p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell7.appendParagraph("");
  }
  
  addImagesToDoc();
}

function addImagesToDoc() {
  var images = JSON.parse(getPortfolio());
  Logger.log(images);
  
  if (images.length > 0) {
    var doc = DocumentApp.getActiveDocument(); 
    var paragraph = doc.getBody().appendParagraph('');
    var position = doc.newPosition(paragraph, 0);
    doc.setCursor(position);
    
    var blobs = []; 
    for (var i = 0; i < images.length; i++) {
      blobs.push(UrlFetchApp.fetch(images[i]).getBlob()); 
    }
    
    var cursor = doc.getCursor(); 
    for (var i = 0; i < images.length; i++) {
      var image = cursor.insertInlineImage(blobs[i]); 
      var largestWidth = 6.5 * 96; 
      var largestHeight = 9 * 96;
      var aspect = image.getWidth() / image.getHeight(); 
      if (image.getWidth() > largestWidth) {
        image.setWidth(largestWidth);
        image.setHeight(image.getWidth() / aspect);
      } else if (image.getHeight() > largestHeight) {
        image.setHeight(largestHeight);
        image.setWidth(aspect * image.getHeight());
      }
      
      paragraph = doc.getBody().appendParagraph('');
      position = doc.newPosition(paragraph, 0);
      doc.setCursor(position);
      cursor = doc.getCursor();
    }
  }
}

//---------------------------------- Popup Display code ------------------------------------

function showEducationDialog() {
  var html = HtmlService.createHtmlOutputFromFile('education')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'education');
}

function showSectionDialog() {
  var html = HtmlService.createHtmlOutputFromFile("freeSection")
      .setWidth(800)
  .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html,"section");
}

function showHonorDialog() {
  var html = HtmlService.createHtmlOutputFromFile('honor')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Honor & Award');
}

function showExperienceDialog() {
  var html = HtmlService.createHtmlOutputFromFile('experience')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Experience');
}

function showEditDialog() {
  var html = HtmlService.createHtmlOutputFromFile('edit')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Edit');
}

function showDeleteDialog() {
  var html = HtmlService.createHtmlOutputFromFile('delete')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Delete');
}


function showHeaderInputDialog() {
  var html = HtmlService.createHtmlOutputFromFile('header')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Input header information');
}

function showSkillSetDialog() {
  var html = HtmlService.createHtmlOutputFromFile('skills')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Input Skills');
}


// ------------------------------------------- setters and getters for global variables ----------------------

function getHeader() {
  var header = props.getProperty("header");
  Logger.log("RETRIEVING: " + header);
  return header;
}

function saveHeader(headerJSON) {
  Logger.log("SAVING: " + headerJSON);
  props.setProperty("header", headerJSON);
}

function getSections() {
  var sections = props.getProperty("sections");
  return sections;
}

function saveSections(sec){
  console.info("saveing sections..");
  console.info(sec);
  props.setProperty("sections", sec);
}

function getExperience() {
  var exp = props.getProperty("workExperience");
  Logger.log("RETRIEVING: " + exp);
  // console.log("RETRIEVING: " + exp);
  return exp;
}


function saveExperience(experienceJSON){
  Logger.log("SAVING:" + experienceJSON);
  // console.log("Saved:" + experienceJSON);
  props.setProperty("workExperience",experienceJSON);
}

function getEducation(){
  var edu = props.getProperty("education");
  Logger.log("RETRIEVING: " + edu);
  return edu;
}

function saveEducation(educationJSON){
  Logger.log("SAVING:" + educationJSON);
  props.setProperty("education",educationJSON);

}

function getHonor(){
  var honor = props.getProperty("honor");
  return honor;
}

function saveHonor(honorJSON){
  Logger.log("Saved:" + honorJSON);
  props.setProperty("honor",honorJSON);
}

function getAllSkills() {
  var skills = props.getProperty("skills");
  Logger.log("RETRIEVING: " + skills);
  return skills;
}

function saveAllSkills(allSkills) {
  Logger.log("SAVING: " + allSkills);
  props.setProperty("skills", allSkills);
}

function getCurrTemplate(){
  var currTp = props.getProperty("currTemplate");
  return currTp;
}

function setCurrTemplate(Tp){
  if (Tp != "1" || Tp != "2" || Tp != "3" || Tp != ""){
    DocumentApp.getUi().alert("Template not valid. Set to template 3");
    props.setProperty("currTemplate", "3");
  }
  props.setProperty("currTemplate", Tp);
}