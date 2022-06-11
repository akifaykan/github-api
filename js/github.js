
class Github {
    constructor(){
        this.url = "https://api.github.com/users/"
    }
    
    async githubData(name){
        const responseUser = await fetch(this.url + name)
        const responseRepo = await fetch(this.url + name + "/repos")
        
        const userData = await responseUser.json()
        const repoData = await responseRepo.json()

        return {
            user: userData,
            repo: repoData
        }
    }
}