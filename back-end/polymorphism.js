const scrapper =  require("./scrape.js")
class Base_Scrapper {
  
    async take_action (){
        console.log("base class")
    }
}   

class Profile_Detail extends Base_Scrapper{
    constructor(userid){
        super()
        this.userid=userid;
    }

   async take_action(){
        const result  = await scrapper.run(this.userid)

        console.log("one class")

        return [{"id":this.userid,"result":result}]
    }
}

class Two_Profile_Compare extends Base_Scrapper{
    constructor(userid1,userid2){
        super()
        this.userid1=userid1;
        this.userid2=userid2
    }

   async take_action(){
        const result1 = await scrapper.run(this.userid1)
        const result2 = await scrapper.run(this.userid2)

        console.log("two class")

        return [{"id":this.userid1,"result":result1},{"id":this.userid2,"result":result2}]
    }
}

class Three_Profile_compare extends Base_Scrapper{
    constructor(userid1, userid2, userid3){
        super()
        this.userid1=userid1;
        this.userid2=userid2
        this.userid3=userid3
    }

    async take_action(){
        const result1 = await scrapper.run(this.userid1)
        const result2 = await scrapper.run(this.userid2)
        const result3 = await scrapper.run(this.userid3)
        console.log("three class")

        return [{"id":this.userid1,"result":result1},{"id":this.userid2,"result":result2},{"id":this.userid3,"result":result3}]
    }
}

class Rapper{

    constructor(userids){
        this.userids=userids
        this.pointer = [];
        
        for(let i=0;i<userids.length;i++){
            if(userids[i].length==1){
                this.pointer[i] = new Profile_Detail(userids[i][0])
            }
            else if(userids[i].length==2){
                this.pointer[i] = new Two_Profile_Compare(userids[i][0], userids[i][1])
            }
            else if(userids[i].length==3){
                this.pointer[i] = new Three_Profile_compare(userids[i][0], userids[i][1], userids[i][2])
            }
        }

    }

   async run(){
        let result = []
        console.log(this.pointer)
        for(let i=0;i<this.pointer.length;i++){
            console.log(i);
            result [i] = await this.pointer[i].take_action()
        }
        return result
    }


}

// let obj = new Rapper();
// obj.run();

module.exports = {Rapper}

