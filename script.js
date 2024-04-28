const checkBoxList=document.querySelectorAll('.checkbox');
const inputFields=document.querySelectorAll('input[type="text"]');
const error=document.querySelector('.error-label');
const pValue=document.querySelector(".progress-value");
const progressLabel=document.querySelector(".p-label");
const allQuotes=["Raise the bar by completing your goals!"," Well begun is half done!","Just a step away, keep going!"," Whoa! You just completed all the goals, time for chill :D "]

const allGoals=JSON.parse(localStorage.getItem('allGoals'))||{
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    }
};
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;
pValue.style.width= `${completedGoalsCount/3*100}%`; 
progressLabel.innerHTML= allQuotes[`${completedGoalsCount}`]
pValue.firstElementChild.innerHTML=`${completedGoalsCount}/3 completed`;
localStorage.setItem("allGoals",JSON.stringify(allGoals));









checkBoxList.forEach((checkbox)=>{

  
    checkbox.addEventListener('click',(e)=>{
       
        const inputArray=Array.from(inputFields);
    const allGoalsAdded=inputArray.every((e)=>{
        return e.value
    })
    if(allGoalsAdded){
        checkbox.parentElement.classList.toggle("completed");
        const inputId=checkbox.nextElementSibling.id;
        allGoals[inputId].completed=!allGoals[inputId].completed;
        completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;
        pValue.style.width= `${completedGoalsCount/3*100}%`; 
        pValue.firstElementChild.innerHTML=`${completedGoalsCount}/3 completed`;
        progressLabel.innerHTML= allQuotes[`${completedGoalsCount}`]
        localStorage.setItem("allGoals",JSON.stringify(allGoals));
        
        error.parentElement.classList.remove("show-error");
    }else{
        error.parentElement.classList.add("show-error");
        
    }
  
    })
   

})
inputFields.forEach((input)=>{
    input.value=allGoals[input.id].name;
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
     input.addEventListener('input',(a)=>{
        if(allGoals[input.id].completed){
        a.target.value=allGoals[input.id].name;
        return
        }
        allGoals[a.target.id].name=a.target.value
        localStorage.setItem("allGoals",JSON.stringify(allGoals));
       
    })
})