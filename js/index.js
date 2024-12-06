var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
var submit=document.getElementById('submitBtn');
var box_info=document.getElementById('box-info');
var closeIcon=document.getElementById('closeBtn');

regex={
  bookmarkName:/^[A-Z][a-z]{3,}$/,
  bookmarkURL:/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/, //from i hate regex

}
console.log(bookmarkName,bookmarkURL,submit,box_info);
var bookmarkList;
if(localStorage.getItem('data')==null){
    bookmarkList=[];
}
else{

    bookmarkList=JSON.parse(localStorage.getItem('data'));
    displaydata(bookmarkList)

}
var arrayOfInputs=[ bookmarkName, bookmarkURL]
submit.addEventListener('click',function (){
    hambozoo();
}
);
function addbookmark (){
  if (
    bookmarkName.classList.contains("is-valid") &&
    bookmarkURL.classList.contains("is-valid")
  ) {
    bookmark={
        bookmarkname:bookmarkName.value,
        bookmarkURL:bookmarkURL.value
    };
    console.log(bookmark);
   
    bookmarkList.push(bookmark);
    console.log(bookmarkList);
   
    saveLocalStorage();
    displaydata(bookmarkList);
  clearData();
}
else{
  box_info.classList.remove('d-none');
}}

   function hambozoo(){
        for(var i=0;i<arrayOfInputs.length;i++){
            if(arrayOfInputs[i].value==''  ){
                console.log(`empty ${i} `)
                arrayOfInputs[i].classList.add('is-invalid');
                arrayOfInputs[i].nextElementSibling.classList.remove('d-none');
                
            }}
            if(bookmarkName.value!='' && bookmarkURL!='' ){
            bookmarkName.nextElementSibling.classList.add('d-none');
            bookmarkURL.nextElementSibling.classList.add('d-none');
              console.log(`full ${i} `)
              if(bookmarkName.classList.contains('is-valid')&& bookmarkURL.classList.contains('is-valid'));{
                addbookmark();
              }
              
              
          }

            
    

}
bookmarkName.addEventListener('blur',function(){
 
  regex=/^[A-Z][a-z]{3,}$/;
  validate(regex,bookmarkName);
})
bookmarkURL.addEventListener('blur',function(){
  regex=/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/; //from i hate regex
  validate(regex,bookmarkURL);
  console.log('hello finsih url validate')
})
function  validate(r,x){
  
if(r.test(x.value)){
  x.classList.add('is-valid');
  x.classList.remove('is-invalid');
}
else{
  x.classList.add('is-invalid');
  x.classList.remove('is-valid');
}
}
// function validateAllInput(){
  
// regex={
//         bookmarkName:/^[A-Z][a-z]{3,}$/,
//         bookmarkURL:/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/, //from i hate regex
  
// }
// for(var i=0;i<arrayOfInputs.length;i++){
//      check_match=regex[arrayOfInputs[i].id].test(arrayOfInputs[i].value);
//       if(check_match)  {
//         arrayOfInputs[i].nextElementSibling.classList.add('d-none');
//         arrayOfInputs[i].classList.remove('is-invalid');
//         arrayOfInputs[i].classList.add('is-valid');
      
//         addbookmark();

//       }
//       else{
//         arrayOfInputs[i].classList.remove('is-valid');
//         arrayOfInputs[i].classList.add('is-invalid');
//         box_info.classList.remove('d-none');
//         console.log('hello')
       
//       }

// return true
// }}




























function saveLocalStorage(){
    localStorage.setItem('data',JSON.stringify(bookmarkList));
};

function clearData(){
  bookmarkName.value='';
 bookmarkURL.value='';
 bookmarkName.classList.remove('is-valid');
 bookmarkURL.classList.remove('is-valid')

}
function displaydata(bookmarkList){
  cartona='';
    for(var i=0;i<bookmarkList.length;i++){
    cartona+=`<tr>
                 <td>${i+1}</td>
                <td>${bookmarkList[i].bookmarkname}</td>
                <td><a href="${bookmarkList[i].bookmarkURL}" target="_blank">
                    <button class="btn  btn-visit ">
                    <i class="fa-solid fa-eye pe-2"></i> Visit</button></a>
               </td>
               <td><button class="btn  btn-delete"  onclick="deleteBookmark(${i});">
                <i class="fa-solid fa-trash-can pe-2"></i> Delete</button>
           </td>



            </tr>`
    }
    document.getElementById('tableContent').innerHTML=cartona;
}
//delete bookmark
function deleteBookmark(index){
  bookmarkList.splice(index,1);

  displaydata(bookmarkList);
  saveLocalStorage();
  console.log(bookmarkList);
}
// 3 ways to close modal => close button -  Esc keyboard - clicking outside modal

closeIcon.addEventListener('click',
  function(){
    closeModal()
  }
);
function closeModal(){
box_info.classList.add('d-none');
}


document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});

