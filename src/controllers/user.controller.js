const soma = (req, res) => {
    const soma = 100 + 1

    res.send({ soma: soma })
}

const subtracao = (req,res) => {
    const subtracao = 100 - 1

    res.json(subtracao)
}

module.exports = {
    soma,
    subtracao
}