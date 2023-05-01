const Person = require('../models/Person')

class PersonController {
  async create(req, res) {
    const { name, age, sex } = req.body

    if (!name || !age || !sex) {
      res.status(409).json({ error: 'has empty field' })
      return
    }

    const response = await Person.create({
      name,
      age,
      sex
    })

    res.send(response)
  }

  async getAll(req, res) {
    const users = await Person.find()
    res.send(users)
  }

  async getById(req, res) {
    const { id } = req.params

    try {
      const user = await Person.findById(id)
      res.send(user)
    } catch (error) {
      res.send(error)
    }
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const user = await Person.findOneAndDelete({ _id: id })
      res.status(201).send(user)
    } catch (error) {
      res.send(error)
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { name, age, sex } = req.body
    const person = {
      name,
      age,
      sex
    }

    try {
      await Person.updateOne({ _id: id }, person)
      res.send(person)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = new PersonController()
