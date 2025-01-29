const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Credenciais 
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const port = 3000
// Config JSON
const app = express()
app.use(express.json())
//Models
const User = require("./models/User")

app.post('/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body
    // Validations
    if (!name) {
        return res.status(422).json({ msg: "Nome é obrigatório" })
    }
    if (!email) {
        return res.status(422).json({ msg: "Email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "Senha é obrigatória" })
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "Senhas precisam ser iguais" })
    }
    // Verificar se o usuário já existe
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        return res.status(422).json({ msg: "Já existe um usuário com esse email" })
    }
    // Criar senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // Criar usuário
    const user = new User({
        name,
        email,
        password: passwordHash // Armazenando a senha criptografada
    })
    try {
        await user.save()
        res.status(200).json({ msg: "Usuário registrado com sucesso!" })
    } catch (error) {
        console.error(error) // Exibindo erro corretamente
        res.status(500).json({ msg: "Erro ao registrar o usuário." })
    }
})

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(422).json({ msg: "Email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "Senha é obrigatória" })
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(422).json({ msg: "Usuário não encontrado" })
    }
    // Verificar senha
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida" })
    }
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user.id,
            email: user.email, // Adicionando email no payload (opcional)
            name: user.name // Adicionando nome no payload (opcional)
        }, secret, { expiresIn: '1h' }) // Token expira em 1h
        res.status(200).json({
            msg: "Usuário autenticado com sucesso",
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Erro ao gerar o token." })
    }
})

app.get('/', (req, res) => {
    res.send("Tudo Ok")
})

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.r3gez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor em http://localhost:${port}`)
            console.log("Conectado ao Banco de Dados")
        })
    }).catch((erro) => {
        console.log("Erro ao conectar ao banco de dados " + erro)
    })
