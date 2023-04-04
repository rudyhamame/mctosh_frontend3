//...........IMPORT..........
import React, { createElement } from 'react'
import "./study.css"
//.........VARIABLES.................
var subProperties=[]
var obProperties=[]
//.............................
const Study = (props) => {
 //........................ADD MEDSTATEMENT.......................
  const addKeyword = (keyword) => {
    console.log(keyword)
      let url =
        "http://localhost:4000/api/study/tool/addKeyword/" +
        props.state.study;
      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + props.state.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywordName:keyword.keywordName,
          keywordLevel:keyword.keywordLevel,
          keywordProperties:{
            keywordPropertyName:keyword.keywordProperties[0],
            keywordPropertyValue:keyword.keywordProperties[1],
            keywordPropertyUnit:keyword.keywordProperties[2],
            keywordPropertyDiscipline:keyword.keywordProperties[3],
            keywordPropertyScienceclass:keyword.keywordProperties[4],
          }
          })
     
      };
      let req = new Request(url, options);
      fetch(req).then((response)=>{
        if(response.status===201){
          let ul=document.getElementById("study_reading_content_view")

          let p_keywordName=document.createElement("p")
          let p_keywordLevel=document.createElement("p")
          let p_keywordPropertyName=document.createElement("p")
          let p_keywordPropertyValue=document.createElement("p")
          let p_keywordPropertyUnit=document.createElement("p")
          let p_keywordPropertyDiscipline=document.createElement("p")
          let p_keywordPropertyScienceclass=document.createElement("p")
          let li=document.createElement("li")
          p_keywordName.textContent=keyword.keywordName
          p_keywordLevel.textContent=keyword.keywordLevel
          p_keywordPropertyName.textContent=keyword.keywordProperties[0]
          p_keywordPropertyValue.textContent=keyword.keywordProperties[1]
          p_keywordPropertyUnit.textContent=keyword.keywordProperties[2]
          p_keywordPropertyDiscipline.textContent=keyword.keywordProperties[3]
          p_keywordPropertyScienceclass.textContent=keyword.keywordProperties[4]

          li.setAttribute("id","test")

          li.append(p_keywordName,p_keywordLevel,p_keywordPropertyName,p_keywordPropertyValue,p_keywordPropertyUnit,p_keywordPropertyDiscipline,p_keywordPropertyScienceclass)
          
          ul.appendChild(li)
        }
      });
  }

  return (
    <React.Fragment>
    <section id="study_reading_section" className="fr">
    <div id="study_reading_writingDoor_div" className='fc' onClick={()=>{
      let writingAside= document.querySelector("#study_writing_aside")
      let writingAsideStyle= getComputedStyle(writingAside)
      if(writingAsideStyle.display==="none"){
        writingAside.style.display="flex"
      }else{
        writingAside.style.display="none"
      }
    }}>
    <i class="fa fa-solid fa-pen"></i>
    </div>
    <div id="study_reading_content_div" className='fc'>
    <label id="study_reading_content_div_title">
      Medical Statements Reading Section
      </label>
      <nav id="study_reading_content_nav" className='fr'>
        <button>Keywords</button>
        <button>statements</button>
      </nav>
      <ul id="study_reading_content_view">
      </ul>
    </div>
  </section>
    <aside id="study_writing_aside" className="fc">
    <div id="study_writing_content_div" className="fc">
    <label id="study_writing_content_div_title">
        Medical Statements Writing Section
      </label>
      <form id="study_writing_keyword_form">
      <section>
          <p>Keyword</p>
          <section className='fr'>
          <input id="study_keyword_subName" type="text" placeholder="Input 𝑥 | Structure"></input>
          <select id="study_keyword_subLevel">
            <option selected="true" disabled="disabled">
              Keyword's level
            </option>
            <option>Human level</option>
            <option>System level</option>
            <option>Organ level</option>
            <option>Tissue level</option>
            <option>Cell level</option>
            <option>Molecule level</option>
          </select>
          </section>
          <section>
          <p>Keyword Properties</p>
          <section className="study_writing_content_subjectProperties_section">
          <input type="text" placeholder='Property name' id="study_keyword_subPropertyName"></input>
          <input type="text" placeholder="Value" id="study_keyword_subPropertyValue"></input>
          <input type="text" placeholder="Unit" id="study_keyword_subPropertyUnit"></input>
        
          <select type="text" id="study_keyword_subPropertyDiscipline">
          <option selected="true" disabled="disabled">
          Property discipline</option>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Anatomy</option>
          <option>Physiology</option>
          <option>Pathology</option>
          <option>Pychology</option>
          <option>Histology</option>
          <option>Cytology</option>
          <option>Biochemistry</option>
          </select>
          <select type="text" id="study_keyword_subPropertyScienceclass">
          <option selected="true" disabled="disabled">
          Science class</option>
          <option>Basic science</option>
          <option>Applied science</option>
          </select>
          </section>
          </section>          
          </section>

      </form>
      <div className='fc'>
      <button onClick={()=>{
        let keywordName =document.getElementById("study_keyword_subName").value;
        let keywordLevel =document.getElementById("study_keyword_subLevel").value;
        let keywordPropertyName =document.getElementById("study_keyword_subPropertyName").value;
        let keywordPropertyValue =document.getElementById("study_keyword_subPropertyValue").value;
        let keywordPropertyUnit =document.getElementById("study_keyword_subPropertyUnit").value;
        let keywordPropertyDiscipline =document.getElementById("study_keyword_subPropertyDiscipline").value;
        let keywordPropertyScienceclass =document.getElementById("study_keyword_subPropertyScienceclass").value;


        addKeyword({
            keywordName:keywordName,
            keywordLevel:keywordLevel,
            keywordProperties:[keywordPropertyName,keywordPropertyValue,keywordPropertyUnit,keywordPropertyDiscipline, keywordPropertyScienceclass]
        })
        

      }
      }>Post</button>
    </div>
      <form id="study_writing_statement_form">
        <section>
          <p>Subject</p>
          <section className='fr'>
          <input id="study_statement_subName" type="text" placeholder="Input 𝑥 | Structure"></input>
          <select id="study_statement_subLevel">
            <option selected="true" disabled="disabled">
              Subject's level
            </option>
            <option>Human level</option>
            <option>System level</option>
            <option>Organ level</option>
            <option>Tissue level</option>
            <option>Cell level</option>
            <option>Molecule level</option>
          </select>
          </section>
          <section>
          <p>Subject Properties</p>
          <section className="study_writing_content_subjectProperties_section">
          <input type="text" placeholder='Property name' id="study_statement_subPropertyName"></input>
          <input type="text" placeholder="Value" id="study_statement_subPropertyValue"></input>
          <input type="text" placeholder="Unit" id="study_statement_subPropertyUnit"></input>
        
          <select type="text" id="study_statement_subPropertyDiscipline">
          <option selected="true" disabled="disabled">
          Property discipline</option>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Anatomy</option>
          <option>Physiology</option>
          <option>Pathology</option>
          <option>Pychology</option>
          <option>Histology</option>
          <option>Cytology</option>
          <option>Biochemistry</option>
          </select>
          <select type="text" id="study_statement_subPropertyScienceclass">
          <option selected="true" disabled="disabled">
          Science class</option>
          <option>Basic science</option>
          <option>Applied science</option>
          </select>
          </section>
         
        </section>
        <section>
        <p>Object</p>
        <section className='fr'>
          <input id="study_statement_obName" type="text" placeholder="Structure | Function | Rule of ƒ"></input>
          <select id="study_statement_obLevel">
            <option selected="true" disabled="disabled">
              Object's level
            </option>
            <option>Human level</option>
            <option>System level</option>
            <option>Organ level</option>
            <option>Tissue level</option>
            <option>Cell level</option>
            <option>Molecule level</option>
          </select>
          </section>          
          <section>
          <p>Object Properties</p>
          <section className="study_writing_content_subjectProperties_section">
          <input type="text"  placeholder='Propety Name' id="study_statement_obPropertyName"></input>
          <input type="text" placeholder="Value" id="study_statement_obPropertyValue"></input>
          <input type="text" placeholder="Unit" id="study_statement_subUnit"></input>
        
          <select type="text" id="study_statement_obPropertyDiscipline">
          <option selected="true" disabled="disabled">
          Property discipline</option>
          <option>Chemistry</option>
          <option>Physics</option>
          <option>Anatomy</option>
          <option>Physiology</option>
          <option>Pathology</option>
          <option>Pychology</option>
          <option>Histology</option>
          <option>Cytology</option>
          <option>Biochemistry</option>
          </select>
          <select type="text" id="study_statement_obPropertyScienceclass">
          <option selected="true" disabled="disabled">
          Science class</option>
          <option>Basic science</option>
          <option>Applied science</option>
          </select>
          </section>
          </section>
        </section>
        <section>
        <p>Verb</p>
        <input id="study_statement_verbName" type="text" placeholder="Function | Output | Y"></input>
        </section>
        </section>
      </form>
    </div>
    <div className='fc'>
      <button onClick={()=>{
        let subName =document.getElementById("study_statement_subName");
        let subLevel =document.getElementById("study_statement_subLevel");
        let subPropertyName =document.getElementById("study_statement_subPropertyName");
        let subPropertyValue =document.getElementById("study_statement_subPropertyValue");
        let subPropertyUnit =document.getElementById("study_statement_subPropertyUnit");
        let subPropertyDiscipline =document.getElementById("study_statement_subPropertyDiscipline");
        let subPropertyScienceclass =document.getElementById("study_statement_subPropertyScienceclass");
        let obName =document.getElementById("study_statement_obName");
        let obLevel =document.getElementById("study_statement_obLevel");
        let obPropertyName =document.getElementById("study_statement_obPropertyName");
        let obPropertyValue =document.getElementById("study_statement_obPropertyValue");
        let obPropertyUnit =document.getElementById("study_statement_obPropertyUnit");
        let obPropertyDiscipline =document.getElementById("study_statement_obPropertyDiscipline");
        let obPropertyScienceclass =document.getElementById("study_statement_obPropertyScienceclass");
        let verbName = document.getElementById("study_statement_verbName");

      //   addStatement({
          
      //     subject:{
      //       subName:subName,
      //       subLevel:subLevel,
      //       subProperties:[{
      //         subPropertyName:subPropertyName,
      //         subPropertyValue:subPropertyValue,
      //         subPropertyUnit:subPropertyUnit,
      //         subPropertyDiscipline:subPropertyDiscipline,
      //         subPropertyScienceclass:subPropertyScienceclass,
      //       }]
           
      //     },
      //     object:{
      //       obName:obName,
      //       obLevel:obLevel,
      //       obProperties:[{
      //         obPropertyName:obPropertyName,
      //         obPropertyValue:obPropertyValue,
      //         obPropertyUnit:obPropertyUnit,
      //         obPropertyDiscipline:obPropertyDiscipline,
      //         obPropertyScienceclass:obPropertyScienceclass,
      //       }]
      //     },
      //     verb:{
      //       verbName:verbName
      //     }
      //   })
        

      }
      }>Post</button>
    </div>
  </aside>
  </React.Fragment>
  )
}

export default Study
