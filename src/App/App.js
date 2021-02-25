//...........import..................
import React from "react";

//........import CSS...........
import "./App.css";
import "./Footer/footer.css";
import "./Header/header.css";
import "./Main/Friends/AddFriend/add_friend.css";
import "./Main/Posts/posts.css";
import "./Main/main.css";
import "./Main/Friends/friends.css";
import "./Header/SearchUsers/search_users.css";
import "./Main/Posts/InputPost/SearchPosts/search_posts.css";
import "./Header/Logo/logo.css";
import "./Header/Nav/Notifications/notifications.css";
import "./Header/Nav/nav.css";
import "./Main/Posts/InputPost/inputPosts.css";
import "./Main/Posts/MountPosts/mount_posts.css";
import "./Header/Nav/Menu/menu.css";
import "./Main/Friends/FriendsList/friendslist.css";
import "./Main/Friends/Chat/chat.css";
import "./Main/Terminology/terminology.css";
import "./Main/Greeting/greeting.css";
import { Route } from "react-router-dom";
import Terminology from "./Main/Terminology/Terminology";
import Posts from "./Main/Posts/Posts";
import Friends from "./Main/Friends/Friends";
import Greeting from "./Main/Greeting/Greeting";
import SearchPosts from "./Main/Posts/InputPost/SearchPosts/SearchPosts";
import Header from "./Header/Header";
//...........component..................
class App extends React.Component {
  //..........states...........
  constructor(props) {
    super(props);
    this.state = {
      my_id: JSON.parse(sessionStorage.getItem("state")).my_id,
      username: JSON.parse(sessionStorage.getItem("state")).username,
      firstname: JSON.parse(sessionStorage.getItem("state")).firstname,
      lastname: JSON.parse(sessionStorage.getItem("state")).lastname,
      dob: JSON.parse(sessionStorage.getItem("state")).dob,
      token: JSON.parse(sessionStorage.getItem("state")).token,
      isConnected: true,
      isOnline: false,
      posts: [],
      friends: [],
      chat: [],
      terminology: [],
      app_is_loading: false,
      friend_target: null,
      server_answer: null,
      friendID_selected: null,
      searching_on: false,
      friendsPosts_retrieved: false,
      retrievingFriendsPosts_DONE: false,
      retrievingTerminology_DONE: false,
      retrievingStudySessions_DONE: false,
      notifications: [],
      timer: {
        hours: 0,
        mins: 0,
        secs: 0,
      },
      study_session: null,
      profile: false,
    };
  }
  ////////////////////////////////////////Variables//////////////

  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    if (this.props.path === "/study") {
      this.counter();
    }
    this.setState({
      my_id: JSON.parse(sessionStorage.getItem("state")).my_id,
      username: JSON.parse(sessionStorage.getItem("state")).username,
      firstname: JSON.parse(sessionStorage.getItem("state")).firstname,
      lastname: JSON.parse(sessionStorage.getItem("state")).lastname,
      dob: JSON.parse(sessionStorage.getItem("state")).dob,
      token: JSON.parse(sessionStorage.getItem("state")).token,
    });
    this.preparingChat();

    setInterval(() => {
      this.updateUserInfo();
    }, 1000);
  }
  componentDidUpdate() {
    console.log(this.state.notifications);
    if (this.state.timer && this.state.isConnected)
      sessionStorage.setItem("timer", JSON.stringify(this.state.timer));

    if (
      this.state.terminology.length > 0 &&
      this.state.retrievingTerminology_DONE === false &&
      this.props.path === "/study"
    )
      this.RetrievingTerminology();
    if (
      this.state.retrievingStudySessions_DONE === false &&
      this.props.path === "/"
    )
      this.RetrievingMyStudySessions();
    if (this.state.profile === false && this.props.path === "/study")
      this.BuildingPosts();
    if (this.state.profile === true && this.props.path === "/study")
      this.BuildingPostsProfile();
  }
  componentWillUnmount() {
    if (this.props.path === "/study") {
      let input = window.confirm(
        "Do you want this study session to be counted?"
      );
      if (input) this.updateBeforeLeave();
    }
    if (this.props.path === "/") {
      this.dbUpdate_user_connected(false);
    }
  }
  //...........................................Preperation..................................................
  preparingChat = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/chat/prepareChat/" +
      this.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req);
  };
  //............................................Retrieving Area..........................................................................
  posts_alreadyBuilt = [];
  posts_comments = [];
  BuildingPosts = () => {
    let ul = document.getElementById("MountPosts_content_container");
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts.length >= this.posts_alreadyBuilt.length) {
        if (
          this.state.posts[i]._id !== this.posts_alreadyBuilt[i] ||
          (this.state.posts[i]._id === this.posts_alreadyBuilt[i] &&
            this.state.posts[i].comments.length !== this.posts_comments[i])
        ) {
          if (
            this.state.posts[i]._id === this.posts_alreadyBuilt[i] &&
            this.state.posts[i].comments.length !== this.posts_comments[i]
          ) {
            let commentlist_ul = document.getElementById(
              "commentlist_ul" + this.state.posts[i]._id
            );
            if (this.state.posts[i].comments.length === 1) {
              let commentlist_ul = document.createElement("ul");
              commentlist_ul.setAttribute(
                "id",
                "commentlist_ul" + this.state.posts[i]._id
              );
              commentlist_ul.setAttribute("class", "fc commentlist_ul");
              let comments_div = document.getElementById(
                "commentDiv" + this.state.posts[i]._id
              );
              let li = document.createElement("li");
              li.setAttribute("class", "comment_li");
              li.textContent = this.state.posts[i].comments[
                this.state.posts[i].comments.length - 1
              ];
              commentlist_ul.prepend(li);
              comments_div.appendChild(commentlist_ul);
              this.posts_comments[i] = this.state.posts[i].comments.length;
            } else {
              let li = document.createElement("li");
              li.setAttribute("class", "comment_li");
              li.textContent = this.state.posts[i].comments[
                this.state.posts[i].comments.length - 1
              ];
              commentlist_ul.prepend(li);
              this.posts_comments[i] = this.state.posts[i].comments.length;
            }
          } else {
            this.setState({
              app_is_loading: true,
            });
            let date_p = document.createElement("p");
            let category_p = document.createElement("p");
            let subject_p = document.createElement("p");
            let reference_p = document.createElement("p");
            let page_p = document.createElement("p");
            let li = document.createElement("li");
            let details_div = document.createElement("div");
            let note_options_div = document.createElement("div");
            //.............................comments.......................

            //............date.................................
            let date = this.state.posts[i].date;
            let date_timezone = new Date(date);
            let date_string = date_timezone.toDateString();
            let time_string = date_timezone.toLocaleTimeString();
            //.............................................
            //...............................note..................................
            let note_p = document.createElement("p");
            note_p.textContent = this.state.posts[i].note;
            note_p.setAttribute("class", "note_p");
            note_options_div.setAttribute("class", "fr note_options_div");
            note_options_div.setAttribute("id", "note_options_div" + i);
            note_options_div.appendChild(note_p);
            //.......................Options....................................
            let options_div = document.createElement("div");
            options_div.setAttribute("class", "options_div");
            //............................Poster name.......................
            let postername_p = document.createElement("p");
            postername_p.setAttribute("class", "postername_p");
            details_div.appendChild(postername_p);
            //..................................

            if (this.state.posts[i].id === this.state.my_id) {
              postername_p.textContent = "Mine";
              let p_delete = document.createElement("p");
              let p_edit = document.createElement("p");
              p_delete.style.cursor = "pointer";
              p_edit.style.cursor = "pointer";
              p_delete.textContent = "Delete";
              p_edit.textContent = "Edit";
              options_div.appendChild(p_delete);
              options_div.appendChild(p_edit);
              p_delete.addEventListener("click", () =>
                this.deletePost(options_div.id)
              );
              p_edit.addEventListener("click", () =>
                this.editPost(options_div.id)
              );
              note_options_div.appendChild(options_div);
              options_div.setAttribute(
                "class",
                "fc MountPosts_postOptionsContainer"
              );
              options_div.setAttribute("id", this.state.posts[i]._id);
            } else {
              postername_p.textContent =
                this.state.posts[i].firstname +
                " " +
                this.state.posts[i].lastname;
            }
            //........................................................................

            //.....................................................................
            li.className = "fc";

            date_p.innerHTML =
              "<i class='far fa-clock'></i>" +
              "  " +
              date_string +
              ", " +
              time_string;
            category_p.textContent =
              "Category: " + this.state.posts[i].category;
            subject_p.textContent = "Subject: " + this.state.posts[i].subject;
            reference_p.textContent =
              "Reference: " + this.state.posts[i].reference;
            page_p.textContent = "Page #: " + this.state.posts[i].page_num;
            date_p.className = "MountPosts_date";
            details_div.appendChild(date_p);
            details_div.appendChild(category_p);
            details_div.appendChild(subject_p);
            details_div.setAttribute("class", "fr details_div");
            //...................comments...............
            let comments_div = document.createElement("div");
            let comment_input = document.createElement("input");
            let commentlist_ul = document.createElement("ul");
            comments_div.appendChild(comment_input);
            comments_div.setAttribute("class", "fc comments_div");
            comments_div.setAttribute(
              "id",
              "commentDiv" + this.state.posts[i]._id
            );
            comment_input.setAttribute(
              "id",
              "comment_input" + this.state.posts[i]._id
            );
            comment_input.setAttribute("class", "comment_input");
            commentlist_ul.setAttribute(
              "id",
              "commentlist_ul" + this.state.posts[i]._id
            );
            comment_input.setAttribute("placeholder", "Enter a comment");
            comment_input.addEventListener("keypress", (event) => {
              this.postComment(event, comments_div.id, comment_input.id);
            });
            this.state.posts[i].comments.forEach((comment) => {
              let comment_li = document.createElement("li");
              comment_li.textContent = comment;
              comment_li.setAttribute("class", "comment_li");
              commentlist_ul.setAttribute("class", "fc commentlist_ul");
              commentlist_ul.prepend(comment_li);
              comments_div.appendChild(commentlist_ul);
            });
            //.....................................................

            if (
              !(
                this.state.posts[i].reference === "" &&
                this.state.posts[i].page_num !== null
              )
            ) {
              if (this.state.posts[i].reference !== "")
                details_div.appendChild(reference_p);
              if (this.state.posts[i].page_num !== null)
                details_div.appendChild(page_p);
            }
            li.setAttribute("id", "li" + this.state.posts[i]._id);
            li.appendChild(details_div);
            li.appendChild(note_options_div);
            li.appendChild(comments_div);
            ul.prepend(li);
            this.posts_alreadyBuilt[i] = this.state.posts[i]._id;
            this.posts_comments[i] = this.state.posts[i].comments.length;
            this.setState({
              app_is_loading: false,
            });
          }
        }
      }
      if (this.state.posts.length < this.posts_alreadyBuilt.length) {
        this.posts_alreadyBuilt = [];
        ul.innerHTML = "";
      }
    }
  };
  //////////////////////////// Profile///////////////////////////////////////////////
  profilePosts = [];
  BuildingPostsProfile = () => {
    let ul = document.getElementById("MountPosts_content_container");
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].id === this.state.my_id) {
        if (this.state.posts.length >= this.profilePosts.length) {
          if (this.state.posts[i]._id !== this.profilePosts[i]) {
            if (
              this.state.posts[i]._id === this.profilePosts[i] &&
              this.state.posts[i].comments.length !== this.posts_comments[i]
            ) {
              let commentlist_ul = document.getElementById(
                "commentlist_ul" + this.state.posts[i]._id
              );
              if (this.state.posts[i].comments.length === 1) {
                let commentlist_ul = document.createElement("ul");
                commentlist_ul.setAttribute(
                  "id",
                  "commentlist_ul" + this.state.posts[i]._id
                );
                commentlist_ul.setAttribute("class", "fc commentlist_ul");
                let comments_div = document.getElementById(
                  "commentDiv" + this.state.posts[i]._id
                );
                let li = document.createElement("li");
                li.setAttribute("class", "comment_li");
                li.textContent = this.state.posts[i].comments[
                  this.state.posts[i].comments.length - 1
                ];
                commentlist_ul.prepend(li);
                comments_div.appendChild(commentlist_ul);
                this.posts_comments[i] = this.state.posts[i].comments.length;
              } else {
                let li = document.createElement("li");
                li.setAttribute("class", "comment_li");
                li.textContent = this.state.posts[i].comments[
                  this.state.posts[i].comments.length - 1
                ];
                commentlist_ul.prepend(li);
                this.posts_comments[i] = this.state.posts[i].comments.length;
              }
            } else {
              this.setState({
                app_is_loading: true,
              });
              let date_p = document.createElement("p");
              let category_p = document.createElement("p");
              let subject_p = document.createElement("p");
              let reference_p = document.createElement("p");
              let page_p = document.createElement("p");
              let li = document.createElement("li");
              let details_div = document.createElement("div");
              let note_options_div = document.createElement("div");
              //.............................comments.......................

              //............date.................................
              let date = this.state.posts[i].date;
              let date_timezone = new Date(date);
              let date_string = date_timezone.toDateString();
              let time_string = date_timezone.toLocaleTimeString();
              //.............................................
              //...............................note..................................
              let note_p = document.createElement("p");
              note_p.textContent = this.state.posts[i].note;
              note_p.setAttribute("class", "note_p");
              note_options_div.setAttribute("class", "fr note_options_div");
              note_options_div.setAttribute("id", "note_options_div" + i);
              note_options_div.appendChild(note_p);
              //.......................Options....................................
              let options_div = document.createElement("div");
              options_div.setAttribute("class", "options_div");
              //............................Poster name.......................
              let postername_p = document.createElement("p");
              postername_p.setAttribute("class", "postername_p");
              details_div.appendChild(postername_p);
              //..................................

              postername_p.textContent = "Mine";
              let p_delete = document.createElement("p");
              let p_edit = document.createElement("p");
              p_delete.style.cursor = "pointer";
              p_edit.style.cursor = "pointer";
              p_delete.textContent = "Delete";
              p_edit.textContent = "Edit";
              options_div.appendChild(p_delete);
              options_div.appendChild(p_edit);
              p_delete.addEventListener("click", () =>
                this.deletePost(options_div.id)
              );
              p_edit.addEventListener("click", () =>
                this.editPost(options_div.id)
              );
              note_options_div.appendChild(options_div);
              options_div.setAttribute(
                "class",
                "fc MountPosts_postOptionsContainer"
              );
              options_div.setAttribute("id", this.state.posts[i]._id);

              //........................................................................

              //.....................................................................
              li.className = "fc";

              date_p.innerHTML =
                "<i class='far fa-clock'></i>" +
                "  " +
                date_string +
                ", " +
                time_string;
              category_p.textContent =
                "Category: " + this.state.posts[i].category;
              subject_p.textContent = "Subject: " + this.state.posts[i].subject;
              reference_p.textContent =
                "Reference: " + this.state.posts[i].reference;
              page_p.textContent = "Page #: " + this.state.posts[i].page_num;
              date_p.className = "MountPosts_date";
              details_div.appendChild(date_p);
              details_div.appendChild(category_p);
              details_div.appendChild(subject_p);
              details_div.setAttribute("class", "fr details_div");
              //...................comments...............
              let comments_div = document.createElement("div");
              let comment_input = document.createElement("input");
              let commentlist_ul = document.createElement("ul");
              comments_div.appendChild(comment_input);
              comments_div.setAttribute("class", "fc comments_div");
              comments_div.setAttribute(
                "id",
                "commentDiv" + this.state.posts[i]._id
              );
              comment_input.setAttribute(
                "id",
                "comment_input" + this.state.posts[i]._id
              );
              comment_input.setAttribute("class", "comment_input");
              commentlist_ul.setAttribute(
                "id",
                "commentlist_ul" + this.state.posts[i]._id
              );
              comment_input.setAttribute("placeholder", "Enter a comment");
              comment_input.addEventListener("keypress", (event) => {
                this.postComment(event, comments_div.id, comment_input.id);
              });
              this.state.posts[i].comments.forEach((comment) => {
                let comment_li = document.createElement("li");
                comment_li.textContent = comment;
                comment_li.setAttribute("class", "comment_li");
                commentlist_ul.setAttribute("class", "fc commentlist_ul");
                commentlist_ul.prepend(comment_li);
                comments_div.appendChild(commentlist_ul);
              });
              //.....................................................

              if (
                !(
                  this.state.posts[i].reference === "" &&
                  this.state.posts[i].page_num !== null
                )
              ) {
                if (this.state.posts[i].reference !== "")
                  details_div.appendChild(reference_p);
                if (this.state.posts[i].page_num !== null)
                  details_div.appendChild(page_p);
              }
              li.setAttribute("id", "li" + this.state.posts[i]._id);
              li.appendChild(details_div);
              li.appendChild(note_options_div);
              li.appendChild(comments_div);
              ul.prepend(li);
              this.profilePosts[i] = this.state.posts[i]._id;
              // this.posts_comments[i] = this.state.posts[i].comments.length;
              this.setState({
                app_is_loading: false,
              });
            }
          }
        }
        // if (this.state.posts.length < this.posts_alreadyBuilt.length) {
        //   this.posts_alreadyBuilt = [];
        //   ul.innerHTML = "";
        // }
      }
    }
    if (this.profilePosts.length === 0) {
    }
  };
  ////////////////////////// RetrievingMyStudySessions////////////////////////////////
  RetrievingMyStudySessions = () => {
    let secs_sessionInworking = 0;
    let mins_sessionInworking = 0;
    let hours_sessionInworking = 0;
    let total_hours = 0;
    let total_mins = 0;
    let total_secs = 0;
    let secs_totalInworking = 0;
    let mins_totalInworking = 0;

    // document.getElementById("Posts_studySessions_area").innerHTML = "";
    // && ul to fix unknown problem
    if (this.state.study_session) {
      for (var i = 0; i < this.state.study_session.length; i++) {
        let ul = document.getElementById("Greeting_studySessions_area");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let li = document.createElement("li");
        let div = document.createElement("div");

        //............date.................................
        let date = this.state.study_session[i].date;
        let date_timezone = new Date(date);
        let date_string = date_timezone.toDateString();

        //.............................................
        secs_sessionInworking = this.state.study_session[i].length.secs;
        mins_sessionInworking = this.state.study_session[i].length.mins;
        hours_sessionInworking = this.state.study_session[i].length.hours;
        if (
          secs_sessionInworking < 10 ||
          mins_sessionInworking < 10 ||
          hours_sessionInworking < 10
        ) {
          if (secs_sessionInworking < 10)
            secs_sessionInworking = "0" + secs_sessionInworking;
          if (mins_sessionInworking < 10)
            mins_sessionInworking = "0" + mins_sessionInworking;
          if (hours_sessionInworking < 10)
            hours_sessionInworking = "0" + hours_sessionInworking;
        }
        li.className = "fc";
        p1.textContent = "On " + date_string;
        p2.textContent =
          "Duration: " +
          hours_sessionInworking +
          ":" +
          mins_sessionInworking +
          ":" +
          secs_sessionInworking;
        div.appendChild(p1);
        div.appendChild(p2);

        li.appendChild(div);
        ul.prepend(li);
        total_hours = total_hours + this.state.study_session[i].length.hours;
        total_mins = total_mins + this.state.study_session[i].length.mins;
        total_secs = total_secs + this.state.study_session[i].length.secs;
        secs_totalInworking = total_secs;
        mins_totalInworking = total_mins;
      }
      for (i = 0; secs_totalInworking >= 60; i++) {
        secs_totalInworking--;
        if (secs_totalInworking % 60 === 0) {
          total_mins++;
          total_secs = total_secs - 60;
        }
      }
      for (i = 0; mins_totalInworking >= 60; i++) {
        mins_totalInworking--;
        if (mins_totalInworking % 60 === 0) {
          total_hours++;
          total_mins = total_mins - 60;
        }
      }
      if (total_secs < 10 || total_mins < 10 || total_hours < 10) {
        if (total_secs < 10) total_secs = "0" + total_secs;
        if (total_mins < 10) total_mins = "0" + total_mins;
        if (total_hours < 10) total_hours = "0" + total_hours;
      }
      let li = document.getElementById("Greeting_totalDuration_li");
      let p = document.createElement("p");
      p.style.fontWeight = "600";
      p.style.padding = "10px";

      p.textContent =
        "Total duration: " + total_hours + ":" + total_mins + ":" + total_secs;
      li.appendChild(p);

      this.setState({
        retrievingStudySessions_DONE: true,
      });
    }
  };

  ///////////////////////////Retrieving terminology//////////////////////////
  RetrievingTerminology = () => {
    if (this.state.terminology) {
      this.state.terminology.forEach((term) => {
        let ul = document.getElementById("Terminology_content_container");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");
        let li = document.createElement("li");
        p1.textContent = term.term;
        p1.style.fontSize = "16pt";
        p1.style.textAlign = "center";
        p1.style.backgroundColor = "var(--white)";
        p1.style.color = "var(--black)";
        p2.textContent = term.meaning;
        p2.style.fontSize = "14pt";
        p3.textContent = "Category: " + term.category;
        p3.style.fontSize = "10pt";
        p3.style.textAlign = "right";
        p4.textContent = "Subject: " + term.subject;
        p4.style.fontSize = "10pt";
        p4.style.textAlign = "right";
        p5.textContent = "Delete";
        p5.style.backgroundColor = "var(--red)";
        p5.style.width = "fit-content";
        p5.style.padding = "0 5px";
        p5.style.cursor = "pointer";
        p5.addEventListener("click", () => {
          this.deleteTerminology(term._id);
        });
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        li.appendChild(p5);
        li.setAttribute("id", "li_term" + term._id);
        ul.prepend(li);
      });
      this.setState({
        retrievingTerminology_DONE: true,
      });
    }
  };
  ////////////////////////////Delete terminology////////////////////////////
  deleteTerminology = (term_id) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/deleteTerminology/" +
      term_id +
      "/" +
      this.state.my_id;
    let options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        document.getElementById("li_term" + term_id).remove();
        this.serverReply("term deleted");
      } else {
        this.serverReply("delete failed");
      }
    });
  };

  //////////////////////////Retrieving Messages ////////////////////////////////
  messages = [];
  RetrievingMySendingMessages = () => {
    let ul = document.getElementById("Chat_messages");
    for (var i = 0; i < this.state.chat.length; i++) {
      if (
        this.messages[i] !== this.state.chat[i].date &&
        this.state.chat[i]._id === this.state.friendID_selected
      ) {
        document
          .getElementById("Chat_messages")
          .scrollBy(0, document.getElementById("Chat_messages").scrollHeight);

        if (this.state.chat[i].from === "me") {
          let p = document.createElement("p");
          let li = document.createElement("li");
          let div = document.createElement("div");
          p.textContent = this.state.chat[i].message;
          li.setAttribute("class", "sentMessagesLI");
          li.appendChild(p);
          div.setAttribute("class", "sentMessagesDIV fc");
          div.appendChild(li);
          ul.appendChild(div);
        }
        if (this.state.chat[i].from === "them") {
          let p = document.createElement("p");
          let li = document.createElement("li");
          let div = document.createElement("div");
          p.textContent = this.state.chat[i].message;
          li.setAttribute("class", "receivedMessagesLI");
          li.appendChild(p);
          div.setAttribute("class", "receivedMessagesDIV fc");
          div.appendChild(li);
          ul.appendChild(div);
        }
      }
      this.messages[i] = this.state.chat[i].date;
    }
    // this.setState({
    //   retrievingChat_DONE: true,
    // });
  };
  //................................................................................................
  ////////////////////////////Posting a terminology////////////////////////
  postingTerminology = (term, meaning, category, subject) => {
    this.setState({
      app_is_loading: true,
    });
    let url =
      "https://backendstep1.herokuapp.com/api/user/newTerminology/" +
      this.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term: term,
        meaning: meaning,
        category: category,
        subject: subject,
        date: new Date(),
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((result) => {
        if (result.status === 201) {
          document.getElementById("Terminology_term").value = "";
          document.getElementById("Terminology_meaning").value = "";
          document.getElementById("Terminology_category").value = "";
          document.getElementById("Terminology_subject").value = "";
          this.serverReply("Posted successfully!");
        } else {
          this.serverReply(
            "Posting failed. Please make sure you select a category and/or a subject for your note"
          );
          this.setState({
            app_is_loading: false,
          });
        }
        return result.json();
      })
      .then((result) => {
        if (result) {
          let ul = document.getElementById("Terminology_content_container");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          let p3 = document.createElement("p");
          let p4 = document.createElement("p");
          let p5 = document.createElement("p");
          let li = document.createElement("li");

          // //.............................................
          // let date = result.date;
          // let date_timezone = new Date(date);
          // let date_string = date_timezone.toDateString();
          // let time_string = date_timezone.toLocaleTimeString();
          // p2.textContent =
          //   "Posted on: " + date_string + ", " + "at: " + time_string;
          // //.............................................
          p1.textContent = result.term;
          p1.style.fontSize = "16pt";
          p1.style.textAlign = "center";
          p1.style.backgroundColor = "var(--white)";
          p1.style.color = "var(--black)";
          p2.textContent = result.meaning;
          p2.style.fontSize = "14pt";
          p3.textContent = "Category: " + result.category;
          p3.style.fontSize = "10pt";
          p3.style.textAlign = "right";
          p4.textContent = "Subject: " + result.subject;
          p4.style.fontSize = "10pt";
          p4.style.textAlign = "right";
          p5.textContent = "Delete";
          p5.style.backgroundColor = "var(--red)";
          p5.style.width = "fit-content";
          p5.style.padding = "0 5px";
          p5.style.cursor = "pointer";
          p5.addEventListener("click", () => {
            this.deleteTerminology(result._id);
          });
          li.setAttribute("id", "li_term" + result._id);
          li.appendChild(p1);
          li.appendChild(p2);
          li.appendChild(p3);
          li.appendChild(p4);
          li.appendChild(p5);

          ul.prepend(li);
          //...................................
          this.setState({
            app_is_loading: false,
            retrievingTerminology_DONE: true,
          });
        }
      });
  };

  //////////////////////////Posting POSTS////////////////////////////////
  postingPost = () => {
    let posting_check = 0;
    document.getElementById("InputPost_textarea").style.height = "0";
    this.setState({
      app_is_loading: true,
    });
    let url = "https://backendstep1.herokuapp.com/api/posts/addNew";
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.my_id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        note: document.getElementById("InputPost_textarea").value,
        category: document.getElementById("InputPost_category").value,
        subject: document.getElementById("InputPost_subject").value,
        reference: document.getElementById("InputPost_resourse").value,
        page_num: document.getElementById("InputPost_page").value,
        comments: [],
        date: new Date(),
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((result) => {
        if (result.status === 201) {
          return result.json(result);
        }
      })
      .then((result) => {
        if (result) {
          document.getElementById("InputPost_textarea").value = "";
          document.getElementById("InputPost_category").value = "";
          document.getElementById("InputPost_subject").value = "";
          document.getElementById("InputPost_resourse").value = "";
          document.getElementById("InputPost_page").value = "";
          //.........................................
          this.state.friends.forEach((friend) => {
            let url_2 =
              "https://backendstep1.herokuapp.com/api/posts/postAdd/" +
              friend._id +
              "/" +
              result._id;
            let options_2 = {
              method: "POST",
              mode: "cors",
              headers: {
                Authorization: "Bearer " + this.state.token,
                "Content-Type": "application/json",
              },
            };
            let req_2 = new Request(url_2, options_2);
            fetch(req_2).then((result) => {
              if (result.status !== 201) {
                posting_check++;
              }
            });
          });
        } else {
          posting_check++;
        }
        return result;
      })
      .then((result) => {
        if (posting_check === 0) {
          let url_2 =
            "https://backendstep1.herokuapp.com/api/posts/postAdd/" +
            this.state.my_id +
            "/" +
            result._id;
          let options_2 = {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + this.state.token,
              "Content-Type": "application/json",
            },
          };
          let req_2 = new Request(url_2, options_2);
          fetch(req_2).then((result) => {
            if (result.status !== 201) {
              posting_check++;
            }
          });
        }
      })
      .then(() => {
        if (posting_check > 0) {
          this.serverReply(
            "Posting failed. Please make sure you select a category and/or a subject for your note"
          );
        } else {
          this.serverReply("Posted successfully!");
        }
        this.setState({
          app_is_loading: false,
        });
      });

    //.........................................

    this.setState({
      app_is_loading: false,
    });
  };
  ////////////////////////////////Deleting Post///////////////////////////////////////////
  deletePost = (post_id) => {
    let url =
      "https://backendstep1.herokuapp.com/api/posts/deletePost/" + post_id;
    let options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        document.getElementById(post_id).parentElement.parentElement.remove();
        this.serverReply("post deleted");
      } else {
        this.serverReply("delete failed");
      }
    });
  };
  ////////////////////////////////Edit Post///////////////////////////////////////////
  editPost = (post_id) => {
    let url =
      "https://backendstep1.herokuapp.com/api/posts/updatePost/" + post_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: document.getElementById("InputPost_textarea").value,
        category: document.getElementById("InputPost_category").value,
        subject: document.getElementById("InputPost_subject").value,
        reference: document.getElementById("InputPost_resourse").value,
        page_num: document.getElementById("InputPost_page").value,
      }),
    };
    if (
      document.getElementById("InputPost_textarea").value &&
      document.getElementById("InputPost_category").value &&
      document.getElementById("InputPost_subject").value
    ) {
      let req = new Request(url, options);
      fetch(req).then((response) => {
        if (response.status === 201) {
          this.serverReply("post modified");
        } else {
          this.serverReply("modify failed");
        }
      });
    } else {
      this.serverReply(
        "Posting failed. Please make sure you select a category and/or a subject for your note"
      );
    }
  };
  ////////////////////////Post Comment/////////////////////////////
  postComment = (event, post_id, input_id) => {
    if (event.which === 13) {
      let url =
        "https://backendstep1.herokuapp.com/api/posts/commentPost/" +
        post_id.slice(10, post_id.length) +
        "/" +
        document.getElementById(input_id).value;
      let options = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.state.token,
          "Content-Type": "application/json",
        },
      };
      let req = new Request(url, options);
      fetch(req).then((response) => {
        if (response.status === 201) {
          document.getElementById(input_id).value = "";
          this.serverReply("post modified");
        } else {
          this.serverReply("modify failed");
        }
      });
    }
  };
  //////////////////////////SEND MESSAGE TO FRIEND'S Chat////////////////////////////////
  sendToThemMessage = (message) => {
    let textarea = document.getElementById("Chat_textarea_input");
    textarea.style.height = "70px";
    if (message && message.trim() !== "") {
      let url =
        "https://backendstep1.herokuapp.com/api/chat/sendMessage/" +
        this.state.friendID_selected +
        "/" +
        this.state.my_id;
      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + this.state.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: document.getElementById("Chat_textarea_input").value,
        }),
      };
      let req = new Request(url, options);
      fetch(req).then((result) => {
        if (result.status === 201) {
          document.getElementById("Chat_textarea_input").value = "";
          return result.json();
        }
      });
      // .then((result) => {
      //   console.log(result);
      //   let ul = document.getElementById("Chat_messages");
      //   document.getElementById("Chat_textarea_input").value = "";
      //   //..........................................
      //   document
      //     .getElementById("Chat_messages")
      //     .scrollBy(0, document.getElementById("Chat_messages").scrollHeight);

      //   if (result.conversation === "sent") {
      //   let p = document.createElement("p");
      //   let li = document.createElement("li");
      //   let div = document.createElement("div");
      //   p.textContent = result.message;
      //   li.setAttribute("class", "sentMessagesLI");
      //   li.appendChild(p);
      //   div.setAttribute("class", "sentMessagesDIV fc");
      //   div.appendChild(li);
      //   ul.appendChild(div);
      //   // }
      //   // if (result.destination === "received") {
      //   //   let p = document.createElement("p");
      //   //   let li = document.createElement("li");
      //   //   let div = document.createElement("div");
      //   //   p.textContent = result.message;
      //   //   li.setAttribute("class", "receivedMessagesLI");
      //   //   li.appendChild(p);
      //   //   div.setAttribute("class", "receivedMessagesDIV fc");
      //   //   div.appendChild(li);
      //   //   ul.appendChild(div);
      //   // }
      // });
    } else {
      this.serverReply("You can't send an empty message");
    }
  };

  ////////////////////////ACCEPT FRIEND/////////////////////////////////////////////

  acceptFriend = (friend) => {
    let friend_trim = friend.slice(11, friend.length);
    document.getElementById(friend_trim).style.backgroundColor = "var(--black)";
    document.getElementById("server_answer_message").textContent = "Adding ...";
    document.getElementById("server_answer").style.width = "fit-content";
    let url =
      "https://backendstep1.herokuapp.com/api/user/acceptFriend/" +
      this.state.my_id +
      "/" +
      friend_trim;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        document.getElementById("server_answer_message").textContent =
          "You're now friends!";

        let url =
          "https://backendstep1.herokuapp.com/api/user/editUserInfo/" +
          this.state.my_id +
          "/" +
          friend_trim;
        let options = {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + this.state.token,
            "Content-Type": "application/json",
          },
        };
        let req = new Request(url, options);
        fetch(req).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              document.getElementById("server_answer").style.width = "0";
              document.getElementById("server_answer_message").textContent = "";
            }, 5000);
            document.getElementById(friend_trim).parentElement.style.display =
              "none";
          }
        });
      }
      if (response.status === 409) {
        document.getElementById("server_answer_message").textContent =
          "You're already friends!";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
        document.getElementById(friend_trim).parentElement.style.display =
          "none";
      }
    });
  };
  ////////////////////////Decline Request/////////////////////////////////////////////

  makeNotificationsRead = (friend) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/editUserInfo/" +
      this.state.my_id +
      "/" +
      friend.id;

    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      document.getElementById(friend.id).style.backgroundColor = "var(--black)";
      if (response.status === 200) {
        document.getElementById(friend.id).parentElement.style.display = "none";
        document.getElementById("server_answer").style.width = "fit-content";
        document.getElementById("server_answer_message").textContent = "Done!";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
      }
    });
  };
  ////////////////////////ADD FRIEND/////////////////////////////////////////////

  addFriend = (friend_username) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/addFriend/" +
      friend_username;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.my_id,
        message:
          this.state.firstname +
          " " +
          this.state.lastname +
          " wants to add you as a friend",
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        return response.json().then((result) => {
          document.getElementById("server_answer").style.width = "fit-content";
          document.getElementById("server_answer_message").textContent =
            result.message;
          setTimeout(() => {
            document.getElementById("server_answer").style.width = "0";
            document.getElementById("server_answer_message").textContent = "";
          }, 5000);
        });
      } else {
        document.getElementById("server_answer").style.width = "fit-content";
        document.getElementById("server_answer_message").textContent =
          "Request failed";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
      }
    });
  };

  ////////////////////////SEARCH USER/////////////////////////
  searchUsers = (target) => {
    let ul = document.getElementById("AddFriend_addFriend_results");
    let url =
      "https://backendstep1.herokuapp.com/api/user/searchUsers/" + target;
    let options = {
      method: "GET",
      mode: "cors",
    };
    let req = new Request(url, options);
    fetch(req)
      .then((results) => {
        return results.json(results);
      })
      .then((users) => {
        ul.innerHTML = null;
        for (var i = 0; i < users.array.length; i++) {
          if (this.state.friends.length > 0) {
            for (var j = 0; j < this.state.friends.length; j++) {
              if (users.array[i]._id !== this.state.my_id) {
                if (users.array[i]._id !== this.state.friends[j]._id) {
                  let p = document.createElement("p");
                  let li = document.createElement("li");
                  let ul = document.getElementById(
                    "AddFriend_addFriend_results"
                  );
                  let icon = document.createElement("i");
                  p.textContent =
                    users.array[i].info.firstname +
                    " " +
                    users.array[i].info.lastname;
                  li.appendChild(p);
                  li.setAttribute("id", users.array[i].info.username);
                  li.setAttribute("class", "fr");

                  icon.setAttribute("class", " fas fa-user-plus");
                  icon.addEventListener("click", () => {
                    this.addFriend(li.id);
                  });
                  li.appendChild(icon);
                  ul.appendChild(li);
                } else {
                  let p = document.createElement("p");
                  let p2 = document.createElement("p");
                  let li = document.createElement("li");
                  let ul = document.getElementById(
                    "AddFriend_addFriend_results"
                  );
                  p.textContent =
                    users.array[i].info.firstname +
                    " " +
                    users.array[i].info.lastname;
                  p2.textContent = "already friends";
                  p2.style.fontSize = "10pt";
                  li.appendChild(p);
                  li.appendChild(p2);
                  li.setAttribute("id", users.array[i].info.username);
                  li.setAttribute("class", "fr");
                  ul.appendChild(li);
                }
              }
            }
          } else {
            if (users.array[i]._id !== this.state.my_id) {
              let p = document.createElement("p");
              let li = document.createElement("li");
              let ul = document.getElementById("AddFriend_addFriend_results");
              let icon = document.createElement("i");
              p.textContent =
                users.array[i].info.firstname +
                " " +
                users.array[i].info.lastname;
              li.appendChild(p);
              li.setAttribute("id", users.array[i].info.username);
              li.setAttribute("class", "fr");

              icon.setAttribute("class", " fas fa-user-plus");
              icon.addEventListener("click", () => {
                this.addFriend(li.id);
              });
              li.appendChild(icon);
              ul.appendChild(li);
            }
          }
        }
      });
  };

  //////////////////////////////BUILD FRIENDS LIST////////////////
  app_friends = [];

  buildFriendsList = () => {
    let ul = document.getElementById("FriendsList_friends_list");

    for (var i = 0; i < this.state.friends.length; i++) {
      //For every friend
      if (this.app_friends[i] !== this.state.friends[i]._id) {
        //If a friend is new to the app add it to the friends list with respect to the online status and to the app memory
        let p = document.createElement("p");
        let li = document.createElement("li");
        let icon = document.createElement("i");

        p.textContent =
          this.state.friends[i].info.firstname +
          " " +
          this.state.friends[i].info.lastname;
        p.setAttribute("id", [i]);
        li.appendChild(p);
        li.setAttribute("id", this.state.friends[i]._id);
        li.addEventListener("click", () => {
          this.get_current_friend_chat_id(li.id);
          this.RetrievingMySendingMessages(li.id);
          document.getElementById("DropHorizontally_article").style.display =
            "none";
        });
        li.setAttribute("class", "fr");
        li.setAttribute("title", this.state.friends[i].info.firstname);
        icon.setAttribute("id", "online_icon" + this.state.friends[i]._id);
        icon.setAttribute("class", "fas fa-circle");
        li.appendChild(icon);
        ul.appendChild(li);
        if (this.state.friends[i].status.isConnected) {
          icon.style.color = "#32cd32";
        } else {
          icon.style.color = "var(--black)";
        }
        this.app_friends[i] = this.state.friends[i]._id;
      }
      if (this.app_friends[i] === this.state.friends[i]._id) {
        // if we already have this friend in the memory app just check their online status and change it
        if (this.state.friends[i].status.isConnected) {
          document.getElementById(
            "online_icon" + this.state.friends[i]._id
          ).style.color = "#32cd32";
        } else {
          document.getElementById(
            "online_icon" + this.state.friends[i]._id
          ).style.color = "var(--black)";
        }
      }
    }
  };

  ////////////////////////////Select friend id to chat //////////////////////////////////////////////////
  get_current_friend_chat_id = (friendID) => {
    this.setState({
      friendID_selected: friendID,
    });
    this.state.friends.forEach((friend) => {
      if (friend._id === friendID) {
        document.getElementById("Chat_title_text").textContent =
          friend.info.firstname;
      }
    });
    document.getElementById("Chat_goback_icon").style.display = "inline";
    document.getElementById("Chat_article").style.height = "100%";
    document.getElementById("FriendsList_article").style.height = "0";
  };
  ////////////////////////////Update State//////////DONE/////////////////////
  updateUserInfo = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/update/" + this.state.my_id;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    });
    fetch(req)
      .then((response) => {
        if (response.status === 200) {
          return response.json(response);
        }
      })
      .then((jsonData) => {
        this.setState({
          friends: jsonData.friends,
          chat: jsonData.chat,
          posts: jsonData.posts,
          notifications: jsonData.notifications,
          terminology: jsonData.terminology,
          study_session: jsonData.study_session,
          isOnline: jsonData.isOnline,
        });
        return jsonData;
      })
      .then(() => {
        if (this.props.path === "/study") {
          this.buildFriendsList();
          this.buildNotifications();
          if (this.state.friendID_selected) this.RetrievingMySendingMessages();
        }
      })
      .catch((err) => {
        if (err.message === "Cannot read property 'credentials' of null")
          console.log("Error", err.message);
      });
  };

  ////////////////////////////////////BUILD NOTIFICATIONS////////////////////////
  notificaitons_array = [];

  buildNotifications = () => {
    let ul = document.getElementById("Notifications_dropMenu_container");
    for (var i = 0; i < this.state.notifications.length; i++) {
      if (
        this.state.notifications[i].status !== "read" &&
        this.notificaitons_array[i] !== this.state.notifications[i]._id
      ) {
        document.getElementById("i_bell_open").style.color = "yellow";
        let p = document.createElement("p");
        let li = document.createElement("li");
        let div = document.createElement("div");
        let decline_icon = document.createElement("i");
        let accept_icon = document.createElement("i");
        accept_icon.addEventListener("click", () => {
          this.acceptFriend(accept_icon.id);
        });
        decline_icon.addEventListener("click", () => {
          this.makeNotificationsRead(this.state.notifications[i]);
        });
        decline_icon.setAttribute("class", "fas fa-times");
        accept_icon.setAttribute("class", "fas fa-user-check");
        accept_icon.setAttribute(
          "id",
          "accept_icon" + this.state.notifications[i].id
        );
        decline_icon.setAttribute(
          "id",
          "decline_icon" + this.state.notifications[i].id
        );

        p.textContent = this.state.notifications[i].message;
        div.setAttribute("class", "fr");
        div.style.justifyContent = "space-between";
        li.setAttribute("id", this.state.notifications[i].id);
        li.appendChild(p);
        div.appendChild(li);
        div.appendChild(decline_icon);
        div.appendChild(accept_icon);
        ul.appendChild(div);
      }

      this.notificaitons_array[i] = this.state.notifications[i]._id;
    }
  };
  ///////////////////////////////////////Counter////////////////////////////////////////////////
  counter = () => {
    let secs;
    let mins;
    let hours;
    document.getElementById("Posts_content_container").style.height = "100%";
    // document.getElementById("Footer_article").style.display = "none";
    // document.getElementById("SearchPosts_article").style.display = "flex";
    // document.getElementById("timer").style.display = "inline";
    if (JSON.parse(sessionStorage.getItem("timer"))) {
      secs = JSON.parse(sessionStorage.getItem("timer")).secs;
      mins = JSON.parse(sessionStorage.getItem("timer")).mins;
      hours = JSON.parse(sessionStorage.getItem("timer")).hours;
    } else {
      secs = 0;
      mins = 0;
      hours = 0;
    }
    setInterval(() => {
      secs++;
      if (secs % 60 === 0 && secs !== 0) {
        mins++;
        secs = 0;
      }
      if (mins % 60 === 0 && mins !== 0) {
        hours++;
        mins = 0;
      }

      this.setState({
        timer: {
          hours: hours,
          mins: mins,
          secs: secs,
        },
      });
    }, 1000);
  };

  ////////////////////////////////////////////////////UPDATE isConnect on databae////////////////////////////////
  dbUpdate_user_connected = (isConnected) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/isOnline/" +
      this.state.my_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isConnected: isConnected,
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.status === 201 && this.state.isConnected === false) {
          sessionStorage.removeItem("timer");
          sessionStorage.removeItem("state");
          window.location.reload();
          return response.json();
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };

  updateBeforeLeave = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/updateBeforeLeave/" +
      this.state.my_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        study_session: {
          date: new Date(),
          length: this.state.timer,
        },
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.status === 201 && this.state.isConnected === false) {
          sessionStorage.removeItem("timer");
          sessionStorage.removeItem("state");
          window.location.reload();
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };

  //........Server answer..........
  serverReply = (answer) => {
    document.getElementById("server_answer_message").textContent = answer;

    document.getElementById("server_answer").style.width = "fit-content";
    setTimeout(() => {
      document.getElementById("server_answer").style.width = "0";
      document.getElementById("server_answer_message").textContent = "";
    }, 8000);
  };

  //.....loader function..........
  loader = () => {
    return (
      <div
        style={{
          fontSize: "20pt",
          display: "flex",
          position: "fixed",
          top: "0",
          bottom: "0",

          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          zIndex: "100",
        }}
      >
        <img src="/img/loader.gif" alt="" width="70px" />
      </div>
    );
  };

  /////////////////////////Log out//////////////////////
  logOut = () => {
    this.setState({
      isConnected: false,
    });
    if (this.props.path === "/study") {
      let input = window.confirm(
        "Do you want this study session to be counted?"
      );
      if (input) {
        this.updateBeforeLeave();
      } else {
        this.dbUpdate_user_connected(false);
      }
    }
    if (this.props.path === "/") {
      this.dbUpdate_user_connected(false);
    }
  };

  ///////////////////////Searching in posts////////////////////
  prepare_searchPosts = (entry1, entry2, entry3) => {
    let keyword;
    let subject;
    let category;
    if (!entry1) {
      keyword = "$";
    } else {
      keyword = entry1;
    }
    if (!entry2) {
      subject = "$";
    } else {
      subject = entry2;
    }
    if (!entry3) {
      category = "$";
    } else {
      category = entry3;
    }
    this.searchPosts(keyword, subject, category);
  };
  searchPosts = (keyword, subject, category) => {
    let ul = document.getElementById("MountPosts_content_container");
    let ul_term = document.getElementById("Terminology_content_container");
    let array = [];
    let array_term = [];
    ul.innerHTML = "";
    ul_term.innerHTML = "";
    //..................................
    this.state.posts.forEach((post) => {
      if (keyword !== "$" && subject === "$" && category === "$") {
        if (
          String(post.note).toLowerCase() === keyword.toLowerCase() ||
          String(post.note).toLowerCase().includes(keyword.toLowerCase())
        ) {
          array.push(post);
        }
      }
      if (keyword === "$" && subject !== "$" && category === "$") {
        if (post.subject === subject) {
          array.push(post);
        }
      }
      if (keyword === "$" && subject === "$" && category !== "$") {
        if (post.category === category) {
          array.push(post);
        }
      }
      if (keyword !== "$" && subject !== "$" && category === "$") {
        if (
          String(post.note).toLowerCase() === keyword.toLowerCase() ||
          String(post.note)
            .toLowerCase()
            .includes(keyword.toLowerCase() && post.subject === subject)
        ) {
          array.push(post);
        }
      }
      if (keyword !== "$" && subject === "$" && category !== "$") {
        if (
          String(post.note).toLowerCase() === keyword.toLowerCase() ||
          String(post.note)
            .toLowerCase()
            .includes(keyword.toLowerCase() && post.category === category)
        ) {
          array.push(post);
        }
      }
      if (keyword === "$" && subject !== "$" && category !== "$") {
        if (post.subject === subject && post.category === category) {
          array.push(post);
        }
      }
      if (keyword !== "$" && subject !== "$" && category !== "$") {
        if (
          String(post.note).toLowerCase() === keyword.toLowerCase() ||
          String(post.note)
            .toLowerCase()
            .includes(
              keyword.toLowerCase() &&
                post.subject === subject &&
                post.category === category
            )
        ) {
          array.push(post);
        }
      }
    });
    //..............................................
    this.state.terminology.forEach((term) => {
      if (keyword !== "$" && subject === "$" && category === "$") {
        if (
          String(term.term).toLowerCase() === keyword.toLowerCase() ||
          String(term.term).toLowerCase().includes(keyword.toLowerCase())
        ) {
          array_term.push(term);
        }
      }
      if (keyword === "$" && subject !== "$" && category === "$") {
        if (term.subject === subject) {
          array_term.push(term);
        }
      }
      if (keyword === "$" && subject === "$" && category !== "$") {
        if (term.category === category) {
          array_term.push(term);
        }
      }
      if (keyword !== "$" && subject !== "$" && category === "$") {
        if (
          String(term.note).toLowerCase() === keyword.toLowerCase() ||
          String(term.note)
            .toLowerCase()
            .includes(keyword.toLowerCase() && term.subject === subject)
        ) {
          array_term.push(term);
        }
      }
      if (keyword !== "$" && subject === "$" && category !== "$") {
        if (
          String(term.note).toLowerCase() === keyword.toLowerCase() ||
          String(term.note)
            .toLowerCase()
            .includes(keyword.toLowerCase() && term.category === category)
        ) {
          array_term.push(term);
        }
      }
      if (keyword === "$" && subject !== "$" && category !== "$") {
        if (term.subject === subject && term.category === category) {
          array_term.push(term);
        }
      }
      if (keyword !== "$" && subject !== "$" && category !== "$") {
        if (
          String(term.note).toLowerCase() === keyword.toLowerCase() ||
          String(term.note)
            .toLowerCase()
            .includes(
              keyword.toLowerCase() &&
                term.subject === subject &&
                term.category === category
            )
        ) {
          array_term.push(term);
        }
      }
    });
    //.......................................
    this.searchTerminology(array_term);
    //.............................................
    let array_associate = [];
    for (var i = 0; i < array.length; i++) {
      if (array_associate[i] !== array[i]._id) {
        let date_p = document.createElement("p");
        let category_p = document.createElement("p");
        let subject_p = document.createElement("p");
        let reference_p = document.createElement("p");
        let page_p = document.createElement("p");
        let li = document.createElement("li");
        let details_div = document.createElement("div");
        let note_options_div = document.createElement("div");
        //.............................comments.......................

        //............date.................................
        let date = array[i].date;
        let date_timezone = new Date(date);
        let date_string = date_timezone.toDateString();
        let time_string = date_timezone.toLocaleTimeString();
        //.............................................
        //...............................note..................................
        let note_p = document.createElement("p");
        note_p.textContent = array[i].note;
        note_p.setAttribute("class", "note_p");
        note_options_div.setAttribute("class", "fr note_options_div");
        note_options_div.setAttribute("id", "note_options_div" + i);
        note_options_div.appendChild(note_p);
        //.......................Options....................................
        let options_div = document.createElement("div");
        options_div.setAttribute("class", "options_div");
        //............................Poster name.......................
        let postername_p = document.createElement("p");
        postername_p.setAttribute("class", "postername_p");
        details_div.appendChild(postername_p);
        //..................................
        if (array[i].id === this.state.my_id) {
          postername_p.textContent = "Mine";
          let p_delete = document.createElement("p");
          let p_edit = document.createElement("p");
          p_delete.style.cursor = "pointer";
          p_edit.style.cursor = "pointer";
          p_delete.textContent = "Delete";
          p_edit.textContent = "Edit";
          options_div.appendChild(p_delete);
          options_div.appendChild(p_edit);
          p_delete.addEventListener("click", () =>
            this.deletePost(options_div.id)
          );
          p_edit.addEventListener("click", () => this.editPost(options_div.id));
          note_options_div.appendChild(options_div);
          options_div.setAttribute(
            "class",
            "fc MountPosts_postOptionsContainer"
          );
          options_div.setAttribute("id", array[i]._id);
        } else {
          postername_p.textContent =
            array[i].firstname + " " + array[i].lastname;
        }
        //........................................................................

        //.....................................................................
        li.className = "fc";

        date_p.innerHTML =
          "<i class='far fa-clock'></i>" +
          "  " +
          date_string +
          ", " +
          time_string;
        category_p.textContent = "Category: " + array[i].category;
        subject_p.textContent = "Subject: " + array[i].subject;
        reference_p.textContent = "Reference: " + array[i].reference;
        page_p.textContent = "Page #: " + array[i].page_num;
        date_p.className = "MountPosts_date";
        details_div.appendChild(date_p);
        details_div.appendChild(category_p);
        details_div.appendChild(subject_p);
        details_div.setAttribute("class", "fr details_div");
        //...................comments...............
        let comments_div = document.createElement("div");
        let comment_input = document.createElement("input");
        let commentlist_ul = document.createElement("ul");
        comments_div.appendChild(comment_input);
        comments_div.setAttribute("class", "fc comments_div");
        comments_div.setAttribute("id", "commentDiv" + array[i]._id);
        comment_input.setAttribute("id", "comment_input" + array[i]._id);
        comment_input.setAttribute("class", "comment_input");
        commentlist_ul.setAttribute("id", "commentlist_ul" + array[i]._id);
        comment_input.setAttribute("placeholder", "Enter a comment");
        comment_input.addEventListener("keypress", (event) => {
          this.postComment(event, comments_div.id, comment_input.id);
        });
        array[i].comments.forEach((comment) => {
          let comment_li = document.createElement("li");
          comment_li.textContent = comment;
          comment_li.setAttribute("class", "comment_li");
          commentlist_ul.setAttribute("class", "fc commentlist_ul");
          commentlist_ul.prepend(comment_li);
          comments_div.appendChild(commentlist_ul);
        });
        //.....................................................

        if (!(array[i].reference === "" && array[i].page_num !== null)) {
          if (array[i].reference !== "") details_div.appendChild(reference_p);
          if (array[i].page_num !== null) details_div.appendChild(page_p);
        }
        li.setAttribute("id", "li" + array[i]._id);
        li.appendChild(details_div);
        li.appendChild(note_options_div);
        li.appendChild(comments_div);
        ul.appendChild(li);
        this.setState({
          app_is_loading: false,
        });
      }
      array_associate[i] = array[i]._id;
    }
  };
  searchTerminology = (array) => {
    if (array) {
      array.forEach((term) => {
        let ul = document.getElementById("Terminology_content_container");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");
        let li = document.createElement("li");
        p1.textContent = term.term;
        p1.style.fontSize = "16pt";
        p1.style.textAlign = "center";
        p1.style.backgroundColor = "var(--white)";
        p1.style.color = "var(--black)";
        p2.textContent = term.meaning;
        p2.style.fontSize = "14pt";
        p3.textContent = "Category: " + term.category;
        p3.style.fontSize = "10pt";
        p3.style.textAlign = "right";
        p4.textContent = "Subject: " + term.subject;
        p4.style.fontSize = "10pt";
        p4.style.textAlign = "right";
        p5.textContent = "Delete";
        p5.style.backgroundColor = "var(--red)";
        p5.style.width = "fit-content";
        p5.style.padding = "0 5px";
        p5.style.cursor = "pointer";
        p5.addEventListener("click", () => {
          this.deleteTerminology(term._id);
        });
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(p4);
        li.appendChild(p5);
        li.setAttribute("id", "li_term" + term._id);
        ul.prepend(li);
      });
      this.setState({
        retrievingTerminology_DONE: true,
      });
    }
  };
  show_profile = (boolean) => {
    this.setState({
      profile: boolean,
    });
  };
  //.....Reander Login HTML..........
  render() {
    return (
      <article id="app_page" className="fc">
        {this.props.path === "/study" && (
          <Header
            state={this.state}
            logOut={this.logOut}
            acceptFriend={this.acceptFriend}
            type={this.type}
            show_profile={this.show_profile}
          />
        )}
        <main id="Main_article" className="fr">
          <Route exact path="/">
            <Greeting state={this.state} />
          </Route>
          <Route exact path="/study">
            {parseInt(
              window.getComputedStyle(document.querySelector("#root")).width
            ) > 1200 && (
              <Terminology
                state={this.state}
                postingTerminology={this.postingTerminology}
              />
            )}
            {this.state.profile === false && (
              <Posts
                state={this.state}
                postingPost={this.postingPost}
                RetrievingMyPosts={this.RetrievingMyPosts}
                searchPosts={this.searchPosts}
                prepare_searchPosts={this.prepare_searchPosts}
                logOut={this.logOut}
                acceptFriend={this.acceptFriend}
                type={this.type}
                counter={this.counter}
                updateBeforeLeave={this.updateBeforeLeave}
                app_posts_sorted={this.app_posts_sorted}
                path="/study"
                profilePosts={this.profilePosts}
              />
            )}
            {this.state.profile === true && (
              <Posts
                state={this.state}
                postingPost={this.postingPost}
                RetrievingMyPosts={this.RetrievingMyPosts}
                searchPosts={this.searchPosts}
                prepare_searchPosts={this.prepare_searchPosts}
                logOut={this.logOut}
                acceptFriend={this.acceptFriend}
                type={this.type}
                counter={this.counter}
                updateBeforeLeave={this.updateBeforeLeave}
                app_posts_sorted={this.app_posts_sorted}
                path="/study"
                profilePosts={this.profilePosts}
              />
            )}
            {this.props.path === "/study" &&
              parseInt(
                window.getComputedStyle(document.querySelector("#root")).width
              ) > 1200 && (
                <Friends
                  state={this.state}
                  searchUsers={this.searchUsers}
                  addFriend={this.addFriend}
                  RetrievingMySendingMessages={this.RetrievingMySendingMessages}
                  sendToMeMessage={this.sendToMeMessage}
                  sendToThemMessage={this.sendToThemMessage}
                  dbUpdate_user_connected={this.dbUpdate_user_connected}
                  path="/"
                />
              )}
          </Route>

          {this.props.path === "/" &&
            parseInt(
              window.getComputedStyle(document.querySelector("#root")).width
            ) > 1200 && (
              <Friends
                state={this.state}
                searchUsers={this.searchUsers}
                addFriend={this.addFriend}
                RetrievingMySendingMessages={this.RetrievingMySendingMessages}
                sendToMeMessage={this.sendToMeMessage}
                sendToThemMessage={this.sendToThemMessage}
                dbUpdate_user_connected={this.dbUpdate_user_connected}
                path="/"
              />
            )}
        </main>
        <section style={{ order: "4" }}>
          {this.props.path === "/study" &&
            parseInt(
              window.getComputedStyle(document.querySelector("#root")).width
            ) <= 1200 && (
              <Friends
                state={this.state}
                searchUsers={this.searchUsers}
                addFriend={this.addFriend}
                RetrievingMySendingMessages={this.RetrievingMySendingMessages}
                sendToMeMessage={this.sendToMeMessage}
                sendToThemMessage={this.sendToThemMessage}
                dbUpdate_user_connected={this.dbUpdate_user_connected}
                path="/study"
                serverReply={this.serverReply}
              />
            )}
          {this.props.path === "/study" &&
            parseInt(
              window.getComputedStyle(document.querySelector("#root")).width
            ) <= 1200 && (
              <Terminology
                state={this.state}
                postingTerminology={this.postingTerminology}
              />
            )}
        </section>
        {this.props.path === "/study" && (
          <SearchPosts
            type="posts_search"
            searchPosts={this.searchPosts}
            prepare_searchPosts={this.prepare_searchPosts}
            posts_alreadyBuilt={this.posts_alreadyBuilt}
            posts_comments={this.posts_comments}
          />
        )}
        <div
          id="server_answer"
          onClick={() => {
            document.getElementById("server_answer").style.width = "0";
          }}
        >
          <p id="server_answer_message"></p>
        </div>
        {this.state.app_is_loading && (
          <div
            style={{
              fontSize: "20pt",
              display: "flex",
              position: "fixed",
              top: "0",
              bottom: "0",
              right: "0",
              left: "0",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              zIndex: "100",
            }}
          >
            <img
              src="/img/loader.gif"
              alt=""
              width="70px"
              style={{
                margin: "auto",
              }}
            />
          </div>
        )}
      </article>
    );
  }
}
export default App;
