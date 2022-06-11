
class UI {
    constructor(){
        this.profile = document.getElementById('profile')
        this.repos = document.getElementById('repos')
        this.lastUsers = document.getElementById('lastusers')
        this.inputName = document.getElementById('username')
        this.msg = document.querySelector('.messages')
        this.data = document.querySelector('.data')
    }
    
    clearInput(){
        this.inputName.value = ''
    }
    
    showUserInfo(user){
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const dateFormat = new Date(user.created_at).toLocaleString('en-EN', options)

        this.profile.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">
                    <a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" alt="${user.name}"></a>
                    <h3>${user.name}</h3>
                </div>
                <ul class="user-list">
                    <li><b>Repolar : </b><a href="${user.repos_url}" target="_blank">${user.public_repos}</a></li>
                    <li><b>Bio : </b>${user.bio}</li>
                    <li><b>Web : </b>${user.blog}</li>
                    <li><b>Şirket : </b>${user.company}</li>
                    <li><b>Kayıt Tarihi : </b>${dateFormat}</li>
                    <li><b>Konum : </b>${user.location}</li>
                    <li><b>Twitter : </b>@${user.twitter_username}</li>
                </ul>
            </div>
        `
    }
    
    showRepoInfo(repos){
        this.repos.innerHTML = ''
        
        repos.forEach(repo => {
            this.repos.innerHTML += `
                <li class="repo">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>
            `
        })
    }
    
    addSearchedUsers(username){
        let user = Storage.getStorageUsers()
        
        if (user.indexOf(username) === -1){
            const li = `<li><a href="#" class="user">${username}</a></li>`

            this.lastUsers.innerHTML += li
        }
    }

    clearAllUsersUI(){
        while(this.lastUsers.firstElementChild !== null){
            this.lastUsers.removeChild(this.lastUsers.firstElementChild)
        }
    }
    
    messages(message, classes='default'){
        const div = document.createElement('div')

        div.className = `alert ${classes}`
        div.textContent = message
        
        this.msg.appendChild(div)
        
        setTimeout(()=>{
            div.remove()
        }, 1400)
    }

    loading(view = 'hide'){
        if (view === 'show'){
            this.data.classList.add('loading')
        }  else {
            this.data.classList.remove('loading')
        }
    }
}