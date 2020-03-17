(function(){
  // variable
  const baseUrl = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
  const data = []
  const userList = document.querySelector('.user-list')
  
  // listener More Detail button
  userList.addEventListener('click', (event) => {
    if (event.target.matches('.more-detail')) {
      showUserDetail(event.target.dataset.id)
    }
  })
  
  // get api all user info
  axios.get(baseUrl)
    .then((res) => {
      data.push(...res.data.results)
      console.log(data)
      generateUserListHtml(data)
  })
    .catch((err) => {
      console.log(err)
  })
  
  // function: show user detail info
  function showUserDetail(id){
    // element variable
    const modalTitle = document.getElementById('show-name')
    const modalImage = document.getElementById('show-image')
    const modalEmail = document.getElementById('show-email')
    const modalGender = document.getElementById('show-gender')
    const modalAge = document.getElementById('show-age')
    const modalRegion = document.getElementById('show-region')
    const modalBirthday = document.getElementById('show-birthday')
    
    // get user detail info from api
    const url = baseUrl + id
    axios.get(url)
      .then((res) => {
        let userDetail = res.data
       // insert data into modal ui
      modalTitle.textContent = userDetail.name
      modalImage.innerHTML = `<img src="${userDetail.avatar}" class="img-fluid" alt="Responsive image">`
      modalEmail.textContent = `E-Mail: ${userDetail.email}`
      modalGender.textContent = `Gender: ${userDetail.gender}`
      modalAge.textContent = `Age: ${userDetail.age}`
      modalRegion.textContent = `Region: ${userDetail.region}`
      modalBirthday.textContent = `Birthday: ${userDetail.birthday}`
    })
      .catch((err) => {
      console.log(err)
    })
  }
  
  // function: generate user list html
  function generateUserListHtml(data){
    let htmlContent = ''
    
    data.forEach((user) => {
      let avatar = user.avatar
      let name = user.name
      let id = user.id
      htmlContent += `
        <div class="col-sm-2">
          <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
            <img class="card-img-top" src="${avatar}" alt="Card image cap">
            <div class="card-body text-center">
              <h5 class="card-title">${name}</h5>
              <!-- Button trigger modal -->
              <button type="button" class="more-detail btn btn-primary" data-toggle="modal" data-id="${id}" data-target="#userDetail">
                More Detail
              </button>
            </div>
          </div>
        </div>
      `
    })
    userList.innerHTML = htmlContent
  }
})()