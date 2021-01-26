const HomeContent = (props) => {
  return (
    <div
      id="content_home_page"
      className="fc"
      style={{
        order: "1",
        overflow: "hidden",
        flexGrow: "1",
        margin: "0 auto",
        height: "100%",
        fontFamily: "'Roboto', sans-serif",
        backgroundImage: "url(/img/home2.jpeg)",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
      <div
        id="content_home_page_content"
        style={{
          overflow: "hidden",
          margin: "0 auto",
          backgroundColor: "var(--gray)",
          margin: "auto",
          width: "fit-content",
        }}
      >
        <h1
          style={{
            color: "black",
            fontWeight: "300",
            width: "fit-content",
            margin: "auto",
            fontSize: "35pt",
            padding: "30px",
          }}
        >
          Hello {props.username}, <br></br> Welcome to{" "}
          <span style={{ fontFamily: "var(--pacifico)" }}>Study Planner</span>
        </h1>
      </div>
    </div>
  );
};
export default HomeContent;
