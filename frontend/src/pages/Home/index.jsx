import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

const initialPersonState = {
  name: '',
  age: null,
  sex: ''
}

export function Home() {
  const navigate = useNavigate()
  const [createData, setCreateData] = useState(initialPersonState)
  const [persons, setPersons] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function createUser() {
    const { name, age, sex } = createData
    const hasEmptyValues = !name || !age || !sex

    if (hasEmptyValues) {
      alert('Fill all fields')
      return
    }

    setIsLoading(true)

    api
      .post('/create', createData)
      .then(() => {
        getPersons()
        setCreateData(initialPersonState)
      })
      .catch(() => alert('Error'))
      .finally(() => setIsLoading(false))
  }

  function getPersons() {
    setIsLoading(true)

    api
      .get('/list')
      .then(response => setPersons(response.data))
      .catch(() => alert('Error'))
      .finally(() => setIsLoading(false))
  }

  function deletePerson(id) {
    setIsLoading(true)

    api
      .delete(`/delete/${id}`)
      .then(() =>
        setPersons(prevState => prevState.filter(item => item._id != id))
      )
      .catch(() => alert('Error'))
      .finally(() => setIsLoading(false))
  }

  function handleOnChange(event) {
    const { name, value } = event.currentTarget

    setCreateData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => getPersons(), [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <input
          placeholder="Type name"
          name="name"
          value={createData.name}
          onChange={handleOnChange}
        />
        <input
          placeholder="type age"
          name="age"
          value={createData.age ?? ''}
          type="number"
          onChange={handleOnChange}
        />
        <input
          placeholder="type sex"
          name="sex"
          value={createData.sex}
          onChange={handleOnChange}
        />
        <button onClick={createUser} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
        </button>
      </div>

      {persons.map(person => (
        <div
          key={person._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '50%',
            height: '2rem'
          }}
        >
          <span
            onClick={() => navigate(person._id)}
            style={{
              cursor: 'pointer'
            }}
          >
            {person.name ?? 'undefined'}
          </span>
          <button onClick={() => deletePerson(person._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
