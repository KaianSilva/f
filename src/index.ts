import express, {Request, Response} from 'express';
import { stringify } from 'querystring';
const app = express();
import 'dotenv/config'

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Servidor iniciado... ${port}`));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(function(request, response, next) {
    console.log(request.method, request.url);
    next();
    });

app.get('/', (request: Request, response: Response) => {
 response.send('OK');
}); 




/* app.use(function(req: Request, res:Response, next) {
    console.log(req.body)
    if (req.method == 'POST' || req.method == 'PUT' ) {
        const {name , age, cpf,email,title,value,type} = req.body

        if (typeof name != 'string' || isNaN(Number(age)) || typeof cpf != 'string' || typeof title != 'string' || isNaN(Number(value)) || typeof type != 'string'  ) {
            res.status(400).send('Campos invalidos !!')
        }
    } else{
        console.log('campos OK ! !')
        console.log(Math.random().toString(36).substring(2))
        
    }
    
    next();
    }); */
 

       


class Transaction {
    id:number
    title:string
    value:number
    type:string

    constructor(id:number,title:string,value:number,type:string) {
        this.id = id
        this.title = title
        this.value = value
        this.type = type
    }
}

class User {
    id:number
    name:string
    age:number
    cpf:string
    transactions: Transaction[] = []

   constructor(id:number,name:string,age:number,cpf:string) {
       this.id=id
       this.name=name
       this.age=age
       this.cpf=cpf
   }

}

const users:User[] = []

const user2: User = new User(1,"kaian",29,"3890218302")
users.push(user2)

let id: number = 1

const transactions: Transaction[] = []
let idTrans: number = 0



app.get('/users/:id',(req:Request , res: Response)=>{

    
    
    const id = Number(req.params.id)
    console.log(users[id])
    
    let pessoaRetornada: User | undefined = users.find((user)=> user.id == id)

    if (pessoaRetornada) {
        const {transactions, ...usuario} = pessoaRetornada
        res.send(`Resultado: ${JSON.stringify(usuario)}`)
    }
    else {
        res.status(404).send(`usuario nao encontrado`)
    }
    

})

app.get('/users',(req:Request , res: Response)=>{
    

    res.send(`Resultado: ${JSON.stringify(users)}`)

})


app.post('/users',(req:Request,res:Response)=>{

    
    const name = String(req.body.name)
    const age = Number(req.body.age)
    
    const cpf = String(req.body.cpf)   
    let validacao: boolean = true
    
    
    console.log(id)
    if (name != 'undefined' || cpf != 'undefined'  || (isNaN(age)) ) {
        
        for (let index = 0; index < users.length; index++) {
            
            if (cpf == users[index].cpf) {
               validacao = false
            }                      
            
        }  

        if (validacao) {
            id++
            let user1 = new User(id,name,age,cpf)
            users.push(user1)
            res.send(`Adicionado`)
        }
               
        
    }

    /* res.status(400).send(`erro`)
 */
    

})


app.put('/users/:id',(req:Request,res:Response)=>{

    const name = String(req.body.name)
    const age:string = String(req.body.age)
    const id = Number(req.params.id)
    const cpf = String(req.body.cpf)

    let indice:number = users.findIndex( users => users.id == id );

    if (indice > -1) {
        console.log(name)
        if(name != 'undefined') users[indice].name = name
        if(age != 'undefined') users[indice].age = Number(age)
        if(cpf != 'undefined') users[indice].cpf = cpf
        
        res.status(201).json(users[indice])
    }

    

})


app.delete('/users/:id',(req:Request,res:Response)=>{

    
    const id = Number(req.params.id)
    

    const indice:number = users.findIndex( users => users.id == id );

    if(indice > -1){
        users.splice(indice,1)
        res.status(201).send('deletado')      
    }else{
        res.status(400).send('nao encontrado')
    }

    

})




app.get('/users/:userId/transactions',(req:Request,res:Response)=>{

    console.log('entrou1')
    const userId = Number(req.params.userId)
    /* const id = Number(req.params.id) */
    console.log(userId)
    let indice:number = users.findIndex( users => users.id == userId );
        
            if (indice > -1){

                res.send(`Resultado: ${JSON.stringify(users[indice].transactions)}`)
            }


})

app.get('/users/:userId/transactions/:id',(req:Request,res:Response)=>{

    const userId = Number(req.params.userId)
    const transId = Number(req.params.id) 
    console.log(transId)
    
    let indice:number = users.findIndex( users => users.id == userId );

    let indiceTrans:number = users[indice].transactions.findIndex( transactions => transactions.id == transId );
        console.log(indiceTrans)
            if (indice > -1){

                console.log('if.')
                console.log(indiceTrans)
                if (indiceTrans > -1) {
                    console.log('if..')
                    res.send(`Resultado: ${JSON.stringify(users[indice].transactions[indiceTrans])}`)
                }else{  res.status(400).send(`nao tem transações`)}

                
            }else{  res.status(400).send(`nao tem usuario`)}

   


})




app.post('/users/:userId/transactions',(req:Request,res:Response)=>{

    console.log('entrou')
    const title = String(req.body.title)
    const value = Number(req.body.value)
    const id = Number(req.params.userId)
    const type = String(req.body.type)    
    
    
    console.log(id)
    if (title != 'undefined' || type != 'undefined'  || (isNaN(value)) ) {
        
        let indice:number = users.findIndex( users => users.id == id );
        
            if (indice > -1) {
                console.log(`id encontrado `)
                idTrans++
                let trans1 = new Transaction(idTrans,title,value,type)
                users[indice].transactions.push(trans1) 
                res.status(201).send('add')
                
            }else{
                res.status(400).send(`erro`)
            }

         
        
    }

    

    

})