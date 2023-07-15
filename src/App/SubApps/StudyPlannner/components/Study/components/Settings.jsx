import React from 'react'

var dataTypeinEdit
var propertyObjectInEdit
var dataTypesInMemoryRetrieved=[]
var unitsInMemoryRetrieved=[]
var functionNamesInMemoryRetrieved=[]
const Settings=(props)=> {
    //..........addMemory
    const deleteMemory=(memoryID,type)=>{
      let url =
      "http://localhost:4000/api/user/deleteMemory/" +
      props.state.my_id+"/"+memoryID+"/"+type;
      let options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + props.state.token,
          "Content-Type": "application/json",
        },
      };
      let req = new Request(url, options);
      fetch(req).then((response)=>{
        if(response.status===201){
          retrieveKeywords(type,true)
        }
      })
    }
    //............
    //..........editMemory
  const editMemory=(object,id,type)=>{
    setIs_loading(true)
    let url =
    "http://localhost:4000/api/user/editMemory/" +
    props.state.my_id+"/"+id+"/"+type;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + props.state.token,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        object:object
      })
    };
    let req = new Request(url, options);
    fetch(req).then((response)=>{
      if(response.status===201){
        if(type==="functionName_inMemory"){
          document.getElementById("study_settingsCustomization_content_inMemory_functionAdd_button").style.display="inline"
          document.getElementById("study_settingsCustomization_content_inMemory_functionEdit_button").style.display="none"
          document.getElementById("study_settingsCustomization_content_inMemory_functionNameInput").value=""
          document.getElementById("study_settingsCustomization_content_inMemory_functionClassInput").value=""
          document.getElementById("study_settingsCustomization_content_inMemory_functionFamilyInput").value=""

        }
        retrieveKeywords(type,true)
        setIs_loading(false)
        document.getElementById("study_settingsCustomization_content_inMemoryDataType_dataTypeAddButton").style.display="inline"
        document.getElementById("study_settingsCustomization_content_inMemoryDataType_dataTypeEditButton").style.display="none"
      }
    })
  }
  //.....................
  return (
    <article id="study_settings_wrapper" className='fc'>
          <div id="study_settingsCustomization_titleWrapper" className='fr'>
            <label>Customize your MCTOSH</label>
            <i class="fi fi-rr-angle-small-down" id="study_settingsCustomization_openIcon" onClick={()=>{
               let content_div= document.getElementById("study_settingsCustomization_contentWrapper")
               let i=document.getElementById("study_settingsCustomization_openIcon")
               let content_div_display=getComputedStyle(content_div).display
               if(content_div_display==="none"){
                 content_div.style.display="flex"
                 i.setAttribute("class","fi fi-rr-angle-small-up")
               }else{
                 content_div.style.display="none"
                 i.setAttribute("class","fi fi-rr-angle-small-down")
               }
              }
            }>
            </i>
          </div>
            <section id="study_settingsCustomization_content_inMemoryWrapper" className='fr'>
              <section id="" className='fc study_settingsCustomization_content_inMemoryColumn'>
                {/* DATATYPE (IN MEMORY) */}
                <div id="study_settingsCustomization_content_inMemoryDataTypesWrapper" className='fc'>
                  <label className='study_settingsCustomization_content_inMemoryLabels'>
                    Data types in memory
                  </label>
                  <section className= "fr study_settingsCustomization_content_inMemoryInputWrapper">
                  <input type="text" id="study_settingsCustomization_content_inMemoryDataType_dataTypeInput" placeholder='Data type'/>
                      <button id="study_settingsCustomization_content_inMemoryDataType_dataTypeAddButton"
                      onClick={()=>{
                        let dataType = document.getElementById("study_settingsCustomization_content_inMemoryDataType_dataTypeInput").value
                        props.addMemory(dataType.toUpperCase(),"dataType_inMemory")
                        }
                      }>add</button>
                        <button id="study_settingsCustomization_content_inMemoryDataType_dataTypeEditButton"
                      onClick={()=>{
                        let dataType = document.getElementById("study_settingsCustomization_content_inMemoryDataType_dataTypeInput").value
                        props.editMemory(dataType.toUpperCase(),dataTypeinEdit,"dataType_inMemory")
                        }
                      }>edit</button>
                  </section>
                  <ul id="study_settingsCustomization_content_inMemoryDataType_dataTypeUl"></ul>
                </div>
              </section>
              <section id="" className='fc study_settingsCustomization_content_inMemoryColumn'>
                {/* DOMAINS (IN MEMORY) */}
                <div id="study_settingsCustomization_content_inMemorySetsWrapper" className='fc'>
                  <label className='study_settingsCustomization_content_inMemoryLabels'>
                    Sets in memory
                  </label>
                  <input type="text" id="study_settingsCustomization_content_inMemorySets_setInput" placeholder='Set' onKeyUp={(event)=>{
                          event.preventDefault()
                          let item = document.getElementById("study_settingsCustomization_content_inMemorySets_setInput")
                          let ul_item = document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl")
                          if(event.key==="Enter"){
                            if(ul_item.children.length===0){document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl").style.display="none"
                          }else{
                            document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl").style.display="flex"
                          }
                          itemsOfSetInWorkingArray.push(item.value)
                          let p_item = document.createElement("p")
                          let i_delete = document.createElement("i")
                          let li= document.createElement("li")
                          li.setAttribute("class", "fr li_item_setInMemory")
                          i_delete.setAttribute("class","fi fi-rr-trash")
                          p_item.textContent=item.value
                          i_delete.addEventListener("click",()=>{
                            li.remove()
                            itemsOfSetInWorkingArray.splice(itemsOfSetInWorkingArray.indexOf(item.value),1)
                            console.log(itemsOfSetInWorkingArray)
                          })
                          console.log(itemsOfSetInWorkingArray)
                          li.append(i_delete,p_item)
                          ul_item.append(li)
                          item.value=""
                        }
                      }}/>
              <section className= "fr study_settingsCustomization_content_inMemoryInputWrapper">
                  <ul id="study_settingsCustomization_content_inMemorySets_itemsUl" className='fr'></ul>
                  <button 
                      onClick={()=>{
                        let set = document.getElementById("study_settingsCustomization_content_inMemorySets_setInput").value
                        if(itemsOfSetInWorkingArray.length!==0){
                          let string="{" 
                          for(var i = 0;i<itemsOfSetInWorkingArray.length;i++){
                            if(i==itemsOfSetInWorkingArray.length-1){
                              string+=itemsOfSetInWorkingArray[i]+"}"
                            }else{
                              string+=itemsOfSetInWorkingArray[i]+", "
                            }
                          }
                          props.addMemory(string.toUpperCase(),"set_inMemory")
                          console.log(string)
                        }
                        }
                  }>add</button>
              </section>
                
                  <ul id="study_settingsCustomization_content_inMemorySets_setUl"></ul>
                </div>
                <div id="study_settingsCustomization_content_inMemoryIntervalsWrapper" className='fc'>
                  <label className='study_settingsCustomization_content_inMemoryLabels'>
                    Intervals in memory
                  </label>
                  <input type="text" id="study_settingsCustomization_content_inMemorySets_setInput" placeholder='Set' onKeyUp={(event)=>{
                          event.preventDefault()
                          let item = document.getElementById("study_settingsCustomization_content_inMemorySets_setInput")
                          let ul_item = document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl")
                          if(event.key==="Enter"){
                            if(ul_item.children.length===0){document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl").style.display="none"
                          }else{
                            document.getElementById("study_settingsCustomization_content_inMemorySets_itemsUl").style.display="flex"
                          }
                          itemsOfSetInWorkingArray.push(item.value)
                          let p_item = document.createElement("p")
                          let i_delete = document.createElement("i")
                          let li= document.createElement("li")
                          li.setAttribute("class", "fr li_item_setInMemory")
                          i_delete.setAttribute("class","fi fi-rr-trash")
                          p_item.textContent=item.value
                          i_delete.addEventListener("click",()=>{
                            li.remove()
                            itemsOfSetInWorkingArray.splice(itemsOfSetInWorkingArray.indexOf(item.value),1)
                            console.log(itemsOfSetInWorkingArray)
                          })
                          console.log(itemsOfSetInWorkingArray)
                          li.append(i_delete,p_item)
                          ul_item.append(li)
                          item.value=""
                        }
                      }}/>
                  <section className= "fr study_settingsCustomization_content_inMemoryInputWrapper">
                  <ul id="study_settingsCustomization_content_inMemorySets_itemsUl" className='fr'></ul>
                      <button 
                      onClick={()=>{
                        let set = document.getElementById("study_settingsCustomization_content_inMemorySets_setInput").value
                        if(itemsOfSetInWorkingArray.length!==0){
                          let string="{" 
                          for(var i = 0;i<itemsOfSetInWorkingArray.length;i++){
                            if(i==itemsOfSetInWorkingArray.length-1){
                              string+=itemsOfSetInWorkingArray[i]+"}"
                            }else{
                              string+=itemsOfSetInWorkingArray[i]+", "
                            }
                          }
                          props.addMemory(string.toUpperCase(),"set_inMemory")
                          console.log(string)
                        }
                        }
                      }>add</button>
                  </section>
                
                  <ul id="study_settingsCustomization_content_inMemorySets_setUl"></ul>
                </div>
              </section>
              <section id="" className='fc study_settingsCustomization_content_inMemoryColumn'>
                 {/* UNITS (IN MEMORY) */}
              <div id="study_settingsCustomization_content_inMemoryUnitsWrapper" className='fc'>
                <label className='study_settingsCustomization_content_inMemoryLabels'>
                  Units in memory
                </label>
                <section className= "fr study_settingsCustomization_content_inMemoryInputWrapper">
                  <input id="study_settingsCustomization_content_inMemoryUnit_unitInput" placeholder='Unit' onChange={()=>{
                  let ul_unit = document.getElementById("study_settingsCustomization_content_inMemoryUnit_unitUl")
                  let unit_input = document.getElementById("study_settingsCustomization_content_inMemoryUnit_unitInput").value.toUpperCase()
                  for(var i = 0;i<unitsInMemoryRetrieved.length;i++){
                    if(unitsInMemoryRetrieved[i].includes(unit_input)){
                        ul_unit.innerHTML=""
                        let p_unit=document.createElement("p")
                        let menu_deleteIcon= document.createElement("i");
                        let li= document.createElement("li");
                        menu_deleteIcon.setAttribute("class","fa fa-sharp fa-solid fa-trash");
                        menu_deleteIcon.setAttribute("id",i)
                        li.setAttribute("id","li_unit"+"_"+i)
                        li.setAttribute("class","fr")
                        menu_deleteIcon.addEventListener("click",()=>{
                          deleteMemory(menu_deleteIcon.id,"unit_inMemory")
                        })
                        p_unit.textContent=unitsInMemoryRetrieved[i]
                        li.append(menu_deleteIcon,p_unit)
                        ul_unit.prepend(li)
                    }
                    if(unit_input==="")retrieveKeywords("unit_inMemory",true)
                  }
                }}></input>
                    <button onClick={()=>{
                      let unit = document.getElementById("study_settingsCustomization_content_inMemoryUnit_unitInput").value
                      props.addMemory(unit.toUpperCase(),"unit_inMemory")
                      }
                    }>add</button>
                </section>
                <ul id="study_settingsCustomization_content_inMemoryUnit_unitUl"></ul>
              </div>
              </section>
            </section>
                              {/* WIDE COLUMN) */}
          <div id="study_settings_content_customize_columnWide_div" className='fc'>
                              {/* FUNCTION NAMES (IN MEMORY) */}
            <div id="study_settings_content_customize_propertyName_div" className='fc'>
                <label className='study_settingsCustomization_content_inMemoryLabels'>
                  Add a property
                </label>
                <div className='fr study_settings_content_customize_propertyObject_mainContent'>
                <section className= "study_settings_content_inputPanel_section">
                    <input id="study_settings_content_customize_propertyName_input" placeholder='Property name'></input>
                    <select id="study_settings_content_customize_propertyLevel_select">
                      <option selected="true" disabled="disabled">
                        Property level
                      </option>
                      <option>All</option>
                      <option>Human level</option>
                      <option>System level</option>
                      <option>Organ level</option>
                      <option>Tissue level</option>
                      <option>Cell level</option>
                      <option>Molecule level</option>
                    </select> 
                    <select id="study_settings_content_customize_propertyDataType_select">
                      <option selected="true" disabled="disabled">
                        Property data type
                      </option>
                    </select> 
                    <select id="study_settings_content_customize_propertySet_select">
                      <option selected disabled>Property range</option>
                    </select>
                  <div id="study_settings_content_customize_propertyUnit_container_div" className='fc'>
                    <select id="study_settings_content_customize_propertyUnit_select" >
                      <option selected disabled>Property unit</option>
                    </select>
                    <div id="study_settings_content_customize_propertyUnit_ulContainer_div">
                      <ul id="study_settings_content_customize_propertyUnit_viewing" className='fr'></ul>
                    </div>
                  </div>
              </section>
              <section id="study_settings_content_customize_propertyObject_buttonContainer_section" className='fc'>
              <button id="study_settings_content_customize_propertyObject_addButton" onClick={()=>{
                    let propertyName=document.getElementById("study_settings_content_customize_propertyName_input").value
                    let propertyLevel=document.getElementById("study_settings_content_customize_propertyLevel_select").value
                    let propertyDataType_select=document.getElementById("study_settings_content_customize_propertyDataType_select").value
                    let propertyDomain_select=document.getElementById("study_settings_content_customize_propertySet_select").value
                    let propertyUnit_select=document.getElementById("study_settings_content_customize_propertyUnit_select").value
                      addCustomize(
                      {
                      propertyName:propertyName.toUpperCase(),
                      propertyLevel:propertyLevel.toUpperCase(),
                      propertyDataType:propertyDataType_select,
                      propertyDomain:propertyDomain_select,
                      propertyUnit:propertyUnit_select,
                      }
                    ,
                    "propertyObject")
                  }
                  }>add</button>
                  <button id="study_settings_content_customize_propertyObject_editButton" onClick={()=>{
                    let unitArray=[]
                    let propertyName=document.getElementById("study_settings_content_customize_propertyName_input").value
                    let propertyDomain=document.getElementById("study_settings_content_customize_propertySet_select").value
                    let propertyLevel=document.getElementById("study_settings_content_customize_propertyLevel_select").value
            
                    for (var i = 0;i<unitsInMemoryRetrieved.length;i++){
                      if(propertyObjectInEdit.propertyName===unitsInMemoryRetrieved[i].propertyName){
                        unitArray.push({
                          propertyName:propertyName,
                          propertyUnit:unitsInMemoryRetrieved[i].propertyUnit
                        })
                      }else{
                        unitArray.push(unitsInMemoryRetrieved[i])
                      }
                    }
                    editPropertyObjectAndUnitCustomize({
                      propertyObject:{
                        _id:propertyObjectInEdit._id,
                        propertyName:propertyName,
                        propertyDomain:propertyDomain,
                        propertyLevel:propertyLevel
                      },
                      propertyUnit:unitArray,
                    })
                    }
                  }>Edit</button>
              </section>
                </div>
                <div id="study_settings_content_customize_property_title" className='fr'>
                  <label>Property name</label>
                  <label>Property level</label>
                  <label>Property data type</label>
                  <label>Property domain</label>
                  <label>Property unit</label>
                </div>
                <ul id="study_settings_content_customize_propertyName_ul"></ul>
            </div>
                              {/* FUNCTION NAMES (IN MEMORY) */}
            <div id="study_settingsCustomization_content_inMemoryFunctionNamesWrapper" className="fc">
                <label className='study_settingsCustomization_content_inMemoryLabels'>
                  Function names in memory
                </label>
                <section className= "fr study_settingsCustomization_content_inMemoryInputWrapper">
                  <input id="study_settingsCustomization_content_inMemory_functionNameInput" placeholder='Function name' ></input>
                <input id="study_settingsCustomization_content_inMemory_functionClassInput" placeholder='Function class' ></input>
                <input id="study_settingsCustomization_content_inMemory_functionFamilyInput" placeholder='Function family' ></input>
                    <button id="study_settingsCustomization_content_inMemory_functionAdd_button" onClick={()=>{
                      let functionName = document.getElementById("study_settingsCustomization_content_inMemory_functionNameInput").value
                      let functionClass = document.getElementById("study_settingsCustomization_content_inMemory_functionClassInput").value
                      let functionFamily = document.getElementById("study_settingsCustomization_content_inMemory_functionFamilyInput").value
                      props.addMemory({
                        name:functionName.toUpperCase(),
                        class:functionClass.toUpperCase(),
                        family:functionFamily.toUpperCase()
                      },"functionName_inMemory")
                      }
                    }>add</button>
                    <button id="study_settingsCustomization_content_inMemory_functionEdit_button" style={{display:"none"}} onClick={()=>{
                      let functionName = document.getElementById("study_settingsCustomization_content_inMemory_functionNameInput").value
                      let functionClass = document.getElementById("study_settingsCustomization_content_inMemory_functionClassInput").value
                      let functionFamily = document.getElementById("study_settingsCustomization_content_inMemory_functionFamilyInput").value
                      props.editMemory({
                        name:functionName.toUpperCase(),
                        class:functionClass.toUpperCase(),
                        family:functionFamily.toUpperCase()
                      },functionInMemory_InEdit_id,"functionName_inMemory")
                    }}>edit</button>
                </section>
                <ul id="study_settingsCustomization_content_inMemoryFunctionName_functionNameUl"></ul>
            </div>
          </div>                              
    </article>  
  )
}

export default Settings
