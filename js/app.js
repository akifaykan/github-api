
class App {
    constructor(){
        this.githubForm = document.getElementById('github-form')
        this.clearData = document.getElementById('clear-data')
        this.lastUsers = document.getElementById('lastusers')
        
        this.githubForm.addEventListener('submit', (e) => this.submitGetData(e))
        this.clearData.addEventListener('click', () => this.clearLastData())

        document.addEventListener('DOMContentLoaded', () => this.getAllSearched())
        document.addEventListener('DOMContentLoaded', () => this.getSearched())
    }
    
    submitGetData(e){
        const username = document.getElementById('username').value.trim()
        const loaded = document.querySelector('.user-repos')
        const ui = new UI()
        const github = new Github()
        
        ui.loading('show')

        if (username === ''){
            ui.loading()
            ui.messages('Lütfen bir kullanıcı adı giriniz.', 'warning')
        } else {
            github.githubData(username)
                .then(response => {
                    console.log(response)
                    
                    ui.loading()
                    loaded.classList.add('loaded')

                    if (response.user.message === 'Not Found'){
                        ui.messages('Böyle bir kullanıcı yok!', 'warning')
                    } else {
                        ui.messages('Kullanıcı bulundu', 'success')
                        ui.showUserInfo(response.user)
                        ui.showRepoInfo(response.repo)
                        ui.addSearchedUsers(username)

                        // Add Storage Username
                        Storage.addStorageUser(username)
                    }
                })
                .catch(err => {
                    ui.loading()
                    ui.messages(err, 'danger')
                })
        }

        ui.clearInput()
        
        if ( typeof e !== 'undefined' ) {
            e.preventDefault()
        }
    }
    
    clearLastData(){
        if(confirm('Emin misin?')){
            const ui = new UI()
            
            Storage.clearAllStorageUsers()
            ui.clearAllUsersUI()
        }
    }

    getAllSearched(){
        let users = Storage.getStorageUsers()
        
        let result = ''
        users.forEach(user => {
            result += `<li><a href="#" class="user">${user}</a></li>`
        })

        this.lastUsers.innerHTML = result
    }

    getSearched(){
        this.lastUsers.addEventListener('click', (e) => {
            if (e.target.classList.contains('user')){
                document.getElementById('username').value = e.target.textContent
                this.submitGetData()
            }
        })
    }
}

new App