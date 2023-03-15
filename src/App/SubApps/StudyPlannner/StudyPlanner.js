import React, { Component } from "react";
import Header from "../../Header/Header";
import LecturesOrganizer from "./components/LecturesOrganizer";
import "./studyplanner.css";

export default class StudyPlanner extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //.........VARIABLES................
  checkedLectures = [];
  //............................
  componentDidMount() {
    this.retrieveLectures();
  }

  openAddLectureForm = () => {
    document.getElementById("studyplanner_addLecture_div").style.display =
      "flex";
  };
  closeAddLectureForm = () => {
    document.getElementById("studyplanner_addLecture_div").style.display =
      "none";
  };

  retrieveLectures = () => {
    let url =
      "http://localhost:4000/api/user/retrieveLectures/" +
      this.props.state.my_id;
    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        result.forEach((lecture) => {
          let ul = document.getElementById("studyplanner_lectures_ul");
          let divbox = document.createElement("div");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let p4 = document.createElement("p");
          let p5 = document.createElement("p");
          let p6 = document.createElement("p");
          let p7 = document.createElement("p");
          let p8 = document.createElement("p");
          let checkbox = document.createElement("input");
          let li = document.createElement("li");
          let div_checkbox = document.createElement("div");
          checkbox.setAttribute("type", "checkbox");
          checkbox.addEventListener("click", () => {
            this.checkedLectures.push(lecture._id);
          });

          p1.textContent = lecture.name;
          p2.textContent = lecture.subject;
          p3.textContent = lecture.instructor_name;
          p4.textContent = lecture.year;
          p5.textContent = lecture.term;
          p6.textContent = lecture.total_number_of_pages;
          p7.textContent =
            lecture.total_number_of_pages - lecture.finish_number_of_pages;
          p8.textContent = lecture.library_name;
          checkbox.setAttribute("id", lecture._id);
          divbox.setAttribute("class", "studyplanner_lectures_divbox");

          div_checkbox.appendChild(checkbox);
          li.appendChild(p1);
          li.appendChild(p2);
          li.appendChild(p3);
          li.appendChild(p4);
          li.appendChild(p5);
          li.appendChild(p6);
          li.appendChild(p7);
          li.appendChild(p8);

          divbox.prepend(li);
          divbox.prepend(div_checkbox);

          ul.prepend(divbox);
        });
      });
  };

  deleteLecture = (lectures_ids) => {
    lectures_ids.forEach((lecture_id) => {
      let url =
        "http://localhost:4000/api/user/deleteLecture/" +
        this.props.state.my_id +
        "/" +
        lecture_id;
      let options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.state.token,
          "Content-Type": "application/json",
        },
      };
      let req = new Request(url, options);
      fetch(req).then((result) => {
        console.log(result.json());
      });
    });
  };
  addLecture = (
    name,
    subject,
    instructor_name,
    year,
    term,
    total_number_of_pages,
    finish_number_of_pages,
    library_name
  ) => {
    let url =
      "http://localhost:4000/api/user/addLecture/" + this.props.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        instructor_name: instructor_name,
        library_name: library_name,
        subject: subject,
        year: year,
        term: term,
        total_number_of_pages: total_number_of_pages,
        finish_number_of_pages: finish_number_of_pages,
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result) {
          let ul = document.getElementById("studyplanner_lectures_ul");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let p4 = document.createElement("p");
          let p5 = document.createElement("p");
          let p6 = document.createElement("p");
          let p7 = document.createElement("p");
          let p8 = document.createElement("p");
          let li = document.createElement("li");

          p1.textContent = result.name;
          p2.textContent = result.subject;
          p3.textContent = result.instructor_name;
          p4.textContent = result.year;
          p5.textContent = result.term;
          p6.textContent = result.total_number_of_pages;
          p7.textContent =
            result.total_number_of_pages - result.finish_number_of_pages;
          p8.textContent = result.library_name;

          li.appendChild(p1);
          li.appendChild(p2);
          li.appendChild(p3);
          li.appendChild(p4);
          li.appendChild(p5);
          li.appendChild(p6);
          li.appendChild(p7);
          li.appendChild(p8);
          ul.prepend(li);
        }
      });
  };

  render() {
    return (
      <article id="app_page" className="fc">
        <Header
          state={this.props.state}
          logOut={this.logOut}
          acceptFriend={this.acceptFriend}
          type={this.type}
          show_profile={this.show_profile}
        />
        <main id="Main_article">
          <article id="studyplanner_article" className="fc">
            {/* <nav id="studyplanner_nav" className="fr">
              <button>الجلدية</button>
              <button>التشريح المرضي</button>
              <button>الأشعة 1</button>
              <button>الطفيليات</button>
            </nav> */}
            <section id="studyplanner_lectures_section">
              <nav id="studyplanner_lectures_nav" className="fr">
                <button onClick={this.openAddLectureForm}>Add Lecture</button>
                <button
                  onClick={() => this.deleteLecture(this.checkedLectures)}
                >
                  Delete Lecture
                </button>
                <button onClick={this.openAddLectureForm}>Edit Lecture</button>
              </nav>
              <div id="studyplanner_lectures_tableLabels_div">
                <label>Lecture title</label>
                <label>Subject</label>
                <label>Instructor name</label>
                <label>Year</label>
                <label>Term</label>
                <label>Total pages</label>
                <label>Remaining pages</label>
                <label>Library name</label>
              </div>
              <ul id="studyplanner_lectures_ul"></ul>
            </section>
            <div id="studyplanner_addLecture_div" className="fc">
              <label onClick={this.closeAddLectureForm}>Close</label>
              <form id="studyplanner_addLecture_form" className="fc">
                <input
                  id="studyplanner_addLecture_name_input"
                  placeholder="Name"
                />
                <input
                  id="studyplanner_addLecture_subject_input"
                  placeholder="Subject"
                />
                <input
                  id="studyplanner_addLecture_instructorName_input"
                  placeholder="Instructor name"
                />
                <input
                  id="studyplanner_addLecture_year_input"
                  placeholder="Year"
                />
                <input
                  id="studyplanner_addLecture_term_input"
                  placeholder="Term"
                />
                <input
                  id="studyplanner_addLecture_totalNumOfPages_input"
                  placeholder="Number of pages"
                />
                <input
                  id="studyplanner_addLecture_finishNumOfPages_input"
                  placeholder="Number of pages"
                />
                <input
                  id="studyplanner_addLecture_libraryName_input"
                  placeholder="Library name"
                />
              </form>
              <label
                onClick={() =>
                  this.addLecture(
                    document.getElementById(
                      "studyplanner_addLecture_name_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_subject_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_instructorName_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_year_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_term_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_totalNumOfPages_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_finishNumOfPages_input"
                    ).value,
                    document.getElementById(
                      "studyplanner_addLecture_libraryName_input"
                    ).value
                  )
                }
              >
                Add
              </label>
            </div>
          </article>
        </main>
      </article>
    );
  }
}
