
class Storage {
    static getStorageUsers(){
        let users
        
        if (localStorage.getItem('searched') === null){
            users = []
        } else {
            users = JSON.parse(localStorage.getItem('searched'))
        }
        
        return users
    }
    
    static addStorageUser(username){
        const users = this.getStorageUsers()

        if (users.indexOf(username) === -1){
            users.push(username)
        }

        localStorage.setItem('searched', JSON.stringify(users))
    }
    
    static clearAllStorageUsers(){
        localStorage.removeItem('searched')
    }
}