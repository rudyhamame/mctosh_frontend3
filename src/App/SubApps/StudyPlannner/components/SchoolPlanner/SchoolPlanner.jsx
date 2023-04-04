//..............IMPORT................
import React, { Component } from 'react'
import "./schoolPlanner.css"
//.........VARIABLES................
var checkedLectures = [];
var checkedCourses = [];
var courseDayAndTime= [];
var lectureOutlines= [];
var courseNames=[];
var courseNames_filtered=[];
var courseInstructorsNames=[];
var courseInstructorsNames_filtered=[];
var target_editCourse;
var target_editLecture;


//..................................

export default class SchoolPlanner extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       courses:[]
    }
  }

  componentDidMount(){
    this.retrieveCourses()
    this.retrieveLectures()
  }

  openAddLectureForm = (object) => {
  document.getElementById("schoolPlanner_addLecture_div").style.display ="flex";
  document.getElementById("schoolPlanner_addLecture_addButton_label").textContent = object.buttonName;
  //.........
  if(object.buttonName==="Add"){
    lectureOutlines=[]
    document.getElementById("schoolPlanner_addLecture_name_input").value="";
    document.getElementById("schoolPlanner_addLecture_course_input").value="Lecture course";
    document.getElementById("schoolPlanner_addLecture_instructorName_input").value="Lecture instructor name";
    document.getElementById("schoolPlanner_addLecture_writerName_input").value="";
    document.getElementById("schoolPlanner_addLecture_date_input").value="Lecture date";
    document.getElementById("schoolPlanner_addLecture_length_input").value="";
    document.getElementById("schoolPlanner_addLecture_progress_input").value="";
    document.getElementById("schoolPlanner_addLecture_outlines_input").value="";

  }
    if(object.buttonName==="Edit"){
      lectureOutlines=object.lecture_outlines
      document.getElementById("schoolPlanner_addLecture_name_input").value=object.lecture_name;
      document.getElementById("schoolPlanner_addLecture_course_input").value=object.lecture_course;
      document.getElementById("schoolPlanner_addLecture_instructorName_input").value=object.lecture_instructor;
      document.getElementById("schoolPlanner_addLecture_writerName_input").value=object.lecture_writer;
      document.getElementById("schoolPlanner_addLecture_date_input").value=object.lecture_date;
      document.getElementById("schoolPlanner_addLecture_length_input").value=object.lecture_length;
      document.getElementById("schoolPlanner_addLecture_progress_input").value=object.lecture_progress;
      document.getElementById("schoolPlanner_addLecture_outlines_input").value="";

      this.retrieveLectureOutlines()
      }
  };
   closeAddLectureForm = () => {
    document.getElementById("schoolPlanner_addLecture_div").style.display =
      "none";
  };
   openAddCourseForm = (object) => {
    document.getElementById("schoolPlanner_addCourse_div").style.display =
      "flex";
    document.getElementById("schoolPlanner_addCourse_addButton_label").textContent =
    object.buttonName;
    if(object.buttonName==="Add"){
    courseDayAndTime=[]
    courseInstructorsNames=[]
    document.getElementById("schoolPlanner_addCourse_name_input").value="";
    document.getElementById("schoolPlanner_addCourse_component_input").value="Course component";
    document.getElementById("schoolPlanner_addCourse_day_input").value="Course day";
    document.getElementById("schoolPlanner_addCourse_time_input").value="";
    document.getElementById("schoolPlanner_addCourse_year_input").value="Course year";
    document.getElementById("schoolPlanner_addCourse_term_input").value="Course term";
    document.getElementById("schoolPlanner_addCourse_class_input").value="Course classification";
    document.getElementById("schoolPlanner_addCourse_status_input").value="Course status";
    document.getElementById("schoolPlanner_addCourse_instructorName_input").value="";
    document.getElementById("schoolPlanner_addCourse_instructorsNames_ul").innerHTML="";
    document.getElementById("schoolPlanner_addCourse_dayAndTime_ul").innerHTML="";

  }
    if(object.buttonName==="Edit"){
    courseDayAndTime=object.course.course_dayAndTime
    courseInstructorsNames=object.course.course_instructors
    //.........
    document.getElementById("schoolPlanner_addCourse_name_input").value=object.course.course_name;
    document.getElementById("schoolPlanner_addCourse_component_input").value=object.course.course_component;
    document.getElementById("schoolPlanner_addCourse_day_input").value="Course day";
    document.getElementById("schoolPlanner_addCourse_time_input").value="";
    document.getElementById("schoolPlanner_addCourse_dayAndTime_ul").innerHTML="";
    document.getElementById("schoolPlanner_addCourse_year_input").value=object.course.course_year;
    document.getElementById("schoolPlanner_addCourse_term_input").value=object.course.course_term;
    document.getElementById("schoolPlanner_addCourse_class_input").value=object.course.course_class;
    document.getElementById("schoolPlanner_addCourse_status_input").value=object.course.course_status;
    document.getElementById("schoolPlanner_addCourse_instructorName_input").value="";
    document.getElementById("schoolPlanner_addCourse_instructorsNames_ul").innerHTML="";
    //................
    this.retrieveCourseDayAndTime()
    this.retrieveCourseInstructorsNames()
  }
  };
   closeAddCourseForm = () => {
    document.getElementById("schoolPlanner_addCourse_div").style.display =
      "none";
  };
  addCourseDayAndTime=(object)=>{
    if(object.day && object.time){
    courseDayAndTime.push({
      day:object.day,
      time:object.time
    })
    this.retrieveCourseDayAndTime()
  }
  }

  addLectureOutline=()=>{
    let outline=document.getElementById("schoolPlanner_addLecture_outlines_input").value
    lectureOutlines.push(outline)
    this.retrieveLectureOutlines()
  }

  addCourseInstructorsNames=()=>{
    let instructorName=document.getElementById("schoolPlanner_addCourse_instructorName_input").value
    courseInstructorsNames.push(instructorName)
    this.retrieveCourseInstructorsNames()
  }
  retrieveCourseDayAndTime=()=>{
    var courseDayAndTime_ul=document.getElementById("schoolPlanner_addCourse_dayAndTime_ul")
    courseDayAndTime_ul.innerHTML=""
    for(var i=0;i<courseDayAndTime.length;i++){
      let p=document.createElement("p")
      let deleteIcon = document.createElement("i")
      let div_dayAndTime= document.createElement("div")

      p.textContent=courseDayAndTime[i].day+" "+courseDayAndTime[i].time

      deleteIcon.setAttribute("class","fa fa-close");
      deleteIcon.setAttribute("id",i+"DIdayAndTime")
      div_dayAndTime.setAttribute("class","schoolPlanner_addCourse_dayAndTime_div fr")

      deleteIcon.addEventListener("click",()=>{
        deleteIcon.parentElement.remove()
        courseDayAndTime.splice(parseInt(deleteIcon.id),1)
      })
      div_dayAndTime.append(deleteIcon,p)
      courseDayAndTime_ul.appendChild(div_dayAndTime)
    }
  }
  retrieveLectureOutlines=()=>{
  var ul_outlines=document.getElementById("schoolPlanner_addLecture_outlines_ul")
  ul_outlines.innerHTML=""
  for(var i=0;i<lectureOutlines.length;i++){
    let p_lectureOutline = document.createElement("p");
    p_lectureOutline.textContent=lectureOutlines[i]
    ul_outlines.append(p_lectureOutline)
  }
}
  retrieveCourseInstructorsNames=()=>{
    let courseInstructorsNames_ul=document.getElementById("schoolPlanner_addCourse_instructorsNames_ul")
    courseInstructorsNames_ul.innerHTML=""
    for(var i=0;i<courseInstructorsNames.length;i++){
      let p=document.createElement("p")
      let deleteIcon = document.createElement("i")
      let div_instructorsNames= document.createElement("div")

      p.textContent=courseInstructorsNames[i]

      deleteIcon.setAttribute("class","fa fa-close");
      deleteIcon.setAttribute("id",i+"DIinstructorsNames")
      div_instructorsNames.setAttribute("class","schoolPlanner_addCourse_instructorsNames_div fr")
      
      deleteIcon.addEventListener("click",()=>{
        deleteIcon.parentElement.remove()
        courseInstructorsNames.splice(parseInt(deleteIcon.id),1)
      })
      div_instructorsNames.append(deleteIcon,p)
      courseInstructorsNames_ul.appendChild(div_instructorsNames)
    }
  }


   retrieveLectures = () => {
    let url = "https://backendstep.onrender.com/api/user/update/" + this.props.state.my_id;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
    });
    fetch(req)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("schoolPlanner_lectures_ul").innerHTML=""
          return response.json();
        }
      })
      .then((jsonData) => {
        jsonData.schoolPlanner.lectures.forEach((lecture) => {   
          console.log(lecture.lecture_outlines)     
          let ul = document.getElementById("schoolPlanner_lectures_ul");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let p4 = document.createElement("p");
          let p5 = document.createElement("p");
          let p6 = document.createElement("p");
          let p7 = document.createElement("p");
          let div_outline = document.createElement("div");
          let div_pLi=document.createElement("section");
         
          let li = document.createElement("li");
          let menu_div=document.createElement("div");
          let menu_subdiv=document.createElement("div");
          let menu_showIcon= document.createElement("i");
          let menu_selectIcon= document.createElement("i");
          let menu_deleteIcon= document.createElement("i");
          let menu_editIcon= document.createElement("i");
          let menuLi_div=document.createElement("div")

          p1.textContent = lecture.lecture_name;
          p2.textContent = lecture.lecture_course;
          p3.textContent = lecture.lecture_instructor;
          p4.textContent = lecture.lecture_writer;
          p5.textContent = lecture.lecture_date;
          p6.textContent = lecture.lecture_length;
          p7.textContent =
            lecture.lecture_length - lecture.lecture_progress;
          
            lecture.lecture_outlines.forEach((outline)=>{
            let p=document.createElement("p")
            p.textContent=outline
            div_outline.append(p)
          })
          div_pLi.setAttribute("class", "schoolPlanner_lectures_div_pLi");
         
          li.setAttribute("class","schoolPlanner_lectures_li")
          li.setAttribute("id", lecture._id + "li");
          menu_showIcon.setAttribute("class","fa fa-sharp fa-solid fa-bars");
          menu_showIcon.setAttribute("id", lecture._id + "menu_showIcon");
          menu_showIcon.setAttribute("title","")
          menu_editIcon.setAttribute("title","")
          menu_selectIcon.setAttribute("class","fa fa-sharp fa-solid fa-check");
          menu_selectIcon.setAttribute("title","");
          menu_selectIcon.setAttribute("id",lecture._id+"menu_selectIcon")
          menu_deleteIcon.setAttribute("class","fa fa-sharp fa-solid fa-trash");
          menu_editIcon.setAttribute("class","fa fa-sharp fa-solid fa-pencil");
          div_outline.setAttribute("class","fc")

          
          menu_div.setAttribute("class","fr lecuturesTable_menu_div");
          menu_subdiv.setAttribute("class","fr lecuturesTable_menu_subdiv");
          menu_subdiv.setAttribute("id",lecture._id+"menu_subdiv");
          menuLi_div.setAttribute("class","menuLi_div fr")
          menuLi_div.setAttribute("id", lecture._id + "menuLi_div");
          menu_editIcon.setAttribute("id",lecture._id+"menu_editIcon")


          //........
          menu_showIcon.addEventListener("click",()=>{
          let menu_showIcon = document.getElementById(lecture._id + "menu_showIcon");
          let menu_subdiv = document.getElementById(lecture._id + "menu_subdiv");
            if(menu_showIcon.title ===""){
              menu_subdiv.style.width="15%"
              menu_showIcon.title="clicked"
            }else{
              menu_subdiv.style.width="0"
              menu_showIcon.title=""
            }
          })

          //.............EDIT FUNCTION
          menu_editIcon.addEventListener("click", () => {
            target_editLecture=lecture._id
            document.getElementById(lecture._id + "menu_subdiv").style.width="0"
            this.openAddLectureForm({
              buttonName:"Edit",
              lecture_name:lecture.lecture_name,
              lecture_course:lecture.lecture_course,
              lecture_instructor:lecture.lecture_instructor,
              lecture_writer:lecture.lecture_writer,
              lecture_date:lecture.lecture_date,
              lecture_length:lecture.lecture_length,
              lecture_progress:lecture.lecture_progress,
              lecture_outlines:lecture.lecture_outlines
            })
          })

          //................DELETE ONE LECTURE..........
          menu_deleteIcon.addEventListener("click", () => {
            checkedLectures.push(lecture._id)
            this.deleteLecture()
           
          })
         

          
          menu_selectIcon.addEventListener("click", () => {
            let menu_selectIcon = document.getElementById(lecture._id + "menu_selectIcon");
            let li = document.getElementById(lecture._id + "li");
            if (menu_selectIcon.title === "") {
              li.style.backgroundColor = "var(--yellow)";
              menu_selectIcon.style.color = "var(--yellow)";
              menu_selectIcon.title = "clicked";
              if (checkedLectures.length > 0) {
                for (var i = 0; i < checkedLectures.length; i++) {
                  if (checkedLectures[i] === lecture._id) {
                    checkedLectures.splice(i, 1);
                  } else {
                    checkedLectures.push(lecture._id);
                    break;
                  }
                }
              } else {
                checkedLectures.push(lecture._id);
              }
            } else {
              li.style.backgroundColor = "var(--white2)";
              menu_selectIcon.style.color = "var(--white2)";
              menu_selectIcon.title = "";
              for (var i = 0; i < checkedLectures.length; i++) {
                if (checkedLectures[i] === lecture._id) {
                  checkedLectures.splice(i, 1);
                }
              }
            }
          });
          menu_subdiv.append(menu_deleteIcon,menu_editIcon,menu_selectIcon);
          menu_div.append(menu_showIcon);
          div_pLi.append(p1,p2,p3,p4,p5,p6,p7,div_outline)
          li.append(menu_div,div_pLi);
          menuLi_div.append(menu_subdiv,menu_div,li);
          ul.prepend(menuLi_div);
        });
      })
      .catch((err) => {
        if (err.message === "Cannot read property 'credentials' of null")
          console.log("Error", err.message);
      });

    // });
  };



  //.........RETRIEVE ONE COURSE.................
  // retrieveOneCourse = (course) => {
  //   let url = "https://backendstep.onrender.com/api/user/retrieveOneCourse/" + this.props.state.my_id+"/"+course.course_id;
  //   let req = new Request(url, {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       Authorization: "Bearer " + this.props.state.token,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   fetch(req)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //     })
  //   }
  //.........RETRIEVE COURSES.................
   retrieveCourses = () => {
    document.getElementById("schoolPlanner_courses_ul").innerHTML="";
    let url = "https://backendstep.onrender.com/api/user/update/" + this.props.state.my_id;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
    });
    fetch(req)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("schoolPlanner_lectures_ul").innerHTML=""
          courseNames=[]
          courseInstructorsNames=[]
          return response.json();
        }
      }).then((jsonData)=>{
        if(jsonData.schoolPlanner.courses.length>0) this.setState({
          courses:jsonData.schoolPlanner.courses
        })
        jsonData.schoolPlanner.courses.forEach((course) => { 
          //............PUSH COURSE NAME TO COURSENAMES...
          if(course.course_name!=="-")courseNames.push(course.course_name)
          course.course_instructors.forEach((instructor)=>{
            courseInstructorsNames.push(instructor)
          })
          
           courseNames_filtered = courseNames.filter((value,
            index) => {
              return courseNames.indexOf(value)===index
            });
           courseInstructorsNames_filtered = courseInstructorsNames.filter((value,
            index) => {
              return courseInstructorsNames.indexOf(value)===index
            });
          
          //..........................................
          var div_dayAndTime=document.createElement("div")
          var p_dayAndTime=[];
          for(var i=0;i<course.course_dayAndTime.length;i++){
            p_dayAndTime[i]  = document.createElement("p");
            p_dayAndTime[i].textContent=course.course_dayAndTime[i].day+" "+course.course_dayAndTime[i].time
            div_dayAndTime.append(p_dayAndTime[i]) 
          }
          
          let ul = document.getElementById("schoolPlanner_courses_ul");
          let p1 = document.createElement("p");
          let p3 = document.createElement("p");
          let p4 = document.createElement("p");
          let p5 = document.createElement("p");
          let div_instructors=document.createElement("div");
          for(var i=0;i<course.course_instructors.length;i++){
            let p6 = document.createElement("p");
            p6.textContent=course.course_instructors[i]
            div_instructors.append(p6)
          }


          let label1 = document.createElement("label");
          let label2 = document.createElement("label");
          let label3 = document.createElement("label");
          let label4 = document.createElement("label");
          let label5 = document.createElement("label");
          let label6 = document.createElement("label");


          let div_pLi1 = document.createElement("div");
          let div_pLi2 = document.createElement("div");
          let div_pLi3 = document.createElement("div");
          let div_pLi4 = document.createElement("div");
          let div_pLi5 = document.createElement("div");
          let div_pLi6 = document.createElement("div");


          let div_pLi=document.createElement("div")

          
          let li = document.createElement("li");
          let menu_div=document.createElement("div");
          let menu_selectIcon= document.createElement("i");
          let menu_deleteIcon= document.createElement("i");
          let menu_editIcon= document.createElement("i");


          p1.textContent = course.course_name+" ("+course.course_component+")";
          p3.textContent = course.course_term+" "+course.course_year;
          p4.textContent = course.course_class;
          p5.textContent = course.course_status;

          label1.textContent="Course name:"
          label2.textContent="Course time:"
          label3.textContent="Course year/term:"
          label4.textContent="Course class:"
          label5.textContent="Course status:"
          label6.textContent="Course instructors"
          
          
          div_pLi.setAttribute("class", "schoolPlanner_courses_div_pLi fc");
          li.setAttribute("class","schoolPlanner_courses_li fr")
          li.setAttribute("id", course._id + "li");

          div_dayAndTime.setAttribute("id","schoolPlanner_courses_dayAndTime_div")
          div_dayAndTime.setAttribute("class","schoolPlanner_courses_dayAndTime_div")
          div_instructors.setAttribute("class","fc schoolPlanner_courses_instructors_div")
          menu_selectIcon.setAttribute("class","fa fa-sharp fa-solid fa-check");
          menu_selectIcon.setAttribute("title","");
          menu_selectIcon.setAttribute("id",course._id+"menu_selectIcon")
          menu_deleteIcon.setAttribute("class","fa fa-sharp fa-solid fa-trash");
          menu_editIcon.setAttribute("class","fa fa-sharp fa-solid fa-pencil");
          menu_editIcon.setAttribute("id",course._id+"menu_editIcon")
          menu_div.setAttribute("class","fc schoolPlanner_coursesLiMenu_div");         

          //................DELETE ONE course..........
          menu_deleteIcon.addEventListener("click", () => {
            checkedCourses.push(course._id)
            this.deleteCourse()
           
          })
          //...............................................................
          
          //................EDIT ONE course..........
          menu_editIcon.addEventListener("click", () => {
            target_editCourse=course._id
            this.openAddCourseForm({
              buttonName:"Edit",
              course:course
            })
           
          })
          //...............................................................
         
          
          menu_selectIcon.addEventListener("click", () => {
            let menu_selectIcon = document.getElementById(course._id + "menu_selectIcon");
            let li = document.getElementById(course._id + "li");
            if (menu_selectIcon.title === "") {
              li.style.backgroundColor = "var(--yellow)";
              menu_selectIcon.style.color = "var(--yellow)";
              menu_selectIcon.title = "clicked";
              if (checkedCourses.length > 0) {
                for (var i = 0; i < checkedCourses.length; i++) {
                  if (checkedCourses[i] === course._id) {
                    checkedCourses.splice(i, 1);
                  } else {
                    checkedCourses.push(course._id);
                    break;
                  }
                }
              } else {
                checkedCourses.push(course._id);
              }
            } else {
              li.style.backgroundColor = "var(--white2)";
              menu_selectIcon.style.color = "var(--white2)";
              menu_selectIcon.title = "";
              for (var i = 0; i < checkedCourses.length; i++) {
                if (checkedCourses[i] === course._id) {
                  checkedCourses.splice(i, 1);
                }
              }
            }
          });

          div_pLi1.append(label1,p1)
          div_pLi2.append(label2,div_dayAndTime)
          div_pLi3.append(label3,p3)
          div_pLi4.append(label4,p4)
          div_pLi5.append(label5,p5)
          div_pLi6.append(label6,div_instructors)

          menu_div.append(menu_deleteIcon,menu_selectIcon,menu_editIcon);
          div_pLi.append(div_pLi1,div_pLi2,div_pLi3,div_pLi4,div_pLi5,div_pLi6)
          li.append(div_pLi,menu_div);
          ul.prepend(li);
        })
      }).then(()=>{
        //....TO ADD COURSE NAMES OPTIONS TO SELECT COURSE IN LECTURE ADD FORM 
          var select_courseNames=document.getElementById("schoolPlanner_addLecture_course_input")
          select_courseNames.innerHTML=" <option selected disabled>Lecture course</option>"
            for(var i=0;i<courseNames_filtered.length;i++){
                  let option=document.createElement("option")
                  option.innerHTML=courseNames_filtered[i];
                  select_courseNames.append(option)
                }
            var select_courseInstructorsNames=document.getElementById("schoolPlanner_addLecture_instructorName_input")
            select_courseInstructorsNames.innerHTML=" <option selected disabled>Lecture instructor name</option>"
            for(var i=0;i<courseInstructorsNames_filtered.length;i++){
                  let option=document.createElement("option")
                  option.innerHTML=courseInstructorsNames_filtered[i];
                  select_courseInstructorsNames.append(option)
                }
      })
  };
  //.............................................

   deleteLecture = async () => {
    //......DELETEING item FROM itemS DB
    for (var i = 0; i < checkedLectures.length; i++) {
      console.log(checkedLectures[i])
      let url =
        "https://backendstep.onrender.com/api/user/deleteLecture/"+ this.props.state.my_id +"/" + checkedLectures[i];
      let options = {
        method: "DELETE", 
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.props.state.token,
          "Content-Type": "application/json",
        },
      };
      let req = new Request(url, options);
      await fetch(req).then((result)=>{
        if(result.status===201){
        document.getElementById(checkedLectures[i]+"menuLi_div").remove()
      }
      });
    }

    checkedLectures = [];
  };

  //.............DELETE COURSE.....................
   deleteCourse = async () => {
    console.log(checkedCourses)
    //......DELETEING item FROM itemS DB
    for (var i = 0; i < checkedCourses.length; i++) {
      let url =
        "https://backendstep.onrender.com/api/user/deleteCourse/"+ this.props.state.my_id +"/" + checkedCourses[i];
      let options = {
        method: "DELETE", 
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.props.state.token,
          "Content-Type": "application/json",
        },
      };
      let req = new Request(url, options);
      await fetch(req).then((result)=>{
        if(result.status===201){
        document.getElementById(checkedCourses[i]+"li").remove()
      }
      });
    }

    checkedCourses = [];
  };
  //...............................................
  //..............EDIT COURSE....................
  editCourse = (object) => {
    document.getElementById("schoolPlanner_addCourse_div").style.display =
      "none";
      let url =
        "https://backendstep.onrender.com/api/user/editCourse/"+ this.props.state.my_id +"/" + target_editCourse;
      let options = {
        method: "POST", 
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_name:object.course_name,
          course_component:object.course_component,
          course_dayAndTime:courseDayAndTime,
          course_term:object.course_term,
          course_year:object.course_year,
          course_class:object.course_class,
          course_status:object.course_status,
          course_instructors:courseInstructorsNames
        }),
      };
      let req = new Request(url, options);
      fetch(req).then((result)=>{
        if(result.status===201){
          this.retrieveCourses()
      }
      });
  };
  //...............................................

  //......................................


  //........................EDIT item......................
   editLecture = (object) => {
    let url = "https://backendstep.onrender.com/api/user/editLecture/"+ this.props.state.my_id+"/"+target_editLecture;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.props.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lecture_name:object.lecture_name,
        lecture_course:object.lecture_course,
        lecture_instructor:object.lecture_instructor,
        lecture_writer:object.lecture_writer,
        lecture_date:object.lecture_date,
        lecture_length:object.lecture_length,
        lecture_progress:object.lecture_progress,
        lecture_outlines:lectureOutlines,
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((lecture)=>{
      if(lecture.status===201){ 
        document.getElementById("schoolPlanner_addLecture_div").style.display="none"
        this.retrieveLectures()
      }})
  };
  //........................ADD item.......................
   addLecture = (object) => {
    if (!object.lecture_name) object.lecture_name="-"
    if (object.lecture_course==="Lecture course") object.lecture_course="-"
    if (object.lecture_instructor==="Lecture instructor name")  object.lecture_instructor="-"
    if (!object.lecture_writer)  object.lecture_writer="-"
    if (!object.lecture_date)  object.lecture_date="-"
    if (!object.lecture_length)  object.lecture_length=0
    if (!object.lecture_progress)  object.lecture_progress=0
    let url = "https://backendstep.onrender.com/api/user/addLecture/"+ this.props.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        lecture_name: object.lecture_name,
        lecture_course: object.lecture_course,
        lecture_instructor: object.lecture_instructor,
        lecture_writer: object.lecture_writer,
        lecture_date: object.lecture_date,
        lecture_length: object.lecture_length,
        lecture_progress: object.lecture_progress,
        lecture_outlines: lectureOutlines
      }),
      headers: {
        Authorization: "Bearer " + this.props.state.token,
        "Content-Type": "application/json",
      },
  
    };
    let req = new Request(url, options);
    fetch(req).then((lecture)=>{
      if(lecture.status===201){ 
        document.getElementById("schoolPlanner_addLecture_div").style.display="none"
        this.retrieveLectures()
      }})
  };

  //.........ADD COURSE............
   addCourse = (object) => {
    if (object.course_name){
    if (object.course_component==="Course component")  object.course_component="-"
    if (object.course_year==="Course year")  object.course_year="-"
    if (object.course_term==="Course term")  object.course_term="-"
    if (object.course_class==="Course classification")  object.course_class="-"
    if (object.course_status==="Course status")  object.course_status="-"

    let url = "https://backendstep.onrender.com/api/user/addCourse/"+ this.props.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.props.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_name:object.course_name,
        course_component:object.course_component,
        course_dayAndTime:courseDayAndTime,
        course_year:object.course_year,
        course_term:object.course_term,
        course_class:object.course_class,
        course_status:object.course_status,
        course_instructors:courseInstructorsNames

      }),
    };
    let req = new Request(url, options);
    fetch(req).then((course)=>{
      if(course.status===201){ 
        document.getElementById("schoolPlanner_addCourse_div").style.display="none";
        document.getElementById("schoolPlanner_courses_ul").innerHTML="";
        this.retrieveCourses()
      }})
    }else{
    this.props.serverReply("Posting failed. Please add course name")}
  };
  render() {

  return (
    <article id="schoolPlanner_article" className='fr'>
    <aside id="schoolPlanner_courses_aside">
      <nav id="schoolPlanner_courses_nav" className="fr">
        <button onClick={()=>this.openAddCourseForm({
      buttonName:"Add"
    })}>Add course</button>
        <button onClick={() => this.deleteCourse()}>Delete course</button>
      </nav>
      <div id="schoolPlanner_courses_ulLabels_div">
                  <label>Coursess</label>
                </div>
      <ul id="schoolPlanner_courses_ul" className='fc'>
      </ul>
      {}
        </aside>
        <div id="schoolPlanner_coursesDoor_div" className='fc'>
          
        </div>
       <section id="schoolPlanner_lectures_section">
              <nav id="schoolPlanner_lectures_nav" className="fr">
                <button onClick={()=>this.openAddLectureForm({
                    buttonName:"Add"
                })}>Add lecture</button>
                <button
                  onClick={() => this.deleteLecture(checkedLectures)}
                >
                  Delete lecture
                </button>
              </nav>
              <section id="schoolPlanner_lectures_tableLabels_section">
                <div id="schoolPlanner_lectures_tableLabels_div">
                  <label>Lecture title</label>
                  <label>Lecture course</label>
                  <label>Instructor name</label>
                  <label>Writer name</label>
                  <label>Date</label>
                  <label>Length</label>
                  <label>Remaining</label>
                  <label>Outline</label>
                </div>
              </section>
              <ul id="schoolPlanner_lectures_ul">
               
              </ul>
        </section>
            <div id="schoolPlanner_addLecture_div" className="fc">
              <label onClick={this.closeAddLectureForm}>Close</label>
              <form id="schoolPlanner_addLecture_form" className="fc">
                <input
                  id="schoolPlanner_addLecture_name_input"
                  placeholder="Lecture name"
                />
                <select id="schoolPlanner_addLecture_course_input">
                <option selected disabled>Lecture course</option>
                </select>
                <select id="schoolPlanner_addLecture_instructorName_input">
                <option selected disabled>Lecture instructor name</option>
                </select>
                <input
                  id="schoolPlanner_addLecture_writerName_input"
                  placeholder="Lecture writer name"
                />
                <input id="schoolPlanner_addLecture_date_input" type="date"/>
                <input
                  id="schoolPlanner_addLecture_length_input"
                  placeholder="Lecture length"
                />
                <input
                  id="schoolPlanner_addLecture_progress_input"
                  placeholder="Lecture progress"
                />
                 <div id="schoolPlanner_addLecture_outlines_div" className='fr'>
                  <div className='fc'>
                  <textarea
                  id="schoolPlanner_addLecture_outlines_input"
                  placeholder="Lecture outline"
                />
                <ul id="schoolPlanner_addLecture_outlines_ul" className='fr'>
                </ul>
                  </div>
              
                  <label onClick={()=>{this.addLectureOutline()}}>add</label>
                
                </div>
            
              </form>
              <label id="schoolPlanner_addLecture_addButton_label"
                onClick={() =>{
                  let buttonName=document.getElementById("schoolPlanner_addLecture_addButton_label").textContent
                  let lecture_name= document.getElementById(
                    "schoolPlanner_addLecture_name_input"
                  ).value
                  let lecture_course= document.getElementById(
                    "schoolPlanner_addLecture_course_input"
                  ).value
                  let lecture_instructor= document.getElementById(
                    "schoolPlanner_addLecture_instructorName_input"
                  ).value
                  let lecture_writer= document.getElementById(
                    "schoolPlanner_addLecture_writerName_input"
                  ).value
                  let lecture_date=  document.getElementById(
                    "schoolPlanner_addLecture_date_input"
                  ).value
                  let lecture_length= document.getElementById(
                    "schoolPlanner_addLecture_length_input"
                  ).value
                  let lecture_progress= document.getElementById(
                    "schoolPlanner_addLecture_progress_input"
                  ).value

                  if(buttonName==="Add"){
                  this.addLecture({
                    lecture_name:lecture_name,
                    lecture_course:lecture_course,
                    lecture_instructor:lecture_instructor,
                    lecture_writer:lecture_writer,
                    lecture_date:lecture_date,
                    lecture_length:lecture_length,
                    lecture_progress:lecture_progress
                  }
                  )
                }
                if(buttonName==="Edit"){
                  this.editLecture({
                    lecture_name:lecture_name,
                    lecture_course:lecture_course,
                    lecture_instructor:lecture_instructor,
                    lecture_writer:lecture_writer,
                    lecture_date:lecture_date,
                    lecture_length:lecture_length,
                    lecture_progress:lecture_progress
                  })
                }
                }
              }
              >
                Add
              </label>
            </div>
            <div id="schoolPlanner_addCourse_div" className="fc">
              <label onClick={this.closeAddCourseForm}>Close</label>
              <form id="schoolPlanner_addCourse_form" className="fc">
                <input
                  id="schoolPlanner_addCourse_name_input"
                  placeholder="Course name"
                />
                <select id="schoolPlanner_addCourse_component_input">
                  <option selected="true" disabled="disabled">Course component</option>
                  <option>In-class</option>
                  <option>Out-of-class</option>
                </select>
                <div id="schoolPlanner_addCourse_dayAndTime_div" className='fr'>
                  <section id="schoolPlanner_addCourse_dayAndTime_input_section" className='fc'>
                    <div className='fc'>
                    <select id="schoolPlanner_addCourse_day_input">
                      <option selected="true" disabled="disabled">Course day</option>
                      <option>Sunday</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                    </select>
                  <input
                    id="schoolPlanner_addCourse_time_input"
                    type="time"
                  />
                  </div>
                  <ul id="schoolPlanner_addCourse_dayAndTime_ul" className='fr'></ul>
                </section>
                <div id="schoolPlanner_addCourse_dayAndTime_label">
                <label onClick={()=>{
                this.addCourseDayAndTime({
                   day:document.getElementById("schoolPlanner_addCourse_day_input").value,
                   time:document.getElementById("schoolPlanner_addCourse_time_input").value
                })
                }}>add</label>
                </div>
              
                </div>
                <select class="form-select" name="year" id="schoolPlanner_addCourse_year_input">
                      <option selected="true" disabled="disabled">Course year</option>
                      <option value="1940">1940</option>
                      <option value="1941">1941</option>
                      <option value="1942">1942</option>
                      <option value="1943">1943</option>
                      <option value="1944">1944</option>
                      <option value="1945">1945</option>
                      <option value="1946">1946</option>
                      <option value="1947">1947</option>
                      <option value="1948">1948</option>
                      <option value="1949">1949</option>
                      <option value="1950">1950</option>
                      <option value="1951">1951</option>
                      <option value="1952">1952</option>
                      <option value="1953">1953</option>
                      <option value="1954">1954</option>
                      <option value="1955">1955</option>
                      <option value="1956">1956</option>
                      <option value="1957">1957</option>
                      <option value="1958">1958</option>
                      <option value="1959">1959</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>
                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                  </select>
                  <select name="" id="schoolPlanner_addCourse_term_input">
                    <option selected="true" disabled="disabled">Course term</option>
                    <option>Fall</option>
                    <option>Winter</option>
                    <option>Summer</option>
                  </select>
                  <select id="schoolPlanner_addCourse_class_input">
                    <option selected="true" disabled="disabled">Course classification</option>
                    <option disabled="disabled">IN-CLASS</option>
                    <option>Basic science</option>
                    <option>Applied science</option>
                    <option disabled="disabled">OUT-OF-CLASS</option>
                    <option>Lab</option>
                    <option>Clinical rotation</option>
                  </select>
                  <select name="" id="schoolPlanner_addCourse_status_input">
                    <option selected="true" disabled="disabled">Course status</option>
                    <option>Unstarted</option>
                    <option>Ongoing</option>
                    <option>Pass</option>
                    <option>Fail</option>
                  </select>
                  <div id="schoolPlanner_addCourse_instructorsNames_div" className='fr'>
                  <div className='fc'>
                  <input
                  id="schoolPlanner_addCourse_instructorName_input"
                  placeholder="Course instructors"
                />
                <ul id="schoolPlanner_addCourse_instructorsNames_ul" className='fr'>
                </ul>
                  </div>
              
                  <label onClick={()=>{this.addCourseInstructorsNames()}}>add</label>
                
                </div>
            
              </form>
              <label id="schoolPlanner_addCourse_addButton_label"
                onClick={() =>{
                  let buttonName=document.getElementById("schoolPlanner_addCourse_addButton_label").textContent
                  let course_name=document.getElementById(
                    "schoolPlanner_addCourse_name_input"
                  ).value;
                  let course_component=document.getElementById(
                    "schoolPlanner_addCourse_component_input"
                  ).value;
                  let course_dayAndTime=courseDayAndTime;
                  let course_year= document.getElementById(
                    "schoolPlanner_addCourse_year_input"
                  ).value;
                  let course_term=document.getElementById(
                    "schoolPlanner_addCourse_term_input"
                  ).value;
                  let course_class=document.getElementById(
                    "schoolPlanner_addCourse_class_input"
                  ).value;
                  let course_status=document.getElementById(
                    "schoolPlanner_addCourse_status_input"
                  ).value
                    if(buttonName==="Add"){
                      this.addCourse({
                        course_name: course_name,
                        course_component: course_component,
                        course_year: course_year,
                        course_term: course_term,
                        course_class:course_class,
                        course_status:course_status,
                        })  
                      }
                    if(buttonName==="Edit"){
                      this.editCourse({
                      course_name: course_name,
                      course_component: course_component,
                      course_year: course_year,
                      course_term: course_term,
                      course_class:course_class,
                      course_status:course_status,
                      })  
                }
              }
              }
              >
              </label>
            </div>
            </article>
  )
}
}
