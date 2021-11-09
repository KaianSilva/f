"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv/config");
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Servidor iniciado... ${port}`));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (request, response, next) {
    console.log(request.method, request.url);
    next();
});
app.get('/', (request, response) => {
    response.send('OK');
});
/* app.use(function(req: Request, res:Response, next) {
    
    if (req.method == 'POST' || req.method == 'PUT' ) {
        const {name , age, cpf,email} = req.body
        if (typeof name != 'string' || isNaN(Number(age)) || typeof cpf != 'string' ) {
            res.status(400).send('Campos invalidos !!')
        }
    } else{
        console.log('campos OK ! !')
        console.log(Math.random().toString(36).substring(2))
        

        //ENCADEAMENTO ****************
        app.use('/users/:id',(req:Request,res:Response,next)=>{

            const name = String(req.body.name)
            const age:string = String(req.body.age)
            const id = Number(req.params.id)
            const cpf = String(req.body.cpf)
    
            if (req.method == 'POST' || req.method == 'PUT' ) {
        
            let indice:number = users.findIndex( users => users.id == id );
        
            if (indice > -1) {
                console.log(`id encontrado para ${name}`)
                
                
            }else{
                res.status(400).send('Campos invalidos !!')
            }
    
            next();
            
        }
            
        
        }) // FIM ENCADEAMENTO *********
    }
    
    next();
    });
 */
class Transaction {
    constructor(id, title, value, type) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.type = type;
    }
}
class User {
    constructor(id, name, age, cpf) {
        this.transactions = [];
        this.id = id;
        this.name = name;
        this.age = age;
        this.cpf = cpf;
    }
}
const users = [];
const user2 = new User(1, "kaian", 29, "3890218302");
users.push(user2);
let id = 1;
const transactions = [];
let idTrans = 0;
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(users[id]);
    let pessoaRetornada = users.find((user) => user.id == id);
    if (pessoaRetornada) {
        const { transactions } = pessoaRetornada, usuario = __rest(pessoaRetornada, ["transactions"]);
        res.send(`Resultado: ${JSON.stringify(usuario)}`);
    }
    else {
        res.status(404).send(`usuario nao encontrado`);
    }
});
app.get('/users', (req, res) => {
    res.send(`Resultado: ${JSON.stringify(users)}`);
});
app.post('/users', (req, res) => {
    const name = String(req.body.name);
    const age = Number(req.body.age);
    const cpf = String(req.body.cpf);
    let validacao = true;
    console.log(id);
    if (name != 'undefined' || cpf != 'undefined' || (isNaN(age))) {
        for (let index = 0; index < users.length; index++) {
            if (cpf == users[index].cpf) {
                validacao = false;
            }
        }
        if (validacao) {
            id++;
            let user1 = new User(id, name, age, cpf);
            users.push(user1);
            res.send(`Adicionado`);
        }
    }
    /* res.status(400).send(`erro`)
 */
});
app.put('/users/:id', (req, res) => {
    const name = String(req.body.name);
    const age = String(req.body.age);
    const id = Number(req.params.id);
    const cpf = String(req.body.cpf);
    let indice = users.findIndex(users => users.id == id);
    if (indice > -1) {
        console.log(name);
        if (name != 'undefined')
            users[indice].name = name;
        if (age != 'undefined')
            users[indice].age = Number(age);
        if (cpf != 'undefined')
            users[indice].cpf = cpf;
        res.status(201).json(users[indice]);
    }
});
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = users.findIndex(users => users.id == id);
    if (indice > -1) {
        users.splice(indice, 1);
        res.status(201).send('deletado');
    }
    else {
        res.status(400).send('nao encontrado');
    }
});
app.get('/users/:userId/transactions', (req, res) => {
    console.log('entrou1');
    const userId = Number(req.params.userId);
    /* const id = Number(req.params.id) */
    console.log(userId);
    let indice = users.findIndex(users => users.id == userId);
    if (indice > -1) {
        res.send(`Resultado: ${JSON.stringify(users[indice].transactions)}`);
    }
});
app.get('/users/:userId/transactions/:id', (req, res) => {
    const userId = Number(req.params.userId);
    const transId = Number(req.params.id);
    console.log(transId);
    let indice = users.findIndex(users => users.id == userId);
    let indiceTrans = users[indice].transactions.findIndex(transactions => transactions.id == transId);
    console.log(indiceTrans);
    if (indice > -1) {
        console.log('if.');
        console.log(indiceTrans);
        if (indiceTrans > -1) {
            console.log('if..');
            res.send(`Resultado: ${JSON.stringify(users[indice].transactions[indiceTrans])}`);
        }
        else {
            res.status(400).send(`nao tem transações`);
        }
    }
    else {
        res.status(400).send(`nao tem usuario`);
    }
});
app.post('/users/:userId/transactions', (req, res) => {
    console.log('entrou');
    const title = String(req.body.title);
    const value = Number(req.body.value);
    const id = Number(req.params.userId);
    const type = String(req.body.type);
    console.log(id);
    if (title != 'undefined' || type != 'undefined' || (isNaN(value))) {
        let indice = users.findIndex(users => users.id == id);
        if (indice > -1) {
            console.log(`id encontrado `);
            idTrans++;
            let trans1 = new Transaction(idTrans, title, value, type);
            users[indice].transactions.push(trans1);
            res.send(`Adicionado`);
        }
    }
    res.status(400).send(`erro`);
});
