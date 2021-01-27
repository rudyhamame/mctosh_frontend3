const HomeContent = (props) => {
  return (
    <div id="content_home_container" style={{}}>
      <h1 id="h1_content_home_welcome">
        Hello {props.username}! Welcome to your profile on{" "}
        <span style={{ fontFamily: "var(--pacifico)", fontSize: "17pt" }}>
          Step1 Study Planner
        </span>
      </h1>
    </div>
  );
};
export default HomeContent;
